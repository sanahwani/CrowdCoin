import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes'; //it allows us to create Link tag tht user ca  use to navigate ariund

export default()=>{
  //whenever we use Link tag we shld mention the route the user should go to if they click on this btn
  return(
      <Menu style={{marginTop: '10px'}}>
        <Link route="/">
          <a className="item"> CrowdCoin </a>
        </Link>

        <Menu.Menu position="right">
        <Link route="/">
          <a className="item"> Campaigns </a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item"> + </a>
        </Link>

        </Menu.Menu>
      </Menu>

  );
};
