export interface User {
    id: number;
    username: string;
    email: string;
    role: "student" | "instructor";
}

export interface AuthResponse {
    token: string;
    user: User;
}

  
export interface LoginRequest {
    email: string;
    password: string;
}
  
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: string;
}
  