let axios = require('axios')
let JSSoup = require('jssoup').default
let URI = require('urijs')
let yaml = require('js-yaml')


function get_index () {
  const index_url = "https://raw.githubusercontent.com/cyriac/afterfloodinfographics/master/assets/index.yml"
  return axios.get(index_url).then((response) => {
    let index_data = yaml.load(response.data)

    index_data.projects.forEach((elem, index) => {
      elem['slug'] = elem['title'].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').trim()
    })

    return index_data
  })
}

module.exports = {'get_index': get_index}
