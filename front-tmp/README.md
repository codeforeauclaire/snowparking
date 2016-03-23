Notes for setting up ionic on aws Ubuntu 14.X server from Anthony

# Background
* Ubuntu 14.X default installs node.js v0.10.X OF which doesn't include execSync (https://goo.gl/VKUOyq)
* AWS Ubuntu doesn't run as root, and need permissions to install right

# Cleanup (Remove any default node/npm installs from before)
sudo apt-get update
sudo apt-get remove npm
sudo apt-get remove node
sudo apt-get remove nodejs-legacy

# Install NVM to get latest node/npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
nvm install 5.8.0

# Setup npm runnable via sudo (https://goo.gl/RrXVbs)
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local

# Check Node version
node -v

# Install Ionic command globally
sudo npm install -g ionic@beta

# Check Ionic command availble
ioninc -v
ionic

# Misc Ionic hack trials (ownership overkill)
sudo chown -R $(whoami) ~/

# Build something
cd ~/snowparking/ionic/ && ionic build browser
