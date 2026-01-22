<template>
  <div class="search-bar-wrapper">
    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input v-model="searchQuery" class="search-input" type="text" :placeholder="placeholder"
        @keyup.enter="handleSearch" />
    </div>
    <button class="search-button" @click="handleSearch">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search for a place...',
})

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const searchQuery = ref('')

const handleSearch = () => {
  const trimmedQuery = searchQuery.value.trim()
  if (trimmedQuery) {
    emit('search', trimmedQuery)
  }
}
</script>

<style scoped lang="scss">
.search-bar-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: $neutral-800;
  border-radius: 12px;
  padding: 12px 24px;
  flex: 1;
  gap: 12px;
  transition: box-shadow 0.2s;

  &:focus-within {
    box-shadow: 0 0 0 2px $blue-500;
  }
}

.search-icon {
  width: 20px;
  height: 20px;
  color: $neutral-300;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: $neutral-0;
  font-family: $font-body;
  font-size: 16px;
  font-weight: $fw-medium;
  outline: none;

  &::placeholder {
    color: $neutral-300;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px $neutral-800 inset;
    -webkit-text-fill-color: $neutral-0;
  }
}

.search-button {
  background-color: $blue-500;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  color: $neutral-0;
  font-family: $font-body;
  font-size: 16px;
  font-weight: $fw-semibold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;

  &:hover {
    background-color: $blue-700;
  }

  &:active {
    opacity: 0.9;
  }

  &:disabled {
    background-color: $neutral-600;
    cursor: not-allowed;
  }
}
</style>
