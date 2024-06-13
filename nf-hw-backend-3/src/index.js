const axios = require('axios');
const cheerio = require('cheerio');

async function handler(event) {
  const url = 'https://www.olx.kz/transport/legkovye-avtomobili/';
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const results = [];

  $('.css-1apmciz').each((i, element) => {
    const title = $(element).find('.css-u2ayx9 > .css-16v5mdi').text().trim();
    const price = $(element).find('.css-u2ayx9 > .css-tyui9s').text().trim();
    results.push({ title, price });
  });

  console.log(results);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(results)
  };
}

module.exports = { handler };