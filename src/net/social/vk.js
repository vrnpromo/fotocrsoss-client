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

export class VK{
    constructor(access_token){
        //super(access_token, 'https://api.vk.com/method');

        VK.init(function() {
            console.log('init compl');
            }, function() { 
            
        }, '5.69'); 
    }

    getFriends() {
        //https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V 
        //this.call('friends.get', { fields: 'nickname,photo_100' });
       

        return new Promise(function(resolve, reject) {
            VK.api('friends.get', { fields: 'nickname,photo_100' }, resolve);
        });
    }
}