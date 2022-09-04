import commonUtil from '../utils/commonUtils';

commonUtil.injectScript('content/youtube/replaceVideos.js');
const sheet = window.document.styleSheets[0];
sheet.insertRule(
	'#contents ytd-rich-grid-row:nth-child(-n + 12) {visibility: collapse; }',
	sheet.cssRules.length
);
