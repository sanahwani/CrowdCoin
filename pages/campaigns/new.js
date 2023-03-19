import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router} from '../../routes'; //router obj allws us to  prgrmtcly redirect user frm 1 page to anthr


class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading :false
  };

  onSubmit = async (event) => {
    event.preventDefault(); //whenever we do form submittal on brwsr,it autmtcly submit form to backend, to prevent this we use this fn

    this.setState({loading:true , errorMessage :''}); // as asoon as user clicks on submit btn, loading spinner wl shw
    //create a new campaign

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });

        Router.pushRoute('/'); // aftr creating contrct we wnt to redirect user to CampaignIndex page which is root page(/)

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading:false});//turnig spinnner off aftr cmpltn of trsnctn
  };

  render() {
    return (
      <Layout>
        <h3>Create Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
