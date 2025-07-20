import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export function getLoggedUser(): JwtPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    console.error("Token inválido", err);
    return null;
  }
}