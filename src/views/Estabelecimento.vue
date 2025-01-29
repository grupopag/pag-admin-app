<script setup lang="ts">
import { required } from "@/i18n/i18n-validators";
import { useVuelidate } from "@vuelidate/core";
import EstabelecimentoService from "@/application/services/EstabelecimentoService";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

import * as erroUtils from "@/utils/erroUitls";
import type { Estabelecimento } from "@/types/estabelecimento/Estabelecimento";

const $toast = useToast();

const estabelecimento = ref<Estabelecimento>({
  nome: "",
  cnpj: "",
  cpfResponsavel: "",
  cep: "",
  uf: "",
  percentualServico: 0,
  valorCouvert: 0,
  ativarCouvert: false,
  municipio: "",
  telefone: "",
  endereco: "",
  nomeResponsavel: "",
  enteId: 0,
});

const emit = defineEmits(["success", "onError"]);

const rules = {
  nome: { required },
  cnpj: { required },
  cpfResponsavel: { required },
  cep: { required },
  uf: { required },
  percentualServico: { required },
  municipio: { required },
  telefone: { required },
  endereco: { required },
  nomeResponsavel: { required },
};

const v$ = useVuelidate(rules, estabelecimento);

const textBtn = computed(() => {
  return estabelecimento.value.id ? "Atualizar" : "Salvar";
});

async function carregarEstabelecimento() {
  try {
    const response = await EstabelecimentoService.findByUsuarioLogado();
    if (response.data) {
      Object.assign(estabelecimento.value, response.data);
    }
  } catch (error) {
    $toast.error(erroUtils.getErrorMessage(error));
  }
}

async function salvar() {
  v$.value.$touch();
  if (v$.value.$errors.length === 0) {
    try {
      !estabelecimento.value.id
        ? await EstabelecimentoService.save(estabelecimento.value)
        : await EstabelecimentoService.update(
            estabelecimento.value.id,
            estabelecimento.value
          );

      emit("success");
      await carregarEstabelecimento();
      $toast.success("Estabelecimento salvo com sucesso!");
    } catch (e) {
      $toast.error(erroUtils.getErrorMessage(e));
      emit("onError", e);
    }
  }
}

onMounted(() => {
  carregarEstabelecimento();
});
</script>

<template>
  <VCard height="100%" style="padding: 5px 40px">
    <VToolbar prominent color="primary" dark title="Meu Estabelecimento">
    </VToolbar>

    <VCardText>
      <VRow>
        <VCol md="8" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="Nome"
            :error-messages="erroUtils.getErrosVuelidate(v$.nome.$errors)"
            v-model="estabelecimento.nome"
            label="Nome"
          />
        </VCol>
        <VCol md="4" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="CNPJ"
            :error-messages="erroUtils.getErrosVuelidate(v$.cnpj.$errors)"
            v-model="estabelecimento.cnpj"
            label="CNPJ"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol md="6" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="Nome do Responsável"
            :error-messages="
              erroUtils.getErrosVuelidate(v$.nomeResponsavel.$errors)
            "
            v-model="estabelecimento.nomeResponsavel"
            label="Nome do Responsável"
          />
        </VCol>
        <VCol md="6" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="CPF do Responsável"
            :error-messages="
              erroUtils.getErrosVuelidate(v$.cpfResponsavel.$errors)
            "
            v-model="estabelecimento.cpfResponsavel"
            label="CPF do Responsável"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol md="4" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="CEP"
            :error-messages="erroUtils.getErrosVuelidate(v$.cep.$errors)"
            v-model="estabelecimento.cep"
            label="CEP"
          />
        </VCol>
        <VCol md="5" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="Município"
            :error-messages="erroUtils.getErrosVuelidate(v$.municipio.$errors)"
            v-model="estabelecimento.municipio"
            label="Município"
          />
        </VCol>
        <VCol md="3" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="UF"
            :error-messages="erroUtils.getErrosVuelidate(v$.uf.$errors)"
            v-model="estabelecimento.uf"
            label="UF"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol md="8" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="Endereço"
            :error-messages="erroUtils.getErrosVuelidate(v$.endereco.$errors)"
            v-model="estabelecimento.endereco"
            label="Endereço"
          />
        </VCol>
        <VCol md="4" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            placeholder="Telefone"
            :error-messages="erroUtils.getErrosVuelidate(v$.telefone.$errors)"
            v-model="estabelecimento.telefone"
            label="Telefone"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol md="4" cols="12">
          <VTextField
            bg-color="#f0f0f0"
            variant="outlined"
            type="number"
            placeholder="% Serviço"
            :error-messages="
              erroUtils.getErrosVuelidate(v$.percentualServico.$errors)
            "
            v-model="estabelecimento.percentualServico"
            label="% Serviço"
          />
        </VCol>
      </VRow>
    </VCardText>

    <VCardActions>
      <div
        style="display: flex; justify-content: center; width: 100%; gap: 10px"
      >
        <VBtn
          style="min-width: 250px"
          variant="flat"
          color="primary"
          @click="salvar"
        >
          {{ textBtn }}
        </VBtn>
      </div>
    </VCardActions>
  </VCard>
</template>

<style scoped>
/* Vuetify will handle most styling, but you can add custom styles here if needed */
</style>
