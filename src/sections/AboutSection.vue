<script setup></script>

<template>
  <section
    id="about"
    class="flex h-[100dvh] snap-start flex-col justify-start overflow-y-auto px-6 pb-10 pt-20"
  >
    <header class="text-center">
      <h2 class="text-2xl font-semibold md:text-3xl">{{ $t('about.title') }}</h2>
      <p class="mt-2 text-ink-soft">{{ $t('about.subtitle') }}</p>
    </header>
    <div class="mx-auto mt-10 w-full max-w-md space-y-4 text-sm text-ink-soft">
      <p>赛车 = 少年速度与热爱</p>
      <p>吉他 = 舞台初心与温柔旋律</p>
      <p>小黑猫 = 长久陪伴治愈</p>
      <p>土豆 = 可爱温柔反差萌</p>
    </div>
  </section>
</template>
