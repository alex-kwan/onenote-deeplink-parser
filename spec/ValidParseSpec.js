var parser = require('../index.js');

describe("onenote valid deeplinks", function(){
    describe("parsing link", function() {
        it("parsing onedrive link", function() {
            var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29';
            var result = parser(onedriveLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual([]);
            expect(result.sectionName).toBe('AAA');
            expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
            expect(result.pageName).toBe('BBB');
            expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
            expect(result.reason).toBe('success');
        });
        it("parsing sharepoint link", function(){
            var sharepointLink = 'https://sharepointonline.com/teams/teamawesome/_layouts/15/WopiFrame.aspx?sourcedoc={ea3d1219-b013-4a19-b301-bfdea52eb922}&action=edit&wd=target%28%2F%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29';
            var result = parser(sharepointLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual([]);
            expect(result.sectionName).toBe('AAA');
            expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
            expect(result.pageName).toBe('BBB');
            expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
            expect(result.reason).toBe('success');
        });
    });
    describe("parsing links with section groups", function(){
        it("parsing onedrive link with section groups", function() {
            var onedriveLink = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote&wd=target%28%2F%2FB%2FBB%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29';
            var result = parser(onedriveLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual(['B', 'BB']);
            expect(result.sectionName).toBe('AAA');
            expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
            expect(result.pageName).toBe('BBB');
            expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
            expect(result.reason).toBe('success');
        });

        it("parsing sharepoint link with section groups", function(){
            var sharepointLink = 'https://sharepointonline.com/teams/teamawesome/_layouts/15/WopiFrame.aspx?sourcedoc={ea3d1219-b013-4a19-b301-bfdea52eb922}&action=edit&wd=target%28%2F%2AAA%2FAAA%2FAAAA%2FAAA.one%7C111a1a11-a11a-11a1-1a1a-a111a111aa1a%2FBBB%7C111a11aa-111a-1aaa-111a-11a1111a1a1a%2F%29';
            var result = parser(sharepointLink);
            expect(result.isValidUrl).toBe(true);
            expect(result.sectionGroupNames).toEqual(['AA','AAA','AAAA']);
            expect(result.sectionName).toBe('AAA');
            expect(result.sectionId).toBe('111a1a11-a11a-11a1-1a1a-a111a111aa1a');
            expect(result.pageName).toBe('BBB');
            expect(result.pageId).toBe('111a11aa-111a-1aaa-111a-11a1111a1a1a');
            expect(result.reason).toBe('success');
        });
    });
});