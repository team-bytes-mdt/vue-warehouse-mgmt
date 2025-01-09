import { defineStore } from 'pinia'
import axios from 'axios'
export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchOrders() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:8080/api/order')
        console.log(JSON.stringify(response.data))
        this.orders = response.data
      } catch (err) {
        this.error = 'Failed to fetch orders.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async addOrder(newOrder) {
      this.isLoading = true
      this.error = null
      try {
        delete newOrder.orderId
        const response = await axios.post('http://localhost:8080/api/order', newOrder)

        this.orders.push(response.data)
      } catch (err) {
        this.error = 'Failed to add order.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async updateOrder(orderId, updatedOrder) {
      this.isLoading = true
      this.error = null
      try {
        delete updatedOrder.orderId;
        delete updatedOrder.createdAt;
        const response = await axios.put(`http://localhost:8080/api/order/${orderId}`, updatedOrder)
        const index = this.orders.findIndex((order) => order.orderId === orderId)
        if (index !== -1) {
          this.orders[index] = response.data
        }
      } catch (err) {
        this.error = 'Failed to update order.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
  },
  persist: {
    enabled: false,
    strategies: [
      {
        key: 'orderStore',
        storage: sessionStorage, // sessionStorage is used to persist data
      },
    ],
  },
})
