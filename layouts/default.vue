<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/"><app-logo /></b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="$store.state.languages">
            <template slot="button-content">
              <span v-if="$route.params.language">{{ $route.params.language }}</span>
              <span v-else>Select Language</span>
            </template>
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
    <footer class="text-center text-muted">
      <hr />
      <a v-b-tooltip.hover title="A crowd sourced data hub for all after flood precautions" class="text-muted" href="https://www.afterflood.in" target="_blank">#AfterFlood</a> •
      <a v-b-tooltip.hover title="Source code" class="text-muted" href="https://github.com/cyriac/afterfloodinfographics" target="_blank">Github</a> •
      <a v-b-tooltip.hover title="Images created by KeralaFloods Infographics" class="text-muted" href="https://www.facebook.com/KeralaFloodsInfo/" target="_blank">Facebook</a>
    </footer>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  head () {
    let ogmeta = []
    if (this.$route.params.slug === undefined){
      ogmeta = meta: [
          { name: "image", content: "https://res.cloudinary.com/dck5rpuat/image/upload/v1535380394/og-image.png" },
          { itemprop: "image", content: "https://res.cloudinary.com/dck5rpuat/image/upload/v1535380394/og-image.png" },
          { property: "og:image", content: "https://res.cloudinary.com/dck5rpuat/image/upload/v1535380394/og-image.png" },
          { property: "og:type", content: "website" },
          { property: "og:title", content: "After Flood Infographics" },
          { property: "og:description", content: "Concise, reliable and shareable infographics for health, environmental and social awareness during the time of rehabilitation after a natural disaster" },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]
    }
    return {
      titleTemplate: `%s | After Flood Infographics`,
      meta: ogmeta
    }
  },
  mounted () {
    // Redirect old /#/ urls to new urls
    if (this.$route.fullPath.startsWith("/#")) {
      try {
        this.$router.push(this.$route.fullPath.split("/#")[1])
      } catch (err) {}
    }
  }
}
</script>

<style lang="scss">
body {
  background: #F6F6F6;
}
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6, p,
.btn,
.nav,
.navbar-brand,
.card-link,
.pagination, a {
  font-family: 'Open Sans', "Helvetica Neue", Arial, sans-serif;
  color: #212529;
}
a {
  &:hover, &:focus, &:active {
    color: #212529;
  }
}
p {
  line-height: 1.6;
}
.dropdown-toggle, .dropdown-item, .breadcrumb-item {
  text-transform: capitalize;
}
.navbar {
  margin-bottom: 20px;
  & + .container {
    min-height: 70vh;
  }
}
footer {
  margin: 20px 0;
}
.breadcrumb {
  background: #ffffff;
  display: inline-flex;
}
.card {
  margin-bottom: 15px !important;
  border-radius: 4px;
  font-size: 1.0em !important;
  text-transform: capitalize;
  border: 1px solid #ddd;
  box-shadow: 0px 3px 7px rgba(0,0,0,0.05) !important;
  transition: all 0.1s ease-in;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 5px 15px rgba(0,0,0,0.1) !important;
  }
}
.card-img-bottom {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 1px solid #ddd;
}
.card-body {
  padding: 1em;
}
.card-title {
  font-size: 1.2em;
  margin:0;
}
.dropdown-item{
  outline: none;
}
</style>
