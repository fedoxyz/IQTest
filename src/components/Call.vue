<script setup>
import { ref, defineEmits } from 'vue';
import call from "../assets/call.png"

const loading = ref(false);
const apiData = ref(null);
const error = ref(null);

const emit = defineEmits(['data-received', 'loading-change']);
const callApi = () => {
  loading.value = true;
  emit('loading-change', true);
  
  fetch('https://swapi.dev/api/people/1/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('API data:', data);
      apiData.value = data;
      emit('data-received', data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      error.value = 'Failed to fetch';
      emit('data-received', { error: error.value });
    })
  
  emit('loading-change', false);
};
</script>

<template>
  <button class="phone-button" @click="callApi" :disabled="loading">
    <img v-if="!loading" :src="call" class="phone-icon">
    {{ loading ? 'Вызываем...' : 'Позвонить и прослушать результат' }}
  </button>
</template>

<style scoped>
.phone-button {
  font-family: Roboto;
  font-size: 18px;
  font-weight: 600;
  background-color: #EB1B00;
  color: white;
  padding: 40px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: center;
  margin-right: 1.1rem;
  margin-left: 1.1rem;
  width: 340px;
  height: 110px;
  justify-content: center;
}

.phone-icon {
  margin-right: 12px;
}

.button-text {
  width: 250px;
  text-align: left;
  white-space: nowrap;
}

.phone-button:hover {
  background-color: darkred;
}
</style>
