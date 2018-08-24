import JSSoup from 'jssoup';

export const state = () => ({
  'index': null
})

export const mutations = {
  SET_INDEX (state, payload) {
    state.index = payload
  }
}

export const actions = {
  async GET_INDEX ({ commit }) {
    const index_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTU13hf_Tas-gzvuAxeUUOZh6EO1eKjcVCGAMguAQeYgEAAaGCV4buvfCkr03kqdbYyu6ZNJlbQ_wzI/pubhtml?gid=1650406682&single=true"
    const index_data = await this.$axios.$get(index_url)
    const soup = new JSSoup(index_data)
    const headers = []
    const objects = []

    soup.nextElement.nextElement.contents[2].findAll('tr').forEach((elem, index) => {
      switch (index) {
        case 0: break;
        case 1:
          elem.contents.forEach((cell) => {
            if (cell.name === 'td') {
              if (cell.text.startsWith("Project")) {
                headers.push(cell.text)
              } else {
                headers.push(cell.text + ":PNG")
                headers.push(cell.text + ":PDF")
              }
            }
          })
          break;
        default:
          let obj = {}
          let cellid = 0
          elem.contents.forEach((cell) => {
            if (cell.name === 'td') {
              try {
                obj[headers[cellid]] = cell.contents[0].attrs.href
              } catch (err) {
                obj[headers[cellid]] = cell.text
              }
              cellid += 1
            }
          });
          objects.push(obj)
          break;
      }
    })
    commit('SET_INDEX', objects)
  }
}
