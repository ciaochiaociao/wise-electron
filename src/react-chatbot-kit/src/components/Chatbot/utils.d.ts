import IConfig from '../../interfaces/IConfig';
export declare const getCustomStyles: (config: IConfig) => import("../../interfaces/IConfig").ICustomStyles;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare const getInitialState: (config: IConfig) => any;
export declare const getWidgets: (config: IConfig) => import("../../interfaces/IWidget").default[];
export declare const getCustomComponents: (config: IConfig) => import("../../interfaces/IConfig").ICustomComponents;
export declare const getBotName: (config: IConfig) => string;
export declare const getObject: (object: object) => object;
export declare const getCustomMessages: (config: IConfig) => import("../../interfaces/IConfig").ICustomMessage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare const validateProps: (config: IConfig, MessageParser: any) => string[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare const isConstructor: (func: any) => boolean;
