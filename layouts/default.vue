<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand to="/"><app-logo /> After Floods Infographics</b-navbar-brand>
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
.dropdown-item {
  text-transform: capitalize;
}
</style>
