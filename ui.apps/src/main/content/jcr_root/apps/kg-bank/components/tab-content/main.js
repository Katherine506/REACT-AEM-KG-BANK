'use strict';

use([], function () {

    var cols = properties.columns ? properties.columns.substring(0, 1) : "1";
    var colNum= [];
    for (var i = 0; i < cols; i++) {
        colNum.push({
            parsys: 'par-tab-content-' + (i + 1)
        });
    }

    return {
        colNum: colNum
    };
});