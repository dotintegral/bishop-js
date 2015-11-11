# bishop-js
A smart, spatial (keyboard) navigation for web applications.

## Overview
Bishop-js is a simple, yet very powerful implementation of spatial navigation module written in pure JavaScript.
It's designed to provide 2-d navigation in webapplications that require it. Can be used in game menus, SmartTV apps 
and wherever one may have the need for such navigation.

The main idea is based on the `document.elementFromPoint` method. Although this functionality is marked as 
`experimental`, seems that all current browsers and browser based enviroments (such as SmartTV platforms) support it.
For more details, refer https://developer.mozilla.org/pl/docs/Web/API/Document/elementFromPoint

Navigation also support mouse/pointer. 

## Installation

It's as simple as typing:
    
    npm install bishop-js

Alternatively, you can just download the bishop.js file and use it.

## Usage

Simply, require the module:

    var bishop = require('bishop-js');

Then, init the module.

    bishop.init();

In init, bishops adds event listeners to body. From that point the module is ready to go.

In the simplest scenario, add CSS class `navigable` to any element, that should be navigable. The code will do the 
rest. 

    <div class="navigable">Item one</div>
    <div class="navigable">Item two</div>
    <div class="navigable">Item three</div>

The module will add the class `focused` to item that was focused.

You can force manually to focus/blur a navigable event by using `bishop.focus` and `bishop.blur` methods. Notice, that
only one item can be focused. Therefore, `focus` will call `blur` automatically on currently active element.
To start using the navigation, simply call `focus` on navigable element when ready.

As a second argument, blur and focus accepts `type`, which should indicate the origin of the action. Default are:
`'mouse'` and `'keyboard'`. You can pass custom types, if needed.

    bishop.blur(oldElement, 'keyboard');
    bishop.focus(newElement, 'keyboard');

## Events

### Navigate event
Navigation will trigger a `CustomEvent` named `navigate` on the element from which navigation was triggered. 
This event will contain `keyCode` property, similar to native browser `keydown` event. Now, notice that this custom
event will be triggered just before perofming the navigation itself. It was decided so, because:

* You can react on the navigate event in the current state of navigation, not in the future state.
* The `navigate` event is cancelable. So you can bypass the default navigation in special cases, simply by calling
  `event.preventDefault()`.

The `navigate` event bubbles up through DOM, similar as native `keydown` event.

Example:

    var firstItem = document.querySelector('#first');
    var lastItem = document.querySelector('#last');

    // Add listener for navigable event
    lastItem.addEventListener('navigate', function (event) {

        // down key pressed
        if (event.keyCode === 40) {
            
            // focus first item
            bishop.focus(firstItem);
            
            // Prevent default action
            event.preventDefault();
        }
    });

### Focus and blur events
After performing blur on an element, `blur` event will be triggered on said element. Same goes for `focus` event. Both
of those contain information about event type - whether if was mouse or keyboard event. The `type` property will contain
one of corresponding string values: `mouse` and `keyboard`. This is handy, as some components (for example - scrollable
list) might require different scrolling logic depending on event type.

Example:

    // Implementation of list scrolling with focus event
    list.forEach(function (item) {
        
        // React on focus
        item.addEventListener('focus', function (event) {
            
            // Scroll to item
            list.scrollTo(item);
        });
    });

## Attribute based navigation
In addition to events and default navigation, there is possible to use attrubute based navigation. Simply, set any of
the following attributes on navigable DOM element: `nav-up`, `nav-down`, `nav-left` and `nav-right` with value of CSS
selector. If the selector matches existing element, it will be focused. When there are more than one match, the first
found element will be selected.

    
    <div id="first" class="navigable">Item one</div>
    <div class="navigable">Item two</div>
    <div id="last" class="navigable" nav-down="#first">Item three</div>


## Customizing

### Detecting navigable element

By default, bishop-js will consider a navigable every element that have `navigable` CSS class. You can override this
behaviour by passing your own implementation of `isNavigable` method. It takes a DOM element as a argument and returns
true or false. Example:

    // Every 'a' is navigable
    bishop.isNavigable = function (element) {
        return element.tagName === 'a';
    }
