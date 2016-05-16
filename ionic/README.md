# Snowparking :: Ionic

Reads from the Snowparking API to provide the citizens of Eau Claire snow parking emergency statuses.

## VMS Easy setup development environment

Use these instructions to setup a temporary* development environment of this project.

1. Fork this repository
1. Create a new [Virtual Machine](http://vms.codeforeauclaire.org/) (1gb+ recommended) >> SSH in >> Run vms quick install:
 1. `export GHUSER='AnthonyAstige'` (Replace AnthonyAstige with your username)
 1. `curl -L -o- https://rawgit.com/$GHUSER/snowparking/master/ionic/vmsinstall.sh | bash && source ~/.nvm/nvm.sh`
1. Run api app
     1. `(cd ~/snowparking/ionic && ionic serve)` >> When prompted select VMS ip address
     1. Load url next to **√ Running dev server:  http://...** in your web browser
     1. Edit &lt;ion-title&gt; in ~/snowparking/ionic/app/pages/home/home.html and see browser auto-refresh

*For a permanent development environment we recommend you read the referenced script above to install locally.

## Dependencies to compile for web app

* node.js
* ionic cli  (`sudo npm install ionic@beta -g` || `sudo npm update ionic@beta -g`)

From this ionic directory type ```ionic info``` to see your system information

```
EXAMPLE system information (Anthony / vms):

Cordova CLI: 6.1.1
Ionic Framework Version: 2.0.0-beta.3
Ionic CLI Version: 2.0.0-beta.24
Ionic App Lib Version: 2.0.0-beta.14
OS: Distributor ID:	Ubuntu Description:	Ubuntu 14.04.4 LTS
Node Version: v5.8.0
```

```
EXAMPLE system information (Lowell):

Cordova CLI: 6.0.0
Ionic Version: 2.0.0-beta.3
Ionic CLI Version: 2.0.0-beta.22
Ionic App Lib Version: 2.0.0-beta.12
OS: Distributor ID:     Debian Description:     Debian GNU/Linux 7.9 (wheezy)
Node Version: v5.8.0
```

Install ionic project requirements, from ionic directory type:

```
npm install
```

if reinstalling from older version of the project, I recommend completely removing
everything and starting over, including the ```node_modules``` directory

## Compile for web app

from this ionic directory type:

### Option 1 (Auto-rebuilding)
```
ionic serve
quit
```

### Option 2 (1 time building - May need `npm install -g cordova`)
```
ionic build browser
```

replace the repo build directory with the newly compiled files
from the repo root directory type:

```
rm -rf build
cp -r ionic/www/build .
```

and then merge this master branch into the ```gh-pages``` branch

## Compile for mobile app via IonicView

from the ionic directory type:

```
ionic upload
```

if you are prompted for username and password, use these values:

```
c4ec@digitalfarrier.com
code4eauclaire
```

## TODO:

* register app with android market
* register app with apples store
* automate the ```ionic serve``` build process and web page file copy steps
