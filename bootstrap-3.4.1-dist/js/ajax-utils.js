(function (global){
// SET up a namespace for our utility
    var ajaxUtils = {};

//Returns an HTTP request object 
function getRequestObject() {
    if (window.XMLHttpRequest) {
        return (new XMLHttpRequest());
    }
    else if (window.ActiveXObject) {
    // For very Old IE browsers (optional)
       return (new ActiveXObject("Microsoft.XMLHTTP"));
    }
    else {
        global.alert("Ajax is not supported!")
        return(null);
    }
}

// Makes a Ajax Get request to "requestUrl"
ajaxUtils.sendGetRequest = 
    function (requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange =
        function(){
            handleResponse( request,
                            responseHandler,
                            isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        request.send("null");//For Post Only
    };

// Only Calls User provided 'responseHandler'
// function if response is ready
// and not in error
function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {
    if ((request.readyState == 4) &&
       (request.status == 200))  {

        //Default to isJsonResponse = true
        if (isJsonResponse == undefined) {
            isJsonResponse = true;
        }

        if (isJsonResponse) {
            responseHandler(JSON.parse(request.responseText));
        }
        else {
            responseHandler(request.responseText);
        }
       }                        
      }

    // Expose Utilty For Global Object
    global.$ajaxUtils = ajaxUtils;
})(window);