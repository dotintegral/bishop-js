define([
    '../../bishop'
], function (
    bishop
) {
    "use strict";

    // To play around in console
    window.bishop = bishop;

    document.addEventListener('keydown', bishop.keyHandler);

    // override initial settings:

    bishop.step = 60;
    bishop.dispersion = 80;
    bishop.debugPoints = true;

    bishop.init();
});
