import axios from "@/plugins/axios";
import { type Estabelecimento } from "@/types/estabelecimento/Estabelecimento";

const URL = "/estabelecimento";

export default class EstabelecimentoService {

  static async save(estabelecimento: Estabelecimento) {
    return axios.post(URL, estabelecimento);
  }

 
}
