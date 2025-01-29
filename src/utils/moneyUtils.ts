export function getFormatMoeda(valor?: number | string | null) {
  if (!valor) {
    return "Não informado";
  }
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
