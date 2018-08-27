<template>
  <transition name="fade">
  <b-row class="text-center">
    <b-col cols="12">
      <b-card-group columns>
        <nuxt-link v-if="$store.state.languages" v-for="lang in $store.state.languages" :key="lang" :to="lang">
          <b-card class="lang-card" :title="lang">
          	<img class="lang-img" :src="'https://res.cloudinary.com/dck5rpuat/image/upload/v1535347620/letters/' + lang.toLowerCase().trim() +'.png'">
          </b-card>
        </nuxt-link>
      </b-card-group>
    </b-col>
  </b-row>
  </transition>
</template>

<script>
export default{
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
