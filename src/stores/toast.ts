import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Toast {
    summary: String,
    detail: String,
    severity: String,
    life?: number
};

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([]);

    const closeToast = (index: number) => {
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    }

    const add = ({ summary, detail, severity, life = 5000}: Toast) => {
        const toast: Toast = { summary, detail, severity };

        toasts.value.push(toast);

        setTimeout(() => {
            const index = toasts.value.indexOf(toast);
            if (index !== -1) {
                toasts.value.splice(index, 1);
            }
        }, life);
    }

    return { add, closeToast, toasts };
});
