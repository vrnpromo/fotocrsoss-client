import { SocialAPI } from './socialApi';

// function call(method, params = null) {
//     if(params){
//         params.access_token = PARAMS.access_token;
//     }

//     return axios.get(`https://api.vk.com/method/${method}`, {
//         // headers: {
//         // 	'Access-Control-Allow-Origin': '*',
//         //   },
//         params: params
//     });
// }

export class VK extends SocialAPI{
    constructor(access_token){
        super(access_token, 'https://api.vk.com/method');
    }

    getFriends() {
        //https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V 
        this.call('friends.get', { fields: 'nickname,photo_100' });
    }
}