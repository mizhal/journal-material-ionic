angular.module("journal-material.Journal.seed", ["journal-material.Quests.services"])

.service("journal-material.Journal.seed.JournalSeeder", [
	"journal-material.service-localdb.FakerService",
	"journal-material.Journal.services.JournalService",
	"journal-material.Journal.services.JournalEntryFactory",
	"journal-material.Quests.services.QuestService",
	"journal-material.Quests.services.QuestFactory",
	function(FakerService, JournalService, JournalEntryFactory, QuestService, QuestFactory){
		var self = this;

		/** @section PUBLIC **/
		this.createSet1 = FakerService.withFaker(function(){

			// mola hacer esto como pipeline

			// 10 entradas vacias sin asociar a nada
			return Promise
				.mapSeries(new Array(10), function(){
					var j = JournalEntryFactory._new();
					return JournalService.save(j);
				})
				.all()
				;
		})

		this.createSet2WithQuests = function(){

			// 5 quests -> 1 a 5 entradas cada una
			return Promise
				.mapSeries(new Array(5), function(){
					var q = QuestFactory._new(faker.lorem.sentence(), faker.lorem.paragraph());
					return QuestService.save(q)
						.then(function(quest){

							return Promise
								.mapSeries(
									new Array(faker.random.number({min: 1, max: 5})),
									function(){
										var entry = JournalEntryFactory._new(faker.lorem.paragraph(), quest._id);
										return JournalService.save(entry);	
									}
								)
								.all()
								.then(function(){
									return quest;
								})
								;
						})
				})
				.all()
				;			
		}
		/** @endsection PUBLIC **/

	}
])