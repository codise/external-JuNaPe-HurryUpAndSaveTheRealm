JuNaPe-HurryUpAndSaveTheRealm
=============================

This is a twin-stick 'dungeon'-crawler game. The main game screen is designed to be viewed on a large public screen, and mobile devices
work as controllers for players. Best way to figure out the mechanics of the game is by playing it, so go on, don't be shy!

All feedback is appreciated, the game is currently under slovelopment ( very slow development ), and it's mostly extended by request. 

### Installation instructions

#### Prerequisites

* git
* Node.js (tested with v4.2.6): https://nodejs.org
* npm (Node package manager, usually comes with the node installation, if not install separately)

#### Installing

These instruction apply in the command-line with working git, node.js and npm. In Windows it's probably usefull to install [Git for Windows](https://git-for-windows.github.io/).

Checkout the code from Github

        git clone https://github.com/codise/JuNaPe-HurryUpAndSaveTheRealm.git

Install dependencies with npm

        cd JuNaPe-HurryUpAndSaveTheRealm/
        npm install

        cd spaceifyapplication/api
        npm install
        cd ../..

### Running
        node gameserver.js

This starts a http server for serving files and websocket communication server.

Screen is served at: [http://localhost:8080/screen.html](http://localhost:8080/screen.html)

Mobile clients area served at: [http://localhost:8080/](http://localhost:8080/)

If you want to use real mobile clients, remember to edit server address in www/src/serverconfig.js

### Contributing

If you like the game and you have the greatest idea for a new feature/bugfix/cool-stuff just fork the repository
develop your feature and create a pull request which depicts to point what you have done, and optionally why it needs
to be in the game.

You can also report bugs if you find them, preferably with instructions to replicate the bug, and pick issues from 
the issue tracker and fix them in your fork and pull request them.


#### Coding guidelines

Follow this coding example to the point.

```javascript
"use strict";   // This statement MUST be at the top of each javascript file

// This is an example of Javascript coding following the Spaceify guidelines

// In Javascript a "class" is defined by giving its constructor

function Cat(initialAge, initialColor)
{                   // Opening and closing curly brackets SHOULD be placed on the same ident level
var self = this;            // Assigning "this" to "self" MUST be done on the first line of each class 

var age = initialAge;         // Create a private variable and assign a value to it
var color = initialColor;       // (Color is encoded in grayscale, 0 being black)

var getMoreGray = function()      // Define a private method
  {
  color++;
  };                  // Notice the ";", this is an assignment after all   

self.getOlder = function(numberOfYears)     // Define a public method  
  {
  age += numberOfYears;
  getMoreGray();
  };

self.printYourselfUsingCallback = function(callback)      // Define a public method that takes a callback as an argument
  {
  callback(null, "I am a cat, "+age+" years old, my color is "+ color);
  };
}
```

**Indent with tabs**
