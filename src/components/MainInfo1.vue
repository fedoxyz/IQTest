<script setup>
import { ref, defineEmits } from 'vue';
import brainMap from "../assets/brain_map.png";
import Button from './buttons/Button.vue';
</script>

<template>
  <div class="info-container">
  <div class="info-text">Также по результатам теста <b>ВЫ ПОЛУЧИТЕ</b> подробные <b>СОВЕТЫ</b> по определению наиболее перспективной <b>ДЛЯ ВАШЕГО ТИПА интеллекта СФЕРЫ ДЕЯТЕЛЬНОСТИ</b>, которая принесет вам скорейший финансовый результат.</div>
  <img :src="brainMap"> 
  <Button href="/test" text="Пройти тест" :isActive="true"/>
  </div>
</template>

<style scoped>
  .info-container {
    padding-top: 6px;
    padding-bottom: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }

  .info-text {
    padding: 20px 15px;
    font-size: 20px;
    font-family: "PT Serif";
    color: #272727;
  }

  img {
    width: clamp(16.6rem, 20vw, 20rem);
  }
</style>

