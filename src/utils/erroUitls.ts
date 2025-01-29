import { type ErrorObject } from "@vuelidate/core";
import { useToast } from "vue-toast-notification";

type ErroFields = {
  mensagem: string;
};

const toast = useToast();

export function getErrorMessage(error: any): string {
  if (error.response?.data?.erros) {
    const erros = getErrosCampos(error.response?.data?.erros);
    erros.forEach((erro) => {
      toast.error(erro, { duration: 10000, position: "top-right" });
    });
    return erros.join(', ') || "Ocorreu um erro inesperado";
  }

  return (
    error?.response?.data?.mensagemUsuario ?? "Ocorreu um erro inesperado"
  );
}

export function getErrosVuelidate(erros: ErrorObject[]): string[] {
  return erros.map((erro) => String(erro.$message));
}

export function getErrosCampos(erros: ErroFields[]): string[] {
  return erros.map((erro) => String(erro.mensagem));
}
