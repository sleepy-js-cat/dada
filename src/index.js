'use strict';
import shuffle from "./shuffle";
import puppeteer from "puppeteer"


puppeteer.launch()
    .then (async browser => {
        const page = await browser.newPage();
        // await page.goto ('https://www.theguardian.com/football/blog/2021/mar/06/lionel-messi-cristiano-ronaldo-albatrosses-juventus-barcelona');
        await page.goto ('https://www.theguardian.com/commentisfree/2021/mar/14/why-i-kept-my-counsel-on-meghan-and-harry#');
        await page.waitForSelector ('body');
        // capture console.log events
        page
            .on('console', message => {
                console.log(` ${message.text()}`)
            })

        // returns the content
        let grabPosts = await page.evaluate (() => {

            let allParagraphs = document.querySelectorAll(".article-body-commercial-selector > p[class^=css]")

            let scrapeItems = [];
            allParagraphs.forEach (item => {
                scrapeItems.push (item.innerText);
            });

            const allContent =
                scrapeItems.join('').replace(/[\r\n]/g, "").replace(/[\.|“|”]/g, " ");

            return allContent

        });

        const wordsList = grabPosts.split(" ").filter(el => el !== '')

        // shuffle and shorten to 10
        const shuffled = shuffle(wordsList).splice(0,10)

        const poem = shuffled.join(' ')

        console.log(poem)



        await browser.close ();

    })
    .catch (function (err) {
        console.error (err);
    })