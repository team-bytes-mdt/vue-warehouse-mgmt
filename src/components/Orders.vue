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
            <label for="orderId">Order ID:</label>
            <input type="text" id="orderId" v-model="newOrder.orderId" required />

            <label for="customerId">Customer ID:</label>
            <input type="text" id="customerId" v-model="newOrder.customerId" required />

            <label for="status">Status:</label>
            <select id="status" v-model="newOrder.status" required>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>

            <button type="submit" class="submit-btn">{{ isEditing ? 'Update' : 'Save' }}</button>
            <button type="button" @click="closeModal" class="cancel-btn">Cancel</button>
          </form>
        </div>
      </div>
      <table class="order-table">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.no">
            <td><input type="checkbox" /></td>
            <td>{{ order.orderId }}</td>
            <td>{{ order.customerId }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.createdDate }}</td>
            <td>
              <button @click="openModal(order)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ManageOrder',
  data() {
    return {
      orders: [
        {
          no: '01',
          orderId: '#1234',
          customerId: '#5678',
          status: 'Pending',
          createdDate: '2025-01-01',
        },
        {
          no: '02',
          orderId: '#1235',
          customerId: '#5679',
          status: 'Shipped',
          createdDate: '2025-01-02',
        },
        {
          no: '03',
          orderId: '#1236',
          customerId: '#5680',
          status: 'Delivered',
          createdDate: '2025-01-03',
        },
        {
          no: '04',
          orderId: '#1237',
          customerId: '#5681',
          status: 'Canceled',
          createdDate: '2025-01-04',
        },
      ],
      showModal: false,
      newOrder: {
        no: '',
        orderId: '',
        customerId: '',
        status: '',
      },
      isEditing: false,
      editIndex: null,
    }
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
        editIndex: null
        this.newOrder = { no: '', orderId: '', customerId: '', status: '' }
      }
    },

    closeModal() {
      this.showModal = false
      this.newOrder = {
        no: '',
        orderId: '',
        customerId: '',
        status: '',
      }
      this.editIndex = null // Reset edit index
    },
    addOrder() {
      const now = new Date() // Define 'now' as the current date and time
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

      const newOrder = {
        ...this.newOrder,
        no: (this.orders.length + 1).toString().padStart(2, '0'),
        createdDate: formattedDate, // Add the formatted current date
      }

      console.log('DATA::', newOrder)

      this.orders.push(newOrder) // Add the new order to the orders list
      this.closeModal() // Close the modal and reset form state
    },

    updateOrder() {
      if (this.editIndex !== null && this.editIndex >= 0) {
        // Update the user at the specific index
        this.orders[this.editIndex] = { ...this.newOrder }
      }
      this.closeModal()
    },
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
