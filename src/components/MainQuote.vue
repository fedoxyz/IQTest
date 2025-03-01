<script setup>
import { ref, defineEmits } from 'vue';
import quotes from "../assets/quotes.png";
import Button from './buttons/Button.vue';
import background from "../assets/quotes-bg.png"
</script>

<template>
   <div class="quote-container" v-bind:style="{ backgroundImage: 'radial-gradient(circle, rgb(41 80 194) 0%, rgb(38 91 199 / 37%) 60%, rgba(39, 98, 187, 0) 100%), url(' + background + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">
    <img class="quote" style="margin-right:auto; " :src="quotes">
    <div class="quote-text">
      Профессиональный IQ-тест позволяет не только определить коэффициент вашего интеллекта, но и выработать список рекомендаций для повышения этого показателя.
    </div>
    <img class="quote" style="transform: rotate(180deg) translateX(15px); margin-left: auto;" :src="quotes">
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');

.quote-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #2950C2 0%, #265BC7F5 60%, #2762BB00 100%);
  height: 50vh;
  padding: 20px; /* Added padding */
  text-align: center;
}

.quote {
  width: 30px;
}

.quote-text {
  font-family: 'Yeseva One', cursive;
  font-size: 20px; 
  color: white;
  max-width: 72%; 
  margin: 5px 0px; 
  letter-spacing: 0.02rem;
  line-height: 26px;
}
</style>

