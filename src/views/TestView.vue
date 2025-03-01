<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import TestComponent from '../components/Test.vue';
import logo from '../assets/logo.png';
import Footer from '../components/Footer.vue';

const headerTitle = ref("тест на определение IQ");
const isResultReady = ref(false);

const handleResultReady = (value) => {
  isResultReady.value = value;
};

const onTestCompleted = () => {
  headerTitle.value = "ГОТОВО!";
};
</script>

<template>
  <Header :title="headerTitle" :logo="logo"/>
  <div class="your-name">
    <TestComponent @test-completed="onTestCompleted" @result-ready="handleResultReady" />
  </div>
  <Footer v-if="isResultReady" />
</template>
