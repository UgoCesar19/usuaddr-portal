import type { Role } from "./Role";

export interface Usuario {
  id: number;
  email: string;
  senha: string;
  nome: string;
  dataCriacao: string;
  perfis: Role[];
}