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
      <h1>Manage Inventory</h1>
      <button class="new-item" @click="openModal((item = null))">+ New Inventory</button>

      <!-- Modal Form -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ isEditing ? 'Edit Inventory' : 'New Inventory' }}</h2>
          <form @submit.prevent="isEditing ? updateInventory() : addInventory()">
            <label for="inventoryId">Inventory ID:</label>
            <input type="text" id="inventoryId" v-model="newInventory.inventoryId" required />

            <label for="location">Location:</label>
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
            <th>No.</th>
            <th>Inventory ID</th>
            <th>Location</th>
            <th>Last Updated Datetime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventories" :key="item.no">
            <td><input type="checkbox" /></td>
            <td>{{ item.no }}</td>
            <td>{{ item.inventoryId }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.lastUpdatedDatetime }}</td>
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
export default {
  name: 'ManageInventory',
  data() {
    return {
      newInventory: {
        inventoryId: '',
        location: '',
      },
      isModalOpen: false,
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
      newInventory: {
        no: '',
        inventoryId: '',
        location: '',
        lastUpdatedDatetime: '',
      },
      showModal: false,
      isEditing: false,
      editIndex: null,
    }
  },
  methods: {
    openModal(item) {
      this.showModal = true
      if (item) {
        this.isEditing = true
        this.editIndex = this.inventories.findIndex((u) => u.no === item.no)
        console.log('Editing item:', this.editIndex) // Debug
        this.newInventory = { ...item }
      } else {
        this.isEditing = false
        this.editIndex = null
        console.log('Adding new item') // Debug
        this.newInventory = {
          no: '',
          inventoryId: '',
          location: '',
          lastUpdatedDatetime: '',
        }
      }
    },
    closeModal() {
      this.showModal = false
      this.newInventory = {
        no: '',
        inventoryId: '',
        location: '',
        lastUpdatedDatetime: '',
      }
      this.editIndex = null // Reset edit index
      this.isEditing = null
    },
    addInventory() {
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

      const newInventory = {
        ...this.newInventory,
        no: (this.inventories.length + 1).toString().padStart(2, '0'),
        lastUpdatedDatetime: formattedDate,
      }

      this.inventories.push(newInventory)
      this.closeModal()
      this.newInventory.inventoryId = ''
      this.newInventory.location = ''
    },
    updateInventory() {
      if (this.editIndex !== null && this.editIndex >= 0) {
        this.inventories[this.editIndex] = { ...this.newInventory }
      }
      this.closeModal()
    },
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
