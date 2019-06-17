const Router = require('koa-router');
const router = new Router();
let indexData = {
    title:"新碟首发",
    data:[]
};
let detailData = {};
let aboutData = {
    title:"关于我们",
    info:"腾讯，1998年11月诞生于中国深圳，是一家以互联网为基础的科技与文化公司。<br/>我们的使命是 “通过互联网服务提升人类生活品质”。<br/>腾讯秉承着 “一切以用户价值为依归” 的经营理念，致力于为亿万网民提供优质的互联网综合服务"
};

//生成数据
for (let i=0;i<10;i++) {
    indexData.data.push({
        id:i+1,
        name:"李琦",
        title:"反一号",
        img:"//y.gtimg.cn/music/photo_new/T002R300x300M000002f6aNI3U5voc.jpg?max_age=2592000",
    })
    detailData[i+1] = {
        songInfo:{
            img:"https://y.gtimg.cn/music/photo_new/T002R300x300M000002ISoGf1Ialwz.jpg?max_age=2592000",
            soungTitle:"苏小小精选集2",
            author:"苏小小",
            otherInfo:{
                type:"Pop 流行",
                lang:"国语",
                date:"2019-05-13",
                company:"北京市龙天腾文化",
                belong:"录音室专辑"
            }
        },
        songList:{
            title:"歌曲列表",
            data:[
                {id:1,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:2,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:3,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:4,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:5,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:6,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:7,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:8,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:9,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:10,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
                {id:11,name:"我愿意平凡陪在你身旁",time:'04:16',href:"https://y.qq.com/portal/player.html"},
            ]
        }
    }
}

router.all('/api/base.do', ctx => {
    ctx.body = {
        ret: 0,
        data:{
            username:"admin"
        },
        message:'获取用户信息成功'
    }
});

//获取首页数据
router.all('/api/index.do', ctx => {
    ctx.body = {
        ret: 0,
        data:indexData,
        message:'获取首页数据成功'
    }
});

router.all('/api/detail.do', ctx => {
    let id;
    if(ctx.request.body && ctx.request.body.id){
        id = ctx.request.body.id
    } else if(ctx.request.query && ctx.request.query.id){
        id = ctx.request.query.id
    }
    // console.log('####',ctx.request,ctx.request.query,ctx.request.body,id);
    if(id && detailData[id]){
        ctx.body = {
            ret: 0,
            data:detailData[id],
            message:'获取首页数据成功'
        }
    } else {
        ctx.body = {
            ret: -1,
            message:'获取详情数据失败'
        }
    }
});

router.all('/api/about.do', ctx => {
    ctx.body = {
        ret: 0,
        data:aboutData,
        message:'获取关于我们数据成功'
    }
});

module.exports = router
