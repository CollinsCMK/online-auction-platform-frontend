<template>
    <CmkToast/>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-screen p-2">
        <div class="flex flex-col items-center justify-center h-full px-4">
            <slot/>
        </div>

        <div class="relative bg-purple-600 rounded-lg hidden md:block h-full">
            <img src="../../assets/images/pattern-lines.svg" alt="Pattern Lines" class="w-full h-full object-cover"/>

            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
                <img src="../../assets/images/rocket-white.png" alt="" class="max-w-[200px] mx-auto mb-4">

                <div class="text-white text-center">
                    <p class="mb-4 font-bold text-lg md:text-xl">"Attention is the new currency"</p>
                    <p class="text-sm md:text-base">The more effortless the writing looks, the more effort the writer has invested.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import CmkToast from '../CmkToast.vue';
</script>