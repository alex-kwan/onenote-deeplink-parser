"use strict";

var parser = require('../index.js');

describe("onenote valid deeplinks", function () {
    var expectedSectionName = 'AAA',
        expectedSectionId = '111a1a11-a11a-11a1-1a1a-a111a111aa1a',
        expectedPageName = 'BBB',
        expectedPageId = '111a11aa-111a-1aaa-111a-11a1111a1a1a',
        expectedReason = 'success';

    describe("parsing link", function () {
        it("parsing onedrive link", function () {
            var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
                result = parser(onedriveLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual([]);
            expect(result.sectionName).toBe(expectedSectionName);
            expect(result.sectionId).toBe(expectedSectionId);
            expect(result.pageName).toBe(expectedPageName);
            expect(result.pageId).toBe(expectedPageId);
            expect(result.reason).toBe(expectedReason);
        });
        it("parsing sharepoint link", function () {
            var sharepointLink = 'https://sharepointonline.com/teams/teamawesome/_layouts/15/WopiFrame.aspx?sourcedoc={ea3d1219-b013-4a19-b301-bfdea52eb922}&action=edit&wd=target%28%2F%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
                result = parser(sharepointLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual([]);
            expect(result.sectionName).toBe(expectedSectionName);
            expect(result.sectionId).toBe(expectedSectionId);
            expect(result.pageName).toBe(expectedPageName);
            expect(result.pageId).toBe(expectedPageId);
            expect(result.reason).toBe(expectedReason);
        });
    });
    describe("parsing links with section groups", function () {
        it("parsing onedrive link with section groups", function () {
            var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FB%2FBB%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
                result = parser(onedriveLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual(['B', 'BB']);
            expect(result.sectionName).toBe(expectedSectionName);
            expect(result.sectionId).toBe(expectedSectionId);
            expect(result.pageName).toBe(expectedPageName);
            expect(result.pageId).toBe(expectedPageId);
            expect(result.reason).toBe(expectedReason);
        });

        it("parsing sharepoint link with section groups", function () {
            var sharepointLink = 'https://sharepointonline.com/teams/teamawesome/_layouts/15/WopiFrame.aspx?sourcedoc={ea3d1219-b013-4a19-b301-bfdea52eb922}&action=edit&wd=target%28%2F%2FAAA%2FAAA%2FAAAA%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
                result = parser(sharepointLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual(['AAA', 'AAA', 'AAAA']);
            expect(result.sectionName).toBe(expectedSectionName);
            expect(result.sectionId).toBe(expectedSectionId);
            expect(result.pageName).toBe(expectedPageName);
            expect(result.pageId).toBe(expectedPageId);
            expect(result.reason).toBe(expectedReason);
        });
    });
});