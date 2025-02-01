import { createRouter, createWebHistory } from "vue-router";
import Default from "@/layout/Default.vue";
import Estabelecimento from "@/views/Estabelecimento.vue";
import ValidacaoUsuario from "@/views/ValidacaoUsuario.vue";
import AguardandoConfirmacao from "@/views/AguardandoConfirmacao.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_VUE_APP_PATH),
  routes: [
    {
      path: "/",
      name: "home",
      component: Default,
      children: [
        {
          path: "/estabelecimento",
          alias: "/",
          name: "estabelecimento",
          component: Estabelecimento,
        },
        {
          path: "/aguardando-validacao",
          name: "aguardando-validacao",
          component: AguardandoConfirmacao,
        },
        {
          path: "/validacao-usuario",
          name: "token",
          component: ValidacaoUsuario,
        },
      ],
    },
  ],
});

export default router;
