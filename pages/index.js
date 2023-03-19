import React,{Component} from 'react';
import factory from '../ethereum/factory';
import {Card,Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';


//react Component,
class CampaignIndex extends Component{
  //static defines class fn. in js e hve to create obj/instnce of the class to access any method tied to it.
  //but with static keyword, this fn is nt assigned  to instnces of class. instead fn is assignd to class itslf

  static async getInitialProps(){
    const campaigns= await factory.methods.getDeployedCampaigns().call();
  //  return { campaigns : campaigns}; or
      return { campaigns}; //this obj is returnd to compo as props

  }

//inside this fn we will iterate over our list of campaign addresses and fr evry sprte address we will create a dfrnt objct,
//each of these objcts will reprsnt 1 individual card
  renderCampaigns(){
    const items=this.props.campaigns.map(address=>{
      return{
        header:address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>view campaigns </a>
          </Link>
        ),
        fluid: true //tks up the width of its container
      };
    });
    return <Card.Group items={items} />;
  }

  render(){

    return(
    <Layout>
     <div>

          <h3> Open Campaigns </h3>

        <Link route="/campaigns/new">
          <a>
          <Button floated="right"
           content="Create campaign"
           icon="add circle"
           primary
           />
          </a>
        </Link>

        {this.renderCampaigns()}

    </div>
  </Layout>
     //or primary ="true", it adds blue styling to btn
   );
  }
}

export default CampaignIndex; //whnevr next.js imports a file from pages dir,its alwys going to expect tht file exports react Component, othrwse wl thrw an error
