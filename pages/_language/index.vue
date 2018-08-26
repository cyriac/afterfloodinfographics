<template>
  <transition name="fade">
    <b-row>
      <b-col cols="12">
        <b-row class="justify-content-between">
          <b-col cols="12" md="6">
            <b-breadcrumb :items="breadcrumb_items"/>
          </b-col>
          <b-col cols="12" md="3">
            <input class="w-100 form-control" v-model="search" placeholder="Search"/>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="card-columns">
        <nuxt-link :to="'/' + $route.params.language + '/' + doc['slug']" v-if="documents.length > 0" v-for="doc in documents" :key="doc.slug">
          <b-card :img-src="getimgurl(doc[$route.params.language + ':png'])" img-bottom v-if="doc[$route.params.language + ':png'] !== null" class="card-no-title"></b-card>
          <b-card :title="doc['Project Description']" v-else></b-card>
        </nuxt-link>
      </b-col>
    </b-row>
  </transition>
</template>

<script>
import getGoogleImgUrl from '~/plugins/filters'
import getGoogleID from '~/plugins/filters'

export default {
  data () {
    return {
      search: ""
    }
  },
  head () {
    let lang = this.$route.params.language
    lang = lang.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
    return {
      'title': lang
    }
  },
  methods:{
    getimgurl (drive_url) {
      return this.$options.filters.getGoogleImgUrl(this.$options.filters.getGoogleID(drive_url))
    }
  },
  computed: {
    breadcrumb_items () {
      return [{
          text: 'Home',
          to: '/'
        }, {
          text: this.$route.params.language,
          active: true
        }]
    },
    documents () {
      let documents = []
      if (this.$store.state.index !== null) {
        documents = this.$store.state.index.filter((elem) => {
          return (elem[this.$route.params.language+":png"] !== null || elem[this.$route.params.language+":pdf"] !== null)
        })
      }
      if (this.search.length > 0) {
        let search_val = this.search.toLowerCase().replace(/\s+/g, '').trim()
        documents = documents.filter((elem) => {
          let search_slug = elem['slug'].replace(/\-/g, '')
          return search_slug.includes(search_val)
        })
      }
      return documents
    }
  }
}
</script>

<style scoped lang="scss">
.card-no-title {
  .card-body {
    display: none;
  }
  .card-img-bottom {
    border-top: 0;
    filter: grayscale(100%);
    margin-bottom: -30px;
  }
  &:hover, &:focus, &:active {
    .card-img-bottom {
      filter: grayscale(0);
    }
  }
}
</style>
