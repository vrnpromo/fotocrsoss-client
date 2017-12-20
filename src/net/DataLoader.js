import axios from 'axios';
import MD5 from './MD5';

function completeHandler_obf(res, callback, error) 
{
		if (res.error)
		{
			//rTracer.trace( "ERROR => DataLoader\\completeHandler_obf: " + data.response.error_code + " => " + data.response.error_message, rTracer.ERROR);
			
			// if (dict[event.target][1] == null)
			// {
			// 	var msg = (data.response.error_message).toString();
			// 	//rTracer.trace( msg, rTracer.ERROR);
			// } 
			// else 
			// {
			// 	error(data.response);
			// };
		} 
		else 
		{
			callback(res.data);
		}
}

function httpStatusHandler_obf(event) 
{
	//    rTracer.trace("httpStatusHandler: " + event);
}


function _ioError(ev) 
{
	try
	{
		rTracer.trace( "ERROR => DataLoader\\_ioError: " + ev.text, rTracer.ERROR);
		
		var error = dict[ ev.target][1];
		
		if( error != null)
		error( ev);
		
		delete dict[ ev.target];
	}
	catch ( err)
	{
		rTracer.trace( "ERROR => DataLoader\\_ioError: " + err.message, rTracer.ERROR);
	}
}

function _secureError(ev) 
{
	try
	{
		rTracer.trace( "ERROR => DataLoader\\_secureError: " + ev.text, rTracer.ERROR);
		
		var error = dict[ ev.target][1];
		
		if( error != null)
		error( ev);
		
		delete dict[ ev.target];
	}
	catch ( err)
	{
		rTracer.trace( "ERROR => DataLoader\\_secureError: " + err.message, rTracer.ERROR);
	}
}

function getData_obf(method, data)
{
<<<<<<< HEAD
	//m=|||uid||100200710|||s_key||-1|||m||0||0||user.init|||m||0||1||{}
	return {m: `|||${data.uid || 'uid'}||100200300|||${data.s_key || 's_key'}||-1|||m||0||0||${method}|||m||0||1||{}`}
=======
	//https://maganza.ru/fsnew/vk/htdocs/index.php?m=|||uid||10541666|||s_key||-1|||m||0||0||user.init|||m||0||1||{}
	return {m: `|||uid||${data.uid}|||s_key||${data.s_key || -1}|||m||0||0||${method}|||m||0||1||{}`}
>>>>>>> ef2eb05e72335df39ad1c5f8a5cd26f4ba474a6b

	// data.method 	= method;
	// data.format 	= DataLoader.RESPONSE_DATA_FORMAT;			
	// data.api_server = DataLoader.SERVER_URL; 
	// data.v 			= DataLoader.API_VERSION;
	
	// var sigArray = []			
	// var result = '';
	
	// for (var param in data)
	// {
	// 	var value = data[param];
	// 	let type = typeof value;
	// 	if (!(type = 'string') && !(Number.isInteger(value)))
	// 	{
	// 		data[param] = JSON.stringify(value);									
	// 	}			 
	// }
	// for (var p in data)
	// {
	// 	sigArray.push(`${p}=${data[p]}`);				 
	// }
	// sigArray.sort();
	
	// sigArray.forEach(s => result+=s);
	
	// data.sig = MD5.encrypt( DataLoader.api_id + result + DataLoader.secret_key);			
	// data.api_id = DataLoader.api_id;
	// data.timestamp = Date.now();
	// data.random = Math.abs( Math.round(Math.random() * 1000) - 500);	
	
	// var str = '';
	// for (var v in data)
	// {
	// 	str += `${v}=${data[v]}&`;			 
	// }	
	
	return str.slice(0, str.length - 1);
}	

export class DataLoader {
	static get RESPONSE_DATA_FORMAT(){ return 'JSON'};
	//static get REQUEST_HTTP_MODE() {return 'POST'};
	static get API_VERSION(){return '1.0'};
	
	static get SERVER_API_URL() {return "https://maganza.ru/fsnew/vk/htdocs/index.php"}
	static get SERVER_LEVELS_URL() {return "lvl"}
	static get SERVER_IMGS_URL() {return "./img"}
	static get api_id(){return "3226070"}
	static get secret_key() {return "zyn1WEQdzV92jTYqDevK"}

	//public const VKServer:String 	= 'http://46.4.95.181/fotocrossword/ok/api.php';
	//public const VKSecret:String 	= 'F6F24DDD8B1602C25CD44455';	// Секретный ключ приложения
	
	//public const VKPublic:String 	= 'CBANIQFMABABABABA';			// Публичный ключ приложения
	constructor(){

	}
	
	request_obf(method, data = null, callback = null, error = null)
	{
		
		// if (DataLoader.REQUEST_HTTP_MODE == 'POST')
		// {
			
		// 	instance.post(DataLoader.SERVER_URL,
		// 		getData_obf(method, data)
		// 	)
		// 	.then(function (response) {
		// 		//console.log(response);
		// 		completeHandler_obf(response, callback, error);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 		//lr.addEventListener(IOErrorEvent.IO_ERROR, 				this._ioError);
		// 		//lr.addEventListener(SecurityErrorEvent.SECURITY_ERROR, 	this._secureError);
		// 	});
		// } 
		// else 
		// {
		// 	axios.get(DataLoader.SERVER_URL, {
		// 		// headers: {
		// 		// 	'Access-Control-Allow-Origin': '*',
		// 		//   },
		// 		params: getData_obf(method, data)
		// 	})
		// 	.then(function (response) {
		// 		//lr.addEventListener(Event.COMPLETE, completeHandler_obf); 
		// 		//console.log(response);
		// 		completeHandler_obf(response, callback, error);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 		//lr.addEventListener(IOErrorEvent.IO_ERROR, 				this._ioError);
		// 		//lr.addEventListener(SecurityErrorEvent.SECURITY_ERROR, 	this._secureError);
		// 	});
		// }		
		
		//lr.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler_obf); // Возвращает код состояния HTTP запроса (не ошибка - просто состояние)
		
		
		
		//rTracer.trace(request.data);
		
		//lr.load(request);

		return axios.get(DataLoader.SERVER_API_URL, {
			// headers: {
			// 	'Access-Control-Allow-Origin': '*',
			//   },
			params: getData_obf(method, data)
		});
	}
}
