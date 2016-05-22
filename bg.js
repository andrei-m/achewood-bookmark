var ab = new AchewoodBookmarker();

chrome.webNavigation['onCompleted'].addListener(function(data) {
  if (ab.isAchewoodURL(data.url)) {
    console.log(data.url);
  }
});
console.log('Achewood bookmarker loaded');

function AchewoodBookmarker() {
  this.achewoodURL = 'http://www.achewood.com/index.php?date=';
  this.isAchewoodURL = function(url) {
    return url.substring(0, this.achewoodURL.length) === this.achewoodURL
  };
}
