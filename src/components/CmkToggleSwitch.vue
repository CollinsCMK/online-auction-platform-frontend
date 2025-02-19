<template>
    <label class="relative inline-flex cursor-pointer items-center">
        <input
            ref="inputRef"
            type="checkbox"
            v-model="inputComputed"
            class="peer sr-only"
            :id="id"
            @change="emitToggle"
        />

        <label :for="id" class="hidden"></label>

        <div class="peer h-6 w-11 rounded-full border bg-purple-600/20 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300 flex items-center justify-between">
            <div v-if="icons">
                <IoIosSunny v-if="!inputComputed" class="z-10 ml-[2px] text-orange-600"/>
                <IoIosMoon v-else class="z-10 mr-[2px] absolute right-0 text-black"/>
            </div>
        </div>
    </label>

    <span v-if="error" class="text-[#fa2702] text-[14px] font-semibold">{{ error }}</span>
</template>

<script setup>
    import { ref, toRefs, defineEmits, defineProps, onMounted, computed } from 'vue';
    import { IoIosMoon, IoIosSunny } from 'vue3-icons/io';
    
    const emit = defineEmits(['update:input','change']);

    const props = defineProps(['input','inputType','autoFocus','error','icons', 'id']);
    const { input, autoFocus, error, icons, id } = toRefs(props);

    const inputRef = ref(null);

    onMounted(() => {
        if(autoFocus.value) {
            inputRef.value.focus();
        }
    });

    const inputComputed = computed({
        get: () => input.value,
        set: (val) => emit('update:input', val)
    });

    const emitToggle = (event) => {
        const newValue = event.target.checked;
        emit('update:input', newValue);
        emit('change', newValue);
    }
</script>