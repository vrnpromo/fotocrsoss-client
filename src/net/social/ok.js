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
            FAPI.Client.call({"method":"friends.getAppUsers"}, (res1, data1) => { 
                if(data1.uids.length>0)
                    FAPI.Client.call({"method":"users.getInfo", "fields":"name,pic50x50,first_name,last_name", "uids":data1.uids.join(',')}, (res2, data2)=>{
                        return resolve({
                            count: data2.length, 
                            items:data2.map(i => ({
                                id:i.id,
                                nickname: i.name, 
                                photo_50:i.pic50x50,
                                first_name: i.first_name,
                                last_name: i.last_name,
                            }))
                        });
                    });
                else
                    return resolve({count:0, items:[]});
            });
        });
    }

    showInviteFriendsBox(){
        FAPI.UI.showInvite("Поиграй в мою игру!");
    }
}