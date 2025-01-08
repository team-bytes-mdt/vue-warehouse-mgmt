<template>
  <div class="manage-item">
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
      <h1>Manage Item</h1>
      <button class="new-item">+ New Item</button>

      <table class="item-table">
        <thead>
          <tr>
            <th></th>
            <th>No.</th>
            <th>Order ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.no">
            <td><input type="checkbox" /></td>
            <td>{{ item.no }}</td>
            <td>{{ item.orderId }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ManageItem',
  data() {
    return {
      items: [
        {
          no: '01',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 3,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '02',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 5,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '03',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 3,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '04',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 2,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '05',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 10,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '06',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 8,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '07',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 3,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '08',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 5,
          description: 'The Apollotech B340 is an affordable wireless',
        },
        {
          no: '09',
          orderId: '#7676',
          name: 'Apollotech',
          quantity: 3,
          description: 'The Apollotech B340 is an affordable wireless',
        },
      ],
    }
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
</style>
