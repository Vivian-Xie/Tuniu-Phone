import axios from 'axios'
import { http } from './interface'
import { encryptByDES, decryptByDES, sign } from './encrypt'



// 创建一个 axios 实例
const service = axios.create({
    baseURL: 'https://test.chengniu.com:8075/cpapi', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',

    },
})

// 添加请求拦截器（所有的请求都会在此处被拦截，请求的具体内容需要在vue组件页面的生命周期内填写）
var accessToken;
service.interceptors.request.use(
    // config是interface中自定义传的参数加上一些为声明的自动附带的参
    async function (config) {
        // console.log(config);
        // 关于为何需要async？这一步的目的是判断是否执行过getaccessToken，token是非常重要的参数，以后的每一次接口中都要用到
        // 即检查localStorage里面有没有token的值，如果没有则先停下当前的接口调用去调getAccessToken，所以相当于把同步执行的当前接口调用和getaccesstoken创造了先后，于是async解决
        async function getToken() {
            // 判断是否已经得到过接口token，如果没有则执行await http.getAccessToken()，然后返回一个accessToken
            if (localStorage.getItem("accessToken")) {
                // 如果accessToken已经在本地储存里存在则直接调用
                return localStorage.getItem("accessToken")
            } else {
                const res = await http.getAccessToken();
                return res.data.accessToken;
            }

        }
        console.log(localStorage.getItem("accessToken"));
        // 检索url中是否由某一字符串用IndexOf
        if (config.url?.indexOf('/common/getAccessToken') === -1) {
            // 关于accessToken必须封装在函数里解决是因为，accesstoken的值并不能在if(){}else中赋，会变成局部变量，因此封装成getToken函数，而该函数应当无论执行不执行getAccessToken都return一个localStorage的值，这一步要提前于后续所有加密执行，因而await↓
            accessToken = await getToken();
        }


        // 需要的常量时间戳，不能写在JSON里，就在外部先赋好值
        var timestamp = new Date().getTime();

        const PUBLIC_DATA = {
            // 需要一起传输的常量（后端给）
            systemCode: 'CPH5',
            timestamp,
            accessToken,
            
        }
        const signature = sign({
            // 一个正常的签名包含所有接口都不变的常量和interface中你想传输的数据
            ...PUBLIC_DATA,
            ...config.data,


            // 签名匹配失败时可考虑参考成功的接口，固定住timestamp等变化的常量对照当时成功匹配的签名检查是sign封装的加密签名的方法出了问题还是accessToken 获取到的接口数据错误
            // accessToken: "7bb0e30232ef4460b8036ddacfd15cc9",
            // channelCode: "testmr",
            // cityName: "上海市",
            // systemCode: "CPH5",
            // timestamp: 1659514440378,

        })
        // logsignature "b0f685d42607563684213c3d4b8d7361",
        // 这才是最终送进去加密的整个变量
        const authParams = {
            ...PUBLIC_DATA,//为防止public_data中的变量临时有变，在authParams中临时修改，把常量public_data放在最前面，否则容易覆盖掉新赋的变量
            signature,//签名是根据所有传输内容，包括常量和编码的，会在发送请求时核对签名是否正确
            // accessToken,
            ...config.data,
        }//加上签名才是传输的全部内容

        config.data = {
            // 用封装在encrypt里的方法加密，之所以要stringify是因为encryptByDESk传入的参数已经规定是string类型
            body: encryptByDES(JSON.stringify(authParams), "026F298F", "05CBEB03")
        }
        console.log(`${config.url}====>`, authParams)
        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // dataAxios 是 axios 返回数据中的 data
        let dataAxios = decryptByDES(response.data, "026F298F", "05CBEB03")


        const res = JSON.parse(dataAxios);
        console.log("这是服务端返回的数据===>", res)

        if (response.config.url?.indexOf('/common/getAccessToken') !== -1) {
            localStorage.setItem("accessToken", res.data.accessToken)
        }
        // console.log(res);

        // const code = dataAxios.reset
        return res
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log(error)
        return Promise.reject(error)
    }
)

export default service

