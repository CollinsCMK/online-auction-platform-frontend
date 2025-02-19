<template>
    <div class="p-2 sm:p-4 dark:bg-gray-900 dark:text-white transition-colors duration-200">
        <div class="rounded-lg pb-2 shadow-[0px_0px_2px_1px_#aaa] backdrop-blur-xs bg-white/80 dark:bg-gray-900/80">
            <div class="w-full pb-5 px-2 sm:px-6">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex gap-2 items-center">
                        <div v-if="isRefresh">
                            <CmkButtonLoader v-if="isRefreshing" name="Refreshing" class="animate-pulse"/>
                            <CmkButton v-else type="button" @click="$emit('refresh')" class="flex items-center gap-2 border hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105"><IoIosRefresh class="animate-spin"/>Refresh</CmkButton>
                        </div>

                        <CmkButton v-if="isCreate" type="button" @click="$emit('create')" class="flex items-center gap-2 border hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105"><IoIosCreate class="animate-bounce"/>Create</CmkButton>
                    </div>

                    <div class="flex flex-col sm:flex-row justify-end gap-4 pr-0 sm:pr-5 my-5">
                        <CmkBrowseFile 
                            v-if="isImport"
                            accept=".csv"
                            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-800 text-white rounded-lg px-4 py-2 transition-all duration-300 transform hover:scale-105 font-bold cursor-pointer"
                            @file="handleFile"
                        ><FaFileImport class="animate-bounce"/>
                            Import
                        </CmkBrowseFile>

                        <CmkButton
                            class="w-full sm:w-auto bg-linear-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold transition-all duration-300 rounded-lg px-6 py-2.5 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
                            @click="openExportModal"
                            v-if="isExport"
                        >
                            <SiMicrosoftexcel class="animate-bounce"/>
                            Export
                        </CmkButton>

                        <div v-if="isSearch" class="relative w-full sm:w-80">
                            <CmkTextInput
                                placeholder="Search items..."
                                inputType="text" 
                                v-model:input="searchInput"
                                class="w-full transition-all duration-300 focus:scale-105"
                                myClass="dark:bg-gray-800/90! dark:text-white! dark:border-gray-600 focus:ring-4 focus:ring-green-500/50 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div class="w-full overflow-x-auto pb-5 relative rounded-lg border dark:border-gray-700">
                    <table class="w-full min-w-[640px] border-collapse bg-white/50 dark:bg-gray-900/50">
                        <thead>
                            <tr class="bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                                <th
                                    v-for="column in columns"
                                    :key="column.props.field || column.props.header"
                                    @click="sortByHeader(column.props.field)"
                                    class="text-start p-4 border-y dark:border-gray-700 text-nowrap cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                                    :class="{
                                        'sm:sticky left-0 z-10 sm:bg-white dark:sm:bg-gray-900': column.props.fixed === 'left',
                                        'sm:sticky right-0 z-10 sm:bg-white dark:sm:bg-gray-900': column.props.fixed === 'right'
                                    }"
                                    :style="{ width: column.props.width }"
                                >
                                    <div class="flex items-center gap-2">
                                        {{ column.props.header }}
                                        <div class="flex flex-col text-green-600 dark:text-green-400">
                                            <FaArrowUpShortWide v-if="sortedColumn === column.props.field && sortOrder === 'asc'"/>
                                            <FaArrowDownShortWide v-else-if="sortedColumn === column.props.field && sortOrder === 'desc'"/>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="isRefreshing">
                            <tr>
                                <td :colspan="columns.length" class="py-20 border-b dark:border-gray-700">
                                    <div class="w-full flex items-center justify-center">
                                        <CmkLoader class="w-12 h-12" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else-if="handleSearch(paginatedItems).length > 0">
                            <tr
                                v-for="(item, index) in handleSearch(paginatedItems)"
                                :key="index"
                                class="even:bg-gray-50/80 dark:even:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                            >
                                <td
                                    v-for="column in columns"
                                    :key="column.props.field || column.props.header"
                                    class="text-start p-4 border-b dark:border-gray-700 text-nowrap text-sm sm:text-base"
                                    :class="{
                                        'sm:sticky left-0 z-10 sm:bg-white dark:sm:bg-gray-900 sm:even:bg-gray-50 dark:sm:even:bg-gray-800': column.props.fixed === 'left',
                                        'sm:sticky right-0 z-10 sm:bg-white dark:sm:bg-gray-900 sm:even:bg-gray-50 dark:sm:even:bg-gray-800': column.props.fixed === 'right'
                                    }"
                                    :style="{ width: column.props.width }"
                                >
                                    <template v-if="column.props.field">
                                        {{ item[column.props.field] }}
                                    </template>
                                    <component
                                        v-else
                                        :is="column.children.default"
                                        v-bind="{ item }"
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td
                                    :colspan="columns.length"
                                    class="py-20 border-b dark:border-gray-700"
                                >
                                    <div class="w-full flex items-center justify-center">
                                        <p class="text-gray-500 dark:text-gray-400 text-lg">No data available</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="isTableFooter" class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div class="hidden sm:block">
                    <p class="text-gray-600 dark:text-gray-400 font-medium">Total Records: {{ handleSearch(items).length }}</p>
                </div>

                <div class="flex items-center gap-4">
                    <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                        :class="
                            currentPage === 1
                                ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-500'
                                : 'cursor-pointer bg-linear-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white'
                        "
                    >
                        <FaAngleLeft />
                    </button>

                    <span class="text-gray-700 dark:text-gray-300 font-medium">Page {{ currentPage }} of {{ totalPages }}</span>

                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                        :class="
                            currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-500'
                                : 'cursor-pointer bg-linear-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white'
                        "
                    >
                        <FaAngleRight />
                    </button>
                </div>

                <div class="relative hidden sm:block">
                    <p
                        @click="openNumberPage"
                        class="w-12 h-12 border dark:border-gray-700 rounded-lg text-center flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                        {{ itemsPerPage }}
                    </p>

                    <div
                        ref="numberPageRef"
                        v-if="isNumberPage"
                        class="absolute bottom-14 z-10 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl rounded-lg overflow-hidden border dark:border-gray-700"
                    >
                        <p
                            v-for="num in [5, 10, 20, 50]"
                            :key="num"
                            @click="itemsPerPage = num"
                            class="px-8 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                        >
                            {{ num }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <CmkModal v-if="isExportModal" myClass="w-full sm:w-1/3 p-8 dark:bg-gray-800 rounded-xl">
        <h1 class="font-bold text-xl sm:text-2xl mb-8 dark:text-white text-center">Export Data</h1>

        <form
            @submit.prevent="exportToCSV(items, exportableItems, `${fileName}.xlsx`)"
            class="px-2 sm:px-6"
        >
            <div class="flex flex-col mb-6">
                <CmkTextInput
                    placeholder="Enter file name"
                    inputType="text"
                    v-model:input="fileName"
                    class="w-full"
                    myClass="dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-500/50"
                />
            </div>

            <div class="flex justify-end gap-4">
                <CmkButton
                    @click="closeExportModal"
                    type="button"
                    class="border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    Cancel
                </CmkButton>

                <CmkButton
                    class="bg-linear-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold cursor-pointer px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    type="submit"
                >
                    <SiMicrosoftexcel class="animate-bounce"/>
                    Export
                </CmkButton>
            </div>
        </form>
    </CmkModal>
</template>

<script setup lang="ts">
    import { useSlots, ref, toRefs, computed, useTemplateRef, provide } from 'vue';
    import { FaAngleLeft, FaAngleRight, FaArrowUpShortWide, FaArrowDownShortWide } from "vue3-icons/fa6";
    import { onClickOutside } from "@vueuse/core";
    import { SiMicrosoftexcel } from "vue3-icons/si";
    import { IoIosRefresh, IoIosCreate } from "vue3-icons/io";
    import { FaFileImport } from "vue3-icons/fa";
    import CmkButtonLoader from "./CmkButtonLoader.vue";
    import CmkButton from "./CmkButton.vue";
    import CmkTextInput from "./CmkTextInput.vue";
    import CmkLoader from "./CmkLoader.vue";
    import CmkBrowseFile from "./CmkBrowseFile.vue";

    const emit = defineEmits(['refresh','create','file']);
    const props = defineProps({
        items: {
            type: Array,
            required: true,
        },
        exportableItems: {
            type: Array,
        },
        searchableItems: {
            type: Array,
        },
        isRefreshing: {
        type: Boolean,
        required: true
        },
        isCreate: {
        type: Boolean,
        required: true
        },
        isImport: {
        type: Boolean,
        required: true
        },
        isRefresh: {
        type: Boolean,
        default: true
        },
        isExport: {
        type: Boolean,
        default: true
        },
        isSearch: {
        type: Boolean,
        default: true
        },
        isTableFooter: {
        type: Boolean,
        default: true
        },
    });

    const { items, exportableItems, searchableItems, isRefreshing, isCreate, isImport, isRefresh, isExport, isSearch, isTableFooter } = toRefs(props);
    const slots = useSlots();
    const columns = slots.default();
    let sortedColumn = ref("");
    let sortOrder = ref("");
    let searchInput = ref("");
    const isNumberPage = ref(false);
    const numberPageRef = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const isExportModal = ref(false);
    const fileName = ref("");
    const originalItems = ref([...props.items]); // Store original order

    const sortByHeader = (field) => {
        if (sortedColumn.value === field) {
            if (sortOrder.value === "asc") {
                sortOrder.value = "desc";
            } else if (sortOrder.value === "desc") {
                sortOrder.value = "";
                sortedColumn.value = "";
                items.value = [...originalItems.value]; // Reset to original order
                return;
            }
        } else {
            sortedColumn.value = field;
            sortOrder.value = "asc";
        }

        if (sortOrder.value) {
            items.value.sort((a, b) => {
                const modifier = sortOrder.value === "asc" ? 1 : -1;
                if (typeof a[field] === "string" && typeof b[field] === "string") {
                    return a[field].localeCompare(b[field]) * modifier;
                } else {
                    return (a[field] - b[field]) * modifier;
                }
            });
        }
    };

    const handleSearch = (items) => {
        if (searchableItems.value) {
            return items.filter((item) =>
                searchableItems.value.some((key) =>
                    JSON.stringify(item[key])
                        .toLowerCase()
                        .includes(searchInput.value.toString().toLowerCase()),
                ),
            );
        } else {
            return items;
        }
    };

    const totalPages = computed(() => {
        const pages = Math.ceil(
            handleSearch(items.value).length / itemsPerPage.value,
        );
        return pages > 0 ? pages : 1;
    });

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return items.value.slice(start, end);
    });

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value += 1;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value -= 1;
        }
    };

    const openNumberPage = () => {
        isNumberPage.value = !isNumberPage.value;
    };

    onClickOutside(numberPageRef, (event) => {
        isNumberPage.value = false;
    });

    const exportToCSV = (array, keys, filename = "data.xlsx") => {
        const myItems = [];

        columns.forEach((item) => {
            myItems.push(item.props.field);
        });

        const headers = columns
            .filter((item) => keys.includes(item.props.field))
            .map((item) => item.props.header);

        const csvContent = [
            headers.join(","),
            ...array.map((row) => {
                return keys
                    .map((key) => {
                        const value = row[key];
                        if (Array.isArray(value)) {
                            return `"${value.join(", ")}"`;
                        }
                        return value;
                    })
                    .join(",");
            }),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeExportModal();
    };

    const openExportModal = () => {
        isExportModal.value = true;
    };

    const closeExportModal = () => {
        isExportModal.value = false;
    };

    const handleFile = (file) => {
        emit('file', file);
    };

    provide("closeDeleteModal", closeExportModal);
</script>