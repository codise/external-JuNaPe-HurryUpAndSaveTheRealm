JuNaPe--gamenamehere-
======================

Spring 2016 software development project.

##### Product & Sprint backlog:

https://trello.com/b/4aalMS2C/junape

##### Burndown chart: 

https://BurndownForTrello.com/share/xcmpg12uq0

##### Hour accounting:

https://docs.google.com/spreadsheets/d/1qR0STTPIfG2O4oNOOeTi-rLpZHYI5CIzRS0F_ACi13I/edit?usp=sharing

#### Contributing guidelines

* **Never push to master branch!**
* Create your own branch in which you develop features
* Create pull request when the feature is ready, someone will review it for you.

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

**Indent with two tabs!**

