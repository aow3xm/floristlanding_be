import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export namespace HashHelper {
  export const hash = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
  };

  export const verify = async (
    password: string,
    hash: string,
  ): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  };
}
