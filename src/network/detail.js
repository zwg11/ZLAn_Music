import request from './request.js'

import {formatSecond} from "assets/Tools"
export function _getMusicListDetail(id){
    return request({
        url:'/playlist/detail',
        params:{
            id:id
        }
    })
}

/**获取歌曲url */
export function _getMusicUrl(id){
    return request({
        url:'/song/url',
        params:{
            id:id
        }
    })
}

/**获取歌词 */
export function _getLyric(id){
    return request ({
        url:'/lyric',
        params:{
            id:id
        }
    })
}

/**对歌单发表评论 */
export  function _pushCommend(cookie,id,content){
    return request({
        url:'/comment',
        params:{
            cookie:cookie,
            t:1,
            type:2,
            id:id,
            content:content,
        }
    })
}

/**获取歌单收藏者 */
export function _getSub(id,limit){
    return request({
        url:'/playlist/subscribers',
        params:{
            id:id,
            limit
        }
    })
}

/**歌单评论信息 */
export function _getRecommends(id,limit){
    return request({
        url:'/comment/playlist',
        params:{
            id:id,
            limit:limit
        }
    })
}

/**获取歌单歌曲信息 */
export function _getSongsDetail(arr){
    return request({
        url:'/song/detail',
        params:{
            ids:arr
        }
    })
}
/**对歌曲数据进行封装 */
export class songDetail{
    constructor(songs){
        this.id=songs.id;
        this.name=songs.name;
        this.album=songs.al.name;
        this.song=songs.ar[0].name;
        this.artistId = songs.ar[0].id
        this.pic=songs.al.picUrl;
        this.time=formatSecond(songs.dt/1000)
    }
}

/**对歌曲播放数据进行封装 */
export class songInf{
    constructor(songs){
        this.m_id=songs.id;
        this.m_name=songs.name;
        // this.album=songs[0].al.name;
        this.m_by=songs.ar[0].name;
        this.m_img=songs.al.picUrl;
        // this.m_url = url
        // this.time=formatSecond(songs[0].dt/1000)
    }
}

/**歌单基础信息 */
export class baseInfo{
    constructor(playlist, id){
        this.img=playlist.coverImgUrl;
        this.description=playlist.description;
        this.name=playlist.name;
        this.shareCount=playlist.shareCount;
        this.subscribedCount=playlist.subscribedCount;
        this.playCount=playlist.playCount;
        this.trackCount=playlist.trackCount;
        this.tags=playlist.tags[0];
        this.updateTime = playlist.updateTime;
        this.description = playlist.description
        this.commentCount = playlist.commentCount
        this.id = id;
    }
}