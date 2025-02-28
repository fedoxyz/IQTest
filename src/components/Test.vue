<script setup>
import { ref, computed } from 'vue';
import Button from './buttons/Button.vue';
import Options from './Options.vue';
import { testSteps } from '../configs/testConfig.js';
import LoadingAnimation from './LoadingAnimation.vue';
import Call from './Call.vue';

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

const callApi = () => {
  loading.value = true;
  
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
      alert(`Character info: ${data.name}, born in ${data.birth_year}`);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div class="main-container">
    <div v-if="!isResultReady" class="progress-container">
      <div class="progress-bar" :style="progressStyle"></div>
    </div>

    <div v-if="!processResults && !isResultReady" class="test-container">
      <span class="question">{{ currentStep.question }}</span>
      <img v-if="currentStep.image" :src="currentStep.image" class="test-image" />
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
      <Call/>
    </div>
  </div>
</template>

<style scoped>
.question {
  font-size: 20px;
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
  height: 10px;
  background-color: #e0e0e0a1;
  border-radius: 10.5px;
  overflow: hidden;
  place-self: center;
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
  padding: 10px;
}

.results-processing {
}

.result-container {
  font-family: PT Serif;
  text-align: center;
  display: flex;
  flex-direction: column;
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
  margin: 10px 10px 10px 10px;
}

.main-container {
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}
</style>

