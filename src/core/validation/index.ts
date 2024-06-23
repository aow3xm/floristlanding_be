import { ValidatorOptions } from "class-validator";

interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    enableDebugMessages?: boolean;
}

export const validationOptions: ValidationPipeOptions = {
    transform: true,
    disableErrorMessages: false,
    enableDebugMessages: true,
};