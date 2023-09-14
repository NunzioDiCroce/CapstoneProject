export interface AuthData {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  accessToken:string;
  user: {
    id: number,
    name: string,
    surname: string,
    email: string,
    role: string
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

}
