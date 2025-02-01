<script lang="ts" setup>
import type { NavSectionTitle } from "@/types/layout";
import { useRoute } from "vue-router";

const route = useRoute();

defineProps<{
  item: NavSectionTitle;
}>();

function isActualPath(value: string) {
  const routeName = route.name;

  return routeName == value;
}
</script>

<template>
  <div class="title-container">
    <h2>Cadastro</h2>
  </div>
  <div class="menu">
    <RouterLink
      to="/"
      style="text-decoration: none"
      :class="['menu-item', { selected: isActualPath('estabelecimento') }]"
    >
      <span class="icon">📝</span>
      <span>Novo Cadastro</span>
    </RouterLink>
  </div>
</template>

<style>
.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.title-container:not(:first-child) {
  margin-top: 10px;
}
.title-container h2 {
  text-transform: uppercase;
  margin: 0 10px;
  font-size: 16px;
  font-weight: normal;
  color: #9e9e9e;
}

.title-container::before,
.title-container::after {
  content: "";
  height: 1px;
  background-color: #9e9e9e;
}

.title-container::before {
  flex-grow: 1;
  margin-right: 1px;
}

.title-container::after {
  flex-grow: 3;
  margin-left: 1px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  color: #4a4a4a;
  transition: background 0.3s;
}

.menu-item .icon {
  margin-right: 10px;
}

.menu-item:hover {
  background: #e0e0e0;
}

.menu-item.selected {
  background: linear-gradient(90deg, #8e2de2, #4a00e0);
  color: white;
}
</style>
