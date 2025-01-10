<template>
  <div class="manage-order">
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
      <h1>Manage Orders</h1>
      <button class="new-order" @click="openModal((order = null))">+ New Order</button>

      <!-- Modal Component -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h2>{{ isEditing ? 'Edit Order' : 'Add New Order' }}</h2>
          <form @submit.prevent="isEditing ? updateOrder() : addOrder()">
            <label for="customerName">Customer Name:</label>
            <input type="text" id="customerName" v-model="newOrder.customerName" required />
            <label for="customerAddress">Customer Address:</label>
            <input type="text" id="customerAddress" v-model="newOrder.customerAddress" required />
            <label for="customerPhoneNumber">Customer Phone Number:</label>
            <input
              type="text"
              id="customerPhoneNumber"
              v-model="newOrder.customerPhoneNumber"
              required
            />

            <label for="status">Status:</label>
            <select id="status" v-model="newOrder.orderStatus" required>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Canceled</option>
            </select>

            <button type="submit" class="submit-btn">{{ isEditing ? 'Update' : 'Save' }}</button>
            <button type="button" @click="closeModal" class="cancel-btn">Cancel</button>
          </form>
        </div>
      </div>
      <table class="order-table">
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
    </main>
  </div>
</template>

<script>
import { useOrderStore } from '@/stores/order'
export default {
  name: 'ManageOrder',
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

.new-order {
  background-color: #ff6b35;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th,
.order-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.order-table th {
  background-color: #f4f4f4;
}
</style>
