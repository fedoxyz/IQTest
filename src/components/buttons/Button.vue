<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: String,
  isActive: Boolean
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.isActive) {
    emit('click')
  }
}
</script>

<template>
  <button 
    :class="{ 'button': true, 'active': isActive, 'inactive': !isActive }" 
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<style scoped>
  .button {
    border-radius: 20px;
    font-family: Merriweather, serif;
    text-transform: uppercase;
    background-color: #DADADA;
    width: 189px;
    height: 41px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    border: none;
    outline: none;
    position: relative;
  }

  .button.inactive {
    cursor: not-allowed;
  }

  .button.inactive::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
  }

  .button.active {
    background-color: #fec701;
    color: black;
    cursor: pointer;
  }

  .button.active:hover {
    background-color: #ffd84c;
  }

  .button.active:active {
    background-color: #e0b001;
  }
</style>

