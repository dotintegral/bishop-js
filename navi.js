define([], function () {
    "use strict";
    
    var step = 30;
    var debugPoints = true;
    var currentElement = null;
    var isNavigable = defaultIsNavigable;
    var keys = {
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        enter: 13,
        esc: 17
    }

    function debugPoint(point) {
        if (debugPoints) {
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


    function getStartingPoint(element) {
        var rect = element.getBoundingClientRect();

        return {
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height / 2)
        }
    }


    function findNextNavigable(point) {
        debugPoint(point);

        var el = null;
        
        try {
            el = findNavigableFromPoint(point);
        } catch (e) {
            throw new Error('out of bounds');
        }

        return el;
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
            
            if (isNavigable(element)) {
                break;
            }

            element = element.parentElement;
        }

        return element;
    }


    function navigate(direction) {
        var i=0;
        var el;
        var start = getStartingPoint(currentElement);

        clearDebugPoints();

        while(true) {
            i++;

            try {
                el = findNextNavigable({
                    x: start.x + direction.x * step * i,
                    y: start.y + direction.y * step * i
                });

                if (el && el !== currentElement) {
                    currentElement.classList.remove('focused');
                    currentElement = el;
                    currentElement.classList.add('focused');
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
    }


    function init() {
        console.log('init');
        currentElement = document.querySelector(".focused");
    }


    return {
        setNavigableCondition: function (func) {
            isNavigable = func;
        },
        keyHandler: keyHandler,
        init: init
    }
    
});

