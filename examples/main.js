define([
    '../bishop'
], function (
    navi
) {
    "use strict";

    // To play around in console
    window.navi = navi;

    document.addEventListener('keydown', navi.keyHandler);

    // override initial settings:

    navi.step = 60;
    navi.dispersion = 80;
    navi.debugPoints = true;

    navi.init();
});
