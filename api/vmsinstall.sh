#!/bin/bash

# Update all software & install new
#sudo apt-get update
#sudo apt-get upgrade -y
#sudo apt-get install -y git mongodb

# Clone repository
#git clone https://github.com/codeforeauclaire/snowparking.git ~/

# Install NVM (If doing this manually, exit and reconnect)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# Source nvm so it works in this script (Installing should do this automatically)
. ~/.nvm/nvm.sh

# Get a node version from NVM
nvm install v5.10.1

# Install nodemon (for monitoring file changes during development)
npm install -g nodemon

# Install all packages for snowparking api
(cd ~/snowparking/api npm install --save)
