// Product of MCGA

window.PIVisualization = window.PIVisualization || {};

(function (PV) {
    'use strict';

    function init(scope, elem, $rootScope, routeParams, webServices) {

        scope.navLinks = [];

        $rootScope.$on('$stateChangeSuccess', updateDisplayNavLinks);

        (function activate() {
            updateDisplayNavLinks();         
        })();

        function updateDisplayNavLinks() {
            var displayId = routeParams.getDisplayId();
            if (displayId > -1) {
                webServices.getDisplayForEditing(displayId).then(
                    function (response) {
                        // get initial navigation links from current display
                        scope.navLinks = getNavLinks(response.data);
                    },
                    function (errorObject) {
                        // reset on error
                        scope.navLinks = [];
                    }
                );
            } else {
                scope.navLinks = [];
            }
        }

        function getNavLinks(display) {
            var symbols = display.Symbols || [];

            return symbols.filter(function (symbol) {
                // collect symbols wtih navigation links
                return !!(symbol.Configuration && symbol.Configuration.LinkURL);
            }).map(function (symbol) {
                // map the properties we care about
                var config = symbol.Configuration,
                    isDisplay = config.LinkURL.indexOf('./#/Displays/') === 0,
                    displayUrlParts = isDisplay ? config.LinkURL.substring(13).split('/') : null;

                return {
                    DisplayId: isDisplay ? displayUrlParts[0] : null,
                    DisplayName: isDisplay ? displayUrlParts[1] : null,
                    IncludeAsset: config.IncludeAsset,
                    IncludeTimeRange: config.IncludeTimeRange,
                    IsDisplay: isDisplay,
                    LinkURL: config.LinkURL,
                    NewTab: config.NewTab,
                    SymbolName: symbol.Name
                };
            });
        }

        return {};
    }

    var def = {
        typeName: 'nav',
        displayName: 'Navigation links',
        getDefaultConfig: function () {
            return {};
        },
        iconUrl: 'Images/chrome.custom_addin_crossed_tools.svg',
        inject: ['$rootScope', 'routeParams', 'webServices'],
        init: init
    };

    PV.toolCatalog.register(def);

})(window.PIVisualization);
