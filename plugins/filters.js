import Vue from 'vue'
import URI from 'urijs'

function getGoogleID(url) {
  let id = ""
  if (url !== null){
    let uri = URI(url)
    if (uri.search(true).id !== undefined) {
      id = uri.search(true).id
    } else {
      id = uri.segmentCoded(2)
    }
  } else {
    id = "null"
  }
  return id
}

function getGoogleImgUrl(id) {
  let url = ""
  if (id !== null){
    url = "https://drive.google.com/uc?export=view&id=" + id
  }
  return url
}


Vue.filter('getGoogleID', getGoogleID)
Vue.filter('getGoogleImgUrl', getGoogleImgUrl)
