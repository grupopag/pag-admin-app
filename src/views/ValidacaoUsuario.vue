<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TokenService from '@/application/services/TokenService';

const route = useRoute();
const router = useRouter();

const tokenStatus = ref<'validando' | 'valido' | 'expirado' | 'erro'>('validando');

async function verificarToken() {
  const token = route.query.token as string;

  try {

    TokenService.validarEmail({ token }).then((data) => {
      if(data){
        tokenStatus.value = 'valido';
      }else{
        tokenStatus.value = 'expirado';
      }
    });
  } catch (error) {

    tokenStatus.value = 'erro';
  }
}

onMounted(() => {
  verificarToken();
});
</script>

<template>
  <VContainer fluid fill-height>
    <VRow align="center" justify="center">
      <VCol cols="12" sm="10" md="6" lg="5">
        <VCard 
          elevation="2"
          class="pa-6 text-center"
        >
          <VCardItem>
            <VIcon 
              :color="tokenStatus === 'valido' ? 'success' : 'error'" 
              size="x-large" 
              class="mb-4"
            >
              {{ tokenStatus === 'valido' ? 'mdi-check-circle' : 'mdi-alert-circle' }}
            </VIcon>
            
            <VCardTitle class="text-h5 mb-3">
              {{ tokenStatus === 'validando' ? 'Verificando Token...' : 
                 tokenStatus === 'valido' ? 'E-mail Confirmado' : 
                 tokenStatus === 'expirado' ? 'Token Expirado' : 
                 'Erro na Verificação' }}
            </VCardTitle>
            
            <VCardText v-if="tokenStatus === 'validando'">
              <VProgressCircular 
                indeterminate 
                color="primary"
              ></VProgressCircular>
            </VCardText>
            
            <VCardText v-else>
              <p class="text-body-1 mb-4">
                {{ 
                  tokenStatus === 'valido' ? 'Seu e-mail foi confirmado com sucesso!' : 
                  tokenStatus === 'expirado' ? 'O link de confirmação expirou.' : 
                  'Ocorreu um erro ao verificar o token.' 
                }}
              </p>
            </VCardText>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>