<template>
    <button 
        class="border rounded-md cursor-pointer flex items-center justify-center p-2" 
        @click="getImage"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @dragenter.prevent
        type="button"
    >
        <input ref="posterImage" type="file" :accept="accept" :multiple="multiple" name="" id="" class="hidden" @input="handleChangeImage">

        <slot/>
    </button>
</template>

<script setup lang="ts">
    import { useTemplateRef } from 'vue';

    const emit = defineEmits(['file']);

    defineProps({
        name: String,
        accept: {
            type: String,
            default: '.jpeg,.png,.jpg',
        },
        multiple: {
            type: Boolean,
            default: false
        }
    });

    const posterImage = useTemplateRef<HTMLInputElement | null>('posterImage');

    const getImage = () => {
        if(posterImage.value) {
            posterImage.value.click();
        }
    };

    const handleChangeImage = () => {
      if (posterImage.value && posterImage.value.files) {
        if (posterImage.value.files.length > 1) {
            Array.from(posterImage.value.files).forEach(file => {
                emit('file', { file: file, blob: URL.createObjectURL(file) });
            });
        } else {
            emit('file', { file: posterImage.value.files[0], blob: URL.createObjectURL(posterImage.value.files[0]) });
        }
      } 
    };

    const handleDrop = (event: DragEvent) => {
        const droppedFiles = event.dataTransfer?.files;
        if (droppedFiles?.length) {
            if (droppedFiles.length > 1) {
                Array.from(droppedFiles).forEach(file => {
                    emit('file', { file: file, blob: URL.createObjectURL(file) });
                });
            } else {
                emit('file', { file: droppedFiles[0], blob: URL.createObjectURL(droppedFiles[0]) });
            }
        }
    };
</script>