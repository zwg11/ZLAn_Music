import VueRouter from 'vue-router'

const Discover = ()=> import ('views/discover/Discover.vue')
const TopList = ()=> import ('views/discover/childRouter/TopList.vue')
const PlayList = ()=> import ('views/discover/childRouter/PlayList.vue')
const DjRadio = ()=> import ('views/discover/childRouter/DjRadio.vue')
const Artist = ()=> import ('views/discover/childRouter/Artist.vue')
const Album = ()=> import ('views/discover/childRouter/Album.vue')
const Recommend = ()=> import ('views/discover/childRouter/Recommend.vue')
const Detail = ()=> import ('views/albumdetail/Detail.vue')
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
        path: '/discover/topList',
        name: 'topList',
        component: TopList
      },
      {
        path: '/discover/playList',
        name: 'playList',
        component: PlayList
        
      },
      {
        path: '/discover/djradio',
        name: 'djradio',
        component: DjRadio
      },
      {
        path: '/discover/artist',
        name: 'artist',
        component: Artist
      },
      {
        path: '/discover/album',
        name: 'album',
        component: Album
      },
      {
        path:'/discover/playlist/detail',
        name: 'detail',
        component: Detail
      }
    ]
  },
  
  
  
]
const router = new VueRouter({
  routes
})
export default router