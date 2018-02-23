(function(window,undefine){
    var jsonp = function(url,data,method,callback){
        var url=url || "";
        var data = data||{};
        var method = method ||"";
        var callback = callback || function(){};
        var getKey = function(obj){
            var keys=[];
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    keys.push(key);
                }
            }
            return keys;
        };
        if(typeof data == "object"){
            var queryStr = "";
            var keys = getKey(data);
            for(var i=0;i<keys.length;i++){
                queryStr +=encodeURIComponent(keys[i])+"="+encodeURIComponent(data[keys[i]]);
                if(i!=keys.length-1){
                    queryStr +="&";
                }
            }
            url += "?"+queryStr;
        }else if(typeof data =="function"){
            method = data;
            callback = method;
        }
        if(typeof method=="function"){
            callback=method;
            method="callback";
        }
        if(!Date.now){
            Date.now = function() { return new Date().getTime(); };
        }
        var timestamp = Date.now;
        var generatedFunction = 'jsonp'+Math.round(timestamp+Math.random()*1000001);
        window[generatedFunction]=function(json){
            callback(json);
            try{
                delete window[generatedFunction];
            }catch(e){
                window[generatedFunction] = undefine;
            }
        };
        if(url.indexOf("?")===-1){
            url =url+"?";
        }else{
            url =url+"&";
        }
        var jsonpScript = document.createElement("script");
        jsonpScript.setAttribute("src",url+method+"="+generatedFunction);
        document.getElementsByTagName("head")[0].appendChild(jsonpScript);
    };
    window.jsonp=jsonp;

})(window);