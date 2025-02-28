<script setup>
import { ref, computed } from 'vue';
import Button from './buttons/Button.vue';
import Options from './Options.vue';
import { testSteps } from '../configs/testConfig.js';

const emit = defineEmits(['test-completed']);

const currentStepIndex = ref(0);
const totalSteps = testSteps.length;

const currentStep = computed(() => testSteps[currentStepIndex.value]);

const progressStyle = computed(() => {
  const percentage = ((currentStepIndex.value + 1) / totalSteps) * 100;
  return {
    width: `${percentage}%`
  };
});

const selectedOption = ref(null);

const nextStep = () => {
  if (currentStepIndex.value < totalSteps - 1) {
    currentStepIndex.value++;
    selectedOption.value = null;
  } else {
    completeTest();
  }
};

const completeTest = () => {
  // Your test completion logic here
  emit('test-completed');
};

const isNextButtonActive = computed(() => selectedOption.value !== null);
</script>

<template>
  <div>
    <div class="progress-container">
      <div class="progress-bar" :style="progressStyle"></div>
    </div>
    <span class="question">{{ currentStep.question }}</span>
    <img v-if="currentStep.image" :src="currentStep.image" class="test-image"/>
    <Options 
      :options="currentStep.options" 
      :type="currentStep.type"
      v-model="selectedOption"
    />
    <Button 
      :isActive="isNextButtonActive" 
      text="Далее"
      @click="nextStep"
    />
  </div>
</template>

<style scoped>
  .progress-container {
    width: 100%;
    height: 20px; /* Adjust height as needed */
    background-color: #e0e0e0a1; /* Light gray background */
    border-radius: 10.5px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #3BDE7C;
    border-radius: 10.5px;
    transition: width 0.3s ease-in-out;
  }
</style>
