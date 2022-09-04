const manifest: chrome.runtime.ManifestV2 = {
	manifest_version: 2,

	name: 'Switching Youtube and Twitch',
	version: '0.1.0',
	description: 'ok so basically',

	content_scripts: [
		{
			css: ['/content/youtube/delete23.css'],
			js: ['/content/youtube/content.ts'],
			matches: ['https://www.youtube.com/'],
		},
	],
	permissions: [
		'http://localhost:3000/',
		'https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/Create',
	],

	web_accessible_resources: ['content/youtube/replaceVideos.ts'],
};
export default manifest;
