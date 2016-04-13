#!/usr/bin/env bash

{ # this ensures the entire script is downloaded and run #

# Update all software & install new
sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y git

# Setup swap (which will enable on reboot)
# * We need more than 512MB ram for Ionic to work. Warning: ionic may be slow, especially first run, on small instances
# * https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
echo "/swapfile   none    swap    sw    0   0" >> "/etc/fstab"
echo "vm.swappiness=10" >> /etc/sysctl.conf
echo "vm.vfs_cache_pressure = 50" >> /etc/sysctl.conf
# * Enable swap file now before reboot
sudo swapon /swapfile

# Clone repository
git clone https://github.com/codeforeauclaire/snowparking.git /root/snowparking

# Install Node Version Manager (nvm)
## Basic install
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
## Source nvm so it works in this script (If doing manually exit and reconnect instead)
. /root/.nvm/nvm.sh
## Get a node version from NVM
nvm install v5.8

# Install ionic framework
# * First 2 commands solve saas permission issue: https://github.com/sass/node-sass/issues/299
# ** http://sourcode.net/sh-1-node-permission-denied/
npm config set user 0
npm config set unsafe-perm true
npm install ionic@beta -g
npm install -g cordova # Cordova recomended for ionic (beta?) to work

# Install dependencies
(cd /root/snowparking/ionic && npm install --save)

} # this ensures the entire script is downloaded and run #
