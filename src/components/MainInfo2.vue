<script setup>
import { ref, defineEmits } from 'vue';
import brainMap from "../assets/brain_map.png";
import Button from './buttons/Button.vue';
</script>

<template>
  <div class="info-container">
    <div class="info-text">Прохождение теста займет у вас не более <span class="highlight">12 минут</span>, а его результаты вы сможете <span class="highlight">использовать всю жизнь.</span></div>
  <div class="box">Профессиональная интерпретация и детально <b>проработанные рекомендации</b> позволят вам качественно <b>изменить все аспекты своей жизни</b>: от финансового до любовного.</div>
  <Button text="Пройти тест" :style="'transparent'" href="/test" :isActive="true"/>
    <p class="copyright">© 2019</p>
  </div>
</template>

<style scoped>
  .highlight {
    color: #FFC700;
  }
  .box {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
  .copyright {
    color: rgba(255, 255, 255, 0.5) 
  }
</style>

