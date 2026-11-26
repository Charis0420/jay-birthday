<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const tmis = tm('racing.tmis')

const flipped = ref(false)
const current = ref(null)

function randomIndex() {
  const len = tmis.length
  if (len === 0) return 0
  let i = Math.floor(Math.random() * len)
  if (len > 1 && i === current.value) i = (i + 1) % len
  return i
}

function flipCard() {
  if (flipped.value) return
  current.value = randomIndex()
  flipped.value = true
}

function again() {
  flipped.value = false
  setTimeout(() => {
    current.value = randomIndex()
    flipped.value = true
  }, 300)
}
</script>

<template>
  <section
    id="racing"
    class="flex h-[100dvh] snap-start flex-col justify-start overflow-y-auto px-6 pb-10 pt-20"
  >
    <header class="text-center">
      <h2 class="text-2xl font-semibold md:text-3xl">{{ $t('racing.title') }}</h2>
      <p class="mt-2 text-ink-soft">{{ $t('racing.subtitle') }}</p>
    </header>

    <div class="mx-auto mt-10 w-full max-w-md">
      <div class="h-72 w-full [perspective:1200px]" @click="flipCard">
        <div
          class="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
          :class="flipped ? '[transform:rotateY(180deg)]' : ''"
        >
          <!-- 卡面：正面 -->
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl border border-red-900/40 bg-gradient-to-br from-[#2a1616] to-[#160d0d] text-white [backface-visibility:hidden]"
          >
            <span class="absolute right-4 top-4 text-2xl">🏁</span>
            <div class="text-5xl">🏎️</div>
            <p class="tracking-[0.3em] text-red-200/80">{{ $t('racing.front') }}</p>
            <p class="text-xs text-white/50">{{ $t('racing.hint') }}</p>
          </div>

          <!-- 卡面：背面（TMI） -->
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl border border-red-900/40 bg-gradient-to-br from-[#3a1a1a] to-[#1d0f0f] p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <p class="text-xs tracking-widest text-red-200/80">TMI</p>
            <p class="text-center text-sm leading-relaxed">
              {{ current !== null ? tmis[current] : '' }}
            </p>
            <button
              type="button"
              class="mt-2 rounded-full border border-red-300/40 px-5 py-2 text-xs text-red-100 transition hover:bg-white/10"
              @click.stop="again"
            >
              {{ $t('racing.again') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
