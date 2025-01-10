import { defineStore } from 'pinia'
import axios from 'axios'

export const useItemStore = defineStore('item', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchItems() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:8080/api/items')
        this.items = response.data
      } catch (err) {
        this.error = 'Failed to fetch items.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async addItem(newItem) {
      this.isLoading = true
      this.error = null
      try {
        delete newItem.id
        const response = await axios.post('http://localhost:8080/api/items', newItem)

        this.items.push(response.data)
      } catch (err) {
        this.error = 'Failed to add item.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async updateItem(itemId, updatedItem) {
      this.isLoading = true
      this.error = null
      try {
        delete updatedItem.id
        const response = await axios.put(`http://localhost:8080/api/items/${itemId}`, updatedItem)

        const index = this.items.findIndex((i) => i.id === itemId)
        if (index !== -1) {
          this.items[index] = response.data
        }
      } catch (err) {
        this.error = 'Failed to update inventory.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async deleteItem(itemId) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`http://localhost:8080/api/items/${itemId}`)
        // Remove the order from the items array
        this.items = this.items.filter((u) => u.id !== itemId)
      } catch (err) {
        this.error = 'Failed to delete item.'
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
        key: 'itemStore',
        storage: sessionStorage, // sessionStorage is used to persist data
      },
    ],
  },
})
