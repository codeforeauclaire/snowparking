This is just the beginning of the Ionic application readme for the Eau Claire Snowparking project

## Dependencies to compile for web app

* node.js
* ionic cli

From this ionic directory type ```ionic info``` to see your system information

```
EXAMPLE system information:  
  
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

```
ionic serve  
quit
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