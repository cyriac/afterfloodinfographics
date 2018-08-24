<template>
  <b-row class="text-center">
    <b-col cols="12" sm="6" offset-sm="3">
      <nuxt-link v-if="$store.state.languages" v-for="lang in $store.state.languages" :key="lang" :to="lang">
        <b-card>
          {{ lang }}
        </b-card>
      </nuxt-link>
    </b-col>
  </b-row>
</template>


<style lang="scss" scoped>
.card {
  margin-top: 20px;
  margin-bottom: 20px;
  text-transform: capitalize;
  &:hover {
    transform: scale(1.01);
  }
}
</style>
