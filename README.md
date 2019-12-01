# node-website-scrape

A simple script for scraping websites recursively with Node.js. Intended for use with static websites.

Built with [node-website-scraper](https://github.com/website-scraper/node-website-scraper).

### Getting Started

##### Configuration

Edit the `url`, `domainName`, `userAgent`, and `whitelist` (for scraping external file types that are outside of a website's domain name) variables in the script.

To adjust the delay between requests, adjust the `time` variable in milliseconds. 

The default `npm start` configuration in the `package.json` file is for executing the script in debug mode with logging and an increased memory runtime limit for the script of 5 gigabytes.

##### Execution
1. Clone the repo
2. Run the `npm install` command
3. Run the `npm start` command
4. Inspect the `websites` directory in your project during or after execution
