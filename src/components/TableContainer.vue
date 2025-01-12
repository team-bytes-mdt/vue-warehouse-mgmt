<template>
    <div class="rounded-md p-4 bg-white dark:bg-[#181818] border border-gray-300 shadow-sm">
      <h1 class="text-lg mb-4 font-semibold text-gray-700 dark:text-white ">{{ title }}</h1>
      <div>
        <slot></slot>
      </div>
    </div>
  </template>
  
<script>
  export default {
    name: 'TableContainer',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
</script>

  