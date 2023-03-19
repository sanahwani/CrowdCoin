//get code from documentaion of next-routes
//this file is for custom routes

const routes=require('next-routes')(); //scnd parnthesis means this require stat rerns a fn and it wl be invoked right after we require it into file


//ist arg- pattern tht we want to look fot. to indicate wildcard/var we place : follwd by name of widcard prop/var (anythng), this var is going to get passed into our compo to refrence the campaign address user is tryng to visit
//scnd arg is which path/route/compo  in pages dir. in campaigns we want to show to user
routes
  .add('/campaigns/new', '/campaigns/new')//note to add this bfre the other routing
  .add('/campaigns/:address', '/campaigns/show')//setting routes up for url with custom token//vars
  .add('/campaigns/:address/requests','/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports=routes; //will export us sme helpers to allw users to navigate btwn pages,it also gnrtes link tags to display insde of react compo's
