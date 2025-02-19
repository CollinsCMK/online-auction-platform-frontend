<template>
    <div class="fixed top-5 right-5 flex flex-col gap-3 z-1000 w-80">
        <div v-for="(toast, index) in toasts" :key="index" :class="`p-2 rounded-md text-white toast-${toast.severity}`">
            <div class="flex justify-between items-center">
                <strong>{{ toast.summary }}</strong>
                <IoIosClose @click="closeToast(index)" class="text-3xl hover:bg-gray-300/[.5] rounded-full mb-2"/>
            </div>
            <p>{{ toast.detail }}</p>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
    import { IoIosClose } from 'vue3-icons/io';
    import { useToastStore } from '../stores/toast';

    const { toasts, closeToast } = useToastStore();
</script>
  
<style scoped>
    .toast-error {
        background-color: rgba(231, 76, 60, 0.8);
    }
    .toast-success {
        background-color: rgba(46, 204, 113, 0.8);
    }
    .toast-warn {
        background-color: rgba(255, 165, 0, 0.8);
    }
</style>