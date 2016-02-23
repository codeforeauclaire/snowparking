Noe from Anthony: I may be doing this wrong, I'm used to Meteor.js and not sure standards around raw node.js projects

1. Setup server
 1. Make free tier Ubuntu server with AWS
 1. ```sudo apt-get install node```
 1.	```sudo apt-get install npm```
1. Get code on server
 1. ```./deploy```
1. Setup app
 1. ```cd api```
 1. ```npm install express --save```
 1. ```npm install mongo --save```
1. Setup MongoDB
 1. ```sudo apt-get install mongodb-org```
 1. ```cd api```
1. Run
 1. ```cd api```
 1. ```serve-mongo```
 1. ```serve-node```
1. Configure server
 1. Open up port 3000 as needed
1. Confirm running
 1. Go to http://localhost:3000
