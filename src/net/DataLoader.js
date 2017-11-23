const RESPONSE_DATA_FORMAT = 'JSON';
const REQUEST_HTTP_MODE = 'POST';
const API_VERSION = '1.0';

let SERVER_URL:String 	= "";
let api_id:String 		= "";
let secret_key:String 	= "";

let dict = {};	// Глобальная очередь запросов	

let request_obf =  function(method, data = null, callback = null, error = null)
{
	var request:URLRequest = new URLRequest( SERVER_URL);
	if (REQUEST_HTTP_MODE == 'POST')
	{
		request.method = URLRequestMethod.POST;
	} 
	else 
	{
		request.method = URLRequestMethod.GET;
	}		
	
	request.data = getData_obf(method,data);
	
	var lr:URLLoader = new URLLoader();
	lr.addEventListener(Event.COMPLETE, completeHandler_obf);
	
    lr.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler_obf); // Возвращает код состояния HTTP запроса (не ошибка - просто состояние)
	
	lr.addEventListener(IOErrorEvent.IO_ERROR, 				this._ioError);
	lr.addEventListener(SecurityErrorEvent.SECURITY_ERROR, 	this._secureError);


   	if (callback !== null)
	{
		dict[lr] = [callback, error];
	}
	
	//rTracer.trace(request.data);
	
	lr.load(request);
}

function completeHandler_obf(event) 
{
	if (event.target != null && dict[event.target] != null)
	{			
		var callback : Function = dict[event.target][0];
		if (dict[event.target][1] == null)
		{
			
		}
		
		var error:Function = dict[event.target][1];
		var data:Object = JSON.parse(event.target.data as String);
		
		if ( data.response.error_code)
		{
			rTracer.trace( "ERROR => DataLoader\\completeHandler_obf: " + data.response.error_code + " => " + data.response.error_message, rTracer.ERROR);
			
			if (dict[event.target][1] == null)
			{
				var msg:String = (data.response.error_message).toString();
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
		
		var error:Function = dict[ ev.target][1];
		
		if( error != null)
			error( ev);
		
		delete dict[ ev.target];
	}
	catch ( err:Error)
	{
		rTracer.trace( "ERROR => DataLoader\\_ioError: " + err.message, rTracer.ERROR);
	}
}

function _secureError(ev) 
{
	try
	{
		rTracer.trace( "ERROR => DataLoader\\_secureError: " + ev.text, rTracer.ERROR);
		
		var error:Function = dict[ ev.target][1];
		
		if( error != null)
			error( ev);
		
		delete dict[ ev.target];
	}
	catch ( err:Error)
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
	
	for each (var s in sigArray)
	{
		result += s;
	}			
	
	
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

export default {}