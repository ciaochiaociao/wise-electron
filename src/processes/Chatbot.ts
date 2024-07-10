import { BaseMessage } from '@langchain/core/messages';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { LLMChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export default class Chatbot {
	textSplitter!: RecursiveCharacterTextSplitter;
	memory!: BufferMemory; // Buffer Memory for storing chat history
	chain!: RunnableSequence;

	constructor() {}

	async init() {
		this.textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

		this.memory = new BufferMemory({
			memoryKey: 'chatHistory',
			inputKey: 'question', // The key for the input to the chain
			outputKey: 'text', // The key for the final conversational output of the chain
			returnMessages: true, // If using with a chat model (e.g. gpt-3.5 or gpt-4)
		});

		const serializeChatHistory = (chatHistory: Array<BaseMessage>): string =>
			chatHistory
				.map((chatMessage) => {
					if (chatMessage._getType() === 'human') {
						return `Human: ${chatMessage.content}`;
					} else if (chatMessage._getType() === 'ai') {
						return `Assistant: ${chatMessage.content}`;
					} else {
						return `${chatMessage.content}`;
					}
				})
				.join('\n');

		/**
		 * Create two prompt templates, one for answering questions, and one for
		 * generating questions.
		 */
		const questionPrompt = PromptTemplate.fromTemplate(
			`Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
			----------
			CHAT HISTORY: {chatHistory}
			----------
			QUESTION: {question}
			----------
			Helpful Answer:`,
		);

		const QAModel = new ChatOpenAI({
			model: 'gpt-4o',
			apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		});
		const QAChain = new LLMChain({
			llm: QAModel,
			// @ts-expect-error: missing properties _streamevents
			prompt: questionPrompt,
		});

		// Define the function that will perform the question answering
		const performQuestionAnswering = async (input: {
			question: string;
			chatHistory: Array<BaseMessage> | null;
		}): Promise<{ result: string }> => {
			let question = input.question;
			// Serialize chat history into strings
			const chatHistoryString = input.chatHistory
				? serializeChatHistory(input.chatHistory)
				: null;

			const response = await QAChain.invoke({
				chatHistory: chatHistoryString ?? '',
				question: question,
			});

			// Save the chat history to memory
			await this.memory.saveContext(
				{
					question: input.question,
				},
				{
					text: response.text,
				},
			);

			return {
				result: response.text,
			};
		};

		// Create a chain that pipes the question through the retriever and then the question answering function
		this.chain = RunnableSequence.from([
			{
				// Pipe the question through unchanged
				question: (input: { question: string }) => input.question,
				// Fetch the chat history, and return the history or null if not present
				chatHistory: async () => {
					const savedMemory = await this.memory.loadMemoryVariables({});
					const hasHistory = savedMemory.chatHistory.length > 0;
					return hasHistory ? savedMemory.chatHistory : null;
				},
			},
			performQuestionAnswering,
		]);
		return this;
	}

	async ask_question(question: string) {
		const response = await this.chain.invoke({ question });
		return response;
	}

	async clear_chat_history() {
		return this.memory.clear();
	}

}