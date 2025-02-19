import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean | null>(null);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  const initializeTheme = () => {
    if (isDark.value === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark.value = prefersDark;
      document.documentElement.classList.toggle('dark', isDark.value);
    } else {
      document.documentElement.classList.toggle('dark', isDark.value);
    }
  };

  return {
    isDark, toggleTheme, initializeTheme
  }
}, {
  persist: true
})
