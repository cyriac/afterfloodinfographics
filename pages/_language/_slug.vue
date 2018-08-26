<template>
  <div>
    <b-card>{{ $route.params.slug }}</b-card>
    <img :src="document" />
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

  document: 'Some text here'

}
</script>