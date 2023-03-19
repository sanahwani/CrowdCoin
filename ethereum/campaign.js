import web3 from './web3';
import Campaign from './build/Campaign.json';

//if we pass address in this fn, we will get a setup Contract thts ready to go & work wth our campaign
//
// export default(address)=>{
//   return new web3.eth.Contract(
//     JSON.parse(Campaign.interface),address);
// }; or 

const campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
export default campaign;
