pragma solidity ^0.4.17;

  contract CampaignFactory{
      address[] public deployedCampaigns;

      function createCampaign(uint minimum) public{
       address newCampaign=   new Campaign(minimum, msg.sender);
       deployedCampaigns.push(newCampaign);
      }

      function getDeployedCampaigns() public view returns(address[]){
          return deployedCampaigns;
      }
  }
contract Campaign{
   struct Request{
       string description;
       uint value;
       address recipient;
       bool complete;
       uint approvalCount; //trck of yes counts(only apprvls matter, not no votes)
       mapping (address=>bool) approvals;

   }
   Request[] public requests;
   address public manager;
   uint public minimumContribution;
   mapping(address=>bool) public approvers;
   uint public approversCount;

   modifier restricted(){
       require(msg.sender==manager);
       _;
   }

   function Campaign(uint minimum, address creator) public{
       manager=creator;
       minimumContribution= minimum;
   }

   function contribute() public payable{
       require(msg.value > minimumContribution);
       //this address doesnt gt stred in mapping, only true value does
      approvers[msg.sender]=true;//if we lookup this add. inside mapping,we will get back value true and know if tht prsn has donated
      approversCount++;
   }

   function createRequest(string description,uint value, address recipient) public restricted{
     // require(approvers[msg.sender]);// to mke sure u have donated to contrct
       Request memory newRequest=Request({
           description: description,
           value: value,
           recipient:recipient,
           complete:false,
           approvalCount: 0
       });
       requests.push(newRequest);

   }

   function approveRequest(uint index) public{

       Request storage request = requests[index]; // to manipulate the copy of the structure inside strge

       require(approvers[msg.sender]);// chck to see if this prsn has donated
      require(!request.approvals[msg.sender]);// chck to see if this prsn has alredy voted on this request, if it retrns true(prsn alrdy vted) flip that to false and exit

      request.approvals[msg.sender]=true; //mrkng person has voted on this req
      request.approvalCount++;

   }
      //mgr shld be able to call this only aftr gttng enough votes
      //taking apprch=> atleast 50% of ppl who hve cntrbted to campaign have to say yes to fnlze req
      function finalizeRequest(uint index) public restricted{
          Request storage request = requests[index];
          require(request.approvalCount > (approversCount/2));
          require(!request.complete);// ppl wont b able to apprve same req multple times. false to true

         request.recipient.transfer(request.value);
          request.complete=true;

      }

      //fn to call dfrnt fn's at once

        function getSummary() public view returns(uint, uint, uint, uint, address){
        return(
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
        }
        
      function getRequestsCount() public view returns(uint){
      return requests.length;
      }

    }
