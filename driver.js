"use strict";

var parser = require('./index.js');
var nullLink = null;
var undefinedLink = null;
var noWdLink = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote';
var urlWithBracketsEdgeCase = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ftest%5C%29%5C%29.one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FBlah%28%5C%29%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F%29';
var urlWithLinesEdgeCase = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ftest%5C%29%5C%29.one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FBla%5C%7C%5C%7C%5C%7Ch%28%5C%29%5C%7C%5C%7C%5C%7C%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F%29';
var urlWithMultipleForwardSlashes = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ftest%5C%29%5C%29.one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FBl%5C%2F%5C%2F%5C%2F%5C%2F%5C%2F%5C%2F%5C%2Fa%5C%7C%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F%29';
var moreMultipleForwardSlashesAndBracketsUrl = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ftest%5C%29%5C%29.one%7Cb61b035e-278a-4796-ab82-42e1bda4d9c7%2FBl%5C%2F%5C%2F%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%2F%5C%2F%7C13d3a0df-79de-4ad3-886d-9dc62b1be675%2F%29';
var goodLink = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2FTypescript%20Definition%20Files.one%7C865d0e84-d32b-44c4-8b2c-e746e460ce8a%2FExample%20Javascript%20Library%20%28OneNote%20Deep%20Link%5C%29%7Ceea62e68-1529-4eec-83cf-08c4498c4b96%2F%29';
var dotoneinsectionnameurl = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2Ft.one.two.three.one%7C3cd6ec7a-e49b-4bc1-bfb3-57af7865a046%2F.one.two.two%7C68ec67a4-2345-433d-9150-1bd51d80b463%2F%29';
var validsharepointurl = 'https://msft.spoppe.com/teams/onenote/_layouts/15/WopiFrame.aspx?sourcedoc={ea3d1219-b013-4a19-b301-bfdea52eb922}&action=edit&wd=target%28%2F%2FOCE%2FData%20and%20Examples.one%7Cf5107145-d77a-481e-ac3d-17e60ea89af7%2FKusto%20Queries%7C5a485da3-1c7c-4833-ab29-f77ab60dcea2%2F%29';
var anotherValidOneDriveLink = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2FTypescript%20Definition%20Files.one%7C865d0e84-d32b-44c4-8b2c-e746e460ce8a%2FRoadmap%7Cb32b75bb-693a-4fce-872e-19b7681f7e0c%2F%29';
function verify(testcase, url, expectedOutcome) {
    var parsed, sectionNameMatches, sectionIdMatches, pageNameMatches, pageIdMatches;

    console.log('Test Case : ' + testcase);
    parsed = parser(url);

    sectionNameMatches = expectedOutcome.sectionName === parsed.sectionName;
    if (!sectionNameMatches) {
        console.log('ExpectedSectionName : ' + expectedOutcome.sectionName + ' !==  ActualSectionName : ' + parsed.sectionName);
    }

    sectionIdMatches = expectedOutcome.sectionId === parsed.sectionId;
    if (!sectionIdMatches) {
        console.log('ExpectedSectionId : ' + expectedOutcome.sectionId + ' !== ActualSectionId : ' + parsed.sectionId);
    }

    pageNameMatches = expectedOutcome.pageName === parsed.pageName;
    if (!pageNameMatches) {
        console.log('ExpectedPageName : ' + expectedOutcome.pageName + ' !== ActualPageName : ' + parsed.pageName);
    }

    pageIdMatches = expectedOutcome.pageId === parsed.pageId;
    if (!pageIdMatches) {
        console.log('ExpectedPageId : ' + expectedOutcome.pageId + ' !== ActualPageId : ' + parsed.pageId);
    }

    console.log(sectionNameMatches && sectionIdMatches && pageNameMatches && pageIdMatches);
}

verify('nullLink', nullLink, {
    sectionName : null,
    sectionId : null,
    pageName : null,
    pageId : null
});

verify('undefinedLink', undefinedLink, {
    sectionName : null,
    sectionId : null,
    pageName : null,
    pageId : null
});

verify('noWdLink', noWdLink, {
    sectionName : null,
    sectionId : null,
    pageName : null,
    pageId : null
});

verify('urlWithBracketsEdgeCase', urlWithBracketsEdgeCase, {
    sectionName : 'test\)\)',
    sectionId : 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
    pageName : 'Blah(\)',
    pageId : '13d3a0df-79de-4ad3-886d-9dc62b1be675'
});

verify('urlWithLinesEdgeCase', urlWithLinesEdgeCase, {
    sectionName : 'test\)\)',
    sectionId : 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
    pageName : 'Bla\|\|\|h(\)\|\|\|',
    pageId : '13d3a0df-79de-4ad3-886d-9dc62b1be675'
});

verify('urlWithMultipleForwardSlashes', urlWithMultipleForwardSlashes, {
    sectionName : 'test\)\)',
    sectionId : 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
    pageName : 'Bl///////a|',
    pageId : '13d3a0df-79de-4ad3-886d-9dc62b1be675'
});

verify('moreMultipleForwardSlashesAndBracketsUrl', moreMultipleForwardSlashesAndBracketsUrl, {
    sectionName : 'test))',
    sectionId : 'b61b035e-278a-4796-ab82-42e1bda4d9c7',
    pageName : 'Bl////',
    pageId : '13d3a0df-79de-4ad3-886d-9dc62b1be675'
});

verify('goodLink', goodLink, {
    sectionName : 'Typescript Definition Files',
    sectionId : '865d0e84-d32b-44c4-8b2c-e746e460ce8a',
    pageName : 'Example Javascript Library (OneNote Deep Link)',
    pageId : 'eea62e68-1529-4eec-83cf-08c4498c4b96'
});

verify('dotoneinsectionnameurl', dotoneinsectionnameurl, {
    sectionName : 't.one.two.three',
    sectionId : '3cd6ec7a-e49b-4bc1-bfb3-57af7865a046',
    pageName : '.one.two.two',
    pageId : '68ec67a4-2345-433d-9150-1bd51d80b463'
});

verify('validsharepointurl', validsharepointurl, {
    sectionName : 'Data and Examples',
    sectionId : 'f5107145-d77a-481e-ac3d-17e60ea89af7',
    pageName : 'Kusto Queries',
    pageId : '5a485da3-1c7c-4833-ab29-f77ab60dcea2'
});

verify('anotherValidOneDriveLink', anotherValidOneDriveLink, {
    sectionName : 'Typescript Definition Files',
    sectionId : '865d0e84-d32b-44c4-8b2c-e746e460ce8a',
    pageName : 'Roadmap',
    pageId : 'b32b75bb-693a-4fce-872e-19b7681f7e0c'
});