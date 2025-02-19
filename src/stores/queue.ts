import { defineStore } from 'pinia';
import { useAxios } from '../composables/axios';
import { ref } from 'vue';

const $axios = useAxios().axios;

interface Data {
    [key: string]: string | Blob | number;
}

export const useQueueStore = defineStore('queue', () => {
    const currentNumber = ref(null);

    return {
        currentNumber,
    };
}, {
    persist: true
});