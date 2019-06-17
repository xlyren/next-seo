import React from 'react'
import Link from 'next/link'
import App, { Container } from 'next/app'
import AppHead from '~/components/AppHead'
import AppNav from '~/components/AppNav'
import AppFooter from '~/components/AppFooter'
import api from '~/api'
import { Button , Icon, Form,Input ,message} from 'antd';

const { TextArea } = Input;

class Index extends React.Component {
    static async getInitialProps (appContext) {
        const {id} = appContext.query;
        const res = await api.apiDetail({id:5})
        // return { stars: json.stargazers_count }
        const store = appContext.mobxStore

        store.detailStore.updateData(res.data)
        // console.log('@@@',store,res.data,appContext.query);
        return { ...store }
    }

    handleMenuClick = () => {
        message.success('敬请期待');
    }

    //提交
    handleSubmit = (e) => {
        //经过 Form.create 包装的组件将会自带 this.props.form 属性，this.props.form
        const { dispatch, form } = this.props
        //与 validateFields 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if (!errors) {
                message.success('评论成功');
            } else {
                message.error('请输入评论内容');
            }
        })
    }

    render () {
        // console.log('this.props',this.props);
        const { detailStore } = this.props
        const songInfo = detailStore.songInfo
        const songList = detailStore.songList
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <AppHead title="详情页" keywords="详情页" description="音乐详情页专辑" />
                <AppNav />
                <main className="main">
                    <section className="cover-area">
                        <div className="main-area">
                            <div className="cover">
                                <img src={songInfo.img} alt={songInfo.soungTitle} />
                            </div>
                            <div className="cover-info">
                                <h3 className="title">{songInfo.soungTitle}</h3>
                                <div className="author">
                                    <Icon type="user" />
                                    <span>{songInfo.author}</span>
                                    <ul className="other-info">
                                        <li>流派：{songInfo.otherInfo.type}</li>
                                        <li>语种：{songInfo.otherInfo.lang}</li>
                                        <li>发行时间：{songInfo.otherInfo.date}</li>
                                        <li>唱片公司：{songInfo.otherInfo.company}</li>
                                        <li>类型：{songInfo.otherInfo.belong}</li>
                                    </ul>
                                </div>
                                <div className="cover-btn">
                                    <Button type="primary" onClick={this.handleMenuClick}>播放全部</Button>
                                    <Button className="f-ml10" onClick={this.handleMenuClick}>收藏</Button>
                                    <Button className="f-ml10" onClick={this.handleMenuClick}>评论</Button>
                                    <Button className="f-ml10" onClick={this.handleMenuClick}>更多</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="song-area">
                        <div className="main-area">
                            <h3 className="song-title">{songList.title}</h3>
                            <ul className="song-list">
                                {songList.data.map((item,key) => {
                                    return (
                                        <li key={key}>
                                            <span className="song-num">{key+1}</span>
                                            <span className="song-name">{item.name}</span>
                                            <span className="song-time">{item.time}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                    <section className="comment-area">
                        <div className="main-area">
                            <Form>
                                <Form.Item has-feedback>
                                    {
                                        getFieldDecorator('comment', {
                                            rules: [{ required: true, message: '请输入评论!' }],
                                        })(
                                            <Input.TextArea
                                                placeholder="期待你的神评论..."
                                                autosize={ {minRows: 4, maxRows: 8} }
                                            />
                                        )
                                    }
                                </Form.Item>

                                <div className="f-tar f-mt10">
                                    <Button type="primary" onClick={this.handleSubmit }>发表评论</Button>
                                </div>
                            </Form>
                        </div>
                    </section>
                </main>
                <style jsx>{`
                    .main{}
                    .main-area{margin: 0 auto;width: 1200px;overflow: hidden;}
                    .cover-area{padding:20px 0;background-color: #f3f3f3;}
                    .cover{width:250px;height:250px;float:left;}
                    .cover img{width:100%;}
                    .cover-info{float:left;width:950px;padding-left:30px;}
                    .cover-info .title{font-size:30px;line-height: 1.5;padding-bottom: 5px;}
                    .cover-info .author{color:#333;font-size:16px;}
                    .cover-info .author span{margin-left:5px;}
                    .cover-info .other-info{font-size: 14px;overflow: hidden;width:500px;padding-top:2px;}
                    .cover-info .other-info li{width: 240px;float:left;padding:3px 0;}
                    .cover-btn{padding-top: 20px;}
                    .song-area{background-color: #fff;padding: 20px 0 30px;}
                    .song-title{font-size: 28px;}
                    .song-list{overflow: hidden;}
                    .song-list li{overflow: hidden;padding: 10px 0;}
                    .song-list li .song-num,
                    .song-list li .song-name{float: left;padding-left:10px}
                    .song-list li .song-time{float: right;padding:0 15px;}
                    .song-list li:nth-child(odd){background-color:#f3f3f3; }
                    .comment-area{padding-bottom: 50px;}
                `}</style>
                <AppFooter />
            </div>
        )
    }
}

const WrappedIndex = Form.create({ name: 'Index' })(Index);
export default WrappedIndex
