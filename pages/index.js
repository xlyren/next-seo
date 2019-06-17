import React from 'react'
import Link from 'next/link'
import App, { Container } from 'next/app'
import AppHead from '~/components/AppHead'
import AppNav from '~/components/AppNav'
import AppFooter from '~/components/AppFooter'
import api from '~/api'
import { timeAgo } from '~/utils/utils'

export default class Index extends React.Component {
    static async getInitialProps (appContext) {
        const res = await api.apiIndex({})
        // return { stars: json.stargazers_count }
        const store = appContext.mobxStore

        store.indexStore.updateData(res.data)
        // console.log('@@@',res,store);
        return { ...store }
    }

    render () {
        // console.log('this.props',this.props);
        const { indexStore } = this.props
        return (
            <div>
                <AppHead title="首页" keywords="首页、专辑" description="音乐专辑" />
                <AppNav />
                <section className="main">
                    <article className="main-area first-start">
                        <h3 className="title">{indexStore.title} {timeAgo(1559118715)}</h3>
                        <ul className="area-list">
                            {indexStore.List.map((item,key) => {
                                return (
                                    <li key={key}>
                                        <a href={`/detail?id=${item.id}`} title={item.title}>
                                            <img src={item.img} alt={item.title} />
                                        </a>
                                        <h4>{item.title}</h4>
                                        <h5>{item.name}</h5>
                                    </li>
                                )
                            })}
                        </ul>
                    </article>
                </section>
                <style jsx>{`
                    .main{background-color: #f3f3f3;}
                    .first-start{padding:10px 0;}
                    .title{font-size: 32px;color: #333;text-align: center;padding:30px 0;letter-spacing: 10px;font-weight: 500;}
                    .main-area{margin: 0 auto;width: 1200px;}
                    .area-list{overflow: hidden;width: 1220px;}
                    .area-list li{width: 224px;float: left;margin-right:20px;margin-bottom: 20px;}
                    .area-list li img{width:100%;}
                    .area-list li h4{line-height: 1.2;padding-top: 20px;}
                    .area-list li h5{line-height: 1.2;color:#999;}
                `}</style>
                <AppFooter />
            </div>
        )
    }
}
