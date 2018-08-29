const index = require('./plugins/get_index')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'After Flood Infographics',
    script :[
      { src:"https://code.jquery.com/jquery-3.2.1.slim.min.js", integrity:"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN", crossorigin:"anonymous" },
      { src:"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js", integrity:"sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q", crossorigin:"anonymous" },
      { src:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", integrity:"sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl", crossorigin:"anonymous" },
      { src:"https://unpkg.com/shards-ui@2.0.3/dist/js/shards.min.js" }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Concise, reliable and shareable infographics for health, environmental and social awareness during the time of rehabilitation after a natural disaster' },
      { name: "og:type", content: "website" },
      { name: "msapplication-TileColor", content: "#ffffff" },
      { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel:'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"apple-touch-icon", sizes:"57x57", href:"/apple-icon-57x57.png" },
      { rel:"apple-touch-icon", sizes:"60x60", href:"/apple-icon-60x60.png" },
      { rel:"apple-touch-icon", sizes:"72x72", href:"/apple-icon-72x72.png" },
      { rel:"apple-touch-icon", sizes:"76x76", href:"/apple-icon-76x76.png" },
      { rel:"apple-touch-icon", sizes:"114x114", href:"/apple-icon-114x114.png" },
      { rel:"apple-touch-icon", sizes:"120x120", href:"/apple-icon-120x120.png" },
      { rel:"apple-touch-icon", sizes:"144x144", href:"/apple-icon-144x144.png" },
      { rel:"apple-touch-icon", sizes:"152x152", href:"/apple-icon-152x152.png" },
      { rel:"apple-touch-icon", sizes:"180x180", href:"/apple-icon-180x180.png" },
      { rel:"icon", type:"image/png", sizes:"192x192",  href:"/android-icon-192x192.png" },
      { rel:"icon", type:"image/png", sizes:"32x32", href:"/favicon-32x32.png" },
      { rel:"icon", type:"image/png", sizes:"96x96", href:"/favicon-96x96.png" },
      { rel:"icon", type:"image/png", sizes:"16x16", href:"/favicon-16x16.png" },
      { rel:"manifest", href:"/manifest.json" },
      { rel:"stylesheet", href:"https://fonts.googleapis.com/css?family=Open+Sans:400,700"},
      { rel:"stylesheet", href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css", integrity:"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm", crossorigin:"anonymous" },
      { rel:"stylesheet", href:"https://unpkg.com/shards-ui@2.0.3/dist/css/shards.min.css"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FFFFFF' },
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-54992966-4'
    }],
    '@nuxtjs/axios',
    ['bootstrap-vue/nuxt', { css: false }],
  ],
  plugins: [
    '~/plugins/filters.js',
    { src: '~/plugins/vue-progressive-image.js', ssr: false},
  ],
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: [
        'es2015',
        'stage-0'
      ],
      plugins: [
        ["transform-runtime", {
          "polyfill": true,
          "regenerator": true
        }]
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    optimization: {
      splitChunks: {
        name: true
      }
    },
    extractCSS: { allChunks: true },
    maxChunkSize: 300000
  },
  generate: {
    routes: async function () {
       let objects = await index.get_index()
       let routes = []

       objects.forEach((elem) => {
         if (elem.languages !== undefined && Object.keys(elem.languages).length > 0) {
           let languages = Object.keys(elem.languages)
           languages.forEach((lang) => {
             if (!routes.includes(lang)) {
               routes.push('/' + lang)
             }
             let slug_url = '/' + lang + '/' + elem.slug
             if (!routes.includes(slug_url)) {
               routes.push(slug_url)
             }
           })
         }
       })
       return routes
    }
  }
}
