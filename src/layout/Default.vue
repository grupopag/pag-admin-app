<script setup lang="ts">
// import UserProfile from "@/components/layout/UserProfile.vue";
import VerticalNavSectionTitle from "@/components/layout/VerticalNavSectionTitle.vue";
import { ref } from "vue";
// import { AuthService } from "@/application/AuthService";

// import { onBeforeMount, ref } from "vue";
// import TokenUtils from "@/utils/TokenUtils";

const drawer = ref(true);

// onBeforeMount(() => {
//   if (!TokenUtils.getToken()) {
//     AuthService.solicitarLogin();
//   }
// });
</script>

<template>
  <v-layout style="margin: 0; padding: 0">
    <v-app-bar
      style="
        padding-right: 15px;
        background-color: #f4f5fa;
        border: none;
        z-index: 1;
      "
      elevation="0"
    >
      <template v-slot:prepend v-if="$vuetify.display.mobile">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <template #title>
        <h1 class="app-logo-title">Pag! Admin</h1>
      </template>

      <UserProfile />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="undefined"
      :temporary="$vuetify.display.mobile"
      style="background-color: #f4f5fa; border: none"
    >
      <v-list>
        <v-list-item>
          <VerticalNavSectionTitle
            :item="{
              heading: 'Menu Principal',
            }"
          />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="width: 100%; margin: 0; padding-top: 65px; height: 100vh">
      <router-view />
    </v-main>
  </v-layout>
</template>
<style scoped>
.app-logo-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.75rem;
  text-transform: uppercase;
  color: rgb(143, 130, 130);
}
</style>
