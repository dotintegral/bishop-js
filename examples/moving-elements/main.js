define([
    '../../bishop'
], function (
    bishop
) {
    "use strict";

    // To play around in console
    window.bishop = bishop;

    // override initial settings:
    bishop.step = 30;
    bishop.dispersion = 50;
    bishop.debugPoints = false;

    bishop.init();
    bishop.focus(document.querySelector('.focused'));
});
