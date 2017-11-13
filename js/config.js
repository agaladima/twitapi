const Twit = require('twit');
module.exports = new Twit({
  consumer_key:         'YG23bK14elrXAa6OWrKY5W9VH',
  consumer_secret:      'nCdfjrHu9OLSGVygQ9sMujCVbzmsEegvoyNOK9q7FxuiIxLqbP',
  access_token:         '160995659-rl1IeHmrruxKCQl2m57cDNSrI7HSMdWxhsG5eFRB',
  access_token_secret:  '5lzZZRdItWjCXblGgrsCI1G4Wy2cn5QkYHdUBJ7AFJAHK',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});