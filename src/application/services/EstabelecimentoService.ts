import axios from "@/plugins/axios";
import { type Estabelecimento } from "@/types/estabelecimento/Estabelecimento";
import type { EstabelecimentoRequest } from "@/types/estabelecimento/EstabelecimentoRequest";

const URL = "/estabelecimento";

export default class EstabelecimentoService {
  static async findAll() {
    return axios.get(URL);
  }
  static async findByUsuarioLogado() {
    return axios.get(`${URL}/logado`);
  }

  static async findById(id: number) {
    return axios.get(`${URL}/${id}`);
  }

  static async save(estabelecimento: Estabelecimento) {
    return axios.post(URL, estabelecimento);
  }

  static async update(id: number, estabelecimento: Estabelecimento) {
    return axios.put(`${URL}/${id}`, estabelecimento);
  }

  static async delete(id: number) {
    return axios.delete(`${URL}/${id}`);
  }
}
