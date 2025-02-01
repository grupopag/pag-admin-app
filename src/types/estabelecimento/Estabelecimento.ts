export interface Estabelecimento {
  id?: number;
  nome: string;
  cnpj: string;
  cep: string;
  enteId?: number;
  uf: string;
  percentualServico: number;
  valorCouvert?: number;
  ativarCouvert?: boolean;
  chavePix: string;
  dataCriacao?: string | Date;
  ultimaAtualizacao?: string;
  municipio: string;
  telefone: string;
  endereco: string;
  nomeResponsavel: string;
  cpfResponsavel: string;
  email: string;
  senha: string;

}
