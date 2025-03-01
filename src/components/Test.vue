<script setup>
import { ref, computed, watch } from 'vue';
import Button from './buttons/Button.vue';
import Options from './Options.vue';
import { testSteps } from '../configs/testConfig.js';
import LoadingAnimation from './LoadingAnimation.vue';
import Call from './Call.vue';
import background from "../assets/cover_bg.jpeg";

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

const processResults = ref(false);
const isResultReady = ref(false);

watch(isResultReady, (newValue) => {
  emit('result-ready', newValue);
});

const completeTest = () => {
  processResults.value = true;
  setTimeout(() => {
    processResults.value = false;
    isResultReady.value = true;
    emit('test-completed');
    startTimer();
  }, 3000); // Simulating the 3s delay
};

const isNextButtonActive = computed(() => selectedOption.value !== null);

const timer = ref(600); // Set the timer for 10 minutes
let interval = null;

const startTimer = () => {
  if (!interval) {
    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        clearInterval(interval);
        interval = null;
      }
    }, 1000); 
  }
};

const stopTimer = () => {
  clearInterval(interval);
};

const formattedTimer = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = timer.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const apiData = ref(null);
const apiLoading = ref(false);
const showApiResults = ref(false);

function handleApiData(data) {
  apiData.value = data;
  showApiResults.value = true;
  isResultReady.value = false;
  processResults.value = false;
}

function handleLoadingChange(isLoading) {
  apiLoading.value = isLoading;
}
</script>

<template>
  <div class="background" v-bind:style="{ backgroundImage: 'url(' + background + ')' }"></div>
  <div class="main-container">
      <div v-if="!isResultReady && !showApiResults" class="progress-container">
        <div class="progress-bar" :style="progressStyle"></div>
      </div>
    <div v-if="showApiResults" class="api-result-container">
      <div v-if="apiLoading" class="api-loading">
        <LoadingAnimation title="Совершаем звонок" subtitle="Пожалуйста подождите..."/>
      </div>
      <div v-else class="api-data">
        <div v-if="apiData">
          <h3>{{ apiData.name }}</h3>
          <p>Birth year: {{ apiData.birth_year }}</p>
          <p>Sex: {{ apiData.gender }}</p>
          <p>Height: {{ apiData.height }}</p>
          <p>Weight: {{ apiData.mass }}</p>
          <p>Eye color: {{ apiData.eye_color }}</p>
          <p>Hair color: {{ apiData.eye_color }}</p>
        </div>
      </div>
    </div>

    <div style="margin-top: auto; margin-bottom: auto; display: flex; flex-direction: column;" v-if="!showApiResults">
      <div v-if="!processResults && !isResultReady" class="test-container">
        <span class="question">{{currentStep.question}}</span>
        <img v-if="currentStep.image" :src="currentStep.image" class="test-image" />
        <Options
          :options="currentStep.options"
          :type="currentStep.type"
          v-model="selectedOption"
        />
      </div>
      <div v-if="processResults" class="results-processing">
        <LoadingAnimation />
      </div>
      <div v-if="isResultReady" class="result-container">
        <h2>Ваш результат рассчитан:</h2>
        <p class="result-text">
          <span class="underline">Вы относитесь к 3%</span> респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону!
        </p>
        <h3>Скорее получите свой результат!</h3>
        <div class="blue-box">
          <p>В целях защиты персональных данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона.</p>
        </div>
        <p class="timer-text">Звоните скорее, запись доступна всего <span class="timer"><br/>{{ formattedTimer }}</span> минут</p>
        <Call @data-received="handleApiData" @loading-change="handleLoadingChange" />
      </div>
    </div>
    <div v-if="!processResults && !isResultReady && !showApiResults" style="margin: 0 0 -90px 0px;">
        <Button
          :isActive="isNextButtonActive"
          text="Далее"
          @click="nextStep"
        />
    </div>
  </div>
</template>

<style scoped>
.question {
  white-space: pre-line;
  font-family: "PT Serif";
  font-size: 22px;
  margin: 0px 10px;
}

h2 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

h3 {
  font-size: 24px;
  color: #3BDE7C;
  text-transform: uppercase;
  margin: 10px 0px 10px 0;
}

.test-image {
  margin: 15px auto 10px auto;
  display: block;  
  max-width: 100%;  
}

.progress-container {
  width: 85%;
  min-height: 10px;
  background-color: #e0e0e0a1;
  border-radius: 10.5px;
  overflow: hidden;
  place-self: center;
  margin-top: 68px;

}

.progress-bar {
  height: 100%;
  background-color: #3bde7c;
  border-radius: 10.5px;
  transition: width 0.3s ease-in-out;
}

.test-container {
  text-align: center;
  margin-top: 15px;
}

.result-container {
  font-family: PT Serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 55px;
}

.blue-box {
  background-color: #1C2741;
  padding: 14px;
  color: white;
  border-radius: 8px;
  font-size: 10px;
  text-transform: uppercase;
  line-height: 14px;
  font-weight: 400;
  letter-spacing: 2px;
  margin-right: 2rem;
  margin-left: 2rem;
}

.timer {
  font-size: 24px;
}
.timer-text {
  font-size: 16px;
  color: #3BDE7C;
  letter-spacing: 1px;
  line-height: 30px;
}

.result-text {
  font-size: 18px;
  margin: 10px 10px 10px 10px;
}

.main-container {
  position: relative;
  height: 80vh;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}

.api-result-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: auto;
  margin-bottom: auto;
}

.api-data {
  margin-top: auto;
  margin-bottom: auto;
}

.background {
  height: 100vh; 
  width: 100%;
  position: fixed; 
  top: 0;
  left: 0;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
}
</style>

