## VMS setup instructions

1. Create a new Digital Ocean Ubuntu 14.04.4 machine >> SSH in >> Run (or read) quick install
1. `curl -o- https://rawgit.com/codeforeauclaire/snowparking/master/api/vmsinstall.sh | bash && exit`
1. SSH in again >> run api app
 1. `(cd ~/snowparking/api && ./serve-node)`
 1. Load http://{vms-ip}/status in your browser
 1. Edit a file to see changes in your browser instantly

## Production setup instructions

I'm probably doing this wrong.  I'm used to Meteor.js and not sure standards around raw node.js projects - Anthony May 2016

1. Setup server
 1. Make free tier Ubuntu server with AWS
 1. ```sudo apt-get update```
 1. ```sudo apt-get install nodejs```
      1. May need to run ```sudo ln /usr/bin/nodejs /usr/sbin/node``` [StackOverflow Reference](https://stackoverflow.com/questions/24721182/when-i-run-node-nothing-happens-the-same-with-forever)
 1.	```sudo apt-get install npm```
 1. ```sudo apt-get install mongodb```
1. Get code on server
 1. ```./deploy```
1. Setup app
 1. ```cd api```
 1. ```npm install express --save```
 1. ```npm install --save body-parser```
 1. ```npm install mongo --save```
 1. ```npm install moment --save```
 1. ```npm install moment-timezone --save```
 1. ```sudo npm link mongodb``` (Seemed to have helped [StackOverflow Reference](http://stackoverflow.com/a/16842904))
1. Run
 1. ```cd api```
 1. ```./serve-mongo``` (Will error if not needed / already running)
 1. ```./serve-node```
1. Configure server
 1. Open up port 3000 as needed [StackOverflow post](https://stackoverflow.com/questions/9348111/i-cant-access-my-node-js-server-on-my-aws-ec2-isntance-from-the-outside)
1. Confirm running
 1. Go to http://localhost:3000
