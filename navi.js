define([], function () {
    "use strict";
    
    var api = {
        step: 30,
        dispersion: 30,
        debugPoints: true,
        showTime: true,
        minSpread: 1,
        maxSpread: 20
    }

    var currentElement = null;
    var keys = {
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        enter: 13,
        esc: 17
    }

    function debugPoint(point) {
        if (api.debugPoints) {
            var debugElement = document.createElement('div');
            debugElement.className = 'debug-point';
            debugElement.style.top = point.y + "px";
            debugElement.style.left = point.x + "px";
            document.body.appendChild(debugElement);
        }
    }

    function clearDebugPoints() {
        var points = document.querySelectorAll('.debug-point');

        for(var i=0; i<points.length; i++) {
            points[i].remove();
        }
    }

    
    function defaultIsNavigable(element) {
        return element.classList.contains('navigable');
    }


    function getStartingPoint(element, direction) {
        var rect = element.getBoundingClientRect();
        var x;
        var y;

        switch(direction.x) {
            case -1:
                x = rect.left;
                break;

            case 0:
                x = rect.left + rect.width/2;
                break;

            case 1:
                x = rect.right;
                break;
        }

        switch(direction.y) {
            case -1:
                y = rect.top;
                break;

            case 0:
                y = rect.top + rect.height/2;
                break;

            case 1:
                y = rect.bottom;
                break;
        }

        return {
            x: x,
            y: y
        }
    }


    function findNextNavigable(params) {

        var el;
        var elements = [];
        var errorCount = 0;
        var point;
        var offset;
        var spread = params.spread;
        var direction = params.direction;
        
        for(var i=0; i<spread; i++) {
            el = null;
            offset = (i * api.dispersion) - (spread * api.dispersion * 0.5);

            point = {
                x: params.x + Math.abs(direction.y) * offset,
                y: params.y + Math.abs(direction.x) * offset
            }
            debugPoint(point);

            try {
                el = findNavigableFromPoint(point);
                
                if (elements.indexOf(el) === -1) {
                    elements.push(el);
                }

            } catch (e) {
                errorCount++;
            }
        }

        if (errorCount === spread) {
            throw new Error('out of bounds');
        }

        return elements[0];
    }


    function findNavigableFromPoint(point) {
        var element = document.elementFromPoint(point.x, point.y);

        if (element === null) {
            throw new Error('out of bounds');
        }

        while (true) {
            if (element === document.body || element === document.body.parentElement) {
                element = null;
                break;
            }
            
            if (api.isNavigable(element)) {
                break;
            }

            element = element.parentElement;
        }

        return element;
    }

    function blur(element) {
        element.classList.remove('focused');
    }

    function focus(element) {
        element.classList.add('focused');
    }


    function navigate(direction) {
        var i=0;
        var el;
        var start = getStartingPoint(currentElement, direction);
        var spread = 0;
        var minSpread = ~~currentElement.getAttribute('nav-min-spread') || api.minSpread;
        var maxSpread = ~~currentElement.getAttribute('nav-max-spread') || api.maxSpread;

        clearDebugPoints();

        while(true) {
            i++;
            spread++;

            if (spread < minSpread) {
                spread = minSpread;
            }

            if (spread > maxSpread) {
                spread = maxSpread;
            }

            try {
                el = findNextNavigable({
                    x: start.x + direction.x * api.step * i,
                    y: start.y + direction.y * api.step * i,
                    spread: spread,
                    direction: direction
                });

                if (el && el !== currentElement) {
                    api.blur(currentElement);
                    currentElement = el;
                    api.focus(currentElement);
                    break;
                }

            } catch (e) {
                console.log('Not found element');
                break;
            }

            if (i > 1000) {
                console.error("Something went wrong, infinite loop!");
                break;
            }

        }
    }


    function keyHandler(event) {
        if (api.showTime) {
            console.time('navi');
        }

        switch(event.keyCode) {

            case keys.up:
                navigate({x: 0, y: -1});
                break;

            case keys.down:
                navigate({x: 0, y: 1});
                break;

            case keys.left:
                navigate({x: -1, y: 0});
                break;

            case keys.right:
                navigate({x: 1, y: 0});
                break;
        }

        if (api.showTime) {
            console.timeEnd('navi');
        }
    }


    function init() {
        console.log('init');
        currentElement = document.querySelector(".focused");
    }

    api.keyHandler = keyHandler;
    api.init = init;
    api.isNavigable = defaultIsNavigable;
    api.focus = focus;
    api.blur = blur;


    return api;
});

