// Thax To Bang Hans
const axios = require('axios')
const cheerio = require('cheerio')
const creator = 'Hans'

function WikipediaAllLaguage(language, query) {
return new Promise((resolve, reject) => {
axios.get('https://' + language + '.m.wikipedia.org/wiki/' + encodeURIComponent(query)).then(({ data }) => {
title = []
image = []
explanation = []
const $ = cheerio.load(data)
$("h1#section_0").get().map((rsst) => {
title.push($(rsst).text())
})
$("section#mf-section-0").each(function(a, b) {
penjelasan = $(b).find("p").text().trim()
})
const yah = {
title: title[0],
link: 'https://' + language + '.m.wikipedia.org/wiki/' + encodeURIComponent(query),
explanation: penjelasan
}
resolve({
creator: creator,
status: true,
result: yah,
})
})
})
}

module.exports.WikipediaAllLaguage = WikipediaAllLaguage