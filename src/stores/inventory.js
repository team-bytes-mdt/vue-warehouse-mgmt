// stores/inventory.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    inventories: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchInventories() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:8080/api/inventory')
        console.log(JSON.stringify(response.data))
        this.inventories = response.data
      } catch (err) {
        this.error = 'Failed to fetch inventories rooms.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async addInventory(newInventory) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('http://localhost:8080/api/inventory', newInventory)

        this.inventories.push(response.data)
      } catch (err) {
        this.error = 'Failed to add inventory.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async updateInventory(inventoryId, updatedInventory) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.put(
          `http://localhost:8080/api/inventory/${inventoryId}`,
          updatedInventory,
        )

        const index = this.inventories.findIndex((i) => i.id === inventoryId)
        if (index !== -1) {
          this.inventories[index] = response.data
        }
      } catch (err) {
        this.error = 'Failed to update inventory.'
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
        key: 'inventoryStore',
        storage: sessionStorage, // sessionStorage is used to persist data
      },
    ],
  },
})
