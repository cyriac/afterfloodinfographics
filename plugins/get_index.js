let axios = require('axios')
let JSSoup = require('jssoup').default
let URI = require('urijs')


export function get_index () {
  const index_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTU13hf_Tas-gzvuAxeUUOZh6EO1eKjcVCGAMguAQeYgEAAaGCV4buvfCkr03kqdbYyu6ZNJlbQ_wzI/pubhtml?gid=1650406682&single=true"
  return axios.get(index_url).then((response) => {
    let index_data = response.data
    const soup = new JSSoup(index_data)
    let headers = []
    let objects = []

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
              console.log(cell.contents)
              let value = null
              try {
                value = cell.contents[0].attrs.href
                let uri = URI(value)
                value = uri.search(true)["q"]
              } catch (err) {
                console.log(err)
                value = cell.text
              }
              value = value.length === 0 ? null : value
              obj[headers[cellid]] = value
              cellid += 1
            }
          });
          let slug = null
          if (obj["Project Description"] !== null) {
            obj["Project Description"] = obj["Project Description"].trim()
            slug = obj["Project Description"].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').trim()
          }
          if (slug !== null){
            obj['slug'] = slug
            objects.push(obj)
          }
          break;
      }
    })

    return objects
  })
}
