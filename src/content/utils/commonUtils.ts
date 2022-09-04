const commonUtil = {
	injectScript(url: string): void {
		const target = document.head || document.documentElement;
		const script = document.createElement('script');
		script.type = 'module';
		script.src = chrome.runtime.getURL(url);
		target.prepend(script);
	},
	display(n, d) {
		if (n > 999) {
			const p = Math.pow;
			var x = ('' + n).length;
			var d: any = p(10, d);
			x -= x % 3;
			return Math.round((n * d) / p(10, x)) / d + ' KMGTPE'[x / 3];
		}
		return n;
	},
};

export default commonUtil;
