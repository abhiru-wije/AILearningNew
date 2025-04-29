import { Child } from "@/data/dashboardData";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  firstname: string;
  lastname: string;
  mobile_number: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ChildSignupResponse {
  _id: string;
  firstname: string;
  lastname: string;
  class: string;
}

export interface SignupResponse {
  id: string;
  username: string;
  class: string;
}

export interface ChildLoginResponse {
  access_token: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface ParentInfo {
  children: Child[];
  parent: Parent;
}

export interface Parent {
  parent_id: string;
  firstname: string;
  lastname: string;
}

export interface NewChildInfo {
  firstname: string;
  lastname: string;
  class: string
}
