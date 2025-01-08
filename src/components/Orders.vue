<template>
  <div class="manage-order">
    <header class="header">
      <div class="logo">Warehouse Management System</div>
      <nav class="nav">
        <a href="/item">Item</a>
        <a href="/inventory">Inventory</a>
        <a href="/">Customer</a>
        <a href="/order">Orders</a>
        <a href="/">Users</a>
        <a href="#" class="logout">Logout</a>
      </nav>
    </header>

    <main class="content">
      <h1>Manage Orders</h1>
      <button class="new-order">+ New Order</button>

      <table class="order-table">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.no">
            <td><input type="checkbox" /></td>
            <td>{{ order.orderId }}</td>
            <td>{{ order.customerId }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.createdDate }}</td>
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
        {
          no: '05',
          orderId: '#1238',
          customerId: '#5682',
          status: 'Pending',
          createdDate: '2025-01-05',
        },
        {
          no: '06',
          orderId: '#1239',
          customerId: '#5683',
          status: 'Shipped',
          createdDate: '2025-01-06',
        },
        {
          no: '07',
          orderId: '#1240',
          customerId: '#5684',
          status: 'Delivered',
          createdDate: '2025-01-07',
        },
        {
          no: '08',
          orderId: '#1241',
          customerId: '#5685',
          status: 'Pending',
          createdDate: '2025-01-08',
        },
        {
          no: '09',
          orderId: '#1242',
          customerId: '#5686',
          status: 'Canceled',
          createdDate: '2025-01-09',
        },
      ],
    }
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
