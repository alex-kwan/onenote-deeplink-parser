"use strict";

var parser = require('../index.js');

describe("onenote valid complex deeplinks", function () {
    it("parsing link with brackets in section name", function () {
        var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FAAA%5C)%5C).one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
            result = parser(onedriveLink);
        expect(result.isValidUrl).toBe(true);
        expect(result.sectionGroupNames).toEqual([]);
        expect(result.sectionName).toBe('AAA\)\)');
        expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
        expect(result.pageName).toBe('BBB');
        expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
        expect(result.reason).toBe('success');
    });

    it("parsing link with section/page delimiter in page name", function () {
        var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2F%5C%7CBBB%5C%7C%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
            result = parser(onedriveLink);
        expect(result.isValidUrl).toBe(true);
        expect(result.sectionGroupNames).toEqual([]);
        expect(result.sectionName).toBe('AAA');
        expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
        expect(result.pageName).toBe('\|BBB\|');
        expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
        expect(result.reason).toBe('success');
    });

    it("parsing link with multiple forward slash in page name", function () {
        var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FB%5C%2FB%5C%2FB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29',
            result = parser(onedriveLink);
        expect(result.isValidUrl).toBe(true);
        expect(result.sectionGroupNames).toEqual([]);
        expect(result.sectionName).toBe('AAA');
        expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
        expect(result.pageName).toBe('B/B/B');
        expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
        expect(result.reason).toBe('success');
    });
});