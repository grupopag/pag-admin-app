export interface EstabelecimentoRequest {
  nome: string;
  cnpj: string;
  cpfResponsavel: string;
  cep: string;
  enteId: number;
  uf: string;
  percentualServico: number;
  valorCouvert: number;
  ativarCouvert: boolean;
  municipio: string;
  telefone: string;
  endereco: string;
  nomeResponsavel: string;
}
