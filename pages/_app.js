import App, {Container} from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import store from '~/store'

function initMobx(mobxStore){
    return {
        indexStore:store.indexInitializeStore(mobxStore.indexStore),
        detailStore:store.detailInitializeStore(mobxStore.detailStore),
        aboutStore:store.aboutInitializeStore(mobxStore.aboutStore)
    };
}

export default class MobxApp extends App {
    static async getInitialProps (appContext) {
        // Provide the store to getInitialProps of pages
        let mobxStore = {
            indexStore:store.indexInitializeStore(),
            detailStore:store.detailInitializeStore(),
            aboutStore:store.aboutInitializeStore()
        }
        appContext.ctx.mobxStore = mobxStore;
        let pageProps = await App.getInitialProps(appContext);

        return {
            ...pageProps,
            mobxStore: mobxStore,
        }
    }

    constructor(props) {
        super(props)
        const isServer = !process.browser;
        this.mobxStore = isServer ? props.mobxStore: initMobx(props.mobxStore)
    }

    render () {
        const {Component, pageProps} = this.props
        // console.log("render",pageProps,this.mobxStore,this.props);
        return (
            <Container>
                <Provider store={this.mobxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}
