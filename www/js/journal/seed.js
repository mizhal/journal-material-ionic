angular.module("journal-material.Journal.seed", [])

.service("journal-material.Journal.seed.JournalSeeder", [
	"journal-material.service-localdb.FakerService",
	"journal-material.Journal.services.JournalService",
	"journal-material.Journal.services.JournalEntryFactory",
	function(FakerService, JournalService, JournalEntryFactory){
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
		/** @endsection PUBLIC **/

	}
])