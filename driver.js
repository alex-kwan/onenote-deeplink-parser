var parser = require('./index.js');

var nullLink = null;
var undefinedLink = null;

console.log(parser(nullLink).isValidUrl === false)
console.log(parser(undefinedLink).isValidUrl === false)

var noWdLink = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote'

console.log(parser(noWdLink).isValidUrl == false)

var goodlink = 'https://onedrive.live.com/edit.aspx?cid=7d4ca48ab71fa43a&id=documents&resid=7D4CA48AB71FA43A!1002&app=OneNote&&wd=target%28%2F%2FTypescript%20Definition%20Files.one%7C865d0e84-d32b-44c4-8b2c-e746e460ce8a%2FExample%20Javascript%20Library%20%28OneNote%20Deep%20Link%5C%29%7Ceea62e68-1529-4eec-83cf-08c4498c4b96%2F%29'

console.log(parser(goodlink))