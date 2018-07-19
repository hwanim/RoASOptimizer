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
  const Ad = bizSdk.Ad;

  const account = new AdAccount(accountId);


  const showDebugingInfo = false;
  if (showDebugingInfo) {
    FacebookAdsApi.setDebug(true);
  }

  const logPassedTest = (testName, data) => {
    console.log(testName);
    if (showDebugingInfo) {
      console.log('Data:' + JSON.stringify(data));
    }
  };
  const insightsFields =
  ['impressions', 'frequency', 'unique_clicks', 'actions', 'spend', 'cpc'];

  const errorFunction = (scenarioName) => {
    let returnFunction = (error) => {
      console.log('An error occurred while processing, ' + scenarioName);
      console.log('Error Message:' + error);
      console.log('Error Stack:' + error.stack);
    };
    return returnFunction;
  };

  let test2 = 'Node.js get active ads';
  account
    .getAds(
      [],
    {
      [Ad.Fields.effective_status]: [Ad.EffectiveStatus.active]
    })
    .then((ad) => {
      logPassedTest(test2 + ':Pass', ad);
      console.log(ad);
    })
    .catch(errorFunction(test2));




  let test4 = 'Node.js nestedCalls';
  account.read([AdAccount.Fields.name])
  .then((account) => {
    logPassedTest(test4 + '-GetAdAcccount:Pass', account);
    console.log(account);
    return account.getCampaigns([Campaign.Fields.name], { limit: 10 });
  })
  .then((result) => {
    logPassedTest(test4 + '-GetCampaigns:Pass', result);
    const campaignIds = result.map((campaign) => {
      return campaign.id;
    });
    const campaignAdsInsightsParams = Object.assign({
      level: 'campaign',
      filtering: [{ field: 'campaign.id', operator: 'IN', value: campaignIds }]
    }, {});
    // console.log(result);
    const campaigsAdsInsightsFields = insightsFields.concat('campaign_id');
    return account
      .getInsights(campaigsAdsInsightsFields, campaignAdsInsightsParams);
  })
  .then((insights) =>
    {
      logPassedTest(test4 + '-GetCampaignInsights:Pass', insights)
      // console.log(insights);
    }
  )
  .catch(errorFunction(test4)) ;



  res.render('index', { title: 'Trigger' });
});

module.exports = router;
