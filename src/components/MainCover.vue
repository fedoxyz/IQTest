<script setup>
import { ref, defineEmits } from 'vue';
import arrowUp from "../assets/arrow-up.svg";
import Button from './buttons/Button.vue';
import background from '../assets/cover_bg.jpeg'
import logo from "../assets/logo.png"
</script>

<template>
  <div class="cover-container" v-bind:style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="top-content">
      <h2>Пройдите точный и быстрый</h2>
      <h1>Тест на определение IQ</h1>
    </div>
    <div class="center-content">
      <img class="brain" :src="logo">
    </div>
    <div class="bottom-content">
      <Button href="/test" text="Пройти тест" :isActive="true"/>
      <div class="cover-text">
        <span class="highlight">
          <span>И получите рекомендации</span> 
          <span>по развитию своего интеллекта</span>
        </span> 
        <span>и улучшению финансового</span>
        <span>благосостояния и личной жизни</span>
      </div>
    </div>
    <div class="more"><img :src="arrowUp">Подробнее</div>
  </div>
</template>

<style scoped>
  h1 {
    font-family: 'Yeseva One';
    text-transform: uppercase;
    color: #f4cf0d;
    font-size: 32px;
   width: 80%;
    margin: 0;
    letter-spacing: 1px;
  }

.cover-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-size: cover;
  background-position: center;
  text-align: center;
}

  .top-content, .center-content, .bottom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .top-content {
    margin-top: 10vh;
  }

  .center-content {
    flex-grow: 1;
    justify-content: center;
  }

  .bottom-content {
    margin-bottom: 20%;
  }

  .highlight {
    color: #f4cf0d;
  }
  h2 {
    font-family: "Pt Serif";
    font-size: 21px;
    letter-spacing: 0.08rem;
    line-height: 24px;
    font-weight: 300
  }

  .cover-text {
    font-family: "PT Serif";
    font-size: 21px;
    line-height: 19px;
    letter-spacing: 0.05rem;
    text-align: center;
    line-height: 20px;
    padding-top: 13px;
    padding-bottom: 13px;
  }
  
  .cover-text span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
}
  .more {
    position: absolute;
    bottom: 0.7rem;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: white;
    align-items: center;
  }

  .more img {
    width: 20px;
  }

  .brain {
    width: 13rem;
    filter: drop-shadow(0 0 100px rgba(130, 130, 250, 0.9));
    width: clamp(10rem, 50vw, 15rem);
}

</style>

