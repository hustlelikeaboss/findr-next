import Parser from './parser';

export default class Scraper {
	targetUrl: string;

	constructor(targetUrl: string) {
		this.targetUrl = targetUrl;
	}

	async fetchRawHtml(url: string) {
		return (await fetch(url))?.text();
	}

	async scrape() {
		const html = await this.fetchRawHtml(this.targetUrl);
		const websiteDetails = await new Parser(html).parse();
		return websiteDetails;
	}
}
