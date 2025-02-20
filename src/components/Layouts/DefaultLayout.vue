<template>
  <CmkToast />

  <div
    class="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 flex flex-col text-sm min-h-screen transition-colors duration-300"
  >
    <header class="sticky top-0 w-full z-50 backdrop-blur-xs">
      <div
        class="py-3 px-2 md:px-6 flex gap-2 md:gap-4 items-center justify-between bg-linear-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white shadow-lg"
      >
        <FlexinetLogo class="w-24! md:w-32! transition-transform hover:scale-110 hover:rotate-2" />

        <div class="flex items-center gap-4 md:gap-8">
          <div class="relative">
            <div
              @click="openNotificationModal"
              class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              title="Notifications"
            >
              <IoNotifications class="text-xl md:text-2xl hover:animate-bounce" />
            </div>

            <CmkCard
              ref="notificationModal"
              v-if="isNotificationModal"
              class="fixed! top-2! bottom-44! sm:bottom-2! right-2! w-72 sm:w-96 shadow-2xl animate-fadeIn bg-white/90 backdrop-blur-xs dark:bg-gray-900/90 rounded-xl"
            >
              <h6 class="p-3 font-bold text-lg dark:text-white">Notifications</h6>

              <CmkHr class="mb-2" />

              <div
                class="flex flex-col justify-center items-center h-96 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-xl"
              >
                <img
                  src="../../assets/images/booking-notification-empty-state.png"
                  alt="Empty Notifications"
                  class="w-32 md:w-44 opacity-70 transition-all duration-500 hover:opacity-100 hover:scale-110"
                />
                <p class="mt-4 text-gray-600 dark:text-gray-400">No new notifications</p>
              </div>
            </CmkCard>
          </div>

          <div @click="openUserModal" class="relative">
            <div
              class="flex items-center gap-2 md:gap-4 bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-900 rounded-lg px-3 md:px-4 py-2 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              <p
                class="bg-white dark:bg-gray-200 text-purple-700 rounded-full p-1.5 md:p-2 text-xs md:text-sm font-bold shadow-inner"
              >
                CK
              </p>

              <div class="text-xs md:text-sm hidden lg:block">
                <p class="font-bold truncate max-w-[120px]">Collins Kariuki</p>
              </div>
            </div>

            <CmkCard
              ref="userModal"
              v-if="isUserModal"
              class="fixed! right-2 top-16 p-4 w-[280px] md:w-[320px] max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl animate-slideIn bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs rounded-xl"
            >
              <div class="flex items-center gap-4">
                <p
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-purple-700 text-white text-lg font-bold shadow-lg"
                >
                  C
                </p>

                <div class="flex-1 min-w-0">
                  <p class="font-bold text-purple-700 dark:text-purple-400 truncate">
                    Collins Kariuki
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                    collinskariuki555@gmail.com
                  </p>
                </div>
              </div>

              <CmkHr class="my-4" />

              <RouterLink
                to="/profile"
                class="block w-full text-center py-2 px-4 mb-3 rounded-lg transition-all duration-300 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 font-medium"
              >
                Profile
              </RouterLink>

              <div
                class="flex justify-between items-center gap-2 mb-4 p-3 rounded-lg transition-all duration-300 bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-900"
              >
                <div class="flex items-center gap-2">
                  <VscColorMode class="text-xl text-gray-700 dark:text-gray-300" />
                  <p class="font-medium dark:text-white">Dark Mode</p>
                </div>

                <CmkToggleSwitch v-model:input="theme.isDark" @change="toggleTheme" />
              </div>
            </CmkCard>
          </div>
        </div>
      </div>
    </header>

    <section class="flex gap-8 flex-1">
      <nav
        class="fixed top-[64px] bottom-0 bg-white dark:bg-gray-900 w-64 shadow-lg backdrop-blur-xs flex flex-col border-r border-gray-200 dark:border-gray-700 z-30 transition-transform duration-300 lg:translate-x-0"
        :class="{ 'translate-x-[-100%]': !isSidebarOpen }"
      >
        <div class="flex-1 p-6 overflow-y-auto">
          <RouterLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mb-2 group"
          >
            <RiDashboard3Fill
              class="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">Dashboard</span>
          </RouterLink>

          <RouterLink
            to="/admin/auctions"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mb-2 group"
          >
            <RiAuctionFill
              class="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">Auctions</span>
          </RouterLink>

          <RouterLink
            to="/admin/listings"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mb-2 group"
          >
            <FaList
              class="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">All Listings</span>
          </RouterLink>

          <RouterLink
            to="/admin/bids"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mb-2 group"
          >
            <BiDollar
              class="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">All Bids</span>
          </RouterLink>

          <RouterLink
            to="/admin/auction-result"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mb-2 group"
          >
            <RiAuctionFill
              class="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">Auction Result</span>
          </RouterLink>

          <RouterLink
            to="/admin/users"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mb-2 group"
          >
            <FaUser
              class="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">Users</span>
          </RouterLink>
        </div>

        <div
          class="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 m-4 rounded-2xl text-center p-4 text-sm shadow-inner"
        >
          <p class="text-gray-600 dark:text-gray-400">Developed and Maintained by:</p>
          <p
            class="my-2 font-bold text-xl bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
          >
            Cmk
          </p>
          <p class="text-gray-500 dark:text-gray-500">Version 0.0.1</p>
        </div>
      </nav>

      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed top-0 bottom-0 right-0 left-0 bg-black/[.5] z-20 block lg:hidden"
      ></div>

      <div class="flex-1 ml-0 lg:ml-64 flex flex-col min-h-[calc(100vh-64px)] overflow-x-hidden">
        <main class="flex-1 overflow-y-auto p-4 md:p-8 animate-(--animate-zoom-in) mb-4">
          <div v-if="route.path !== '/'">
            <div class="flex items-center gap-3 mb-6">
              <RouterLink to="/">
                <FaHome class="text-2xl text-blue-600 dark:text-blue-400" />
              </RouterLink>
              <FaChevronRight class="text-xl text-gray-400 dark:text-gray-600" />
              <RouterLink
                :to="route.path"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{
                  route.name
                    ?.toString()
                    .split('-')
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(' ')
                }}
              </RouterLink>
            </div>

            <h1
              class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            >
              {{
                route.name
                  ?.toString()
                  .split('-')
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(' ')
              }}
            </h1>

            <CmkHr
              class="h-[2px] my-6 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"
            />
          </div>

          <slot />
        </main>

        <footer
          class="mt-auto text-gray-500 dark:text-gray-400 py-2 px-4 md:px-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur-xs fixed bottom-0 w-full"
        >
          <p>&copy; {{ currentYear }} by CMK</p>
        </footer>
      </div>
    </section>
  </div>

  <div
    v-if="isNotificationModal || isUserModal"
    class="fixed inset-0 z-40 bg-black/5 dark:bg-black/20 backdrop-blur-xs"
  ></div>

  <div
    @click="isSidebarOpen = !isSidebarOpen"
    class="fixed bottom-4 right-2 bg-gray-200 dark:bg-gray-900 rounded-full text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 p-1 cursor-pointer transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 lg:hidden"
  >
    <FaBars class="text-2xl" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { RiDashboard3Fill } from 'vue3-icons/ri'
