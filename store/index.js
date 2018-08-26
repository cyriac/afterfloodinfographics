import JSSoup from 'jssoup';
import URI from 'urijs';

export const state = () => ({
  'index': null,
  'languages': null
})

export const mutations = {
  SET_INDEX (state, payload) {
    state.index = payload['index']
    state.languages = payload['languages']
  }
}

export const actions = {
  async GET_INDEX ({ commit }) {
    const index_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTU13hf_Tas-gzvuAxeUUOZh6EO1eKjcVCGAMguAQeYgEAAaGCV4buvfCkr03kqdbYyu6ZNJlbQ_wzI/pubhtml?gid=1650406682&single=true"
    const index_data = await this.$axios.$get(index_url)
    const soup = new JSSoup(index_data)
    let headers = []
    let objects = []
    let languages = []

    soup.nextElement.nextElement.contents[2].findAll('tr').forEach((elem, index) => {
      switch (index) {
        case 0: break;
        case 1:
          elem.contents.forEach((cell) => {
            if (cell.name === 'td') {
              if (cell.text.startsWith("Project")) {
                headers.push(cell.text)
              } else {
                let lang = cell.text.toLowerCase()
                headers.push(lang + ":png")
                headers.push(lang + ":pdf")
              }
            }
          })
          break;
        default:
          let obj = {}
          let cellid = 0
          elem.contents.forEach((cell) => {
            if (cell.name === 'td') {
              let value = null
              try {
                value = cell.contents[0].attrs.href
                let uri = URI(value)
                value = uri.search(true)["q"]
              } catch (err) {
                value = cell.text
              }
              value = value.length === 0 ? null : value
              obj[headers[cellid]] = value
              cellid += 1
            }
          });
          let slug = null
          if (obj["Project Description"] !== null) {
            slug = obj["Project Description"].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').trim()
          }
          if (slug !== null){
            obj['slug'] = slug
            objects.push(obj)
          }
          break;
      }
    })

    objects.forEach((obj) => {
      Object.keys(obj).forEach((elem) => {
        if (!elem.startsWith("Project") && elem !== 'slug') {
          let lang = elem.split(":")[0]
          let value = obj[elem]
          if (value !== null && !languages.includes(lang)) {
            languages.push(lang)
          }
        }
      })
    })

    commit('SET_INDEX', {'index': objects, 'languages': languages})
  }
}
