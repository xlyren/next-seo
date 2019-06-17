import React from 'react'
import Link from 'next/link'
import App, { Container } from 'next/app'
import AppHead from '~/components/AppHead'
import AppNav from '~/components/AppNav'
import AppFooter from '~/components/AppFooter'
import api from '~/api'

export default class Index extends React.Component {
    static async getInitialProps (appContext) {
        const res = await api.apiAbout({})
        // return { stars: json.stargazers_count }
        const store = appContext.mobxStore

        store.aboutStore.updateData(res.data)
        // console.log('@@@',res,store);
        return { ...store }
    }

    render () {
        // console.log('this.props',this.props);
        const { aboutStore } = this.props
        return (
            <div>
                <AppHead title="关于我们" keywords="关于我们" description="关于我们" />
                <AppNav />
                <main className="main">
                    <section className="main-area">
                        <h2 className="about-title">{aboutStore.title}</h2>
                        <p className="about-info">{aboutStore.info}</p>
                    </section>
                </main>
                <style jsx>{`
                    .main{background:url('/static/images/bg_singer.jpg') repeat center top;height: 600px;}
                    .main-area{margin: 0 auto;width: 1200px;color: #fff;padding-top: 150px;}
                    .about-title{text-align: center;font-size: 26px;padding:30px 0;color: #fff;}
                    .about-info{line-height: 28px;text-align: center;}
                `}</style>
                <AppFooter />
            </div>
        )
    }
}
