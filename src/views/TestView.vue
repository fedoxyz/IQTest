<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import TestComponent from '../components/Test.vue'; // Assume this is your test component
import logo from '../assets/logo.png';

const headerTitle = ref("тест на определение IQ");

const onTestCompleted = () => {
  headerTitle.value = "ГОТОВО!";
};
</script>

<template>
  <Header :title="headerTitle" :logo="logo"/>
  <div class="your-name">
    <TestComponent @test-completed="onTestCompleted"/>
  </div>
</template>
