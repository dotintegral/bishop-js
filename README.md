# bishop-js
A smart, spatial (keyboard) navigation for web applications.

## Overview
Bishop-js is a simple, yet very powerful implementation of spatial navigation module written in pure JavaScript.
It's designed to provide 2-d navigation in webapplications that require it. Can be used in game menus, SmartTV apps 
and wherever one may need for such navigation.

The main idea is based on the `document.elementFromPoint` method. Although this functionality is marked as 
`experimental`, seems that all current browsers and browser based enviroments (such as SmartTV platforms) support it.
Refer https://developer.mozilla.org/pl/docs/Web/API/Document/elementFromPoint for more details.
