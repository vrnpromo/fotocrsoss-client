export class OK {
    constructor(){
        var rParams = FAPI.Util.getRequestParameters();
        FAPI.init(rParams["api_server"], rParams["apiconnection"],
                /*
                * Первый параметр:
                * функция, которая будет вызвана после успешной инициализации.
                */
                function() {
                    console.log("ok init");
                    // здесь можно вызывать методы API
                },
                /*
                * Второй параметр:
                * функция, которая будет вызвана, если инициализация не удалась.
                */
                function(error) {
                    console.log("ok init error");
                }
        );
    }
    getFriends(){
        return new Promise(function (resolve, reject) {
            FAPI.Client.call({"method":"friends.getAppUsers"}, (resp) => { 
                FAPI.Client.call({"method":"users.getInfo", "fields":"name,pic50x50,first_name,last_name", "uids":resp.uids.join(',')}, (r)=>{
                    return resolve({
                        count: r.length, 
                        items:r.map(i => ({
                            id:i.id,
                            nickname: i.name, 
                            photo_50:i.pic50x50,
                            first_name: i.first_name,
                            last_name: i.last_name,
                        }))
                    });
                });
            });
        });
    }

    showInviteFriendsBox(){
        FAPI.UI.showInvite("Поиграй в мою игру!");
    }
}