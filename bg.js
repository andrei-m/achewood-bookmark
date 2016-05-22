var ab = new AchewoodBookmarker();

console.log('Achewood bookmarker loaded.');
ab.getURL(function(data) {
  console.log('Achewood URL: ' + data.url);
});

chrome.webNavigation['onCompleted'].addListener(function(data) {
  if (ab.isAchewoodURL(data.url)) {
    ab.setURL(data.url);
  }
});

chrome.browserAction.onClicked.addListener(function(data) {
  ab.navigateToURL();
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

  this.navigateToURL = function() {
    this.getURL(function(data) {
       chrome.tabs.create({'url': data.url});
    });
  };
}
