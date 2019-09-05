const functions = require('firebase-functions');
const fetch = require('node-fetch');

const proxyUrl = url => functions.https.onRequest((req, res) => {
  doFetch(res, url);
});

const doFetch = (res, url) =>
  fetch(url, {
    "Client-Identifier": "evestera-sykler-function"
  })
    .then(r => r.json())
    .then(body => res.status(200).send(body))
    .catch(err => res.status(500).send(err));

exports['station_information_json'] = proxyUrl('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json');
exports['station_status_json'] = proxyUrl('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json');
