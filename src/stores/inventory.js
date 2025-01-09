// stores/inventory.js
import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    inventories: [
      {
        no: '01',
        inventoryId: 'INV001',
        location: 'Warehouse A',
        lastUpdatedDatetime: '2025-01-01 14:30',
      },
      {
        no: '02',
        inventoryId: 'INV002',
        location: 'Warehouse B',
        lastUpdatedDatetime: '2025-01-02 10:15',
      },
      {
        no: '03',
        inventoryId: 'INV003',
        location: 'Warehouse C',
        lastUpdatedDatetime: '2025-01-03 08:45',
      },
    ],
  }),
  actions: {
    addInventory(newInventory) {
      const now = new Date()
      const formattedDate =
        now.getFullYear() +
        '-' +
        String(now.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(now.getDate()).padStart(2, '0') +
        ' ' +
        String(now.getHours()).padStart(2, '0') +
        ':' +
        String(now.getMinutes()).padStart(2, '0') +
        ':' +
        String(now.getSeconds()).padStart(2, '0')

      newInventory.no = (this.inventories.length + 1).toString().padStart(2, '0')
      newInventory.lastUpdatedDatetime = formattedDate

      this.inventories.push(newInventory)
    },
    updateInventory(index, updatedInventory) {
      this.inventories[index] = { ...updatedInventory }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'inventoryStore',
        storage: sessionStorage, // sessionStorage is used to persist data
      },
    ],
  },
})