import CmkToast from '../CmkToast.vue'
import FlexinetLogo from '../FlexinetLogo.vue'
import CmkHr from '../CmkHr.vue'
import CmkCard from '../CmkCard.vue'
import CmkToggleSwitch from '../CmkToggleSwitch.vue'
import { useThemeStore } from '../../stores/theme'
import { onClickOutside } from '@vueuse/core'
import { FaBars, FaListUl, FaHome, FaChevronRight, FaUser, FaList } from 'vue3-icons/fa'
import { VscColorMode } from 'vue3-icons/vsc'
import { IoNotifications } from 'vue3-icons/io5'
import { RiAuctionFill } from 'vue3-icons/ri'
import { BiDollar } from 'vue3-icons/bi'

const route = useRoute()
const currentYear = computed(() => new Date().getFullYear())
const theme = useThemeStore()
const notificationModalRef = useTemplateRef('notificationModal')
const userModalRef = useTemplateRef('userModal')
const isPasswordModal = ref(false)
const isNotificationModal = ref(false)
const isUserModal = ref(false)
const isSidebarOpen = ref(true)

const openNotificationModal = () => {
  isNotificationModal.value = true
}

const closeNotificationModal = () => {
  isNotificationModal.value = false
}

const openUserModal = () => {
  isUserModal.value = true
}

const closeUserModal = () => {
  isUserModal.value = false
}

const toggleTheme = (value: boolean) => {
  theme.isDark = value
  document.documentElement.classList.toggle('dark', theme.isDark)
}

onClickOutside(userModalRef as any, () => {
  if (!isPasswordModal.value) closeUserModal()
})

onClickOutside(notificationModalRef as any, () => {
  closeNotificationModal()
})
</script>
