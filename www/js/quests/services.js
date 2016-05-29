angular.module('journal-material.Quests.services', [])

.service("journal-material.Quests.services.QuestService", [ 
	"$q",
	"journal-material.services.SortCriteriaEnumService",
	function($q, SortCriteriaEnumService){

		var self = this;
		var statuses_names = {
			"OPEN": "Abiertas", 
			"FOCUS": "Foco", 
			"BLOCKED": "En espera", 
			"SCHEDULED": "En calendario", 
			"CANCELLED": "Canceladas", 
			"FAILED": "Fallidas", 
			"DONE": "Completas"
		};
		
		/** private **/
		var InitDatabase = function(){
			return $http({
				method: "GET",
				url: local_url("/js/data/mock-db.json")
			}).then(
				function(response){
					self.dataset = response.data
				},
				function(error){

				}
			);
		};

		var IndexByStatus = function(){
			self.index_by_status = {};
			for(var sta in self.statuses_names){
				self.index_by_status[sta] = [];
			}

			for(var i in self.dataset){
				self.index_by_status[i.status].push(i);
			}
		};

		var __init__ = function(){
			return $q
				.all([
					InitDatabase(), 
					IndexByStatus()
				])
				.then(function(response){
						self.config_defer.resolve();
				},function(error){
						self.config_defer.reject();
				})
			;
		};

		/** END: private **/

		/** public **/
		this.TranslateStatus = function(status){
			return statuses_names[status];
		}

		this.GetSummarizedQuestLog = function(sort_criteria){
			var result = {};

			return initialized().then(function(){

			});
		}
		/** END: public **/
	}
])

;