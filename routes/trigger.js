var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {


  const bizSdk = require('facebook-nodejs-business-sdk');

  const accessToken = 'EAADk9eCPSSEBACyU8BU4fqjywuZBTTMLgwletu1Jfzw3HkcQrApN3n79SNKUcRkqUaIMYroWYS8Xkiprdorv9pt6FxdZBNwTVZBMbyeEmNfVZBXZBmPpxclPQGQE7BQeLxFkdOgnujgxpkZBZBZBeyvZAR5LFQrE8EidF8ZAwFWbXyJgZDZD';
  const accountId = 'act_419982481666289';

  const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
  const AdAccount = bizSdk.AdAccount;
  const Campaign = bizSdk.Campaign;

  const account = new AdAccount(accountId);
  var campaigns;

  account.read([AdAccount.Fields.name])
    .then((account) =>{
      return account.getCampaigns([Campaign.Fields.name], { limit: 30 }) // fields array and params
    })
    .then((result) =>{
      campaigns = result;
      campaigns.forEach((campaign) => {
        console.log(campaign._fields.status)
        for(i in campaign) {
          console.log("no is " + [i] + ", value is " + campaign[i]);
        }

      }

      );

    }).catch(console.error);


  res.render('index', { title: 'Express' });
});

module.exports = router;
