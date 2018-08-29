<template>
  <div>
    <b-carousel id="image-carousal"
      controls
      indicators
      :interval="0"
      v-model="slide"
      v-if="images.length > 0">
        <b-carousel-slide v-for="(png, index) in images"
                          :key="index"
                          :img-src="getimgurl(png)" />
        <b-carousel-slide v-for="(png, index) in images"
                          :key="'asd'+index"
                          :img-src="getimgurl(png)" />
    </b-carousel>
    <b-img :src="getimgurl(images[0])" class="full-width-image" v-else/>
  </div>
</template>

<script>
import getGoogleImgUrl from '~/plugins/filters'
import getGoogleID from '~/plugins/filters'

export default {
  props: ['images'],
  data () {
    return {
      slide: 0,
    }
  },
  methods: {
    getimgurl (drive_url) {
      return this.$options.filters.getGoogleImgUrl(this.$options.filters.getGoogleID(drive_url))
    }
  }
}
</script>
