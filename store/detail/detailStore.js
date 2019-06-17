import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = !process.browser
//服务端渲染时设置useStaticRendering为true;
//避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次。
useStaticRendering(isServer)

class DetailStore {

    @observable songInfo;
    @observable songList;
    constructor(isServer, initialData={}) {
        this.songInfo = {};
        this.songList = {};
    }

    @action
    updateData = (data) => {
        // console.log("@data",data);
        this.songInfo = data.songInfo;
        this.songList = data.songList;
    }

    @action
    clearData = (data) => {
        this.songInfo = '';
        this.songList = {};
    }
}

let detailStore = null;
export function detailInitializeStore(initialData) {
    //如果是服务端，则始终创建新store，否则请求之间共享状态
    if (isServer) {
        return new DetailStore(isServer, initialData)
    }
    if (detailStore === null) {
        detailStore = new DetailStore(isServer, initialData)
    }
    return detailStore
}
