declare namespace Express {
  interface Request {
    user?: {
      email: string;
      location: string;
    };
  }
}
