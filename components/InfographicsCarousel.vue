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

<style lang="scss">
  .carousel-inner img{
    filter: grayscale(100%);
    border-radius: 0px;
  }
  .carousel-control-prev, .carousel-control-next{
    opacity: 0;
  }
  .carousel:hover .carousel-control-prev, .carousel:hover .carousel-control-next{
    opacity: 1;
  }
  .carousel-control-next-icon, .carousel-control-prev-icon {
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, .6);
    border-radius: 50%;
    position: relative;
    padding: 9px;
    text-align: center;
  }
  .carousel-control-next-icon:after{
    position: absolute;
    content: '';
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");


    background-size: 15px 15px;
    height: 15px;
    width: 15px;
    left: 14px;
    top: 12px;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .carousel-control-prev-icon:after {
    position: absolute;
    content: '';
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    background-size: 15px 15px;
    height: 15px;
    width: 15px;
    left: 12px;
    top: 12px;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
</style>
