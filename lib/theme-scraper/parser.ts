import { Template } from '../../data/repositories/Template';
import Platform from './Platform';

const SQUARESPACE_THEME_REGEX = /("templateId":")(\w{11,})(")/gm;
const WORDPRESS_THEME_REGEX = /(wp-content\/themes\/)(\w*)(\/)/gm;
const SHOPIFY_THEME_REGEX = /(theme_store_id":\s*)(?<themeId>\d*)([\s\S]*BOOMR.themeName\s*=\s*")(?<themeName>\w+)/gm;
const SHOWIT_REGEX = /\/\/lib.showit.co/gm;
const WIX_REGEX = /\/\/static.wixstatic.com\//gm;
const WEEBLY_REGEX = /_W\\.configDomain\\s=\\s\\"www\\.weebly\\.com\\"/gm;

export interface WebsiteDetails {
	platform: Platform;
	themeId: string;
	themeName: string;
	themeUrl: string;
	isCustom: boolean;
	templates?: Template[];
}

export interface ThemeParser {
	rawHtml: string;
	parse(): Promise<WebsiteDetails>;
}

/**
 * DefaultParser uses mostly RegEx.
 */
export default class DefaultParser implements ThemeParser {
	rawHtml: string;

	platform: Platform;
	themeId: string;
	themeName: string;
	themeUrl: string;
	isCustom: false;

	constructor(html: string) {
		this.rawHtml = html;
	}

	async parse(): Promise<WebsiteDetails> {
		return this.getSqspTemplateFamilyId()
			.getWordpressThemeName()
			.getShopifyThemeName()
			.checkIfShowit()
			.checkIfWix()
			.checkIfWeebly()
			.end();
	}

	/**
	 *  Parse for Squarespace template family id
	 */
	private getSqspTemplateFamilyId() {
		if (!this.platform) {
			const [themeId] = this.parseHtmlByRegex(this.rawHtml, SQUARESPACE_THEME_REGEX, 2); // only interested in group 2
			if (themeId) {
				this.platform = Platform.SQUARESPACE;
				this.themeId = themeId;
			}
		}
		return this;
	}

	/**
	 *  Parse for WordPress theme
	 *
	 *  if theme name contains "prophoto" --> ProPhoto
	 */
	private getWordpressThemeName() {
		if (!this.platform) {
			const [themeName] = this.parseHtmlByRegex(this.rawHtml, WORDPRESS_THEME_REGEX, 2); // only interested in group 2
			if (themeName) {
				this.platform = Platform.SQUARESPACE;
				this.themeName = themeName;
			}
		}
		return this;
	}

	/**
	 *  Parse for Shopify theme
	 *
	 *  Shopify themes can be found via https://themes.shopify.com/themes/[THEME_NAME],
	 *  or https://themes.shopify.com/themes/[THEME_ID]
	 *  "No search results" if not found, which could mean it's custom
	 *
	 */
	private getShopifyThemeName() {
		if (!this.platform) {
			const [themeId, themeName] = this.parseHtmlByRegex(this.rawHtml, SHOPIFY_THEME_REGEX, 2, 4);
			if (themeName) {
				this.platform = Platform.SHOPIFY;
				this.themeName = themeName;
				this.themeId = themeId;
				this.themeUrl = `https://themes.shopify.com/themes/${themeId}`;
			}
		}
		return this;
	}

	private checkIfShowit() {
		if (!this.platform) {
			const isShowIt = this.parseHtmlByRegex(this.rawHtml, SHOWIT_REGEX, 0)?.length == 1;
			if (isShowIt) {
				this.platform = Platform.SHOWIT;
			}
		}
		return this;
	}
	private checkIfWix() {
		if (!this.platform) {
			const isWix = this.parseHtmlByRegex(this.rawHtml, WIX_REGEX, 0)?.length == 1;
			if (isWix) {
				this.platform = Platform.WIX;
			}
		}
		return this;
	}
	private checkIfWeebly() {
		if (!this.platform) {
			const isWeebly = this.parseHtmlByRegex(this.rawHtml, WEEBLY_REGEX, 0)?.length == 1;
			if (isWeebly) {
				this.platform = Platform.WEEBLY;
			}
		}
		return this;
	}

	private end() {
		return {
			platform: this.platform || Platform.UNKNOWN,
			themeId: this.themeId,
			themeName: this.themeName,
			themeUrl: this.themeUrl,
			isCustom: this.isCustom,
		};
	}

	parseHtmlByRegex(html: string, regex: RegExp, ...matchingGroups: number[]) {
		const groups = Array.from(html.matchAll(regex))?.[0];
		return matchingGroups.map((id) => groups?.[id]);
	}
}
