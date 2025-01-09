import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
  state: () => ({
    items: [
      {
        no: '01',
        category: 'Electronics',
        name: 'Apollotech',
        quantity: 3,
        description: 'The Apollotech B340 is an affordable wireless',
        price: 200.0,
      },
      {
        no: '02',
        category: 'Furniture',
        name: 'Apollotech',
        quantity: 5,
        description: 'The Apollotech B340 is an affordable wireless',
        price: 200.0,
      },
      {
        no: '03',
        category: 'Accessories',
        name: 'Apollotech',
        quantity: 3,
        description: 'The Apollotech B340 is an affordable wireless',
        price: 200.0,
      },
      {
        no: '04',
        category: 'Clothing',
        name: 'Apollotech',
        quantity: 2,
        description: 'The Apollotech B340 is an affordable wireless',
        price: 200.0,
      },
    ],
  }),
  actions: {
    addItem(newItem) {
      newItem.no = (this.items.length + 1).toString().padStart(2, '0')
      this.items.push(newItem)
    },
    updateItem(index, updatedItem) {
      if (index !== null && index >= 0) {
        this.items[index] = { ...updatedItem }
      }
    },
    setItems(initialItems) {
      this.items = initialItems
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'itemStore',
        storage: sessionStorage, // sessionStorage is used to persist data
      },
    ],
  },
})
