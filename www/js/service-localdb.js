angular.module('journal-material.service-localdb', [])

.service("journal-material.service-localdb.DBService",
[
	"$q",
	function($q){
		var self = this;
		
		this.Pouch = new PouchDB("journal-ionic-material");

		this.save = function(object) {
			object.updated_at = new Date();
			return self.Pouch.put(object)
				.then(function(docsum){
					object._rev = docsum.rev;
					return docsum;
				});
		};

		this.get = function(_id){
			return self.Pouch.get(_id);
		};

		this.queryView = function(view, options){
			options = options || {};
			return self.Pouch.query(view, options);
		}

		this.mapReduce = function(map_reduce){
			return self.Pouch.query(map_reduce);
		}

		this.destroy = function(object){
			return self.Pouch.remove(object);
		}

		this.checkDBViews = function(views){
			for(var i in views){
				self.save(views[i])
					.catch(function(error){
						if(error.name != "conflict")
						{
							console.log(error);
						} // else: conflict means view already exists
					});
			}
		}
	}
])

;