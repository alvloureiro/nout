import { CustomError } from './custom-error';
export declare class UnAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
