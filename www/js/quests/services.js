angular.module('journal-material.Quests.services', [])

.service("journal-material.Quests.services.QuestService", [ 
	"$q",
	"journal-material.services.SortCriteriaEnumService",
	"journal-material.service-localdb.DBService",
	function($q, SortCriteriaEnumService, DBService){

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

		/** DB VIEWS **/
		var dd_summarized_quest_log = {
			_id: "_design/summarized_quest_log",
			filters: {
				by_status: function(quest, req){
					return quest.status == "FOCUS" || quest.status == "BLOCKED" ||
						quest.status == "OPEN"
						; 
				}.toString()
			},
			views: {
				by_status: {
					map: function(quest){ return emit(quest.status); }.toString()
				}
			}
		};
		/** END: DB VIEWS **/

		/** PRIVATE **/
		/** END: PRIVATE **/

		/** PUBLIC **/
		this.TranslateStatus = function(status){
			return statuses_names[status];
		}

		this.GetSummarizedQuestLog = function(sort_criteria){
			return $q.defer().promise;
		}
		/** END: PUBLIC **/
	}
])

/*** SERVICIO PARA CREAR TABLAS, INDICES, ETC EN BASE DE DATOS LOCAL **/
.service("journal-material.Quests.services.QuestServiceInitializer", [ 
	"$q",
	"journal-material.services.SortCriteriaEnumService",
	"journal-material.service-localdb.DBService",
	function($q, SortCriteriaEnumService, DBService){
		var self;

		var ddindex_by_name = 

		this.CreateIndexByName = function(){};
		this.CreateIndexByStatus = function(){};
		this.CreateIndexByUpdated = function(){};
	}
])

;