// Product of MCGA

window.PIVisualization = window.PIVisualization || {};

(function (PV) {
    'use strict';

    function init(scope, elem, webServices) {


        return {};
    }

    var def = {
        typeName: 'nav',
        displayName: 'Navigation links',
        getDefaultConfig: function () {
            return {};
        },
        iconUrl: 'Images/chrome.custom_addin_crossed_tools.svg',
        inject: ['webServices'],
        init: init
    };

    PV.toolCatalog.register(def);
    
})(window.PIVisualization);