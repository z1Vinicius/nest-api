interface IAuthPayload {
  sub: string;
  email: string;
}

interface IUserPayload {
  sub: string;
  nameUser: string;
}

export { IAuthPayload, IUserPayload };
