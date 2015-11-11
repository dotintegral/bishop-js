define([
    '../../bishop'
], function (
    bishop
) {
    "use strict";

    // To play around in console
    window.bishop = bishop;

    document.addEventListener('keydown', bishop.keyHandler);

    bishop.focus(document.querySelector('.focused'));
});
