<template>
  <footer ref="footer" class="footer">
    TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT.  
    PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI,  
    SI ACCEPTATI TOTI TERMENII SI CONDITIILE NOASTRE.  
    ORICE UTILIZARE NEAUTORIZATA ESTE INTERZISA.  
  </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";

const footer = ref(null);

onMounted(() => {
  const setFooterPosition = () => {
    if (footer.value) {
      const computedStyle = getComputedStyle(footer.value);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const visibleLines = 1.5;

      // Get the height of the content and calculate the offset
      const fullHeight = footer.value.scrollHeight;
      const visibleHeight = lineHeight * visibleLines;

      // Calculate how much content to hide (based on the screen size and the font)
      const hiddenHeight = fullHeight - visibleHeight;

      // Calculate dynamic position for bottom based on window height
      const bottomOffset = hiddenHeight > 0 ? hiddenHeight : 0;
      footer.value.style.bottom = `-${bottomOffset}px`;
    }
  };

  setFooterPosition();
  window.addEventListener("resize", setFooterPosition);
});
</script>

<style scoped>
.footer {
  width: 100%;
  position: absolute;
  color: #ffffff9e;
  font-size: 10px;
  line-height: 1.6;
  letter-spacing: 2px;
  text-align: center;
  transition: bottom 0.3s ease-in-out;
  overflow: hidden;
  white-space: pre-line;
}
</style>

