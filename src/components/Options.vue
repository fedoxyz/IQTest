<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['numbers', 'text', 'color'].includes(value)
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: null
});

const emit = defineEmits(['update:modelValue']);

const selectOption = (option) => {
  emit('update:modelValue', option);
};

const isSelected = (option) => props.modelValue === option;
</script>

<template>
  <div :class="['options', { 'color-options': type === 'color' }]">
    <div v-for="option in options" :key="option" class="option-item">
      <div v-if="type === 'numbers'" 
           :class="['number-option', { 'selected': isSelected(option) }]"
           @click="selectOption(option)">
        {{ option }}
      </div>

      <div v-else-if="type === 'text'" 
           :class="['text-option', { 'selected': isSelected(option) }]"
           @click="selectOption(option)">
        <span class="checkmark"></span>
        <div class="option-text">{{ option }}</div>
      </div>

      <div v-else-if="type === 'color'" 
           :class="['color-option', { 'selected': isSelected(option) }]"
           :style="{ backgroundColor: option }"
           @click="selectOption(option)">
      </div>
    </div>
  </div>
</template>

<style scoped>
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  flex-direction: column; 
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;
  justify-content: center;
}

.options.color-options,
.options:has(.number-option) {
  flex-direction: row;
}

.option-item {
  cursor: pointer;
}

.option-text {
  margin-left: 20px;
}

.number-option {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  box-sizing: border-box;
  border: 3px solid transparent;
}

.number-option.selected {
  border-color: #fec701;
}

.text-option {
  font-family: "PT Serif";
  font-size: 20px;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  text-align: left;
  font-weight: 200;
}

.text-option .checkmark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  display: inline-block;
  flex-shrink: 0; /* Prevent the checkmark from shrinking */
  min-width: 20px; /* Ensure consistency of width */
  min-height: 20px; /* Ensure consistency of height */
}

.text-option.selected {
  background-color: #fec701;
  color: black;
}

.text-option.selected .checkmark {
  border-color: black;
  background-color: #2950C2;
}

.color-options .option-item {
  flex: 0 0 auto;
}

.color-option {
  width: 86px;
  height: 86px;
  display: block; 
}

.color-option.selected {
  border: 3px solid #fec701;
  box-sizing: border-box; 
}

.color-options .option-item:nth-child(3n) {
  margin-right: 0;
}

.color-options .option-item:nth-child(3n + 1) {
  clear: left;
}
</style>
