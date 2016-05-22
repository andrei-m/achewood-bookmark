console.log('Achewood bookmarker loaded.');

var ab = new AchewoodBookmarker();

chrome.webNavigation['onCompleted'].addListener(function(data) {
  if (ab.isAchewoodURL(data.url)) {
    ab.setURL(data.url);
  }
});

ab.getURL(function(data) {
  console.log('Achewood URL: ' + data.url);
});

function AchewoodBookmarker() {
  this.achewoodURL = 'http://www.achewood.com/index.php?date=';

  this.isAchewoodURL = function(url) {
    return url.substring(0, this.achewoodURL.length) === this.achewoodURL
  };

  this.getURL = function(cb) {
    chrome.storage.local.get('url', cb);
  };

  this.setURL = function(url) {
    chrome.storage.local.set({'url': url}, function() {
      console.log(url + ' bookmarked.');
    });
  };
}
