<template>
  <div class="manage-item">
    <HeaderComponent/>

    <main class="content">
        <div class="flex justify-end w-full items-center">
            <button class="new-item" @click="openModal()">+ New User</button>
        </div>

      <TableContainer title="Manage User">
        <table class="item-table">
            <thead>
            <tr>
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
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.role }}</td>
                <td>
                <button @click="openModal(user)">Edit</button>
                <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
      </TableContainer>

      <!-- Modal Component -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-class">
          <h2 class="text-2xl text-center">{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
          <form @submit.prevent="isEditing ? updateUser() : addUser()">
            <div>
              <label class="block" for="name">Name</label>
              <input class="input" type="text" id="name" v-model="newUser.name" required />
            </div>
            <div>
              <label class="block"  for="phone">Phone</label>
              <input class="input" type="text" id="phone" v-model="newUser.phone" required />
            </div>
            <div>
              <label class="block"  for="address">Address</label>
              <input class="input"  type="text" id="address" v-model="newUser.address" required />
            </div>
            <div>
              <label class="block"  for="role">Role</label>
              <select class="input" id="role" v-model="newUser.role" required>
                <option value="WAREHOUSE_MANAGER">Warehouse Manager</option>
                <option value="WAREHOUSE_STAFF">Warehouse Staff</option>
                <option value="SYSTEM_ADMINISTRATOR">System Administrator</option>
              </select>
            </div>
            <!-- Ensure the button type is submit -->
             <div class="flex justify-end mt-5">
                <div class="space-x-5">
                        <button class="button-class" type="submit">{{ isEditing ? 'Update' : 'Save' }}</button>
                        <button class="button-cancel" type="button" @click="closeModal()">Cancel</button>
                </div>
             </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import HeaderComponent from '@/components/Header.vue'
import TableContainer from '@/components/TableContainer.vue'


export default {
  name: 'ManageUsers',
    components: {
        HeaderComponent,
        TableContainer
    },
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
    deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userStore.deleteUser(userId)
      }
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
</style>
