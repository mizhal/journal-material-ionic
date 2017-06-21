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
	"journal-material.Quests.services.TaskFactory",
	"journal-material.Quests.services.QuestStatusChangeFactory",
	function($q, SortCriteriaService, DBService, EnumService, QuestFactory, QuestServiceInitializer, 
		TaskFactory, QuestStatusChangeFactory){

		var self = this;

		/** PUBLIC **/

		this.all = function(offset, limit){
			return DBService.all({
				include_docs: true,
				conflicts: true,
				startkey: QuestFactory.type + "-",
				endkey: QuestFactory.type + "-\uffff"
			})
			;
		}

		this.TranslateStatus = function(status) {
			return EnumService.QuestsStatusTranslation[status];
		}

		this.getSummarizedQuestLog = function(sort_criteria) {
			return Promise.all([
				self.getByStatus(EnumService.QuestStatus.FOCUS),
				self.getByStatus(EnumService.QuestStatus.BLOCKED, 4),
				self.countByStatus(EnumService.QuestStatus.BLOCKED),
				self.getByStatus(EnumService.QuestStatus.OPEN, 4),
				self.countByStatus(EnumService.QuestStatus.OPEN)	
			]).spread(function(focus, blocked, n_blocked, open, n_open){
				return {
					focus: focus,
					blocked: blocked,
					n_blocked: n_blocked,
					more_blocked: n_blocked > 4,
					open: open,
					n_open: n_open,
					more_open: n_open > 4
				}
			})
		}

		this.getByStatus = function(status, limit, sort_criteria) {
			return DBService.queryView("quest_by_status/by_updated", {
				startkey: [status],
				endkey: [status, {}, {}],
				include_docs: true,
				limit: limit,
			}).then(function(res){
				return res.rows.map(function(it){
					return it.doc;
				});
			})
		}

		this.countByStatus = function(status) {
			return DBService.queryView("quest_by_status/by_updated", {
				startkey: [status],
				endkey: [status, {}, {}],
				include_docs: false
			}).then(function(res){
				return res.rows.length;
			})
		}

		this.save = function(quest){
			return DBService.save(quest);
		}

		this.get = function(id){
			return DBService.get(id);
		}

		this.newTask = function(name){
			return TaskFactory._new(name);
		}
		/** next statuses **/
		this.canBlock = function(quest){
			var allowed = [
				EnumService.QuestStatus.FOCUS,
				EnumService.QuestStatus.OPEN
			]
			return allowed.indexOf(quest.status) != -1;
		}

		this.canBacklog = function(quest){
			var allowed = [
				EnumService.QuestStatus.FOCUS,
				EnumService.QuestStatus.FAILED,
				EnumService.QuestStatus.CANCELLED,
				EnumService.QuestStatus.DONE,
				EnumService.QuestStatus.SCHEDULED
			]
			return allowed.indexOf(quest.status) != -1;
		}

		this.canDone = function(quest) {
			var allowed = [
				EnumService.QuestStatus.FOCUS,
				EnumService.QuestStatus.OPEN
			]
			return allowed.indexOf(quest.status) != -1;
		}

		this.canFail = function(quest) {
			var allowed = [
				EnumService.QuestStatus.FOCUS,
				EnumService.QuestStatus.OPEN
			]
			return allowed.indexOf(quest.status) != -1;
		}

		this.canSchedule = function(quest) {
			var allowed = [
				EnumService.QuestStatus.FOCUS,
				EnumService.QuestStatus.OPEN
			]
			return allowed.indexOf(quest.status) != -1;
		}

		this.canFocus = function(quest) {
			var allowed = [
				EnumService.QuestStatus.OPEN,
				EnumService.QuestStatus.BLOCKED,
				EnumService.QuestStatus.SCHEDULED,
				EnumService.QuestStatus.DONE
			]
			return allowed.indexOf(quest.status) != -1;
		}
		/** END: next statuses **/

		/** Status transition **/
		this.isFocusFull = function(){
			return self.countByStatus(EnumService.QuestStatus.FOCUS).then(function(count){
				return count >= 4;
			})
		}

		this.setFocus = function(quest) {
			self.registerStatusChange(quest, EnumService.QuestStatus.FOCUS);
			quest.status = EnumService.QuestStatus.FOCUS;
			return self.save(quest);
		}

		this.removeLatestFromFocus = function(){
			return self.getByStatus(EnumService.QuestStatus.FOCUS)
				.then(function(quests){
					var drop = quests[quests.length - 1];
					return self.setOpen(drop);
				})
		}

		this.setOpen = function(quest) {
			self.registerStatusChange(quest, EnumService.QuestStatus.OPEN);
			quest.status = EnumService.QuestStatus.OPEN;
			return self.save(quest);
		}

		this.setBlocked = function(quest, block_reason) {
			self.registerStatusChange(quest, EnumService.QuestStatus.BLOCKED, block_reason);
			quest.block_reason = block_reason;
			quest.status = EnumService.QuestStatus.BLOCKED;
			return self.save(quest);
		}
		/** END: Status transition **/

		/** END: PUBLIC **/

		/** PRIVATE **/
		this.registerStatusChange = function(quest, new_status, message) {
			var change = QuestStatusChangeFactory._new(quest.status, new_status, message);
			quest.status_changelog.push(change);
		}
		/** END: PRIVATE **/
	}
])

/*** SERVICIO PARA CREAR TABLAS, INDICES, ETC EN BASE DE DATOS LOCAL **/
.service("journal-material.Quests.services.QuestServiceInitializer", [ 
	"$q",
	"journal-material.services.SortCriteriaService",
	"journal-material.service-localdb.DBService",
	"journal-material.Quests.services.QuestFactory",
	function($q, SortCriteriaService, DBService, QuestFactory){
		var self = this;

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
			DBService.checkDBViews(self.views);
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
				sections: [],
				scheduled_to: null,
				blocked_reason: null,
				status_changelog: []
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

.service("journal-material.Quests.services.QuestStatusChangeFactory", [
	"journal-material.services.HasTimestampFactory",
	function(HasTimestampFactory) {
		var self = this;
		this.type = "QuestStatusChange";
		this.interfaces = HasTimestampFactory.interfaces + [this.type];

		this._new = function(old_status, new_status, message){
			var proto = HasTimestampFactory._new();

			Object.assign(proto, {
				old_status: old_status,
				new_status: new_status,
				message: message
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