<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, t } = useI18n()
const groups = tm('gallery.groups')
const photos = tm('gallery.photos')

const activeId = ref(groups[0].id)
const previewIndex = ref(null)
const touchX = ref(0)

const activePhotos = computed(() => photos[activeId.value] || [])

function switchGroup(id) {
  activeId.value = id
  previewIndex.value = null
}

function openPreview(index = 0) {
  previewIndex.value = index
}

function closePreview() {
  previewIndex.value = null
}

function next() {
  const len = activePhotos.value.length
  if (len) previewIndex.value = (previewIndex.value + 1) % len
}

function prev() {
  const len = activePhotos.value.length
  if (len) previewIndex.value = (previewIndex.value - 1 + len) % len
}

function onTouchStart(event) {
  touchX.value = event.changedTouches[0].clientX
}

function onTouchEnd(event) {
  const dx = event.changedTouches[0].clientX - touchX.value
  if (dx < -30) next()
  else if (dx > 30) prev()
}
</script>

<template>
  <section
    id="gallery"
    class="flex h-[100dvh] snap-start flex-col justify-start overflow-y-auto px-6 pb-10 pt-20"
  >
    <header class="text-center">
      <h2 class="text-2xl font-semibold md:text-3xl">{{ $t('gallery.title') }}</h2>
      <p class="mt-2 text-ink-soft">{{ $t('gallery.subtitle') }}</p>
    </header>

    <!-- 分组切换 -->
    <div class="mt-8 flex flex-wrap justify-center gap-2">
      <button
        v-for="group in groups"
        :key="group.id"
        type="button"
        class="rounded-full px-4 py-2 text-sm transition"
        :class="
          activeId === group.id
            ? 'bg-rose-soft text-white'
            : 'bg-white/70 text-ink'
        "
        @click="switchGroup(group.id)"
      >
        {{ group.label }} · {{ group.subtitle }}
      </button>
    </div>

    <!-- 单张封面入口 -->
    <div class="mx-auto mt-8 w-full max-w-md">
      <button
        v-if="activePhotos.length"
        type="button"
        class="w-full"
        @click="openPreview(0)"
      >
        <div
          class="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-3xl bg-white/70"
        >
          <span class="text-6xl">🎸</span>
          <span class="absolute left-3 top-3 text-xs text-ink-soft">
            {{ $t('gallery.preview') }}
          </span>
        </div>
        <p class="mt-2 text-left text-sm text-ink-soft">{{ activePhotos[0] }}</p>
        <p class="mt-1 text-left text-xs text-ink-soft">
          {{ t('gallery.count', { n: activePhotos.length }) }}
        </p>
      </button>
    </div>

    <!-- 大图预览灯箱（左右滑动浏览） -->
    <div
      v-if="previewIndex !== null"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      @click="closePreview"
    >
      <div
        class="relative w-full max-w-sm"
        @click.stop
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button
          type="button"
          class="absolute -right-1 -top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"
          aria-label="close"
          @click="closePreview"
        >
          ×
        </button>

        <div
          class="flex aspect-[3/4] items-center justify-center rounded-3xl bg-gradient-to-br from-blush/60 to-cream"
        >
          <span :key="previewIndex" class="pluck text-7xl">🎸</span>
        </div>

        <p class="mt-3 text-center text-sm text-white">
          {{ activePhotos[previewIndex] }}
        </p>
        <p class="mt-1 text-center text-xs text-white/70">
          {{ previewIndex + 1 }} / {{ activePhotos.length }}
        </p>

        <button
          type="button"
          class="absolute left-0 top-1/2 flex h-9 w-9 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white"
          aria-label="prev"
          @click="prev"
        >
          ‹
        </button>
        <button
          type="button"
          class="absolute right-0 top-1/2 flex h-9 w-9 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white"
          aria-label="next"
          @click="next"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes pluck {
  0% {
    transform: rotate(0deg) scale(1);
  }
  30% {
    transform: rotate(-8deg) scale(1.08);
  }
  60% {
    transform: rotate(6deg) scale(1.04);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

.pluck {
  animation: pluck 0.6s ease-in-out;
}
</style>
