<template>
  <transition name="fade">
    <div>
      <b-breadcrumb :items="breadcrumb_items"/>
      <b-row class="image-outer-container" v-if="document">
  	    <b-col cols="12" md="8">
          <no-ssr>
            <div>
      	    	<progressive-img class="full-width-image"
                               :src="getimgurl(document[$route.params.language + ':png'])"
                               v-if="document[$route.params.language + ':png'] !== undefined"
                               placeholder="https://res.cloudinary.com/dck5rpuat/image/upload/v1535287279/placeholder.png"/>
              <b-img src="https://res.cloudinary.com/dck5rpuat/image/upload/v1535287279/placeholder.png" class="full-width-image" v-else />
            </div>
          </no-ssr>
  	    </b-col>
        <b-col cols="12" md="4">
    			<h2 class="section-header">{{ document['Project Description'] }}</h2>
          <a :href="document[$route.params.language + ':pdf']"
             target="_blank"
             v-if="document[$route.params.language + ':pdf'] !== undefined">
            <span class="card btn-card mb-30">Download PDF</span>
          </a>
    			<p class="section-desc">Share on social media</p>
          <b-row class="mb-30">
    				<b-col>
    	  				<a class="btn sm-btn sm-facebook" :href="'https://www.facebook.com/sharer.php?caption=After Flood Infographics on' + document['Project Description'] + '&description=After Flood Infographics on' + document['Project Description'] + '&u=https://infographics.afterflood.in/#/' + $route.fullPath" target="_blank">Share</a>
    				</b-col>
            <b-col>
    	  				<a class="btn sm-btn sm-twitter" :href="'https://twitter.com/share?text=After Flood Infographics on' + document['Project Description'] + '&hashtags=AfterFlood, Infographics, KeralaFloods' + '&url=https://infographics.afterflood.in/#/' + $route.fullPath" target="_blank">Tweet</a>
    				</b-col>
          </b-row>
  	  		<b-row v-if="other_languages.length > 0">
            <b-col>
              <p class="section-desc">This infographic is available in the following languages as well:</p>
              <nuxt-link :to="'/' + lang + '/' + document['slug']" v-for="lang in other_languages" :key="lang">
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
      title: this.document['Project Description'] || "",
      meta: [
        { name: "image", content: this.document[this.$route.params.language+":png"] },
        { itemprop: "image", content: this.document[this.$route.params.language+":png"] },
        { property: "og:image", name: "og:image", content: this.document[this.$route.params.language+":png"] }
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
          text: this.document['Project Description'],
          active: true
        })
      }
      return items;
    },
    document () {
      let documents = []
      if (this.$store.state.index !== null) {
        documents = this.$store.state.index.filter((elem) => {
          return (elem[this.$route.params.language+":png"] !== null || elem[this.$route.params.language+":pdf"] !== null) && (elem['slug'] === this.$route.params.slug)
        })
        documents = documents.length !== 0 ? documents[0] : null
      }
      return documents
    },
    other_languages () {
      let other_languages = []
      Object.keys(this.document).forEach((key) => {
        if (key.endsWith(":png")){
          let value = this.document[key]
          let lang = key.split(":")[0]
          if (value !== null && lang !== this.$route.params.language) {
            other_languages.push(lang)
          }
        }
      })
      return other_languages;
    }
  }
}
</script>

<style lang="scss">
.full-width-image{
	width: 100%;
	border-radius: 4px;
	border: 1px solid #ddd;
	margin-bottom: 50px;
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
	color: #fff;
	font-weight: 600;
	text-decoration: none;
	&:hover{
		color: #fff;
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
