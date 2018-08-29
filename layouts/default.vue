<template>
  <div class="animated fadeIn">
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
    <div class="gradient-overlay">
      <b-container>
        <footer class="text-right text-muted">
          <a v-b-tooltip.hover title="A crowd sourced data hub for all after flood precautions" class="text-muted" href="https://www.afterflood.in" target="_blank">#AfterFlood</a> •
          <a v-b-tooltip.hover title="Source code" class="text-muted" href="https://github.com/cyriac/afterfloodinfographics" target="_blank">Github</a> •
          <a v-b-tooltip.hover title="Images created by KeralaFloods Infographics" class="text-muted" href="https://www.facebook.com/KeralaFloodsInfo/" target="_blank">Facebook</a> •
          <nuxt-link v-b-tooltip.hover title="See an overview of all infographics" class="text-muted" to="/list/">Overview</nuxt-link>
        </footer>
      </b-container>
    </div>
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
      ogmeta = [
          { name: "image", content: "https://infographics.afterflood.in/ogheader.png" },
          { itemprop: "image", content: "https://infographics.afterflood.in/ogheader.png" },
          { property: "og:image", content: "https://infographics.afterflood.in/ogheader.png" },
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
  padding-bottom: 15vh;
}
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6, p,
.nav,
.navbar-brand,
.card-link,
.pagination, a {
  font-family: 'Open Sans', "Helvetica Neue", Arial, sans-serif;
  color: #212529;
}
.btn {
  font-family: 'Open Sans', "Helvetica Neue", Arial, sans-serif;
}
a {
  &:hover, &:focus, &:active {
    color: #212529;
  }
}
p {
  line-height: 1.6;
}
.gradient-overlay {
  width: 100%;
  text-align: center;
  height: 15vh;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f6f6f6+0,ffffff+75&0+0,1+75 */
  background: -moz-linear-gradient(top, rgba(246,246,246,0) 0%, rgba(255,255,255,1) 75%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(246,246,246,0) 0%,rgba(255,255,255,1) 75%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(246,246,246,0) 0%,rgba(255,255,255,1) 75%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00f6f6f6', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
  & + div {
    position: relative;
  }
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
  margin: 10vh 0;
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
.card-columns {
  .card {
    display: inline-flex;
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
<style>
  @import '~/static/css/animate.css';
</style>
