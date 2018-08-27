<template>
  <transition name="fade">
  <b-row class="text-center">
    <b-col cols="12">
      <b-card-group columns>
        <nuxt-link v-if="$store.state.languages" v-for="lang in $store.state.languages" :key="lang" :to="lang">
          <b-card class="lang-card" :title="lang">
          	<img class="lang-img" :src="'/letters/' + lang.toLowerCase().trim() +'.png'">
          </b-card>
        </nuxt-link>
      </b-card-group>
    </b-col>
  </b-row>
  </transition>
</template>

<script>
export default{
	head () {
	    return {
	      title: "After Flood Infographics",
	      meta: [
	        { name: "image", content: "https://infographics.afterflood.in/og-image.png" },
	        { itemprop: "image", content: "https://infographics.afterflood.in/og-image.png" },
	        { property: "og:image", content: "https://infographics.afterflood.in/og-image.png" },
	        { property: "og:type", content: "website" },
	        { property: "og:title", content: "After Flood Infographics" },
	        { property: "og:description", content: "Concise, reliable and shareable infographics for health, environmental and social awareness during the time of rehabilitation after a natural disaster" },
	        { property: "og:image:width", content: "1200" },
	        { property: "og:image:height", content: "630" },
	      ]
	    }
	},

	computed: {
	  searchInLowerCase() {
	    return this.search.toLowerCase().trim();
	  }
	}
}
</script>

<style lang="scss">
.lang-card{
	height: 150px;
	.card-body{
		position:relative;
		.lang-img{
			position:absolute;
	    right: 20px;
    	top: 20px;
    	opacity: 0.5;
		}
		.card-title{
			text-align: left;
			margin-top:40px;
			padding-left: 10px;
		}
	}
}
</style>
