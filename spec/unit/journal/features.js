describe("Journal Features", function(){

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

				DBService.connect("test-journal-features")
					.then(function(){
						return DBService.clear();	
					})
					.catch(function(error){
						console.log("ERROR CLEARING DB " + error);
						expect(error).toBeNull();
					})
					.finally(done)
			}
		])
	})

	it("shows last entries for quest", function(done){
		JournalSeeder.createSet2WithQuests()
			.then(function(quests){
				expect(quests.length).toBe(5);
				return quests;
			})
			.mapSeries(function(q){
				JournalService.all()
					.then(function(res){ 
						expect(res.length).toBeGreaterThan(0);
					})
					;

				return JournalService.getEntriesForQuest(q._id)
					.then(function(entries){
						expect(entries.length).toBeGreaterThan(0);
					})
					;
			})
			.all()
			.catch(function(err){
				return done.fail(err);
			})
			.finally(done)
			;

		done();
	})

})