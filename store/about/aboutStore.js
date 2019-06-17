import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = !process.browser
//服务端渲染时设置useStaticRendering为true;
//避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次。
useStaticRendering(isServer)

class AboutStore {

    @observable title;
    @observable info;
    constructor(isServer, initialData={}) {
        this.title = '';
        this.info = '';
    }

    @action
    updateData = (data) => {
        // console.log("@data",data);
        this.title = data.title;
        this.info = data.info;
    }

    @action
    clearData = (data) => {
        this.title = '';
        this.info = {};
    }
}

let aboutStore = null;
export function aboutInitializeStore(initialData) {
    //如果是服务端，则始终创建新store，否则请求之间共享状态
    if (isServer) {
        return new AboutStore(isServer, initialData)
    }
    if (aboutStore === null) {
        aboutStore = new AboutStore(isServer, initialData)
    }
    return aboutStore
}
