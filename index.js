function parse(url){
    // null or undefined case
   if (typeof(url) == "undefined" || url == null){
       return {
           isValidUrl : false,
           sectionName : null,
           pageName : null,
           url : url
       }
   }

   var wd = getParameterByName("wd", url);

   if(typeof(wd) == "undefined" || wd == null || !isTarget(wd)){
      return {
           isValidUrl : false,
           sectionName : null,
           pageName : null,
           url : url
       } 
   }

   var targetInfo = retrieveTargetInformation(wd)

   return split(targetInfo);
}

// retrieves query parameters by name
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url){
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isTarget(queryParameter){
    return queryParameter.startsWith('target(') && queryParameter.endsWith(')')
}

function retrieveTargetInformation(queryParameter){
    return queryParameter.substring(7 /* length of "target(" */, queryParameter.length-1 /* cut off the trailing ")" */)
}

function split(targetInfo){
    return targetInfo.split("/");
}

module.exports = parse;