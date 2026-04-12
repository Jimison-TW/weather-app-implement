<template>
  <section class="weather-hero-skeleton" aria-hidden="true">
    <!-- 以 aspect-ratio 維持與 CityBoard 相同高度 -->
    <div class="inner">
      <div class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <p class="label">Loading...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// 純展示用 Skeleton，無任何 props
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as *;

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

.weather-hero-skeleton {
  width: 100%;
  aspect-ratio: 800 / 286;
  border-radius: 20px;
  background-color: $neutral-700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: $neutral-0;
  opacity: 0.4;
  animation: dot-bounce 1.2s ease-in-out infinite;

  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
}

.label {
  font-family: $font-body;
  font-size: 13px;
  color: $neutral-300;
  letter-spacing: 0.02em;
}

@media (max-width: 480px) {
  .weather-hero-skeleton {
    border-radius: 12px;
  }
}
</style>
