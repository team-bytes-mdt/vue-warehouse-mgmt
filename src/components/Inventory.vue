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
      <h1>Manage Inventory Room</h1>
      <button class="new-item" @click="openModal((item = null))">+ New Inventory Room</button>

      <!-- Modal Form -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ isEditing ? 'Edit Inventory Room' : 'New Inventory Room' }}</h2>
          <form @submit.prevent="isEditing ? updateInventory() : addInventory()">
            <label for="location">Room Location:</label>
            <input type="text" id="location" v-model="newInventory.location" required />

            <button type="submit" class="submit-btn">
              {{ isEditing ? 'Update Inventory' : 'Save Inventory' }}
            </button>
            <button type="button" @click="closeModal()" class="cancel-btn">Cancel</button>
          </form>
        </div>
      </div>

      <table class="item-table">
        <thead>
          <tr>
            <th></th>
            <th>Inventory Room ID</th>
            <th>Room Location</th>
            <th>Last Updated Datetime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventories" :key="item.id">
            <td><input type="checkbox" /></td>
            <td>{{ item.id }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.lastUpdatedDate }}</td>
            <td>
              <button @click="openModal(item)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import { useInventoryStore } from '@/stores/inventory'

export default {
  name: 'ManageInventory',
  data() {
    return {
      newInventory: {
        id: '',
        location: '',
        lastUpdatedDate: '',
      },
      showModal: false,
      isEditing: false,
      editIndex: null,
    }
  },
  computed: {
    inventories() {
      return this.inventoryStore.inventories
    },
  },
  methods: {
    openModal(item) {
      this.showModal = true
      if (item) {
        this.isEditing = true
        this.editIndex = this.inventories.findIndex((u) => u.id === item.id)
        this.newInventory = { ...item }
      } else {
        this.isEditing = false
        this.editIndex = null
        this.newInventory = {
          id: '',
          location: '',
          lastUpdatedDate: '',
        }
      }
    },
    closeModal() {
      this.showModal = false
      this.newInventory = {
        id: '',
        location: '',
        lastUpdatedDate: '',
      }
      this.isEditing = false
      this.editIndex = null
    },
    addInventory() {
      this.inventoryStore.addInventory({ ...this.newInventory })
      this.closeModal()
    },
    updateInventory() {
      if (this.editIndex !== null) {
        this.inventoryStore.updateInventory(this.editIndex + 1, { ...this.newInventory })
      }
      this.closeModal()
    },
  },
  setup() {
    const inventoryStore = useInventoryStore()
    // fetch inventories
    inventoryStore.fetchInventories()
    return { inventoryStore }
  },
  onMounted() {
    return this.inventoryStore.fetchInventories()
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

/* Modal Styles */
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
  margin: 10px;
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
