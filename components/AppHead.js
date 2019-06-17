import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import '~/assets/less/index.less';

const HomeHeader = props => (
    <NextHead>
        <meta name="renderer" content="webkit|ie-comp|ie-stand" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>{props.title || 'next-seo'}</title>
        <meta name="keywords" content={props.keywords || 'next-seo'} />
        <meta name="description" content={props.description || 'next-seo'}/>
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:title" content={props.title || ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    </NextHead>
)

HomeHeader.propTypes = {
    title: string,
    keywords:string,
    description: string
}

export default HomeHeader
