define([
    'navi'
], function (
    navi
) {
    "use strict";

    document.addEventListener('keydown', navi.keyHandler);

    navi.init();
});
