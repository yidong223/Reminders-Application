const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { createApi } = require("unsplash-js")
global.fetch = fetch;
require("dotenv").config();
// console.log( process.env.UNSPLASH_ACCESS_KEY);
const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const unsplash = createApi({
    accessKey
});

function generatePictureUrl() {
    return new Promise((resolve, reject) => {

        unsplash.photos.getRandom({
            query: "cats"
        })
            .then(response => {
                console.log(response);
                return fetch(response.response.links.self + "?client_id=" + accessKey)
            })
            .then((response) => response.json())
            .then((response) => resolve(response.urls.small))
    })
}
//generatePictureUrl().then(url => console.log(url));
module.exports = { generatePictureUrl }