// server.js
const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio'); // lightweight HTML parser
const app = express();
const TARGET = 'https://www.cineby.gd';

app.use('/assets', express.static(__dirname + '/injector')); // serve injected assets

// Proxy GET for any path
app.get(/.*/, async (req, res) => {
  try {
    const targetUrl = TARGET + req.originalUrl;
    const r = await fetch(targetUrl, {
      headers: { 'User-Agent': req.headers['user-agent'] || 'tizen-module-proxy' }
    });

    // If content-type is not HTML, pipe raw
    const contentType = r.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      // stream binary or other content directly
      const buffer = await r.buffer();
      res.set('content-type', contentType);
      res.send(buffer);
      return;
    }

    const html = await r.text();
    const $ = cheerio.load(html);

    // 1) inject CSS
    $('head').append(`<link rel="stylesheet" href="/assets/inject.css">`);

    // 2) inject JS before closing body
    $('body').append(`<script src="/assets/inject.js"></script>`);

    // 3) (Optional) Simple ad removal example by selecting known ad nodes
    // $('.ad-banner, .adsbygoogle, iframe[src*="ads"]').remove();

    // 4) rewrite some relative URLs if needed (example)
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('/')) {
        $(el).attr('href', href); // keep as-is; browser will request proxy path
      }
    });

    res.set('content-type', 'text/html');
    res.send($.html());
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Cineby module proxy listening on', port));
