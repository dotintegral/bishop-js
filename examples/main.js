define([
    '../navi'
], function (
    navi
) {
    "use strict";

    // To play around in console
    window.navi = navi;

    document.addEventListener('keydown', navi.keyHandler);

    navi.init();
});
