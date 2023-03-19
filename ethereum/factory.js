//to get access to deployed factory(all deployedCampaigns), just import factory.js file

import web3 from './web3'; //gettng instance of Web3 that we created in web3.js file
import CampaignFactory from './build/CampaignFactory.json';// whenver we tell web3 abt a alrdy deployed cntrct, we hve to gve web3 tht contrcts abi(whch is dfnd in CampaignFactory.json file)

//creating contrct instnce tht refers to this spcfc address of dplyed contrct


//passing contract abi and deployed address (which we put in address file)
const instance=new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1356DC20f9B556D0F5C704d6F8fE7d67035e77db'
);

export default instance;
