const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'brush unit remember news depth tree gospel differ giraffe exact manage unusual',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/9d185d6548824015ab8fcace2b70a0a3'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
  .deploy({ data: compiledFactory.bytecode })
   .send({ gas: '1000000', from: accounts[0] });
  // .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
  //  .send({ from: accounts[0] }); // remove gas
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
