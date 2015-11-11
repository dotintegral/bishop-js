define([
    '../../bishop'
], function (
    bishop
) {
    "use strict";

    // To play around in console
    window.bishop = bishop;

    // override initial settings:
    bishop.step = 60;
    bishop.dispersion = 80;
    bishop.debugPoints = true;

    bishop.init();
    bishop.focus(document.querySelector('.focused'));
});

