<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        afterfloodinfographics
      </h1>
      <h2 class="subtitle">
        Infographics about flood rehabilitation
      </h2>
      <div class="links"> {{ $store.state.index }}</div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>
