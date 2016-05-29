angular.module('journal-material.service-localdb', [])

.service("journal-material.service-localdb.DBService", [
	"$http",
	"$q",
	function($http, $q){

		var self = this;
		var dataset = {};
		var config_defer = $q.defer();
		var initialized = function(){ return self.config_defer.promise; }

		/** PUBLIC **/
		var __init__ = function(){
			return $q
				.all([
					InitDatabase(), 
					CreateIndices()
				])
				.then(function(response){
						self.config_defer.resolve();
				},function(error){
						self.config_defer.reject();
				})
			;
		};
		/** END: PUBLIC **/

		/** PRIVATE **/
		var InitDatabase = function(){
			return $http({
				method: "GET",
				url: local_url("/js/data/mock-db.json")
			}).then(
				function(response){
					self.dataset = response.data;
				},
				function(error){

				}
			);
		}
		/** END: PRIVATE **/
	}
])

;