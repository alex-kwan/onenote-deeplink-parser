'use strict';

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
    return {
      isValidUrl: false,
      sectionGroupNames: [],
      sectionName: null,
      sectionId: null,
      pageName: null,
      pageId: null,
      url: url,
      reason: 'url was null or undefined',
    };
  }

  wd = getParameterByName('wd', url);

  if (wd === 'undefined' || wd === null || !isTarget(wd)) {
    return {
      isValidUrl: false,
      sectionGroupNames: [],
      sectionName: null,
      sectionId: null,
      pageName: null,
      pageId: null,
      url: url,
      reason: 'there was no wd parameter or it did not contain a target',
    };
  }

  targetInfo = retrieveTargetInformation(wd);

  // Section names can't contain any of the following characters: ~ # % & ( { } | \ : " < > ? / ^
  try {
    sectionDelimiterPosition = targetInfo.indexOf('|');
    afterSectionDelimiter = sectionDelimiterPosition + 1;
    targetInfoLength = targetInfo.length - 1;

    sectionGuid = targetInfo.substring(afterSectionDelimiter, afterSectionDelimiter + guidLength);

    // format for section name in target string \\<sectionname>.one
    sectionName = targetInfo.substring(2, sectionDelimiterPosition - 4).split('/');
    sectionGroupNames = sectionName.slice(0, sectionName.length - 1);
    sectionName = sectionName[sectionName.length - 1];

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
      url: url,
      reason: 'success',
    };
  } catch (e) {
    return {
      isValidUrl: false,
      sectionGroupNames: [],
      sectionName: null,
      sectionId: null,
      pageName: null,
      pageId: null,
      url: url,
      reason: 'unable to parse url : expected format( <sectionname>.one|<guid>/<pagename>|<guid )',
    };
  }
}

module.exports = parse;
