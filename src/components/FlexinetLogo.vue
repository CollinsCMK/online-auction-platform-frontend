<template>
    <RouterLink to="/" class="bg-gray-200 rounded-md p-2">
        <img :src="src" :alt="alt">
    </RouterLink>
</template>

<script setup lang="ts">
    import { toRefs } from 'vue';

    const props = defineProps({
        src: {
            type: String,
            default: "",
        },
        alt: {
            type: String,
            default: "Company logo goes here"
        }
    });

    const { src, alt } = toRefs(props);
</script>