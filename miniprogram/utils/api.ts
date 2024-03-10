const AMAP_BASE_URL = 'https://apis.map.qq.com';

const GEOCODER_API = '/ws/geocoder/v1/';

const AMAP_KEY = '55UBZ-EP2K5-3W4IA-I23F6-FJW25-O4BUD'

const BASE_URL = 'http://localhost:3000/'

enum ROAD_API_ENUM {
    ALL_ROAD_API = 'road',
}

const http = (url: string, method: 'GET' | 'POST', data?: any) => {
    return new Promise((resolve, reject) => {
        if (method === 'GET' && data) {
            let params = '';
            for (const iterator of data) {
                params += iterator + '=' + data.iterator + '&'
            }
            url = url + '?' + params;
        } 
        wx.request({
            url,
            method: method,
            data: method === 'POST' ? data : {},
            success:(res)=>{
                resolve(res.data)
            },
            fail: (error) => {
                console.log(error);
                reject(error);
                wx.showToast({
                    title: '请求失败',
                    icon: 'error',
                })
            }
      
          })
    })
}

// 地址逆向解析
export const getGeocoder = async (location: string) => {
    return await http(`${AMAP_BASE_URL}${GEOCODER_API}?location=${location}&key=${AMAP_KEY}&get_poi=1`, 'GET')
}


// 获取所有路段
export const getAllRoads = async () => {
    return await http(`${BASE_URL}${ROAD_API_ENUM.ALL_ROAD_API}`, 'GET')
}






