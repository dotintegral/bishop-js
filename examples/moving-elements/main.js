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

    bishop.step = 30;
    bishop.dispersion = 50;
    bishop.debugPoints = false;

    bishop.focus(document.querySelector('.focused'));
});
