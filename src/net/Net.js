export default class Net
{
	let oDataLoader = null;	// Класс для передачи данных на сервер
	
//-----------------------/ Функции /---------------------------------------
	constructor(){
		this.oDataLoader = new DataLoader();
	}
	
	init(oGameData)
	{
		this.oDataLoader.SERVER_URL = oGameData.SERVER_URL;
		this.oDataLoader.api_id		= String( oGameData.api_id);
		this.oDataLoader.secret_key = oGameData.secret_key;
	}
	
//-------------------------------/ Общие методы /--------------------------------------------
	
	/**
	 * Возвращает текущую стоимость boost'ов.
	 * @param	callback функция обратного вызова
	 */
	getBoostCost( callback, error = null)
	{
		this.oDataLoader.request_obf('getBoostsCost', {}, callback, error);
	}
	
	/**
	 * Возвращает информацию о текущем турнире.
	 * @param	callback функция обратного вызова
	 */
	getGameProps( callback, error = null)
	{
		this.oDataLoader.request_obf('getGameProps', {}, callback, error);
	}
	
	/**
	 * Возвращает статистику по игре за последние 1000 дней исключая текущий.
	 * @param	iType - Тип возвращаемой статистики (0 - топ лучших игроков, 1 - топ по городам, 2 - топ по полу игроков, 3 - топ по году рождения игроков).
	 * @param	callback - функция обратного вызова
	 * @param	iSourse - Источник данных (0 — максимально набранное количество очков пользователем за всю игру, 1 - максимально набранное количество очков в турнире среди друзей, 2 - максимально набранное количество очков в предыдущем турнире среди друзей).
	 * @param	iLimit - Количество возвращаемых строк (максимум 1000, по умолчанию 100).
	 */ 
	getGameStatistic( iType, callback, iSourse: = 0, iLimit = 100)
	{
		this.oDataLoader.request_obf('getGameStatistic', {type: iType, source: iSourse, limit: iLimit}, callback);
	}
	
	/**
	 * Возвращает настройки приложения
	 * @param	callback функция обратного вызова
	 */
	getSettings( callback, error)
	{
		this.oDataLoader.request_obf( 'getSettings', {}, callback, error);
	}
	
	/**
	 * Возвращает список последних завершенных турниров с призовым фондом.
	 * @param	callback - функция обратного вызова
	 * @param	iAccount - Количество возвращаемых завершенных турниров (по умолчанию 1).
	 */
	getTournamentLog( callback, iAccount = 1)
	{
		this.oDataLoader.request_obf('getTournamentLog', { account: iAccount}, callback);
	}
	
	/**
	 * Возвращает рейтинг пользователей в турнире с призовым фондом.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	getUserRating( sUid, callback)
	{
		this.oDataLoader.request_obf( 'getUserRating', { uid:sUid}, callback);
	}
	
	/**
	 * Возвращает список товаров возможных для покупки через валюту социальной сети.
	 * @param	callback - функция обратного вызова
	 */
	getExtendedGoods( callback, error = null)
	{
		this.oDataLoader.request_obf( 'getExtendedGoods', {}, callback, error);
	}
//---------------------------------/ Игрок /-------------------------------------------------

	/**
	 * Покупает указанное количество boost'ов.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	sNums - Перечисляет через запятую номера boost'ов.
	 * @param	sAccounts - Перечисляет через запятую в соответствующих позициях количество покупаемых boost'ов (по умолчанию 1).
	 * @param	callback - функция обратного вызова
	 */
	buyBoostItems( sUid, sNums, sAccounts, callback, error)
	{
		this.oDataLoader.request_obf( 'buyBoostItems', { uid:sUid, nums:sNums, accounts:sAccounts}, callback, error);
	}
	
	/**
	 * Покупает билет для участия пользователя в турнире с призовым фондом, данный билет действует до окончания турнира.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	buyTournamentTicket( sUid, callback):
	{
		this.oDataLoader.request_obf( 'buyTournamentTicket', { uid:sUid}, callback);
	}
	
	/**
	 * Возвращает список пользователей, которым невозможно сделать подарки boost'ов или энергии.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	getGiftStatus( sUid, callback, error = null)
	{
		this.oDataLoader.request_obf( 'getGiftStatus', { uid:sUid}, callback, error);
	}
	
	/**
	 * Возвращает список boost'от которые есть у игрока.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	getUserBoosts ( sUid, callback)
	{
		this.oDataLoader.request_obf( 'getUserBoosts', { uid:sUid}, callback);
	}
	
	/**
	 * Возвращает данные пользователя
	 * @param	oGameUser	- пользователь
	 * @param	callback - функция обратного вызова
	 */
	getUserProfile ( oGameUser, callback)
	{
		var sFids:String = String( oGameUser.uid);
		for (var iIndex:int = 0; iIndex < oGameUser.aAppFriends.length; iIndex++)
		{
			sFids += ',' + String( oGameUser.aAppFriends[ iIndex].uid);
		}
		
		this.oDataLoader.request_obf('getUserProfile', {uids: oGameUser.uid, fids: sFids, entering: {name: oGameUser.name, surname: oGameUser.surname, gender: oGameUser.gender, city: oGameUser.city, country: oGameUser.country}}, callback);
	}
	
	/**
	 * Возвращает данные пользователя и его друзей
	 * @param	oGameUser	- пользователь
	 * @param	callback - функция обратного вызова
	 */
	getUserAndFriendProfile ( oGameUser, callback)
	{
		var sFids:String = String( oGameUser.uid);
		
		for (var iIndex:int = 0; iIndex < oGameUser.aAppFriends.length; iIndex++)
		{
			sFids += ',' + oGameUser.aAppFriends[ iIndex].uid;
		}
		
		this.oDataLoader.request_obf('getUserProfile', {uids: sFids, fids: sFids}, callback);
	}
	
	/**
	 * Дарит энергию другому игроку, при этом дарящий игрок никаких средств на это не тратит. Единственное ограничение — дарить энергию можно не чаще 1го раза в 10 минут.
	 * @param	sFromUid - Идентификатор пользователя от кого сообщение.
	 * @param	sToUid - Идентификатор пользователя которому предназначено сообщение.
	 * @param	callback - функция обратного вызова
	 * @param	sMessage - Текст отправляемого сообщения, максимальная длина 300 символов (по умолчанию «Принимай энергию в подарок!»).
	 */
	giftPowerItem ( sFromUid, sToUid, callback, sMessage = "Принимай энергию в подарок")
	{
		this.oDataLoader.request_obf('giftPowerItem', {from_uid: sFromUid, to_uid: sToUid, message: sMessage}, callback);
	}
	
	
	/**
	 * Дарит boost другому игроку, при этом дарящий игрок никаких средств на этот boost не тратит. Единственное ограничение — дарить boost'ы можно не чаще 1го раза в 10 минут.
	 * @param	sFromUid - Идентификатор пользователя от кого сообщение.
	 * @param	sToUid - Идентификатор пользователя которому предназначено сообщение.
	 * @param	iNum - Номер boost'а.
	 * @param	callback - функция обратного вызова
	 * @param	sMessage - Текст отправляемого сообщения, максимальная длина 300 символов (по умолчанию «Принимай энергию в подарок!»).
	 */
	giftBoostItem ( sFromUid, sToUid, iNum, callback, sMessage = "Принимай boost в подарок!")
	{
		this.oDataLoader.request_obf('giftBoostItem', {from_uid: sFromUid, to_uid: sToUid, num:iNum, message: sMessage}, callback);
	}
	
	
	
	/**
	 * Списывает boost у пользователя как использованный.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	iNum - Номер boost'а.
	 * @param	callback - функция обратного вызова
	 */
	useBoost ( sUid, iNum, callback, error = null)
	{
		this.oDataLoader.request_obf('useBoost', {uid: sUid, num: iNum}, callback);
	}
	
//--------------------------/ Сообщения /-------------------------------------------------

	/**
	 * Возвращает список непрочитанных сообщений.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	getUnreadMessage ( sUid, callback, error: = null)
	{
		this.oDataLoader.request_obf( 'getUnreadMessages', {uid: sUid}, callback, error);
	}
	
	/**
	 * Отправляет другому пользователю сообщение с просьбой прислать бустер, предыдущее сообщение об этом будет удалено.
	 * @param	sFromUid - Идентификатор пользователя от кого сообщение.
	 * @param	sToUids - Идентификаторы пользователей котором предназначено сообщение.( через запятую)
	 * @param	iIdBoost - Идентификатор бустера который необходим.
	 * @param	callback - функция обратного вызова
	 * @param	sMessage - Текст отправляемого сообщения, максимальная длина 300 символов.
	 */
	sendBoostRequest ( sFromUid, sToUids, iIdBoost, callback, sMessage = "Не мог бы ты мне выслать boost.")
	{
		this.oDataLoader.request_obf('sendBoostRequest', {from_uid: sFromUid, to_uid: sToUids, num: iIdBoost, message: sMessage}, callback);
	}
	
	/**
	 * Отправляет другому пользователю сообщение с просьбой прислать энергию, предыдущее сообщение об этом будет удалено.
	 * @param	sFromUid - Идентификатор пользователя от кого сообщение.
	 * @param	sToUid - Идентификатор пользователя которому предназначено сообщение.
	 * @param	callback - функция обратного вызова
	 * @param	sMessage - Текст отправляемого сообщения, максимальная длина 300 символов.
	 */
	sendPowerRequest ( sFromUid, sToUid, callback:, sMessage = "Не мог бы ты мне выслать энергии.")
	{
		this.oDataLoader.request_obf('sendPowerRequest', {from_uid: sFromUid, to_uid: sToUid, message: sMessage}, callback);
	}
	
	/**
	 * Помечает сообщения как прочитанные.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	sMid - Перечисляет через запятую идентификаторы сообщений.
	 * @param	callback - функция обратного вызова
	 * @param	error - функция обработки ошибки
	 */
	setMessagesAsRead ( sUid, sMid, callback, error = null)
	{
		this.oDataLoader.request_obf('setMessagesAsRead', {uid: sUid, mids: sMid}, callback, error);
	}
	
//-------------------------/ Мини игры /-------------------------------------------------

	/**
	 * Вызывается при старте новой игровой сессии, приводит к уменьшению жизни на единицу. Если жизней нет возвращает ошибку.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	startGame ( sUid, callback, error: = null)
	{
		this.oDataLoader.request_obf('startGame', {uid: sUid}, callback, error);		
	}
	
	/**
	 * Записывает результат игры пользователя.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	iScore - Набранные пользователем очки за время игры.
	 * @param	iXP - Набранный пользователем опыт за игру.
	 * @param	callback - функция обратного вызова
	 */
	storeGameResult ( sUid, iScore, iXP:, callback:, error = null)
	{
		this.oDataLoader.request_obf('storeGameResult', { uid: sUid, score: iScore, experience: iXP }, callback, error);	
	}
	
//------------------------/ Фотозагадки /---------------------------------------------------

	/**
	 * Разрешает доступ к игровой категории. Если категория платная, то осуществляется покупка доступа к ней.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_buyCategory ( sUid, sCatId, callback, error = null)
	{
		this.oDataLoader.request_obf('puzzle_buyCategory', { uid: sUid, cid: sCatId}, callback, error);	
	}
	
	/**
	 * Разрешает доступ к уровню в категории. Если уровень в категории платный, то осуществляется покупка доступа к нему.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sPayBoost - Идентификатор boost'а, которым оплачивает пользователь вместо игровой валюты.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_buyLevel ( sUid, sCatId:, sLvlId, sPayBoost, callback, error = null)
	{
		if ( sPayBoost == "")
			this.oDataLoader.request_obf( 'puzzle_buyLevel', { uid: sUid, cid: sCatId, lid:sLvlId}, callback, error);	
		else
			this.oDataLoader.request_obf( 'puzzle_buyLevel', { uid: sUid, cid: sCatId, lid:sLvlId, payboost:sPayBoost}, callback, error);	
	}
	
	/**
	 * Удаляет все лишние буквы.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_clearTrash ( sUid, sCatId, sLvlId, sImgId, callback:, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_clearTrash', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId}, callback, error);	
	}
	
	/**
	 * Принимает от пользователя ответ и, в случае верного ответа, завершает игру.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param   sWord - Ответ на загадку.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_completedGame ( sUid, sCatId, sLvlId, sImgId, sWord, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_completedGame', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId, word:sWord}, callback, error);	
	}
	
	/**
	 * Возвращает список возможных категорий.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getCategorys ( callback, error: = null)
	{
		this.oDataLoader.request_obf('puzzle_getCategorys', { }, callback, error);	
	}

	/**
	 * Возвращает настройки для модуля фотозагадки.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getConfig ( callback, error = null)
	{
		this.oDataLoader.request_obf('puzzle_getConfig', { }, callback, error);	
	}
	
	/**
	 * Возвращает список картинок на уровне.
	 * @param   sCatId - Идентификатор категории.
	 * @param	sLvlId - Номер уровня в категории.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getImages (  sCatId, sLvlId, callback, error = null)
	{
		this.oDataLoader.request_obf('puzzle_getImages', { lid: sLvlId, cid: sCatId}, callback, error);	
	}
	
	/**
	 * Возвращает список уровней для указанной категории.
	 * @param   sCatId - Идентификатор категории.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getLevels (  sCatId, callback, error = null)
	{
		this.oDataLoader.request_obf('puzzle_getLevels', { cid: sCatId}, callback, error);	
	}
	
	/**
	 * Показывает подписи к картинкам.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getTitles ( sUid, sCatId, sLvlId, sImgId, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_getTitles', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId}, callback, error);	
	}
	
	/**
	 * Возвращает список категорий пользователя, которые он купил и/или начал играть.
	 * @param	sUid - Идентификатор пользователя.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getUserCategorys ( sUid, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_getUserCategorys', { uid: sUid}, callback, error);	
	}
	
	/**
	 * Возвращает список картинок (начатые или законченные на уровне) имеющихся у пользователя.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getUserImage ( sUid, sCatId, sLvlId, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_getUserImages', { uid: sUid, cid: sCatId, lid:sLvlId}, callback, error);	
	}
	
	/**
	 * Возвращает список уровней для указанной категории пройденных/доступных пользователю.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getUserLevels ( sUid, sCatId, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_getUserLevels', { uid: sUid, cid: sCatId}, callback, error);	
	}
	
	/**
	 * Открывает случайную не открытую букву.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param   excl - Маска исключений: длина маски должна совпадать с длиной слова, в позиции где символ выдавать не надо должен стоять 0, где возможно 1.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_openChar ( sUid:, sCatId, sLvlId, sImgId, sExcl, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_openChar', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId, excl:sExcl}, callback, error);	
	}
	
	/**
	 * Начинает новую игру или возвращает данные начатой игры, если такая имеется.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_openGame ( sUid, sCatId, sLvlId, sImgId, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_openGame', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId}, callback, error);	
	}
	
	/**
	 * Открывает указанную часть картинки.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param   tick - Номер открываемого кусочка картинки.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_openTick ( sUid, sCatId, sLvlId, sImgId, iTick, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_openTick', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId, tick:iTick}, callback, error);	
	}
	
	
	/**
	 * Пропускает начатую игру.
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImgId - Номер картинки в уровне.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_skipGame (sUid, sCatId, sLvlId, sImgId, callback, error = null):void
	{
		this.oDataLoader.request_obf( 'puzzle_skipGame', { uid: sUid, cid: sCatId, lid:sLvlId, iid:sImgId}, callback, error);	
	}
	
	/**
	 * Пропускает уровень в категории (вызывается вручную пользователем, если он хочет перейти к следующему уровню не доигрывая текущий, при этом возможность давать ответы в пропущенном уровне остается).
	 * @param	sUid - Идентификатор пользователя.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_skipLevel (sUid, sCatId, sLvlId, callback, error = null)
	{
		this.oDataLoader.request_obf( 'puzzle_skipLevel', { uid: sUid, cid: sCatId, lid:sLvlId}, callback, error);	
	}
	
	/**
	 * Возвращает список завершенных картинок пользователями.
	 * @param	sUids - Идентификаторы пользователей.
	 * @param   sCatId - Идентификатор категории.
	 * @param   sLvlId - Номер уровня в категории.
	 * @param   sImageId - Номер картинки в уровне.
	 * @param	callback - функция обратного вызова
	 */
	puzzle_getCompletedGames (sUids, sCatId, sLvlId, sImageId, callback, error = null)
	{
		if ( sLvlId != "" && sImageId != "")
		{
			this.oDataLoader.request_obf( 'puzzle_getCompletedGames', { uids: sUids, cid: sCatId, lid: sLvlId, iid: sImageId}, callback, error);
		}
		else
		{
			this.oDataLoader.request_obf( 'puzzle_getCompletedGames', { uids: sUids, cid: sCatId }, callback, error);
		}
	}
}

export default {}