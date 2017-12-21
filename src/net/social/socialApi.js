export class SocialAPI {
    constructor(access_token) {
        this.url = '';
        this.access_token = access_token;
    }

    call(method, params = null) {
        if (params) {
            params.access_token = this.access_token;
        }

        return axios.get(`${this.url}/${method}`, {
            // headers: {
            // 	'Access-Control-Allow-Origin': '*',
            //   },
            params: params
        });
    }
}