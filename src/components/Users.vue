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
      <h1>Manage Users</h1>
      <button class="new-item" @click="openModal()">+ New User</button>

      <table class="item-table">
        <thead>
        <tr>
          <th></th>
          <th>Id.</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><input type="checkbox" /></td>
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="openModal(user)">Edit</button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Modal Component -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h2>{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
          <form @submit.prevent="isEditing ? updateUser() : addUser()">
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="newUser.name" required />
            </div>
            <div>
              <label for="phone">Phone:</label>
              <input type="text" id="phone" v-model="newUser.phone" required />
            </div>
            <div>
              <label for="address">Address:</label>
              <input type="text" id="address" v-model="newUser.address" required />
            </div>
            <div>
              <label for="role">Role:</label>
              <select id="role" v-model="newUser.role" required>
                <option value="WAREHOUSE_MANAGER">Warehouse Manager</option>
                <option value="WAREHOUSE_STAFF">Warehouse Staff</option>
                <option value="SYSTEM_ADMINISTRATOR">System Administrator</option>
              </select>
            </div>
            <!-- Ensure the button type is submit -->
            <button type="submit">{{ isEditing ? 'Update' : 'Save' }}</button>
            <button type="button" @click="closeModal()">Cancel</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
export default {
  name: 'ManageUsers',
  data() {
    return {
      showModal: false,
      newUser: {
        id: '',
        name: '',
        phone: '',
        address: '',
        role: '',
      },
      isEditing: false,
      editIndex: null,
    }
  },
  computed: {
    users() {
      return this.userStore.users
    },
  },
  methods: {
    openModal(user = null) {
      this.showModal = true
      if (user) {
        this.isEditing = true
        this.editIndex = this.users.findIndex((u) => u.id === user.id)
        this.newUser = { ...user }
      } else {
        this.isEditing = false
        this.newUser = { id: '', name: '', phone: '', address: '', role: '' }
      }
    },
    closeModal() {
      this.showModal = false
      this.newUser = { id: '', name: '', phone: '', address: '', role: '' }
      this.editIndex = null // Reset edit index
    },
    addUser() {
      this.userStore.addUser({ ...this.newUser })
      this.closeModal()
    },
    updateUser() {
      if (this.editIndex !== null && this.editIndex >= 0) {
        // Update the user at the specific index
        this.userStore.updateUser(this.editIndex + 1, { ...this.newUser })
      }
      this.closeModal()
    },
  },
  setup() {
    const userStore = useUserStore()
    // Fetch users on component mount
    userStore.fetchUsers()
    return { userStore }
  },
  onMounted() {
    return this.userStore.fetchUsers()
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
