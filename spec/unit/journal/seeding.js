describe("Journal Seeding", function(){

	beforeEach(module("journal-material.service-localdb"));
	beforeEach(module("journal-material.services"));
	beforeEach(module("journal-material.Journal.services"));
	beforeEach(module("journal-material.Journal.seed"));

	beforeEach(function(){
		require.config({
			baseUrl: "../../../www"
		})
	})

	var JournalSeeder = null;
	var JournalService = null;
	var JournalEntryFactory = null;
	var DBService = null;

	beforeEach(function(done){
		inject([
			"journal-material.Journal.services.JournalEntryFactory",
			"journal-material.Journal.services.JournalService",
			"journal-material.Journal.seed.JournalSeeder",
			"journal-material.service-localdb.DBService",
			function(_JornalEntryFactory, _JournalService, _JournalSeeder, _DBService){
				JournalEntryFactory = _JornalEntryFactory;
				JournalService = _JournalService;
				JournalSeeder = _JournalSeeder;
				DBService = _DBService;

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

	it("can seed the database", function(done){
		JournalSeeder.createSet1()
		.then(function(){
			return JournalService.all();
		})
		.then(function(res){
			expect(res.length).toBe(10);
			done();
		})
		.catch(function(err){
			console.log(err.toString());
			done.fail(err);
		})
		;
	})

})