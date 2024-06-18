export interface User {
  id: number
  email: string
  username: string
  password: string
  description?: string
  avatarUrl?: string
  favorites?: string[]
}
