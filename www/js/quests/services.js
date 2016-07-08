angular.module('journal-material.Quests.services', [])

.service("journal-material.Quests.services.EnumService", [
	function(){
		this.QuestStatus = {
			OPEN: "OPEN", 
			FOCUS: "FOCUS", 
			BLOCKED: "BLOCKED", 
			SCHEDULED: "SCHEDULED", 
			BLOCKED_FOR_REVIEW: "BLOCKED_FOR_REVIEW",
			CANCELLED: "CANCELLED", 
			FAILED: "FAILED", 
			DONE: "DONE"
		};

		this.TaskStatus = {
			TODO: "TODO",
			DONE: "DONE",
			CANCELLED: "CANCEL",
			FAILED: "FAILED",
			DELEGATED: "DELEGATED"
		};

		this.QuestsStatusTranslation = {
			OPEN: "Abiertas", 
			FOCUS: "Foco", 
			BLOCKED: "En espera", 
			BLOCKED_FOR_REVIEW: "En espera para revisión", 
			SCHEDULED: "En calendario", 
			CANCELLED: "Canceladas", 
			FAILED: "Fallidas", 
			DONE: "Completas"
		};
	}
])

.service("journal-material.Quests.services.QuestService", [ 
	"$q",
	"journal-material.services.SortCriteriaService",
	"journal-material.service-localdb.DBService",
	"journal-material.Quests.services.EnumService",
	function($q, SortCriteriaService, DBService, EnumService){

		var self = this;

		/** PRIVATE **/
		/** END: PRIVATE **/

		/** PUBLIC **/
		this.TranslateStatus = function(status){
			return EnumService.QuestsStatusTranslation[status];
		}

		this.GetSummarizedQuestLog = function(sort_criteria){
			return $q.defer().promise;
		}

		this.GetQuestsForStatus = function(status, sort_criteria){
			DBService.query("");
		}
		/** END: PUBLIC **/
	}
])

/*** SERVICIO PARA CREAR TABLAS, INDICES, ETC EN BASE DE DATOS LOCAL **/
.service("journal-material.Quests.services.QuestServiceInitializer", [ 
	"$q",
	"journal-material.services.SortCriteriaService",
	"journal-material.service-localdb.DBService",
	function($q, SortCriteriaService, DBService){
		var self;

		/** DB VIEWS **/
		this.views = {};

		this.views.quest_by_status_by_updated = {
			_id: "_design/quest_status_group",
			filters: {
				by_status: function(quest, req){
					return quest.status == req.status; 
				}.toString()
			},
			views: {
				by_updated: {
					map: function(quest){ 
						return emit([quest.status, quest.updated_at], quest); 
					}.toString()
				},
				by_created: {
					map: function(quest){ 
						return emit([quest.status, quest.created_at], quest); 
					}.toString()	
				}
			}
		};

		this.views.quest_status_by_created = {
			_id: "_design/quest_status_by_updated",
			filters: {
				by_status: function(quest, req){
					return quest.status == req.status; 
				}.toString()
			},
			views: {
				by_status: {
					map: function(quest){ 
						return emit([quest.status, quest.created_at], quest); 
					}.toString()
				}
			}
		};
		/** END: DB VIEWS **/
	}
])

.service("journal-material.Quests.services.QuestFactory", [

	"journal-material.services.HasTimestampFactory",
	"journal-material.Quests.services.EnumService",
	function(HasTimestampFactory, EnumService){
		var self = this;
		this.type = "Quest";
		this.interfaces = HasTimestampFactory.interfaces + [this.type];

		this._new = function(name, desc){
			var proto = HasTimestampFactory._new();

			Object.assign(proto, {
				type: self.type,
				name: name,
				description: desc,
				tasks: [],
				deadline: null,
				status: EnumService.QuestStatus.OPEN,
				context: null,
				sections: []
			});

			return proto;
		}
	}
])

.service("journal-material.Quests.services.TaskFactory", [

	"journal-material.services.HasTimestampFactory",
	"journal-material.Quests.services.EnumService",
	function(HasTimestampFactory, QuestStatusEnumService){
		var self = this;
		this.type = "Task";
		this.interfaces = HasTimestampFactory.interfaces + [this.type];

		this._new = function(name, desc){
			var proto = HasTimestampFactory._new();

			Object.assign(proto, {
				type: self.type,
				interfaces: self.interfaces,
				name: name,
				status: QuestStatusEnumService.TaskStatus.TODO,
			});

			return proto;
		}
	}
])
;