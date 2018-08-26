<template>
  <div>
	  <div class="row image-outer-container" v-if="document">
	    <div class="col-8">
	    	<img class="full-width-image" :src="getimgurl(document[$route.params.language + ':png'])" v-if="document[$route.params.language + ':png'] !== null" />
	    </div>
	    <div class="col">
			<h2 class="section-header">{{ document['Project Description'] }}</h2>
			<p class="section-desc">Share on social media</p>
			<div class="row mb-40">
				<div class="col">
	  				<a class="btn sm-btn sm-facebook" :href="'https://www.facebook.com/sharer.php?caption=After Flood Infographics on' + document['Project Description'] + '&description=After Flood Infographics on' + document['Project Description'] + '&u=https://localhost:3000/#/' + $route.fullPath" target="_blank">Share</a>
				</div>
	  			<div class="col">
	  				<a class="btn sm-btn sm-twitter" :href="'https://www.facebook.com/sharer.php?caption=After Flood Infographics on' + document['Project Description'] + '&description=After Flood Infographics on' + document['Project Description'] + '&u=https://localhost:3000/#/' + $route.fullPath" target="_blank">Tweet</a>
				</div>
	  		</div>
	  		<p class="section-desc">This infographic is available in the following languages as well:</p>
	  		<div class="row">
	  			<div class="col">
	  				<nuxt-link :to="'/assamese/' + document['slug']" v-if="document['assamese:png']">
	  					<a class="card btn-card">Assamese</a>
	  				</nuxt-link>

	  				<nuxt-link :to="'/english/' + document['slug']" v-if="document['english:png']">
	  					<a class="card btn-card">English</a>
	  				</nuxt-link>

	  				<nuxt-link :to="'/hindi/' + document['slug']" v-if="document['hindi:png']">
	  					<a class="card btn-card">Hindi</a>
	  				</nuxt-link>

	  				<nuxt-link :to="'/kannada/' + document['slug']" v-if="document['kannada:png']">
	  					<a class="card btn-card">Kannada</a>
	  				</nuxt-link>

	  				<nuxt-link :to="'/malayalam/' + document['slug']" v-if="document['malayalam:png']">
	  					<a class="card btn-card">Malayalam</a>
	  				</nuxt-link>

	  				<nuxt-link :to="'/tamil/' + document['slug']" v-if="document['tamil:png']">
	  					<a class="card btn-card">Tamil</a>
	  				</nuxt-link>

	  			</div>
	  		</div>
	    </div>
	  </div>
  </div>
</template>


<script>
import getGoogleImgUrl from '~/plugins/filters'
import getGoogleID from '~/plugins/filters'

export default {
  methods:{
    getimgurl (drive_url) {
      return this.$options.filters.getGoogleImgUrl(this.$options.filters.getGoogleID(drive_url))
    }
  },
  computed: {


  	document(){
	    let documents
	    let item

		if (this.$store.state.index !== null) {

			for(var i = 0; i<this.$store.state.index.length; i++){
				if(this.$store.state.index[i].slug === this.$route.params.slug){
					item = this.$store.state.index[i];
					console.log(item);
				}
			}

		}
	  	return item;	

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
.image-outer-container{
	margin-top: 40px;
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
.mb-40{
	margin-bottom: 40px;
}
.btn-card{
	color: #007bff;
	font-size: 0.9em;
	padding: 10px 15px;
	display: inline-block;
	margin-right: 15px;
	margin-bottom: 15px;
}
</style>