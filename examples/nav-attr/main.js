define([
    '../../bishop'
], function (
    bishop
) {
    "use strict";

    // To play around in console
    window.bishop = bishop;

    bishop.init();
    bishop.focus(document.querySelector('.focused'));
});
