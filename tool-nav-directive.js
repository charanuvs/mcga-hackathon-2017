//Copyright 2017, by Michael Ferster, Gaurav Verma, Charan Uppuluri

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

window.PIVisualization = window.PIVisualization || {};

(function (PV) {
    'use strict';

    function init(scope, elem, $rootScope, displayProvider, navHierarchy, routeParams, webServices) {
        // data
        scope.linkData = null;

        // methods
        scope.navIntoItem = navIntoItem;
        scope.selectSymbol = selectSymbol;
        scope.updateDisplayNavLinks = updateDisplayNavLinks;

        $rootScope.$on('$stateChangeSuccess', updateDisplayNavLinks);

        (function activate() {
            updateDisplayNavLinks();         
        })();

        function navIntoItem(navItem, newTab) {
            if (navItem.IsChild && navItem.IsDisplay) {
                displayProvider.selectSymbol(navItem.SymbolName);

                var symbol = displayProvider.getLastSelectedSymbol();
                var oldNewTab = symbol.Configuration.NewTab;

                // expand symbol with our new tab setting and reset
                symbol.Configuration.NewTab = newTab;
                $rootScope.$broadcast('expandSymbol');
                symbol.Configuration.NewTab = oldNewTab;
            }
            else {
                // window.open here
                window.open(navItem.LinkURL, navItem.IsChild ? '_blank': '_self');
            }
        }
        
        function updateDisplayNavLinks(navItem) {
            var displayId = routeParams.getDisplayId();
            if (displayId > -1) {
                webServices.getDisplayForEditing(displayId).then(
                    function (response) {
                        navHierarchy.addParent({ LinkURL: './' + window.location.hash, DisplayName: response.data.Name });

                        // get initial navigation links from current display
                        scope.linkData = {
                            parents: navHierarchy.parents,
                            parent: navHierarchy.parents[navHierarchy.parents.length - 1],
                            children: getNavLinks(response.data)
                        };
                    },
                    function (error) {
                        // reset on error
                        reset(error);
                    }
                );
            } else {
                reset();
            }
        }

        function reset(error) {
            navHierarchy.parents.length = 0;
            scope.linkData = {
                parents: [],
                children: error ? [{
                    DisplayName: 'Error loading data',
                    IsDisabled: true
                }] : [],
                parent: null
            };
        }

        function getNavLinks(display) {
            var symbols = display.Symbols || [];

            return symbols.filter(function (symbol) {
                // collect symbols with navigation links
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
                    DisplayName: isDisplay ? displayUrlParts[1] : config.LinkURL,
                    IncludeAsset: config.IncludeAsset,
                    IncludeTimeRange: config.IncludeTimeRange,
                    LinkURL: config.LinkURL,
                    SymbolName: symbol.Name,
                    IsDisabled: !isDisplay || existsInParents,
                    IsDisplay: isDisplay,
                    IsChild: true
                };
            });
        }

        function selectSymbol(link) {
            displayProvider.selectSymbol(link.SymbolName);
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
        inject: ['$rootScope', 'displayProvider', 'navHierarchy', 'routeParams', 'webServices'],
        init: init
    };

    PV.toolCatalog.register(def);

})(window.PIVisualization);
