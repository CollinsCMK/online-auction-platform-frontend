import { defineStore } from 'pinia'
import { useAxios } from '../composables/axios'

const $axios = useAxios().axios

interface Data {
  [key: string]: string | Blob | number
}

export const useAuctionStore = defineStore(
  'auction',
  () => {
    const createAuction = async (data: Data) => {
      return await $axios.post('/api/auction/create', data)
    }

    const updateAuction = async (id: number, data: Data) => {
      return await $axios.put(`/api/auction/update/${id}`, data)
    }

    const getAllAuctions = async () => {
      return await $axios.get('/api/auctions/get')
    }

    const deleteAuction = async (id: number) => {
      return await $axios.delete(`/api/auction/delete/${id}`)
    }

    return {
      createAuction,
      updateAuction,
      getAllAuctions,
      deleteAuction,
    }
  },
  {
    persist: true,
  },
)
