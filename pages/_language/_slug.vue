<template>
  <transition name="fade">
    <div class="animated fadeIn">
      <b-breadcrumb :items="breadcrumb_items"/>
      <b-row class="image-outer-container" v-if="document">
  	    <b-col cols="12" md="8">
          <no-ssr>
            <div>
              <div v-for="(png, index) in document.languages[$route.params.language].png"
                   :key="index"
                   v-if="document.languages !== undefined && document.languages[$route.params.language] !== undefined && document.languages[$route.params.language].png.length > 0">
                   <progressive-img class="full-width-image"
                                    :src="getimgurl(png)"
                                    placeholder="/placeholder.png"/>
              </div>
            </div>
          </no-ssr>
  	    </b-col>
        <b-col cols="12" md="4">
    			<h2 class="section-header">{{ document.title }}</h2>
          <a :href="document.languages[$route.params.language].pdf"
             target="_blank"
             v-if="document.languages[$route.params.language].pdf !== undefined">
            <span class="card btn-card mb-30">Download PDF</span>
          </a>
    			<p class="section-desc">Share on social media</p>
          <b-row class="mb-30">
    				<b-col>
    	  			<a class="btn sm-btn sm-facebook" :href="'https://www.facebook.com/sharer.php?caption=After Flood Infographics on' + document.title + '&description=After Flood Infographics on ' + document.title + '&u=https://infographics.afterflood.in/' + $route.fullPath" target="_blank">Share</a>
    				</b-col>
            <b-col>
    	  			<a class="btn sm-btn sm-twitter" :href="'https://twitter.com/share?text=After Flood Infographics on ' + document.title + '&hashtags=AfterFlood, Infographics, KeralaFloods' + '&url=https://infographics.afterflood.in/' + $route.fullPath" target="_blank">Tweet</a>
    				</b-col>
          </b-row>
  	  		<b-row v-if="other_languages.length > 0">
            <b-col>
              <p class="section-desc">This infographic is available in the following languages as well:</p>
              <nuxt-link :to="'/' + lang + '/' + document.slug" v-for="lang in other_languages" :key="lang">
                <span class="card btn-card">{{ lang }}</span>
              </nuxt-link>
            </b-col>
	  		  </b-row>
  	    </b-col>
  	  </b-row>
    </div>
	</transition>
</template>


<script>
import getGoogleImgUrl from '~/plugins/filters'
import getGoogleID from '~/plugins/filters'
export default {
  head () {
    return {
      title: this.document.title || "",
      meta: [
        { name: "image", content: this.document.languages[this.$route.params.language].png[0] },
        { itemprop: "image", content: this.document.languages[this.$route.params.language].png[0] },
        { property: "og:image", content: this.document.languages[this.$route.params.language].png[0] },
        { property: "og:type", content: "website" },
        { property: "og:title", content: this.document.title || "" },
        { property: "og:description", content: "After Flood Infographics on " + (this.document.title || "") },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
      ]
    }
  },
  methods:{
    getimgurl (drive_url) {
      return this.$options.filters.getGoogleImgUrl(this.$options.filters.getGoogleID(drive_url))
    }
  },
  computed: {
    breadcrumb_items () {
      let items = [{
          text: 'Home',
          to: '/'
        }, {
          text: this.$route.params.language,
          to: '/' + this.$route.params.language
      }]
      if (this.document !== null) {
        items.push({
          text: this.document.title,
          active: true
        })
      }
      return items;
    },
    document () {
      let documents = []
      if (this.$store.state.index !== null) {
        documents = this.$store.state.index.filter((elem) => {
          let val = false
          if (elem['slug'] === this.$route.params.slug) {
            if (elem.languages !== undefined && elem.languages !== null) {
              if (Object.keys(elem.languages).includes(this.$route.params.language)) {
                val = true
              }
            }
          }
          return val
        })
        documents = documents.length !== 0 ? documents[0] : null
      }
      return documents
    },
    other_languages () {
      return Object.keys(this.document.languages)
    }
  }
}
</script>

<style lang="scss">
.full-width-image{
	width: 100%;
	border-radius: 4px;
	border: 1px solid #ddd;
}
.section-header{
	font-size: 2em;
	margin-bottom: 25px;
}
.section-desc{
	font-size: 1.0em;
	margin-bottom: 15px;
}
.sm-btn, {
	display: block;
	padding: 15px;
	border-radius: 4px;
	text-align:center;
	color: #fff !important;
	font-weight: 600;
	text-decoration: none;
	&:hover, &:visited, &:focus{
		color: #fff !important;
		text-decoration: none;
	}
}
.sm-facebook{
	background: #3B5998
}
.sm-twitter{
	background: #41aded;
}
.btn-card{
	color: #212529;
	font-size: 0.9em;
	padding: 10px 15px;
	display: inline-block;
	margin-right: 15px;
	margin-bottom: 10px !important;
}
.mb-30{
	margin-bottom: 30px !important;
}
</style>
