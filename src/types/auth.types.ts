/**
 * Tipos relacionados à autenticação
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthError {
  code: string;
  message: string;
}
