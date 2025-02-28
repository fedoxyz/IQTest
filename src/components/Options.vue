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
      <!-- Numbers -->
      <div v-if="type === 'numbers'" 
           :class="['number-option', { 'selected': isSelected(option) }]"
           @click="selectOption(option)">
        {{ option }}
      </div>

      <!-- Text -->
      <div v-else-if="type === 'text'" 
           :class="['text-option', { 'selected': isSelected(option) }]"
           @click="selectOption(option)">
        <span class="checkmark"></span>
        {{ option }}
      </div>

      <!-- Color -->
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
  gap: 10px;
  flex-direction: column; /* Default to column layout for text */
}

.options.color-options,
.options:has(.number-option) {
  flex-direction: row;
}

.option-item {
  cursor: pointer;
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
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
}

.text-option .checkmark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  margin-right: 10px;
  display: inline-block;
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
  margin-right: 10px;
  margin-bottom: 10px;
}

.color-option {
  width: 75px;
  height: 75px;
  display: block; /* Ensure it's a block-level element */
}

.color-option.selected {
  border: 3px solid #fec701;
  box-sizing: border-box; /* Ensure border doesn't increase size */
}

/* Ensure every third item doesn't have right margin */
.color-options .option-item:nth-child(3n) {
  margin-right: 0;
}

/* Clear float every third item to ensure proper wrapping */
.color-options .option-item:nth-child(3n + 1) {
  clear: left;
}
</style>
