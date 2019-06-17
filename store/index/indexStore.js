import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = !process.browser
//服务端渲染时设置useStaticRendering为true;
//避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次。
useStaticRendering(isServer)

class IndexStore {

    @observable title;
    @observable List;
    constructor(isServer, initialData={}) {
        this.title = '';
        this.List = [];
    }

    @action
    updateData = (data) => {
        // console.log("@data",data);
        this.title = data.title;
        this.List = data.data;
    }

    @action
    clearData = (data) => {
        this.title = '';
        this.List = [];
    }
}

let indexStore = null;
export function indexInitializeStore(initialData) {
    //如果是服务端，则始终创建新store，否则请求之间共享状态
    if (isServer) {
        return new IndexStore(isServer, initialData)
    }
    if (indexStore === null) {
        indexStore = new IndexStore(isServer, initialData)
    }
    return indexStore
}
