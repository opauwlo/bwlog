var buildCss = document.createElement('link');
buildCss.rel = 'stylesheet';
buildCss.href = '../../css/build.css';
buildCss.type = 'text/css';
var buildCssDefer = document.getElementsByTagName('link')[0];
buildCssDefer.parentNode.insertBefore(buildCss, buildCssDefer);

/* Second CSS File */
var customCss = document.createElement('link');
customCss.rel = 'stylesheet';
customCss.href = '../../css/custom.css';
customCss.type = 'text/css';
var customCssDefer = document.getElementsByTagName('link')[0];
customCssDefer.parentNode.insertBefore(customCss, customCssDefer);