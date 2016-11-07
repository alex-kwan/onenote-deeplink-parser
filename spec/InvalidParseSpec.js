var parser = require('../index.js');

describe("onenote invalid deeplinks", function(){
    var baseUrl = 'https://onedrive.live.com/edit.aspx?cid=1a1aa11aa11aa11a'+
        '&id=documents&resid=1A1AA11AA11AA11A!111&app=OneNote';

    describe("parsing no link", function() {
        it("parsing null link", function() {
            var result = parser(null);
            expect(result.isValidUrl).toBe(false);
            expect(result.reason).toBe('url was null or undefined');
        });

        it("parsing undefined link", function(){
        var result = parser(undefined);
        expect(result.isValidUrl).toBe(false);
        expect(result.reason).toBe('there was no wd parameter or it did not contain a target');
        });
    });

    describe("parsing link with no query params", function(){
        it("parsing no wd param", function() {
            var result = parser(baseUrl);
            expect(result.isValidUrl).toBe(false);
            expect(result.reason).toBe('there was no wd parameter or it did not contain a target');
        });
    });
});


