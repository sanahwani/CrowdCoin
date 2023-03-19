//get code from documentaion of next-routes
//this file wl 1)mmanually startup our next app,& tell it to use all the routes defined here 2)export navigatn helpers tht wl allw our compo's to navigate autmtcly our users around app
//will create our next app
const {createServer} =require('http');
const next= require('next');

//dev flag specifies whether we r running our server in productn or devlpmnt mode
const app=next({
  dev:process.env.NODE_ENV !=='production'
}); //this tells our app to look at the global var called node evnvt & look to see if its set to string prodctn. if it is, thn it means our app is running in prod mode & its going to chnge the way next behaves

const routes=require('./routes');
const handler=routes.getRequestHandler(app);

//sets up next js, and tells it to use all this gicen routing
app.prepare().then(()=>{
    createServer(handler).listen(3000, err =>{
      if(err) throw err;
      console.log('ready on localhost :3000');
    });
  });
