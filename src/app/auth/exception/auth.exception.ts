import {ConflictException, UnauthorizedException} from "@nestjs/common";

export class EmailExistedException extends ConflictException{
    constructor() {
        super('Email has been existed.');
    }
}

export class InvalidCredentialsException extends UnauthorizedException{
    constructor() {
        super('Invalid Credentials.');

    }

}