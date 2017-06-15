angular.module('journal-material.Quests.seed', [])

.service("journal-material.Quests.seed.QuestSeeder", [
	"journal-material.service-localdb.FakerService",
	"journal-material.Quests.services.QuestService",
	"journal-material.Quests.services.QuestFactory",
	"journal-material.Quests.services.TaskFactory",
	function(FakerService, QuestService, QuestFactory, TaskFactory){
		var self = this;

		/** @section PUBLIC **/
		this.createSet1 = FakerService.withFaker(function(){

			var promises = [];

			// 10 quests en estado open
			for(var i = 0; i < 10; i++) {
				var n = QuestFactory._new();
				promises.push(QuestService.save(n));
			}

			return Promise.all(promises);
			
		})
		;
		/** @endsection PUBLIC **/

		/** @section INIT **/
		/** @endsection INIT **/
	}
])

;