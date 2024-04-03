import service from ".";
// export default (service变量名)导出后就可以任意命名该变量，甚至可以这样重复命名
import instance from ".";

var baseURL = 'https://test.chengniu.com:8075/';

export const http = {
    getAccessToken() {
        return service.post(baseURL + 'cpapi/common/getAccessToken', {
        })
    },
    chanelInfo() {
        return service.post(baseURL + 'h5cmn/carwash/chanelInfo', {
            channelCode: "testmr",
            cityName: "兰州市",
            // ...(param||{})
        })
    },
    sms(params) {
        return instance.post(baseURL + 'h5cmn/cmnPersonalCenter/sms/send', {
            ...params
        })
    },
    login(params) {
        return instance.post(baseURL + 'h5cmn/cmnPersonalCenter/login', {
            activityChannel: "testmr",
            activitySource: "H5WashCar",
            operatingSystem: "2",
            ...params
        })
    },
    personalInfo() {
        return instance.post(baseURL + 'h5cmn/personalCenter/personalInfo', {
            userCode: localStorage.getItem("userCode")
        })
    },
    getService() {
        return instance.post(baseURL + 'h5cmn/cmnCarwashStore/getServiceDesc', {
            userCode: localStorage.getItem("userCode"),
            subcategoryCode: "UCvj2B"

        })
    },
    getStore(params) {
        return instance.post(baseURL + 'h5cmn/cmnCarwashStore/queryStoreDedtail', {
            carbagOrderNo: "",
            channelCode: "testmr",
            latitude: "31.236268837855917",
            longitude: "121.48024358715539",
            pricingType: "1",
            sourceApp: "4",
            userCode: localStorage.getItem("userCode"),
            ...params
        })
    },
    getStoreList(params) {
        console.log('params', params);
        
        return instance.post(baseURL + '/h5cmn/cmnCarwashStore/carwashStoreList', {
            areaName: "",
            areaNumber: "",
            bigCar: "",
            cardBagId: "",
            channelCode: "testmr",
            cityName: "兰州市",
            cusumerLatitude: 31.236268837855917,
            cusumerLongitude: 121.48024358715539,
            pageSize:5,
            pricingType: "1",
            priority: "dis",
            shopName: "",
            sourceApp: "4",
            subCategoryCode: "",
            ticketId: "",
            userCode: localStorage.getItem("userCode"),
            ...params
        })
    },
    // sms
    // https://test.chengniu.com:8075/h5cmn/cmnPersonalCenter/sms/send
    // phone


    // login 
    // https://test.chengniu.com:8075/h5cmn/cmnPersonalCenter/login



}