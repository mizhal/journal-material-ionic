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
	"journal-material.Quests.services.QuestFactory",
	"journal-material.Quests.services.QuestServiceInitializer",
	function($q, SortCriteriaService, DBService, EnumService, QuestFactory, QuestServiceInitializer){

		var self = this;

		/** PRIVATE **/
		/** END: PRIVATE **/

		/** PUBLIC **/
		this.TranslateStatus = function(status) {
			return EnumService.QuestsStatusTranslation[status];
		}

		this.getSummarizedQuestLog = function(sort_criteria) {
			return $q.defer().promise;
		}

		this.getByStatus = function(status, sort_criteria) {
			return DBService.queryView("quest_by_status/by_updated", {
				startkey: [status],
				endkey: [status, {}, {}],
				include_docs: true
			}).then(function(res){
				return res.rows.map(function(it){
					return it.doc;
				});
			})
		}

		this.save = function(quest){
			return DBService.save(quest);
		}

		this.get = function(id){
			return DBService.get(id);
		}
		/** END: PUBLIC **/
	}
])

/*** SERVICIO PARA CREAR TABLAS, INDICES, ETC EN BASE DE DATOS LOCAL **/
.service("journal-material.Quests.services.QuestServiceInitializer", [ 
	"$q",
	"journal-material.services.SortCriteriaService",
	"journal-material.service-localdb.DBService",
	"journal-material.Quests.services.QuestFactory",
	function($q, SortCriteriaService, DBService, QuestFactory){
		var self;

		/** DB VIEWS **/
		this.views = {};

		var name = "quest_by_status" 
		this.views.quest_by_status = {
			name: name,
			_id: "_design/" + name,
			views: {
				by_updated: {
					map: function(quest, req){ 
						if(quest.type == "$$1")
							return emit([quest.status, quest.updated_at], quest); 
					}.toString().replace("$$1", QuestFactory.type)
				},
				by_created: {
					map: function(quest, req){ 
						if(quest.type == "$$1")
							return emit([quest.status, quest.created_at], quest); 
					}.toString().replace("$$1", QuestFactory.type)	
				}
			}
		};
		/** END: DB VIEWS **/

		this.init = function(){
			DBService.checkDBViews(this.views);
		}
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
				_id: this.type + "-" + proto.uuid,
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

.run([
	"journal-material.Quests.services.QuestServiceInitializer",
	function(QuestServiceInitializer){

		QuestServiceInitializer.init();
	}
])
;