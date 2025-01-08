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
      <h1>Manage Inventory</h1>
      <button class="new-item">+ New Inventory</button>

      <table class="item-table">
        <thead>
          <tr>
            <th></th>
            <th>No.</th>
            <th>Inventory ID</th>
            <th>Location</th>
            <th>Last Updated Datetime</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventories" :key="item.no">
            <td><input type="checkbox" /></td>
            <td>{{ item.no }}</td>
            <td>{{ item.inventoryId }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.lastUpdatedDatetime }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ManageInventory',
  data() {
    return {
      inventories: [
        {
          no: '01',
          inventoryId: 'INV001',
          location: 'Warehouse A',
          lastUpdatedDatetime: '2025-01-01 14:30',
        },
        {
          no: '02',
          inventoryId: 'INV002',
          location: 'Warehouse B',
          lastUpdatedDatetime: '2025-01-02 10:15',
        },
        {
          no: '03',
          inventoryId: 'INV003',
          location: 'Warehouse C',
          lastUpdatedDatetime: '2025-01-03 08:45',
        },
        {
          no: '04',
          inventoryId: 'INV004',
          location: 'Warehouse Z',
          lastUpdatedDatetime: '2025-01-04 16:20',
        },
        {
          no: '05',
          inventoryId: 'INV005',
          location: 'Warehouse A',
          lastUpdatedDatetime: '2025-01-05 11:00',
        },
        {
          no: '06',
          inventoryId: 'INV006',
          location: 'Warehouse B',
          lastUpdatedDatetime: '2025-01-06 09:10',
        },
        {
          no: '07',
          inventoryId: 'INV007',
          location: 'Warehouse C',
          lastUpdatedDatetime: '2025-01-07 12:25',
        },
        {
          no: '08',
          inventoryId: 'INV008',
          location: 'Warehouse Z',
          lastUpdatedDatetime: '2025-01-08 15:00',
        },
        {
          no: '09',
          inventoryId: 'INV009',
          location: 'Warehouse A',
          lastUpdatedDatetime: '2025-01-09 17:45',
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
