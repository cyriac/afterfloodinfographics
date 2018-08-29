<template>
  <div>
    <h1>Overview</h1>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab :title="lang +' (' + value.length + ')'" v-for="(value, lang) in table_data" :key="lang">
          <b-table responsive striped bordered hover :fields="table_fields" :items="value">
            <template slot="links" slot-scope="data">
              <b-row>
                <b-col>
                  <b-button-group size="sm">
                    <b-button target="_blank" :href="png" v-for="(png, index) in data.item.links.png" :key="index" variant="primary">
                      PNG <span v-if="data.item.links.png.length > 1">{{ index + 1 }}</span>
                    </b-button>
                  </b-button-group>
                </b-col>
                <b-col v-if="data.item.links.pdf">
                  <b-button target="_blank" :href="data.item.links.pdf" variant="danger" size="sm">
                    PDF
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'table_fields': ['id', 'title', 'links']
    }
  },
  computed: {
    table_data () {
      let table_data = {}
      this.$store.state.languages.forEach((lang) => {
        table_data[lang] = []
        this.$store.state.index.forEach(doc => {
          if (doc.languages && doc.languages[lang] !== undefined) {
            let _doc = Object.assign({}, doc)
            delete _doc['languages']
            delete _doc['slug']
            _doc['links'] = doc.languages[lang]
            table_data[lang].push(_doc)
          }
        })
      })
      return table_data
    }
  }
}
</script>
