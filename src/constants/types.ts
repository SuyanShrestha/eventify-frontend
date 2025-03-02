export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

export interface UsersState {
  users: User[];
}
