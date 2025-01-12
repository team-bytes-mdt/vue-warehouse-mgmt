<template>
  <div class="manage-item">

    <HeaderComponent/>

    <main class="content">
        <div class="flex justify-end w-full items-center">
            <button class="new-item" @click="openModal((item = null))">+ New Inventory Room</button>
        </div>

      <!-- Modal Form -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-class ">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ isEditing ? 'Edit Inventory Room' : 'New Inventory Room' }}</h2>
          <form @submit.prevent="isEditing ? updateInventory() : addInventory()">
            <label class="block" for="location">Room Location:</label>
            <input class="input" type="text" id="location" v-model="newInventory.location" required />
            <div class="flex justify-end">
                <div class="space-x-5">
                    <button type="submit" class="button-class">
                      {{ isEditing ? 'Update Inventory' : 'Save Inventory' }}
                    </button>
                    <button type="button" @click="closeModal()" class="button-cancel">Cancel</button>
                </div>
            </div>
          </form>
        </div>
      </div>
      <TableContainer title="Manage Inventory">
          <table class="item-table">
            <thead>
              <tr>
                <th>Inventory Room ID</th>
                <th>Room Location</th>
                <th>Last Updated Datetime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in inventories" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.location }}</td>
                <td>{{ item.lastUpdatedDate }}</td>
                <td>
                  <button @click="openModal(item)">Edit</button>
                  <button @click="deleteInventory(item.id)" class="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
      </TableContainer>
    </main>
  </div>
</template>

<script>
import { useInventoryStore } from '@/stores/inventory'
import HeaderComponent from '@/components/Header.vue'
import TableContainer from '@/components/TableContainer.vue'


export default {
    name: 'ManageInventory',
    components: {
        HeaderComponent,
        TableContainer
    },
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
    deleteInventory(id) {
      if (confirm('Are you sure you want to delete this inventory?')) {
        this.inventoryStore.deleteInventory(id)
      }
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
</style>
