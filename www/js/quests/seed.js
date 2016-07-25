angular.module('journal-material.Quests.seed', [])

.service("journal-material.Quests.seed.QuestSeeder", [
	"journal-material.Quests.services.QuestService",
	"journal-material.Quests.services.QuestFactory",
	"journal-material.Quests.services.TaskFactory",
	function(QuestService, QuestFactory, TaskFactory){
		var self = this;

		/** PRIVATE **/
		var faker_loaded = null;
		var EnsureFakerLoaded = function(){
			faker_loaded  = new Promise(function(resolve, reject) {
				requirejs(["lib/faker.min"], 
					function(faker){
						resolve();
					},
					function(err) {
						reject(err);
					}
				)
				;
			})
			;

			return faker_loaded;
		}

		var WithFaker = function(callback) {
			return function() {
				return EnsureFakerLoaded()
				.then(function(){
					return callback();
				})
				.catch(function(err){
					console.log(err);
				})
			}
		}
		/** END: PRIVATE **/

		/** PUBLIC **/
		this.createSet1 = WithFaker(function(){

			var promises = [];

			// 10 quests en estado open
			for(var i = 0; i < 10; i++) {
				var n = QuestFactory._new();
				promises.push(QuestService.save(n));
			}

			return Promise.all(promises);
			
		})
		;
		/** END: PUBLIC **/

		/** INIT **/
		/** END: INIT **/
	}
])

;