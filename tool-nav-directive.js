// Product of MCGA

window.PIVisualization = window.PIVisualization || {};

(function (PV) {
    'use strict';

    function init(scope, elem, $rootScope, routeParams, webServices, navHierarchy) {

        scope.updateDisplayNavLinks = updateDisplayNavLinks;
        scope.linkData = null;

        $rootScope.$on('$stateChangeSuccess', updateDisplayNavLinks);

        (function activate() {
            updateDisplayNavLinks();         
        })();


        function updateDisplayNavLinks(navItem) {
            var displayId = (navItem && navItem.DisplayId) || routeParams.getDisplayId();
            if (displayId > -1) {
                navHierarchy.addParent(navItem && navItem.LinkURL && navItem);
                webServices.getDisplayForEditing(displayId).then(
                    function (response) {
                        // get initial navigation links from current display
                        scope.linkData = {
                            parents: navHierarchy.parents,
                            parent: navHierarchy.parents[navHierarchy.parents.length - 1],
                            children: getNavLinks(response.data)
                        };
                    },
                    function (errorObject) {
                        // reset on error
                        reset();
                    }
                );
            } else {
                reset();
            }
        }

        function reset() {
            navHierarchy.parents.length = 0;
            scope.linkData = null;
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
                var existsInParents = navHierarchy.parents.some(function(parent) {
                    return parent.LinkURL === config.LinkURL;                    
                });   
                return {
                    DisplayId: isDisplay ? displayUrlParts[0] : null,
                    DisplayName: isDisplay ? displayUrlParts[1] : config.LinkURL,
                    IncludeAsset: config.IncludeAsset,
                    IncludeTimeRange: config.IncludeTimeRange,
                    IsDisplay: isDisplay,
                    LinkURL: config.LinkURL,
                    NewTab: config.NewTab,
                    SymbolName: symbol.Name,
                    IsDisabled: !isDisplay || existsInParents
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
        inject: ['$rootScope', 'routeParams', 'webServices', 'navHierarchy'],
        init: init
    };

    PV.toolCatalog.register(def);

})(window.PIVisualization);