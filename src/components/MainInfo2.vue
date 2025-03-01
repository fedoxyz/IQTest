<script setup>
import { ref, defineEmits } from 'vue';
import brainMap from "../assets/brain_map.png";
import Button from './buttons/Button.vue';
import background from "../assets/cover_bg.jpeg"
import lightning from "../assets/lightning.png"
</script>

<template>
  <div class="info-container" v-bind:style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="info-text">Прохождение теста займет у вас не более <span class="highlight">12 минут</span>, а его результаты вы сможете <span class="highlight">использовать всю жизнь.</span></div>
    <div class="box">Профессиональная интерпретация и детально <b>проработанные рекомендации</b> позволят вам качественно <b>изменить все аспекты своей жизни</b>: от финансового до любовного.</div>
    <img class="lightning top-lightning" :src="lightning">
    <img class="lightning bottom-lightning" style="transform: scaleX(-1) scale(0.8)" :src="lightning">
    <Button text="Пройти тест" :style="'transparent'" href="/test" :isActive="true"/>
    <p class="copyright">© 2019</p>
  </div>
</template>

<style scoped>
  .info-container {
    position: relative; /* Set relative positioning for absolute children */
    min-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Align content to the top */
    align-items: center;
    padding-top: 40px;
  }

  .highlight {
    color: #FFC700;
  }

  .box {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem;
  }

  .info-text {
    letter-spacing: 0.05rem;
    font-size: 1.35rem;
    font-family: "Merriweather";
    text-align: left;
    padding-top: 25px;
    padding-left: 20px;
    line-height: 23px;
    padding-right: 20px;
  }

  .box {
    margin-top: 30px;
    margin-bottom: 35px;
    letter-spacing: 0.05rem;
    font-weight: 100;
    font-size: 1.47rem;
    font-family: "Merriweather";
    color: black;
    line-height: 28px;
    padding-top: 32px;
    padding-bottom: 32px;
  }

  .copyright {
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    font-size: 15px;
    margin-top: 35px;
  }

  .lightning {
    width: clamp(9rem, 10vw, 15rem);
    position: absolute; 
  }

  .top-lightning {
    top: 70px;  
    right: 0;
  }

  .bottom-lightning {
    bottom: 0;
    left: -11px;
  }
</style>

