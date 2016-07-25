describe("Quest Seeding", function(){

	beforeEach(module("journal-material.service-localdb"));
	beforeEach(module("journal-material.services"));
	beforeEach(module("journal-material.Quests.services"));
	beforeEach(module("journal-material.Quests.seed"));

	var QuestService = null;
	var QuestFactory = null;
	var DBService = null;

	beforeEach(function(done){
		inject([
			"journal-material.Quests.services.QuestService",
			"journal-material.Quests.services.QuestFactory",
			"journal-material.service-localdb.DBService",
			function(_QuestService, _QuestFactory, _DBService){
				QuestService = _QuestService;
				expect(QuestService).not.toBeUndefined();
				DBService = _DBService;
				expect(DBService).not.toBeUndefined();
				QuestFactory = _QuestFactory;
				expect(QuestFactory).not.toBeUndefined();

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

	it("works!", function(done){
		expect(null).toBe(null);
		done();
	})
})