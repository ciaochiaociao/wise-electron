import { assert, test, it } from 'vitest';

import Chatbot from './Chatbot';

it('should create a simple working chatbot', async () => {
	const chatBot = new Chatbot();
	await chatBot.init();
  
	const output = await chatBot.ask_question(
		'Hi! How are you doing today?',
	);

	console.log(output);

  assert(output.result.length > 0);
});
  
it('should answer Hiii', async () => {
	const chatBot = new Chatbot();
	await chatBot.init();
	const output = await chatBot.ask_question(
		'You are a robot that should just say what I said. Starting now! Hiii',
	);

	assert(output.result === 'Hiii');

});

it('should have memory', async () => {
	const chatBot = new Chatbot();
	await chatBot.init();
	const output = await chatBot.ask_question(
		'Hi! My name is John Doe.',
	);

	console.log(output);

  const output2 = await chatBot.ask_question(
    'What is my last name?',
  );
  console.log("output2");
  console.log(output2);

  assert(output2.result.includes('Doe'));

}, 10000);

