<template>
  <div class="manage-order">

    <HeaderComponent/>

    <main class="content">
        <div class="flex justify-end w-full items-center">
            <button class="new-item" @click="openModal((order = null))">+ New Order</button>
        </div>

      <!-- Modal Component -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-class">
          <h2 class="text-lg text-center">{{ isEditing ? 'Edit Order' : 'Add New Order' }}</h2>
          <form @submit.prevent="isEditing ? updateOrder() : addOrder()">
            <label class="block" for="customerName">Customer Name:</label>
            <input class="input"  type="text" id="customerName" v-model="newOrder.customerName" required />
            <label class="block" for="customerAddress">Customer Address:</label>
            <input class="input" type="text" id="customerAddress" v-model="newOrder.customerAddress" required />
            <label class="block" for="customerPhoneNumber">Customer Phone Number:</label>
            <input type="text" class="input" id="customerPhoneNumber" v-model="newOrder.customerPhoneNumber" required />
            <label for="status">Status:</label>
            <select class="input" id="status" v-model="newOrder.orderStatus" required>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Canceled</option>
            </select>
            <div class="flex justify-end mt-5">
                <div class="space-x-5">
                    <button  type="submit" class="button-class">{{ isEditing ? 'Update' : 'Save' }}</button>
                    <button type="button" @click="closeModal" class="button-cancel">Cancel</button>
                </div>
            </div>
          </form>
        </div>
      </div>
      
      <TableContainer title="Manage Order">
        <table class="item-table">
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Phone Number</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" :key="order.orderId">
                <td>{{ order.orderId }}</td>
                <td>{{ order.customerName }}</td>
                <td>{{ order.customerAddress }}</td>
                <td>{{ order.customerPhoneNumber }}</td>
                <td>{{ order.orderStatus }}</td>
                <td>{{ order.createdAt }}</td>
                <td>
                <button @click="openModal(order)">Edit</button>
                <button @click="deleteOrder(order.orderId)" class="delete-btn">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
      </TableContainer>
    </main>
  </div>
</template>

<script>
import { useOrderStore } from '@/stores/order'
import HeaderComponent from '@/components/Header.vue'
import TableContainer from '@/components/TableContainer.vue'


export default {
  name: 'ManageOrder',
    components: {
        HeaderComponent,
        TableContainer
    },
  data() {
    return {
      showModal: false,
      newOrder: {
        orderId: '',
        customerId: '',
        orderStatus: '',
      },
      isEditing: false,
      editIndex: null,
    }
  },
  computed: {
    orders() {
      return this.orderStore.orders
    },
  },
  methods: {
    openModal(order) {
      this.showModal = true
      if (order) {
        this.isEditing = true
        this.editIndex = this.orders.findIndex((u) => u.no === order.no)
        this.newOrder = { ...order }
      } else {
        this.isEditing = false
        this.editIndex = null
        this.newOrder = {
          orderId: '',
          customerName: '',
          customerAddress: '',
          customerPhoneNumber: '',
          status: '',
        }
      }
    },

    closeModal() {
      this.showModal = false
      this.newOrder = {
        orderId: '',
        customerName: '',
        customerAddress: '',
        customerPhoneNumber: '',
        orderStatus: '',
      }
      this.editIndex = null // Reset edit index
    },
    addOrder() {
      this.orderStore.addOrder({ ...this.newOrder })
      this.closeModal() // Close the modal and reset form state
    },

    updateOrder() {
      if (this.editIndex !== null && this.editIndex >= 0) {
        // Update the user at the specific index
        this.orderStore.updateOrder(this.editIndex + 1, { ...this.newOrder })
      }
      this.closeModal()
    },
    deleteOrder(orderId) {
      if (confirm('Are you sure you want to delete this order?')) {
        this.orderStore.deleteOrder(orderId) // Assumes a deleteOrder method exists in the store
      }
    },
  },

  setup() {
    const orderStore = useOrderStore()
    // Fetch orders
    orderStore.fetchOrders()
    return { orderStore }
  },

  onMounted() {
    return this.orderStore.fetchOrders()
  },
}
</script>

<style scoped>
.manage-order {
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
