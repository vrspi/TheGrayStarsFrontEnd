<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Home Page Management</h2>
        <button
          @click="saveChanges"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>

      <!-- Hero Section -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="heroSection.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              v-model="heroSection.subtitle"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Background Image URL</label>
            <div class="mt-1 flex items-center space-x-4">
              <input
                v-model="heroSection.backgroundImage"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                @click="uploadImage('hero')"
                class="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Products Section -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Featured Products</h3>
        <div class="space-y-4">
          <div v-for="(product, index) in featuredProducts" :key="index" class="flex items-center space-x-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700">Product {{ index + 1 }}</label>
              <select
                v-model="product.id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a product</option>
                <option v-for="p in availableProducts" :key="p._id" :value="p._id">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <button
              @click="removeFeaturedProduct(index)"
              class="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <button
            @click="addFeaturedProduct"
            class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            + Add Product
          </button>
        </div>
      </div>

      <!-- About Section -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">About Section</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="aboutSection.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              v-model="aboutSection.content"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Image URL</label>
            <div class="mt-1 flex items-center space-x-4">
              <input
                v-model="aboutSection.image"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                @click="uploadImage('about')"
                class="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

// Hero Section
const heroSection = ref({
  title: '',
  subtitle: '',
  backgroundImage: ''
})

// Featured Products
const featuredProducts = ref([{ id: '' }])
const availableProducts = ref([])

// About Section
const aboutSection = ref({
  title: '',
  content: '',
  image: ''
})

// Methods
const fetchHomePageData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/homepage`)
    const data = response.data

    heroSection.value = data.heroSection
    featuredProducts.value = data.featuredProducts
    aboutSection.value = data.aboutSection
  } catch (error) {
    console.error('Error fetching homepage data:', error)
  }
}

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`)
    availableProducts.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const saveChanges = async () => {
  try {
    await axios.post(`${API_URL}/api/homepage`, {
      heroSection: heroSection.value,
      featuredProducts: featuredProducts.value,
      aboutSection: aboutSection.value
    })
    alert('Changes saved successfully!')
  } catch (error) {
    console.error('Error saving changes:', error)
    alert('Error saving changes. Please try again.')
  }
}

const uploadImage = async (section: 'hero' | 'about') => {
  // Implement image upload logic
  console.log('Upload image for section:', section)
}

const addFeaturedProduct = () => {
  featuredProducts.value.push({ id: '' })
}

const removeFeaturedProduct = (index: number) => {
  featuredProducts.value.splice(index, 1)
}

onMounted(() => {
  fetchHomePageData()
  fetchProducts()
})
</script>
