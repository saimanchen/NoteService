export interface ILoginRequest {
  email: string
  password: string
}

export interface IRegisterRequest {
  name: string
  email: string
  password: string
}

export interface IAddNoteRequest {
  title: string
  shortDescription: string
  content: string
  category: number
}

export interface IDeleteNoteRequest {
  id: string
}

export interface IGetNotesCategoryRequest {
  category: number
}

export interface IDeleteNotesCategoryRequest {
  category: number
}

export interface IUpdateNoteRequest {
  id: string
  title: string
  shortDescription: string
  content: string
  category: number
}

export interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface INote {
  title: string
  shortDescription: string
  content: string
  category: number
}