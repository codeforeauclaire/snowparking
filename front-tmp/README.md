Just a file Anthony is setting up for now while awaiting front end to get to git, to keep notes under.

Setup
#Software
sudo apt-get update
sudo apt-get install node
sudo apt-get install npm
sudo apt-get install nodejs-legacy

# NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
nvm install 5.0
nvm install v0.12.7

# Ionic
nvm use 5.0
nvm use v0.12.7
sudo npm install ionic@beta --save
#sudo npm install -g ionic@beta
