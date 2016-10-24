function parse(url){
    // null or undefined case
   if (typeof(url) == "undefined" || url == null){
       return {
           isValidUrl : false,
           sectionName : null,
           sectionId : null,
           pageName : null,
           pageId : null,
           url : url,
           reason : 'url was null or undefined'
       }
   }

   var wd = getParameterByName("wd", url);

   if(typeof(wd) == "undefined" || wd == null || !isTarget(wd)){
      return {
           isValidUrl : false,
           sectionName : null,
           sectionId : null,
           pageName : null,
           pageId : null,
           url : url,
           reason : 'there was no wd parameter or it did not contain a target'
       } 
   }

   var targetInfo = retrieveTargetInformation(wd)
    
    // Section names can't contain any of the following characters: ~ # % & ( { } | \ : " < > ? / ^
    try {
        var sectionDelimiterPosition = targetInfo.indexOf("|");
        var afterSectionDelimiter = sectionDelimiterPosition + 1;
        var pageDelimiterLength = 1;
        var guidLength = 36
        var targetInfoLength = targetInfo.length - 1

        var sectionGuid = targetInfo.substring(afterSectionDelimiter , afterSectionDelimiter + guidLength)
        var sectionName = targetInfo.substring(2 /* \\ */, sectionDelimiterPosition - 4 /* .one */)
        var pageName = targetInfo.substring(afterSectionDelimiter + guidLength + pageDelimiterLength, targetInfoLength-guidLength - pageDelimiterLength);
        var pageId = targetInfo.substring(targetInfoLength - guidLength, targetInfoLength)

        return {
            isValidUrl : true,
            sectionName : sectionName.replaceAll('\\', ''),
            sectionId : sectionGuid,
            pageName : pageName.replaceAll('\\', ''),
            pageId : pageId,
            url : url,
            reason : 'success'
        }
    }
    catch(e){
        return {
           isValidUrl : false,
           sectionName : null,
           sectionId : null,
           pageName : null,
           pageId : null,
           url : url,
           reason : 'unable to parse url : expected format( <sectionname>.one|<guid>/<pagename>|<guid )'
        }
    }
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

//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

module.exports = parse;