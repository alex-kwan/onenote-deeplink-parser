'use strict';

var wdparamregex = /(^target\()\/\/(.*)(.one\|)([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})(\/)(.*)(\|)([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\/(\)$)/;

function GetErrorResponse(message) {
    return {
        isValidUrl: false,
        sectionGroupNames: [],
        sectionName: null,
        sectionId: null,
        pageName: null,
        pageId: null,
        reason: message,
    };
}

// retrieves query parameters by name
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function parse(url) {
    var wd,
        targetInfo,
        sectionGuid,
        sectionGroupNames,
        sectionName,
        pageName,
        pageId;

  // null or undefined case
    if (url === 'undefined' || url === null) {
        return new GetErrorResponse('url was null or undefined');
    }

    wd = getParameterByName('wd', url);

    if (wd === 'undefined' || wd === null) {
        return new GetErrorResponse('there was no wd parameter or it did not contain a target');
    }
    
    if(!wdparamregex.test(wd)){
        return new GetErrorResponse('wd parameter does not fit expected format');
    }
    
    // Section names can't contain any of the following characters: ~ # % & ( { } | \ : " < > ? / ^
    // this suggests the first time we see a '|', we are able to determine what is section info
    // and what is page info
    try {
        sectionName = wd.match(wdparamregex)[2].split('/');
        sectionGroupNames = sectionName.slice(0, sectionName.length - 1);
        sectionGuid = wd.match(wdparamregex)[4];
        sectionName = sectionName[sectionName.length - 1];
        pageName = wd.match(wdparamregex)[6]
        pageId = wd.match(wdparamregex)[8]

        return {
            isValidUrl: true,
            sectionGroupNames: sectionGroupNames,
            sectionName: sectionName.replaceAll('\\', ''),
            sectionId: sectionGuid,
            pageName: pageName.replaceAll('\\', ''),
            pageId: pageId,
            reason: 'success',
        };
    } catch (e) {
        return new GetErrorResponse('unable to parse url : expected format( <sectionname>.one|<guid>/<pagename>|<guid )');
    }
}

module.exports = parse;
