import { BaseModel } from "./BaseModel";
export declare class ErrorState {
    [index: string]: {
        error: boolean;
        errMsg: string;
    };
}
export declare const initErrorState: ErrorState;
export declare const makeErrorProps: (state: ErrorState, key: string) => {
    error: boolean;
    helperText: string;
};
export declare function validation(clazz: BaseModel, data: BaseModel): {
    newErrorState: ErrorState;
    isValid: boolean;
};
