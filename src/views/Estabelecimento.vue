<script setup lang="ts">
import { required, email, sameAs } from "@/i18n/i18n-validators";
import { useVuelidate } from "@vuelidate/core";
import EstabelecimentoService from "@/application/services/EstabelecimentoService";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

import * as erroUtils from "@/utils/erroUitls";
import type { Estabelecimento } from "@/types/estabelecimento/Estabelecimento";

const $toast = useToast();

const estabelecimento = ref<Estabelecimento>({
  nome:"",
  cnpj: "",
  cep: "",
  uf: "",
  percentualServico: 0,
  municipio: "",
  telefone: "",
  endereco: "",
  enteId: 0,
  cpfResponsavel: "",
  nomeResponsavel: "",
  email:"",
  senha:""
});

const usuario = ref({
  email: "",
  senha: "",
  confirmarSenha: "",
});

const emit = defineEmits(["success", "onError"]);

const rules = {
  nome: { required },
  cnpj: { required },
  cep: { required },
  uf: { required },
  percentualServico: { required },
  municipio: { required },
  telefone: { required },
  endereco: { required },
  nomeResponsavel: { required },
};

const usuarioRules = {
  email: { required, email },
  senha: { required },
  confirmarSenha: { 
    required, 
    sameAs: sameAs(computed(() => usuario.value.senha)) 
  },
};

const v$ = useVuelidate(rules, estabelecimento);
const usuarioV$ = useVuelidate(usuarioRules, usuario);

const tab = ref('estabelecimento');

const showPassword = ref(false);
const showConfirmPassword = ref(false);

async function salvar() {
  v$.value.$touch();
  usuarioV$.value.$touch();
  
  if (v$.value.$errors.length === 0 && usuarioV$.value.$errors.length === 0) {
    try {
      // Combine estabelecimento and usuario data before saving
      const dadosCompletos = {
        ...estabelecimento.value,
        ...usuario.value
      };
      
      await EstabelecimentoService.save(dadosCompletos);
      
      emit("success");
      $toast.success("Estabelecimento e usuário salvos com sucesso!");
    } catch (e) {
      $toast.error(erroUtils.getErrorMessage(e));
      emit("onError", e);
    }
  }
}

onMounted(() => {});
</script>

<template>
  <VCard height="100%" class="scrollable-card">
    <VToolbar prominent color="primary" dark title="Novo cadastro">
    </VToolbar>

    <VCardText class="scrollable-content">
      <VTabs 
        v-model="tab" 
        bg-color="primary" 
        color="white" 
        grow 
        show-arrows
        align-tabs="center"
      >
        <VTab value="estabelecimento">
          <VIcon start icon="mdi-store" />
          Dados do Estabelecimento
        </VTab>
        <VTab value="usuario">
          <VIcon start icon="mdi-account" />
          Dados do Usuário
        </VTab>
      </VTabs>
      <VWindow v-model="tab" class="form-content">
        <VWindowItem value="estabelecimento">
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
        </VWindowItem>

        <VWindowItem value="usuario">
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
          
                v-model="estabelecimento.cpfResponsavel"
                label="CPF do Responsável"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol md="12" cols="12">
              <VTextField
                bg-color="#f0f0f0"
                variant="outlined"
                placeholder="Email"
                :error-messages="
                  erroUtils.getErrosVuelidate(usuarioV$.email.$errors)
                "
                v-model="usuario.email"
                label="Email"
                type="email"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol md="6" cols="12">
              <VTextField
                bg-color="#f0f0f0"
                variant="outlined"
                placeholder="Senha"
                v-model="usuario.senha"
                label="Senha"
                :error-messages="
                  erroUtils.getErrosVuelidate(usuarioV$.senha.$errors)
                "
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
              />
            </VCol>
            <VCol md="6" cols="12">
              <VTextField
                bg-color="#f0f0f0"
                variant="outlined"
                placeholder="Confirmar Senha"
                v-model="usuario.confirmarSenha"
                label="Confirmar Senha"
                :error-messages="
                  erroUtils.getErrosVuelidate(usuarioV$.confirmarSenha.$errors)
                "
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
              />
            </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VCardActions class="sticky-actions">
      <div
        style="display: flex; justify-content: center; width: 100%; gap: 10px"
      >
        <VBtn
          style="min-width: 250px"
          variant="flat"
          color="primary"
          @click="salvar"
        >
          Salvar
        </VBtn>
      </div>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.v-tabs {
  margin-bottom: 20px;
}

.v-tab {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 0.8;
}

.v-tab:hover {
  opacity: 1;
  background-color: rgba(var(--v-theme-primary), 0.9);
}

.v-tab.v-tab--selected {
  opacity: 1;
  font-weight: bold;
  background-color: rgba(var(--v-theme-primary), 1);
  color: white !important;
}

.v-tab::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.v-tab.v-tab--selected::before {
  background-color: white;
}

.scrollable-card {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}

.sticky-actions {
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.form-content {
  padding: 10px;
}

/* Custom Scrollbar Styling */
.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.7);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.9);
}
</style>
