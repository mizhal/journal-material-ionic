angular.module("journal-material.Journal.services", [])

.service("journal-material.Journal.services.EnumService", [
	function(){
		this.EditStatus = {
			EDITABLE: "EDITABLE",
			DELETED: "DELETED"
		};
	}
])

.service("journal-material.Journal.services.JournalService", [
	"$q",
	"journal-material.services.SortCriteriaService",	
	"journal-material.service-localdb.DBService",
	"journal-material.Journal.services.EnumService",
	"journal-material.Journal.services.JournalEntryFactory",
	function($q, SortCriteriaService, DBService, EnumService, JournalEntryFactory){

		/* @section PUBLIC */
		this.all = function() {
			return DBService.all({
				include_docs: true,
				conflicts: true,
				startKey: JournalEntryFactory.type + "-",
				endKey: JournalEntryFactory.type + "-\uffff"
			})
			;
		}

		this.getLatestEntriesForQuest = function(quest_id, limit, include_deleted) {
			return DBService.queryView("journal_by_quest/by_quest", {
				startKey: [quest_id],
				endKey: [quest_id, {}, {}],
				include_docs: true,
				limit:limit
			})
			.then(function(res){
				return res.rows.map(function(it){
					return it.doc;
				})
			})
			;
		}

		this.save = function(journal_entry){
			return DBService.save(journal_entry);
		}
		/* @endsection PUBLIC */
	}
])

.service("journal-material.Journal.services.JournalServiceInitializer", [
	"journal-material.services.SortCriteriaService",	
	"journal-material.service-localdb.DBService",
	"journal-material.Journal.services.EnumService",
	"journal-material.Journal.services.JournalEntryFactory",
	function(SortCriteriaService, DBService, EnumService, 
		JournalEntryFactory){
		var self = this;

		/** @section Db Views **/
		this.views = {};

		var name = "journal_by_quest"
		this.views[name] = {
			name: name,
			_id: "_design/" + name,
			views: {
				by_updated: {
					map: function(journal_entry, request){
						if(journal_entry.type == "$$1")
							return emit([journal_entry.updated_at, journal_entry.quest_id, journal_entry.edit_status], journal_entry);
					}.toString().replace("$$1", JournalEntryFactory.type)
				},
				by_quest: {
					map: function(journal_entry, request){
						if(journal_entry.type == "$$1")
							return emit([journal_entry.quest_id, journal_entry.updated_at, journal_entry.edit_status], journal_entry);
					}.toString().replace("$$1", JournalEntryFactory.type)
				}
			}
		}
		/** @endsection Db Views **/

		this.init = function(){
			DBService.checkDBViews(this.views);
		}
	}
])

.service("journal-material.Journal.services.JournalEntryFactory", [
	"journal-material.services.HasTimestampFactory",
	"journal-material.Journal.services.EnumService",
	function(HasTimestampFactory, EnumService) {
		var self = this;
		this.type = "JournalEntry";
		this.interfaces = HasTimestampFactory.interfaces + [this.type];

		this._new = function(text /* :String */, quest_id /* :uuid? */) {
			var proto = HasTimestampFactory._new();

			Object.assign(proto, {
				_id: this.type + "-" + proto.uuid,
				text: text,
				quest_id: quest_id,
				edit_status: EnumService.EditStatus.EDITABLE
			});

			return proto;
		}
	}
])