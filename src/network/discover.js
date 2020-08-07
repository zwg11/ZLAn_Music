import request from './request'

/**获取轮播图数据 */
export function _getBanner(){
    return request({
        url:'/banner',
        params:{
          type:0
        }
    })
}
/**推荐歌单 */
export function _getPersonalized(config){
    return request({
        url:'/personalized',
        params:{
            limit:config
        }
    })
}

/**独家放送 */
export function _getPrivateContent(){
    return request({
        url:"/personalized/privatecontent"
    })
}

/**获取每日新歌 */
export function _getNewSong(){
    return request({
        url:'/personalized/newsong',
    })
}

/**获取每日推荐歌单  需要登陆*/
export function _getRecommendResource(cookie,uid){
    return request({
        url:'/recommend/songs',
        params:{
            cookie:cookie,
            uid:uid
        }
    })
}

/**获取热门歌单 */
export function _getMusicListHot(){
    return request({
        url:'/playlist/hot',
    })
}

/**获取不同tag的精品歌单 */
export function _getHighquality(cat,limit){
    return request({
        url:'/top/playlist/highquality',
        params:{
            cat:cat,
            limit:limit,
            time:new Date().getTime()
        }
    })
}

/**获取排行榜数据 */
export function _getRankList(){
    return request({
        url:'/toplist',
    })
}

/**歌手 */
export function _getArtist(area,type,limit){
    return request({
        url:'/artist/list',
        params:{
            area:area,
            type:type,
            limit:limit
        }
    })
}

/**最新歌曲 */
export function _getTopSongs(type){
    return request({
        url:'/top/song',
        params:{
            type:type
        }
    })
}
/**新碟上架 */
export function _getAllNewRecords(payload){
    return request({
        url:'/top/album',
        params:{
            limit:payload.limit || 10,
            offset: payload.offset ? payload.offset:0,
            area: payload.area || 'ZH',
            type: payload.type || 'hot',
        }
    })
}
/**新碟上架 */
export function _getNewRecords(){
    return request({
        url:'/album/newest'
    })
}
/**获取榜单摘要 */
export function _getTopLists(){
    return request({
        url:'/toplist/detail'
    })
}
/** 获取热门歌手 */
export function _getTopArtists(limit=30,offset=0){
    return request({
        url: '/top/artists',
        params:{
            limit,
            offset
        }
    })
}
/** 获取热门主播 */
export function _getTopAnchors(limit=30){
    return request({
        url: '/dj/toplist/popular',
        params:{
            limit
        }
    })
}