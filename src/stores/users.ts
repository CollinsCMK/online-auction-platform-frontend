import { defineStore } from 'pinia'
import { useAxios } from '../composables/axios'

const $axios = useAxios().axios

interface Data {
  [key: string]: string | Blob | number
}

export const userUserStore = defineStore(
  'users',
  () => {
    const createUser = async (data: Data) => {
      return await $axios.post('/api/user/create', data)
    }

    const getUserPhoneNumber = async (phone_number: string) => {
      return await $axios.get(`/api/user/get/${phone_number}`)
    }

    const getAllUsers = async () => {
      return await $axios.get('/api/users/get')
    }

    const deleteUser = async (id: number) => {
      return await $axios.delete(`/api/user/delete/${id}`)
    }

    return {
      createUser,
      getUserPhoneNumber,
      getAllUsers,
      deleteUser,
    }
  },
  {
    persist: true,
  },
)
