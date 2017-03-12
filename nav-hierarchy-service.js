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

    angular.module(APPNAME)
        .service('navHierarchy', [NavHierarchy]);

    function NavHierarchy() {
        var vm = this;        
        vm.parents = [];

        vm.addParent = function (navItem) {            
            var navIndex = -1;
            
            for (var index = 0; index < vm.parents.length; index += 1) {
                if (vm.parents[index].LinkURL === navItem.LinkURL) {
                    navIndex = index;
                    break;
                }
            }         

            if (navIndex !== -1) {
                vm.parents.splice(navIndex + 1);
            } else {
                vm.parents.push(navItem);
            }
        }
    }
})(window.PIVisualization);
