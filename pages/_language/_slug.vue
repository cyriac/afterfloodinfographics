<template>
  <b-row>
    <b-col cols="12">
      <b-card v-if="document" :title="document['Project Description']">
        <b-img fluid :src="getimgurl(document[$route.params.language + ':png'])" v-if="document[$route.params.language + ':png']"/>
        {{ document[$route.params.language + ':png'] }} ==== {{ document[$route.params.language + ':pdf'] }}
      </b-card>
      <nuxt-link :to="'/' + $route.params.language + '/' + doc['slug']" v-if="documents.length > 0" v-for="doc in documents" :key="doc.slug">
        <b-card :title="doc['Project Description']" :img-src="getimgurl(doc[$route.params.language + ':png'])" img-bottom v-if="doc[$route.params.language + ':png'] !== null"></b-card>
        <b-card :title="doc['Project Description']" v-else></b-card>
      </nuxt-link>
    </b-col>
  </b-row>
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
  }
}
</script>
