window.PIVisualization = window.PIVisualization || {};

(function (PV) {
    'use strict';

    angular.module(APPNAME)
        .service('navHierarchy', [NavHierarchy]);

    function NavHierarchy() {
        var vm = this;        
        vm.parents = [];

        vm.addParent = function(navItem) {
            var linkURL = './' + window.location.hash;
            var displayUrlParts = linkURL.substring(13).split('/');
            navItem = navItem || {
                DisplayId: displayUrlParts[0],
                DisplayName: displayUrlParts[1],
                IsDisplay: true,
                LinkURL: linkURL,                    
                CanNav: true,
                IsDisabled: false
            };

            var navIndex;
            var index;
            for (index = 0; index < vm.parents.length; index += 1) {
                if (vm.parents[index].LinkURL === navItem.LinkURL) {
                    navIndex = index;
                    break;
                }
            }         

            if (navIndex !== undefined) {
                vm.parents.splice(navIndex + 1);
            }
            else {
                vm.parents.push(navItem);
            }
        }
    }
})(window.PIVisualization);