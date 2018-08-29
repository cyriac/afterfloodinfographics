let axios = require('axios')
let JSSoup = require('jssoup').default
let URI = require('urijs')
let yaml = require('js-yaml')


function get_index () {
  const index_url = "https://raw.githubusercontent.com/cyriac/afterfloodinfographics/index_yaml/assets/index.yml"
  return axios.get(index_url).then((response) => {
    let index_data = yaml.load(response.data)

    // reformat to old structure till we port the app
    index_data.forEach((elem, index) => {
      elem['slug'] = elem['title'].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').trim()
    })
    console.log(index_data)
    return index_data
  })
}

module.exports = {'get_index': get_index}
