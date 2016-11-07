"use strict";
var parser = require('./index.js');

var urlWithBracketsEdgeCase = 'https://bing.com?app=OneNote&wd=target(%2F%2Ftestsection%5C)%5C).one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2Ftestpage(%5C)%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F)';
var urlWithLinesEdgeCase = 'https://bing.com?app=OneNote&wd=target(%2F%2Ftestsection%5C)%5C).one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FTest%5C%7C%5C%7CPage%5C%7C%5C%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F)';
var urlWithMultipleForwardSlashes = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ftest%5C%29%5C%29.one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FBl%5C%2F%5C%2F%5C%2F%5C%2F%5C%2F%5C%2F%5C%2Fa%5C%7C%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F%29';
var moreMultipleForwardSlashesAndBracketsUrl = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ftest%5C%29%5C%29.one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FBl%5C%2F%5C%2F%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%2F%5C%2F%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F%29';
var dotoneinsectionnameurl = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ft.one.two.three.one%7C3cd6ec7a-e49b-4bc1-bfb3-57af7865a046%2F.one.two.two%7C68ec67a4-2345-433d-9150-1bd51d80b463%2F%29';

function matchSectionGroups(expectedSGs, actualSGs){
  var expectedLength, actualLength, index;
  expectedLength = expectedSGs.length;
  actualLength = actualSGs.length;
  if (expectedLength != actualLength) {
    return false;
  }

  for (index = 0; index < expectedLength; index++) {
    if (expectedSGs[index] !== actualSGs[index]) {
      return false;
    }
  }

  return true;
}

function verify(testcase, url, expectedOutcome) {
  var parsed,
  sectionGroupMatches,
  sectionNameMatches,
  sectionIdMatches,
  pageNameMatches,
  pageIdMatches;

  console.log('Test Case : ' + testcase);
  parsed = parser(url);

  sectionGroupMatches = matchSectionGroups(
    expectedOutcome.sectionGroupNames,
    parsed.sectionGroupNames
  );
  if (!sectionGroupMatches) {
    'ExpectedSectionGroupNames : ' +
    expectedOutcome.sectionGroupNames +
    ' !== ActualSectionGroupNames : ' +
    parsed.sectionGroupNames
  }

  sectionNameMatches = expectedOutcome.sectionName === parsed.sectionName;
  if (!sectionNameMatches) {
    console.log(
      'ExpectedSectionName : ' +
      expectedOutcome.sectionName +
      ' !==  ActualSectionName : ' +
      parsed.sectionName
    );
  }

  sectionIdMatches = expectedOutcome.sectionId === parsed.sectionId;
  if (!sectionIdMatches) {
    console.log(
      'ExpectedSectionId : ' +
      expectedOutcome.sectionId +
      ' !== ActualSectionId : ' +
      parsed.sectionId
    );
  }

  pageNameMatches = expectedOutcome.pageName === parsed.pageName;
  if (!pageNameMatches) {
    console.log(
      'ExpectedPageName : ' +
      expectedOutcome.pageName +
      ' !== ActualPageName : ' +
      parsed.pageName
    );
  }

  pageIdMatches = expectedOutcome.pageId === parsed.pageId;
  if (!pageIdMatches) {
    console.log(
      'ExpectedPageId : ' +
      expectedOutcome.pageId +
      ' !== ActualPageId : ' +
      parsed.pageId
    );
  }

  console.log(
    sectionNameMatches &&
    sectionIdMatches &&
    pageNameMatches &&
    pageIdMatches)
  ;
}

verify('urlWithBracketsEdgeCase', urlWithBracketsEdgeCase, {
  sectionGroupNames: [],
  sectionName: 'testsection\)\)',
  sectionId: 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
  pageName: 'testpage(\)',
  pageId: '13d3a0df-79de-4ad3-886d-9dc62b1be675',
});

verify('urlWithLinesEdgeCase', urlWithLinesEdgeCase, {
  sectionGroupNames: [],
  sectionName: 'testsection\)\)',
  sectionId: 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
  pageName: 'Test\|\|Page\|',
  pageId: '13d3a0df-79de-4ad3-886d-9dc62b1be675',
});

verify('urlWithMultipleForwardSlashes', urlWithMultipleForwardSlashes, {
  sectionGroupNames: [],
  sectionName: 'test\)\)',
  sectionId: 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
  pageName: 'Bl///////a|',
  pageId: '13d3a0df-79de-4ad3-886d-9dc62b1be675',
});

verify('moreMultipleForwardSlashesAndBracketsUrl', moreMultipleForwardSlashesAndBracketsUrl, {
  sectionGroupNames: [],
  sectionName: 'test))',
  sectionId: 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
  pageName: 'Bl////',
  pageId: '13d3a0df-79de-4ad3-886d-9dc62b1be675',
});

verify('dotoneinsectionnameurl', dotoneinsectionnameurl, {
  sectionGroupNames: [],
  sectionName: 't.one.two.three',
  sectionId: '3cd6ec7a-e49b-4bc1-bfb3-57af7865a046',
  pageName: '.one.two.two',
  pageId: '68ec67a4-2345-433d-9150-1bd51d80b463',
});