'use strict';

// See https://www.mattcutts.com/blog/seo-glossary-url-definitions/ for URL semantics
const url = 'https://www.example.com',
domainName = 'example.com',
userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';

const scrape = require('website-scraper'),
parse = require('url-parse'),
path = require('path');

const urlFilter = function(url) {
	// Allow internal URLs
	const isInternalPageOrResource = url.includes(domainName);
	if (isInternalPageOrResource) return true;

	// Allow only external resources with whitelisted file extensions
	const parsedUrl = parse(url),
	pathname = parsedUrl.pathname || '',
	fileExtension = pathname.split('.').pop() || '';

	const whitelist = ['css', 'js', 'txt', 'pdf', 'epub', 'mobi', 'doc', 'docx', 'ppt', 'pptx', 'csv'];
	const isExtensionWhitelisted = whitelist.some(ext => ext === fileExtension);

	if (isExtensionWhitelisted) return true;

	return false;
};

const delayPlugin = {
  apply(registerAction) {
	  // Server rejecting a scrape attempt, simply add in some synthetic delays
	  registerAction('beforeRequest', async ({ resource, requestOptions }) => {
        const time = Math.round(Math.random() * 10000);
        await new Promise(resolve => setTimeout(resolve, time));
        return { requestOptions };
    });
  }
};

const options = {
	urls: [url],
	urlFilter,
	directory: path.resolve(__dirname, 'websites', domainName),
  request: {
    headers: {
			'User-Agent': userAgent
		}
  },
	recursive: true,
	plugins: [delayPlugin]
};

scrape(options);
