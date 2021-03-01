export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwt: string | null;
  error: string | null;
}
export interface Branch {
  branchName: string;
  branchCity: string;
}
