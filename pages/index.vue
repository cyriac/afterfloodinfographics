<template>
  <b-row class="text-center">
    <b-col cols="12" class="card-columns">
      <nuxt-link v-if="$store.state.languages" v-for="lang in $store.state.languages" :key="lang" :to="lang">
        <b-card :title="lang"></b-card>
      </nuxt-link>
    </b-col>
  </b-row>
</template>
