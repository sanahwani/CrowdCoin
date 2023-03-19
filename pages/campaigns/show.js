import React,{Component} from 'react';
import  Layout from '../../components/Layout';
import {Card, Grid, Button} from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component{

      //this fn get called autmtcly bfre our campaign/compo gets rendered on screen
  static async getInitialProps(props){
    const campaign= Campaign(props.query.address); // address of the campaogn tht we will show

    const summary =await campaign.methods.getSummary().call();
    //console.log(summary);
    return{
        address:props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]

    };
  }
    renderCards(){
      const{
        balance,
        manager,
        minimumContribution,
        requestsCount,
        approversCount
      } =this.props;

    const items=[
      {
        header:manager,
        meta: 'Address of the manager',
        description:' Manager created this campaign & can create request to withdraw money',
        style:{ overflowWrap : 'break-word'}
      },
      {
        header:minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description: 'You must contribute atleas this much to become a approver'
      },
      {
        header:requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the Contract. Requests must be approved by the approvers.'

      },
      {
        header:approversCount,
        meta: 'Number of Appovers',
        description: 'Number of people who have already donated to this campaign.'
      },
      {
        header:web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'This is how much money this campaign has left to spend.'
      }


    ];
    return <Card.Group items={items} />;
}

  render(){
      return(
      <Layout>
        <h3> Campaign Show </h3>
      <Grid>
        <Grid.Row>

            <Grid.Column width={12}>
              {this.renderCards()}

            </Grid.Column>
            <Grid.Column width={4}>
                <ContributeForm  address={this.props.address}/>
            </Grid.Column>

        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary> View Requests </Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>

      </Grid>

      </Layout>
    );

  }
}
export default  CampaignShow;

// import React, { Component } from "react";
// import { Card, Grid } from "semantic-ui-react";
// import Layout from "../../components/Layout";
// import Campaign from "../../ethereum/campaign";
// import web3 from "../../ethereum/web3";
// import ContributeForm from "../../components/ContributeForm";
//
// class CampaignShow extends Component {
//   static async getInitialProps(props) {
//     const campaign = Campaign(props.query.address);
//
//     const summary = await campaign.methods.getSummary().call();
//
//     return {
//       address: props.query.address,
//       minimumContribution: summary[0],
//       balance: summary[1],
//       requestsCount: summary[2],
//       approversCount: summary[3],
//       manager: summary[4],
//     };
//   }
//
//   renderCards() {
//     const {
//       balance,
//       manager,
//       minimumContribution,
//       requestsCount,
//       approversCount,
//     } = this.props;
//
//     const items = [
//       {
//         header: manager,
//         meta: "Address of Manager",
//         description:
//           "The manager created this campaign and can create requests to withdraw money",
//         style: { overflowWrap: "break-word" },
//       },
//       {
//         header: minimumContribution,
//         meta: "Minimum Contribution (wei)",
//         description:
//           "You must contribute at least this much wei to become an approver",
//       },
//       {
//         header: requestsCount,
//         meta: "Number of Requests",
//         description:
//           "A request tries to withdraw money from the contract. Requests must be approved by approvers",
//       },
//       {
//         header: approversCount,
//         meta: "Number of Approvers",
//         description:
//           "Number of people who have already donated to this campaign",
//       },
//       {
//         header: web3.utils.fromWei(balance, "ether"),
//         meta: "Campaign Balance (ether)",
//         description:
//           "The balance is how much money this campaign has left to spend.",
//       },
//     ];
//
//     return <Card.Group items={items} />;
//   }
//
//   render() {
//     return (
//       <Layout>
//         <h3>Campaign Show</h3>
//         <Grid>
//           <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
//           <Grid.Column width={6}>
//             <ContributeForm address={this.props.address} />
//           </Grid.Column>
//         </Grid>
//       </Layout>
//     );
//   }
// }
//
// export default CampaignShow;
