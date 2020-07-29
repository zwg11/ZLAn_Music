import VueRouter from 'vue-router'

const Discover = ()=> import ('views/discover/Discover.vue')
const TopList = ()=> import ('views/discover/childRouter/TopList.vue')
const PlayList = ()=> import ('views/discover/childRouter/PlayList.vue')
const DjRadio = ()=> import ('views/discover/childRouter/DjRadio.vue')
const Artist = ()=> import ('views/discover/childRouter/Artist.vue')
const Album = ()=> import ('views/discover/childRouter/Album.vue')
const Recommend = ()=> import ('views/discover/childRouter/Recommend.vue')
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'/discover'
  },
  {
    path: '/discover',
    component: Discover,
    children:[
      {
        path: '/',
        name: 'recommend',
        component: Recommend
      },
      {
        path: 'topList',
        name: 'topList',
        component: TopList
      },
      {
        path: 'playList',
        name: 'playList',
        component: PlayList
      },
      {
        path: 'djradio',
        name: 'djradio',
        component: DjRadio
      },
      {
        path: 'artist',
        name: 'artist',
        component: Artist
      },
      {
        path: 'album',
        name: 'album',
        component: Album
      },
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router