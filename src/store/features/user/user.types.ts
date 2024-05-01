export interface IDataFromResolve {
  username: string
  email: string
  id: number
}

export interface IDataFromForm {
  username?: string
  email: string
  password: string
  repeat_password?: string
}

export interface IToken {
  access: string
  refresh: string
}

export interface ITokens {
  tokens: IToken
}
