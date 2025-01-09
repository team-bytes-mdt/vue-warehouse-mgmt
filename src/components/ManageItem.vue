<template>
  <div class="manage-item">
    <header class="header">
      <div class="logo">Warehouse Management System</div>
      <nav class="nav">
        <a href="/item">Item</a>
        <a href="/inventory">Inventory</a>
        <a href="/order">Orders</a>
        <a href="/">Users</a>
        <a href="#" class="logout">Logout</a>
      </nav>
    </header>

    <main class="content">
      <h1>Manage Item</h1>
      <button class="new-item" @click="openModal((item = null))">+ New Item</button>

      <table class="item-table">
        <thead>
          <tr>
            <th></th>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.no">
            <td><input type="checkbox" /></td>
            <td>{{ item.no }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button @click="openModal(item)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ isEditing ? 'Update New Item' : 'Add New Item' }}</h2>
        <form @submit.prevent="isEditing ? updateItem() : addItem()">
          <label for="item-name">Name:</label>
          <input type="text" id="item-name" v-model="newItem.name" required />

          <label for="item-quantity">Quantity:</label>
          <input type="number" id="item-quantity" v-model="newItem.quantity" required />

          <label for="item-price">Price:</label>
          <input type="number" id="item-price" v-model="newItem.price" required />

          <label for="item-category">Category:</label>
          <select id="item-category" v-model="newItem.category" required>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Food">Food</option>
          </select>

          <label for="item-description">Description:</label>
          <textarea id="item-description" v-model="newItem.description" required></textarea>

          <button type="submit" class="submit-btn">
            {{ isEditing ? 'Update Item' : 'Add Item' }}
          </button>
          <button type="button" @click="closeModal" class="cancel-btn">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemStore } from '@/stores/item'
export default {
  name: 'ManageItem',
  data() {
    return {
      newItem: {
        no: '',
        name: '',
        quantity: '',
        price: '',
        category: '',
        description: '',
      },
      showModal: false,
      isEditing: false,
      editIndex: null,
    }
  },
  computed: {
    items() {
      return this.itemStore.items
    },
  },
  methods: {
    openModal(item) {
      console.log('Opening modal:', item ? 'Edit Item' : 'Add Item') // Debug
      this.showModal = true

      if (item) {
        this.isEditing = true
        this.editIndex = this.items.findIndex((u) => u.no === item.no)
        console.log('Editing item:', this.editIndex) // Debug
        this.newItem = { ...item }
      } else {
        this.isEditing = false
        this.editIndex = null
        console.log('Adding new item') // Debug
        this.newItem = {
          no: '',
          name: '',
          quantity: '',
          price: '',
          category: '',
          description: '',
        }
      }
    },
    closeModal() {
      this.showModal = false
      this.newItem = { no: '', name: '', quantity: '', price: '', category: '', description: '' } // Reset form
      this.editIndex = null // Reset edit index
      this.isEditing = null
    },
    addItem() {
      this.itemStore.addItem({ ...this.newItem })
      this.closeModal()
    },

    updateItem() {
      if (this.editIndex !== null && this.editIndex >= 0) {
        this.itemStore.updateItem(this.editIndex, { ...this.newItem })
      }
      this.closeModal()
    },
  },
  setup() {
    const itemStore = useItemStore()
    return { itemStore }
  },
}
</script>

<style scoped>
.manage-item {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.logo {
  font-size: 1.2em;
  font-weight: bold;
}

.nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

.nav .logout {
  color: red;
}

.content {
  margin-top: 20px;
}

h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.new-item {
  background-color: #ff6b35;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.item-table {
  width: 100%;
  border-collapse: collapse;
}

.item-table th,
.item-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.item-table th {
  background-color: #f4f4f4;
}

.new-item {
  background-color: #ff6b35;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.item-table {
  width: 100%;
  border-collapse: collapse;
}

.item-table th,
.item-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.item-table th {
  background-color: #f4f4f4;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
}

.modal form div {
  margin-bottom: 10px;
}

.modal form label {
  display: block;
  margin-bottom: 5px;
}

.modal form input,
.modal form select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal form button {
  margin-right: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.modal form button[type='submit'] {
  background-color: #28a745;
  color: #fff;
}

.modal form button[type='button'] {
  background-color: #dc3545;
  color: #fff;
}
</style>
