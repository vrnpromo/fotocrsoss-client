import axios from 'axios';

let dict = {};	// Глобальная очередь запросов	

function completeHandler_obf(event) 
{
	if (event.target != null && dict[event.target] != null)
	{			
		var callback = dict[event.target][0];
		if (dict[event.target][1] == null)
		{
			
		}
		
		var error = dict[event.target][1];
		var data = JSON.parse(event.target.data);
		
		if ( data.response.error_code)
		{
			rTracer.trace( "ERROR => DataLoader\\completeHandler_obf: " + data.response.error_code + " => " + data.response.error_message, rTracer.ERROR);
			
			if (dict[event.target][1] == null)
			{
				var msg = (data.response.error_message).toString();
				rTracer.trace( msg, rTracer.ERROR);
			} 
			else 
			{
				error(data.response);
			};
			delete dict[event.target];
		} 
		else 
		{
			delete dict[event.target];
			callback(data.response);
		}
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
	data.method 	= method;
	data.format 	= RESPONSE_DATA_FORMAT;			
	data.api_server = SERVER_URL; 
	data.v 			= API_VERSION;
	
	var sigArray = []			
	var result = '';
	
	for (var param in data)
	{
		var value = data[param];
		if (!(value is String) &&
		!(value is int))
		{
			data[param] = JSON.stringify(value);									
		}			 
	}
	for (var p in data)
	{
		sigArray.push(`${p}=${data[p]}`);				 
	}
	sigArray.sort();
	
	sigArray.forEach(s => result+=s);
	
	data.sig = MD5.encrypt( api_id + result + secret_key);			
	data.api_id = api_id;
	data.timestamp = Number( new Date().time);
	data.random = Math.abs( Math.round(Math.random() * 1000) - 500);	
	
	
	
	var str = '';
	for (var v in data)
	{
		str += `${v}=${data[v]}&`;			 
	}	
	
	return str.slice(0, str.length - 1);
}	

export default class DataLoader {
	static RESPONSE_DATA_FORMAT = 'JSON';
	static REQUEST_HTTP_MODE = 'POST';
	static API_VERSION = '1.0';
	
	static SERVER_URL 	= "";
	static api_id 		= "";
	static secret_key 	= "";
	
	request_obf(method, data = null, callback = null, error = null)
	{
		if (callback !== null)
		{
			dict[lr] = [callback, error];
		}
		
		if (REQUEST_HTTP_MODE == 'POST')
		{
			axios.post(SERVER_URL, 
				getData_obf(method,data)
			)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
				//lr.addEventListener(IOErrorEvent.IO_ERROR, 				this._ioError);
				//lr.addEventListener(SecurityErrorEvent.SECURITY_ERROR, 	this._secureError);
			});
		} 
		else 
		{
			axios.get(SERVER_URL, {
				params: getData_obf(method,data)
			})
			.then(function (response) {
				//lr.addEventListener(Event.COMPLETE, completeHandler_obf); 
				//console.log(response);
			})
			.catch(function (error) {
				console.log(error);
				//lr.addEventListener(IOErrorEvent.IO_ERROR, 				this._ioError);
				//lr.addEventListener(SecurityErrorEvent.SECURITY_ERROR, 	this._secureError);
			});
		}		
		
		//lr.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler_obf); // Возвращает код состояния HTTP запроса (не ошибка - просто состояние)
		
		
		
		//rTracer.trace(request.data);
		
		//lr.load(request);
	}
}
