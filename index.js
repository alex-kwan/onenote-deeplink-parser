'use strict';

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

function isTarget(queryParameter) {
    return queryParameter.startsWith('target(') && queryParameter.endsWith(')');
}

function retrieveTargetInformation(queryParameter) {
    // format of target query parameter   target(<targetinfo>)
    return queryParameter.substring(7, queryParameter.length - 1);
}

//http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function parse(url) {
    var pageDelimiterLength = 1,
        guidLength = 36,
        wd,
        targetInfo,
        sectionDelimiterPosition,
        afterSectionDelimiter,
        targetInfoLength,
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

    if (wd === 'undefined' || wd === null || !isTarget(wd)) {
        return new GetErrorResponse('there was no wd parameter or it did not contain a target');
    }

    targetInfo = retrieveTargetInformation(wd);

    // Section names can't contain any of the following characters: ~ # % & ( { } | \ : " < > ? / ^
    // this suggests the first time we see a '|', we are able to determine what is section info
    // and what is page info
    try {
        sectionDelimiterPosition = targetInfo.indexOf('|');

        if (sectionDelimiterPosition === -1) {
            return new GetErrorResponse('deeplink did not contain delimiter between section and page info');
        }

        afterSectionDelimiter = sectionDelimiterPosition + 1;

        sectionGuid = targetInfo.substring(afterSectionDelimiter, afterSectionDelimiter + guidLength);

        // format for section name in target string \\<sectionname>.one
        sectionName = targetInfo.substring(2, sectionDelimiterPosition - 4).split('/');

        // the section name can actually "contain" the section group names as well
        sectionGroupNames = sectionName.slice(0, sectionName.length - 1);

        // we know it will always be the last element if we split the section by '/'
        sectionName = sectionName[sectionName.length - 1];

        targetInfoLength = targetInfo.length - 1;

        pageName = targetInfo.substring(
            afterSectionDelimiter + guidLength + pageDelimiterLength,
            targetInfoLength - guidLength - pageDelimiterLength
        );

        pageId = targetInfo.substring(targetInfoLength - guidLength, targetInfoLength);

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
