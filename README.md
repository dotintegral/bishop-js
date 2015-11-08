# bishop-js
A smart, spatial (keyboard) navigation for web applications.

## Overview
Bishop-js is a simple, yet very powerful implementation of spatial navigation module written in pure JavaScript.
It's designed to provide 2-d navigation in webapplications that require it. Can be used in game menus, SmartTV apps 
and wherever one may need for such navigation.

The main idea is based on the `document.elementFromPoint` method. Although this functionality is marked as 
`experimental`, seems that all current browsers and browser based enviroments (such as SmartTV platforms) support it.
For more details, refer https://developer.mozilla.org/pl/docs/Web/API/Document/elementFromPoint

## Usage
In the simplest scenario, add CSS class `navigable` to any element, that should be navigable. The code will do the rest. 

    <div class="navigable">Item one</div>
    <div class="navigable">Item two</div>
    <div class="navigable">Item three</div>

The module will add the class `focused` to item that was focused.

Currently, before using for the first time, you need to mark the initially focused element with `focused` class manually, then call `bishop.init()` so the module will detect when to start the navigation.
