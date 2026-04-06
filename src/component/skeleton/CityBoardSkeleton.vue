<template>
  <section class="weather-hero-skeleton" aria-hidden="true">
    <!-- 維持與 CityBoard 相同的 aspect-ratio 撐開高度 -->
    <div class="skeleton-bg"></div>

    <div class="content">
      <!-- 左側：城市名稱 + 日期 -->
      <div class="location">
        <div class="skeleton-bar city-bar"></div>
        <div class="skeleton-bar date-bar"></div>
      </div>

      <div class="spacer"></div>

      <!-- 右側：天氣圖示 + 溫度 -->
      <div class="weather">
        <div class="skeleton-icon"></div>
        <div class="skeleton-bar temp-bar"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 純展示用 Skeleton，無任何 props
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as *;

// Shimmer 動畫
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}

%shimmer {
  background: linear-gradient(
    90deg,
    rgba($neutral-600, 0.6) 25%,
    rgba($neutral-300, 0.25) 50%,
    rgba($neutral-600, 0.6) 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.6s infinite linear;
  border-radius: 6px;
}

.weather-hero-skeleton {
  width: 100%;
  border-radius: 20px;
  overflow: visible;
  position: relative;
  background: linear-gradient(135deg, $blue-700 0%, $blue-500 100%);
  box-shadow: 0 8px 30px rgba(7, 7, 17, 0.4);
}

// 以 aspect-ratio 撐起與原 bg-image 相同的高度（800 × 286）
.skeleton-bg {
  width: 100%;
  aspect-ratio: 800 / 286;
  border-radius: 20px;
  display: block;
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 28px;
  z-index: 1;
}

.location {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spacer {
  flex: 1;
}

.weather {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 20px;
}

// 共用 shimmer bar
.skeleton-bar {
  @extend %shimmer;
  height: 20px;
}

.city-bar {
  width: 160px;
  height: 28px;
  border-radius: 8px;
}

.date-bar {
  width: 110px;
  height: 14px;
}

// 圓形圖示佔位
.skeleton-icon {
  @extend %shimmer;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  flex-shrink: 0;
}

.temp-bar {
  width: 80px;
  height: 64px;
  border-radius: 10px;
}

// ── Mobile ──────────────────────────────────────
@media (max-width: 480px) {
  .weather-hero-skeleton {
    border-radius: 12px;
  }

  .content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
  }

  .spacer {
    display: none;
  }

  .city-bar {
    width: 130px;
    height: 28px;
  }

  .skeleton-icon {
    width: 100px;
    height: 100px;
  }

  .temp-bar {
    width: 100px;
    height: 80px;
  }
}
</style>
