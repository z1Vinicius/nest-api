import { IUserPayload } from 'src/modules/auth/types/auth';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}
