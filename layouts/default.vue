<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand to="/"><app-logo /></b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Language" right>
              <b-dropdown-item :to="'/'+lang" v-for="lang in $store.state.languages" :key="lang">
                {{ lang }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container>
      <nuxt/>
    </b-container>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  mounted () {
    this.$store.dispatch('GET_INDEX')
  }
}
</script>

<style lang="scss">
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6,
.btn,
.nav,
.navbar-brand,
.card-link,
.pagination {
  font-family: 'Open Sans', "Helvetica Neue", Arial, sans-serif;
}
.dropdown-item {
  text-transform: capitalize;
}
.navbar {
  margin-bottom: 20px;
}
.card {
  margin-bottom: 20px;
  text-transform: capitalize;
  &:hover {
    transform: scale(1.01);
  }
}
</style>
