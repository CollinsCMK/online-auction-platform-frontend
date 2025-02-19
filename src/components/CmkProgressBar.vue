<template>
    <div class="mb-10">
        <div class="relative w-full max-w-3xl mx-auto">
            <div class="absolute top-4 w-full h-0.5 bg-gray-200">
                <div 
                    class="absolute h-0.5 bg-blue-600 transition-all duration-300"
                    :style="{
                        width: getProgressWidth
                    }"
                />
            </div>

            <div class="relative flex justify-between">
                <div v-for="(step, index) in steps" :key="step.id" class="flex flex-col items-center">
                    <div 
                        @click="changeTab(step.id)"
                        class="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 cursor-pointer"
                        :class="[
                            isCompleted(index) || isCurrent(index) ? 'bg-blue-600' : 'bg-gray-200',
                            index >= getCurrentStep ? 'bg-gray-200' : ''
                        ]"
                    >
                        <div class="w-3 h-3 rounded-full"
                            :class="[
                                isCompleted(index) || isCurrent(index) ? 'bg-white' : 'bg-gray-400'
                            ]"
                        />
                    </div>
                    <span class="text-sm font-medium"
                        :class="[
                            isCompleted(index) || isCurrent(index) ? 'text-blue-600' : 'text-gray-400'
                        ]"
                    >
                        {{ step.label }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, toRefs, watch } from 'vue';

    interface Step {
        id: string;
        label: string;
    }

    const emit = defineEmits(['changeTab']);

    const props = defineProps({
        steps: {
            required: true,
            type: Array as () => Step[]
        },
        currentTab: {
            type: String
        }
    });

    const { steps, currentTab } = toRefs(props);

    const activeTab = ref(currentTab?.value || steps.value[0].id);

    watch(currentTab, (newVal) => {
        if (newVal) {
            activeTab.value = newVal;
        }
    });

    const changeTab = (tab: string) => {
        activeTab.value = tab;
        emit('changeTab', tab);
    };

    const getCurrentStep = computed(() => {
        return steps.value.findIndex((step: Step) => step.id === activeTab.value) + 1;
    });

    const getProgressWidth = computed(() => {
        return `${(100 * (getCurrentStep.value - 1)) / (steps.value.length - 1)}%`;
    });

    const isCompleted = (index: number) => index < getCurrentStep.value - 1;
    const isCurrent = (index: number) => index === getCurrentStep.value - 1;
</script>