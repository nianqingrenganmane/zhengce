import wx from 'weixin-js-sdk'
import axios from 'axios'

export default {
    /* 初始化wxjsdk各种接口 */
    init(apiList = []) {
        //需要使用的api列表
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url: "https://www.yuanqucha.com:8300/weChat/refund/getjsapiTicket",
                    data: {
                        "url": location.href.split('#')[0]
                    }
                })
                .then(res => {
                    if (res.data.data) {
                        wx.config({
                            debug: false,
                            appId: 'wxef9ac8aa9a9bd204',
                            timestamp: res.data.data.timestamp,
                            nonceStr: res.data.data.noncestr,
                            signature: res.data.data.sha1Hex,
                            jsApiList: apiList
                        })
                        wx.ready(res => {
                            console.log(res)
                            // 微信SDK准备就绪后执行的回调。
                            resolve(wx, res)
                        })
                        wx.error(function (error) {
                            console.log(error)
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                    } else {
                        reject(res)
                    }
                }).catch(error => {
                    console.log(error, 122222)
                });
        })
    }
}