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
            FAPI.Client.call({"fields":"name,pic50x50", "method":"friends.get"}, (resp) => { return resolve(resp.response)});
        });
    }

    showInviteFriendsBox(){
        FAPI.UI.showInvite("Поиграй в мою игру!");
    }
}