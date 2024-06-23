export namespace Utils {
    export const generateRandomString = (length: number): string => {
        const alphanumericCharacters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(
                Math.random() * alphanumericCharacters.length,
            )
            result += alphanumericCharacters.charAt(randomIndex)
        }

        return result;
    }

    export enum PrismaError {
        UniqueConstaintFailed = 'P2002',
        RecordDoesNotExist = 'P2025'
    }
}