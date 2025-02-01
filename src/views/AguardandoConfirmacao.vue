<script setup lang="ts">
import { ref } from 'vue';
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
              color="primary" 
              size="x-large" 
              class="mb-4"
            >
              mdi-email-check
            </VIcon>
            
            <VCardTitle class="text-h5 mb-3">
              E-mail de Confirmação Enviado
            </VCardTitle>
            
            <VCardText>
              <p class="text-body-1 mb-4">
                Enviamos um e-mail para você com um link de confirmação. 
                Por favor, verifique sua caixa de entrada (e também a pasta de spam).
              </p>
              
              <p class="text-body-2 text-medium-emphasis">
                Clique no link recebido para confirmar seu cadastro.
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