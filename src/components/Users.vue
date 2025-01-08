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
      <h1>Manage Users</h1>
      <button class="new-item">+ New User</button>

      <table class="item-table">
        <thead>
          <tr>
            <th></th>
            <th>No.</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.no">
            <td><input type="checkbox" /></td>
            <td>{{ user.no }}</td>
            <td>{{ user.customerId }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.address }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ManageUsers',
  data() {
    return {
      users: [
        {
          no: '01',
          customerId: '#7676',
          name: 'Darnell Franey',
          phone: '1-207-979-9193 x551',
          role: 'ADMIN',
          address: '123 Elm St, Portland, ME',
        },
        {
          no: '02',
          customerId: '#7676',
          name: 'Kristin Prosacco',
          phone: '1-278-982-0937 x926',
          role: 'WAREHOUSE_MANAGER',
          address: '456 Oak St, Seattle, WA',
        },
        {
          no: '03',
          customerId: '#7676',
          name: 'Lucia Legros',
          phone: '1-413-787-5811 x250',
          role: 'WAREHOUSE_STAFF',
          address: '789 Pine St, Boston, MA',
        },
        {
          no: '04',
          customerId: '#7676',
          name: 'Gretchen Rutherford',
          phone: '205.649.4681 x88343',
          role: 'INVENTORY_MANAGER',
          address: '321 Maple St, Birmingham, AL',
        },
        {
          no: '05',
          customerId: '#7676',
          name: 'Tomas Donnelly',
          phone: '939.943.2346 x345',
          role: 'SYSTEM_ADMINISTRATOR',
          address: '654 Cedar St, San Francisco, CA',
        },
        {
          no: '06',
          customerId: '#7676',
          name: 'Sophia Bode',
          phone: '1-490-499-6107 x0503',
          role: 'CUSTOMER',
          address: '987 Birch St, New York, NY',
        },
        {
          no: '07',
          customerId: '#7676',
          name: 'Sammy Hand',
          phone: '863-362-2018',
          role: 'WAREHOUSE_STAFF',
          address: '135 Spruce St, Tampa, FL',
        },
        {
          no: '08',
          customerId: '#7676',
          name: 'Howard Armstrong',
          phone: '743-293-0057',
          role: 'INVENTORY_MANAGER',
          address: '246 Palm St, Phoenix, AZ',
        },
        {
          no: '09',
          customerId: '#7676',
          name: 'Frankie Fahey',
          phone: '1-829-943-6992',
          role: 'CUSTOMER',
          address: '357 Aspen St, Chicago, IL',
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
