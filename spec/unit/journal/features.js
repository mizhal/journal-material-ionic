describe("Journal Seeding", function(){

	beforeEach(module("journal-material.service-localdb"));
	beforeEach(module("journal-material.services"));
	beforeEach(module("journal-material.Journal.services"));
	beforeEach(module("journal-material.Journal.seed"));
	beforeEach(module("journal-material.Quests.services"));

	beforeEach(function(){
		require.config({
			baseUrl: "../../../www"
		})
	})

	var JournalSeeder = null;
	var JournalService = null;
	var JournalEntryFactory = null;
	var DBService = null;
	var QuestService = null;

	beforeEach(function(done){
		inject([
			"journal-material.Journal.services.JournalEntryFactory",
			"journal-material.Journal.services.JournalService",
			"journal-material.Journal.seed.JournalSeeder",
			"journal-material.service-localdb.DBService",
			"journal-material.Quests.services.QuestService",
			function(_JornalEntryFactory, _JournalService, _JournalSeeder, _DBService, _QuestService){
				JournalEntryFactory = _JornalEntryFactory;
				JournalService = _JournalService;
				JournalSeeder = _JournalSeeder;
				DBService = _DBService;
				QuestService = _QuestService;

				localStorage.clear();

				DBService.connect("test")
				.then(function(){
					return DBService.clear();	
				})
				.catch(function(error){
					console.log("ERROR CLEARING DB " + error);
					expect(error).toBeUndefined();
				})
				.finally(done)
			}
		])
	})

	it("shows last entries for quest", function(done){
		JournalSeeder.createSet2WithQuests()
			.then(function(){
				return QuestService.all();
			})
			.then(function(quests){
				expect(quests.length).toBe(5);

				return Promise
					.mapSeries(quests, function(q){
						return JournalService.getEntriesForQuest(q._id);
					})
					.map(function(entries){
						expect(entries.length).toBeGreaterThan(0);
					})
					.all()
					;
			})
			.catch(function(err){
				done.fail(err);
			})
			.finally(done)
			;

		done();
	})

})