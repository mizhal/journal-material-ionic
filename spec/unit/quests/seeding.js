describe("Quest Seeding", function(){

	beforeEach(module("journal-material.service-localdb"));
	beforeEach(module("journal-material.services"));
	beforeEach(module("journal-material.Quests.services"));
	beforeEach(module("journal-material.Quests.seed"));

	beforeEach(function(){
		require.config({
			baseUrl: "../../../www"
		})
	})

	var QuestSeeder = null;
	var QuestService = null;
	var QuestFactory = null;
	var DBService = null;

	beforeEach(function(done){
		inject([
			"journal-material.Quests.services.QuestFactory",
			"journal-material.Quests.services.QuestService",
			"journal-material.Quests.seed.QuestSeeder",
			"journal-material.service-localdb.DBService",
			function(_QuestFactory, _QuestService, _QuestSeeder, _DBService){
				QuestSeeder = _QuestSeeder;
				expect(QuestSeeder).not.toBeNull();
				QuestService = _QuestService;
				expect(QuestService).not.toBeNull();
				DBService = _DBService;
				expect(DBService).not.toBeNull();
				QuestFactory = _QuestFactory;
				expect(QuestFactory).not.toBeNull();

				localStorage.clear();

				DBService.connect("test-quest-seeding")
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

	it("can seed the database", function(done){
		QuestSeeder.createSet1()
		.then(function(){
			return QuestService.all();
		})
		.then(function(res){
			expect(res).not.toBeNull();
			expect(res.length).toBe(10);
		})
		.finally(done)
		.catch(function(err){ 
			console.log(err.toString());
			done.fail(err);
		})
		;
	})
})