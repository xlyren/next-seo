import 'isomorphic-fetch'
const apiPrefix="http://127.0.0.1:3100/api";
const api = {
    apiIndex:'POST /index.do',
    apiDetail:'POST /detail.do',
    apiAbout:'POST /about.do'
}

//根据 api生成 请求方法
function generateApiFun(){
    let objFun = {};
    for (const key in api) {
        let value = api[key];
        let url = apiPrefix + value
        let method = 'GET';
        const valueArray = value.split(' ');
        if (valueArray.length === 2) {
            method = valueArray[0]
            url = apiPrefix + valueArray[1]
        }

        objFun[key] = function(data) {
            // console.log("@@@@@@data",data);
            return fetch(url,{
                method:method,
                headers:{
                    // 'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
                },
                // credentials:"include",
                body:JSON.stringify(data)
            }).then((res) => {
                return res.json();
            });
        }
    }
    return objFun;
}

const apiFunction = generateApiFun();

//导出所有方法
export default {
    ...apiFunction
}
