import axios from "@/plugins/axios";
import type { Token } from "@/types/token/Token";

const URL = "/token";

export default class TokenService {

  static async validarEmail(token: Token):Promise<Token> {
    const response = await axios.get(`${URL}/${token.token}` );
    return response.data;
  }

 
}
