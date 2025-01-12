<template>
    <header class="bg-primary dark:bg-[#181818] dark:shadow-sm dark:shadow-primary text-white shadow-md py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold">
          <span class="logo">Warehouse Management System</span>
        </div>
        <nav class="flex space-x-6">
          <a
            href="/item"
            class="text-white hover:text-[#ffddb8] transition duration-200"
            :class="{ 'border-b-2 border-[#ffddb8]': isActive('/item') }"
          >
            Item
          </a>
          <a
            href="/inventory"
            class="text-white hover:text-[#ffddb8] transition duration-200"
            :class="{ 'border-b-2 border-[#ffddb8]': isActive('/inventory') }"
          >
            Inventory
          </a>
          <a
            href="/order"
            class="text-white hover:text-[#ffddb8] transition duration-200"
            :class="{ 'border-b-2 border-[#ffddb8]': isActive('/order') }"
          >
            Orders
          </a>
          <a
            href="/"
            class="text-white hover:text-[#ffddb8] transition duration-200"
            :class="{ 'border-b-2 border-[#ffddb8]': isActive('/') }"
          >
            Users
          </a>
          <a
            href="#"
            class="text-red-100 hover:text-red-300 transition duration-200"
          >
            Logout
          </a>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
    methods: {
      isActive(path) {
        return window.location.pathname === path;
      },
    },
  };
  </script>
  