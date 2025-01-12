<template>
  <div class="manage-item">
    <HeaderComponent/>
    <main class="content">
        <div class="flex justify-end w-full items-center">
            <button class="new-item" @click="openModal((item = null))">+ New Item</button>
        </div>
        <TableContainer title="Manage Item">
        <table class="item-table">
            <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Inventory Id</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.inventoryId }}</td>
                <td>
                <button @click="openModal(item)">Edit</button>
                <button @click="deleteItem(item.id)" class="delete-btn">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
      </TableContainer> 
    </main>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-class">
        <h2 class="text-center">{{ isEditing ? 'Update New Item' : 'Add New Item' }}</h2>
        <form @submit.prevent="isEditing ? updateItem() : addItem()">
          <label class="block" for="item-name">Name:</label>
          <input class="input" type="text" id="item-name" v-model="newItem.name" required />

          <label class="block" for="item-quantity">Quantity:</label>
          <input class="input" type="number" id="item-quantity" v-model="newItem.quantity" required />

          <label class="block" for="item-price">Price:</label>
          <input class="input" type="number" id="item-price" v-model="newItem.price" required />

          <label class="block" for="item-category">Category:</label>
          <select class="input" id="item-category" v-model="newItem.category" required>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Food">Food</option>
          </select>

          <label class="block" for="item-description">Description:</label>
          <textarea class="input" id="item-description" v-model="newItem.description" required></textarea>
          <label class="block" for="item-inventory">Inventory Id:</label>
          <input class="input" type="number" id="item-price" v-model="newItem.inventoryId" required />
          <div class="flex justify-end">
                <div class="space-x-5">
                    <button  type="submit" class="button-class">
                      {{ isEditing ? 'Update Item' : 'Add Item' }}
                    </button>
                    <button type="button" @click="closeModal" class="button-cancel">Cancel</button>
                </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemStore } from '@/stores/item'
import HeaderComponent from '@/components/Header.vue'
import TableContainer from '@/components/TableContainer.vue'


export default {
  name: 'ManageItem',
  components: {
      HeaderComponent,
      TableContainer
  },
  data() {
    return {
      newItem: {
        id: '',
        name: '',
        quantity: '',
        price: '',
        category: '',
        description: '',
        inventoryId: '',
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
        this.editIndex = this.items.findIndex((u) => u.id === item.id)
        this.newItem = { ...item }
      } else {
        this.isEditing = false
        this.editIndex = null
        this.newItem = {
          id: '',
          name: '',
          quantity: '',
          price: '',
          category: '',
          description: '',
          inventoryId: '',
        }
      }
    },
    closeModal() {
      this.showModal = false
      this.newItem = {
        id: '',
        name: '',
        quantity: '',
        price: '',
        category: '',
        description: '',
        inventoryId: '',
      } // Reset form
      this.editIndex = null // Reset edit index
      this.isEditing = null
    },
    addItem() {
      this.itemStore.addItem({ ...this.newItem })
      this.closeModal()
    },

    updateItem() {
      if (this.editIndex !== null && this.editIndex >= 0) {
        this.itemStore.updateItem(this.editIndex + 1, { ...this.newItem })
      }
      this.closeModal()
    },
    deleteItem(id) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.itemStore.deleteItem(id)
      }
    },
  },
  setup() {
    const itemStore = useItemStore()
    // Fetch all item
    itemStore.fetchItems()
    return { itemStore }
  },
  onMounted() {
    return this.itemStore.fetchItems()
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
