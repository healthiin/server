export enum JwtSubjectType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export type JwtDecodedData = {
  sub: JwtSubjectType;
  user_id?: string;
  iat: number;
  nbf: number;
  exp: number;
  aud: string;
  iss: string;
};
