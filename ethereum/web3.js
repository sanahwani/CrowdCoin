import Web3 from "web3";
//incase user doesn' hve metamsk installed in browser or if he has

let web3;

//doing 2 checks:1)if we r in the browser 2)if user is running metamsk
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  //hijack MM's current provider & usinf it to create our own instance of Web3
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  //creating our own provider
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/9d185d6548824015ab8fcace2b70a0a3"
  );//passing url of remote node tht we hve access to (infura node)
  web3 = new Web3(provider);
}

export default web3;
