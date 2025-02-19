<template>
  <FlexCard class="h-full">
    <div class="w-full h-full flex items-center justify-center">
      <div class="shadow-[0px_0px_2px_1px_#aaa] rounded-xs p-4">
        <div class="loader"></div>
      </div>
    </div>
  </FlexCard>
</template>

<script setup lang="ts">
import FlexCard from './FlexCard.vue'
</script>

<style scoped>
.loader {
  width: 100px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #673ab7;
  animation: l15 1s infinite linear;
}
.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
