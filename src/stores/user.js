import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    // Fetch users from API
    async fetchUsers() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:8080/api/user')
        this.users = response.data
      } catch (err) {
        this.error = 'Failed to fetch users.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async addUser(newUser) {
      this.isLoading = true
      this.error = null
      try {
        delete newUser.id
        const response = await axios.post('http://localhost:8080/api/user', newUser)

        this.users.push(response.data)
      } catch (err) {
        this.error = 'Failed to add user.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    // Update an existing user
    async updateUser(userId, updatedUser) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.put(`http://localhost:8080/api/user/${userId}`, updatedUser) // Replace with your API endpoint
        delete updatedUser.id
        const index = this.users.findIndex((user) => user.id === userId)
        if (index !== -1) {
          this.users[index] = response.data
        }
      } catch (err) {
        this.error = 'Failed to update user.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    async deleteUser(userId) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`http://localhost:8080/api/user/${userId}`)
        // Remove the order from the users array
        this.users = this.users.filter((u) => u.id !== userId)
      } catch (err) {
        this.error = 'Failed to delete user.'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
  },
  persist: {
    enabled: false,
    strategies: [
      {
        key: 'userStore',
        storage: sessionStorage, // sessionStorage is used to persist data
      },
    ],
  },
})
