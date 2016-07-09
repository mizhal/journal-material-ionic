angular.module('journal-material.service-localdb', [])

.service("journal-material.service-localdb.DBService",
[
	function(){
		var self = this;
		
		this.Pouch = new PouchDB("journal-ionic-material");

		this.save = function(object) {
			object.updated_at = new Date();
			return self.Pouch.put(object)
				.then(function(docsum){
					object._rev = docsum.rev;
					return docsum;
				}).catch(function(error){console.log(error);})
		};

		this.saveView = function(object) {
			object.updated_at = new Date();
			return self.Pouch.put(object)
				.then(function(docsum){
					object._rev = docsum.rev;
					return docsum;
				})
		};

		this.get = function(_id){
			return self.Pouch.get(_id).catch(function(error){console.log(error);});
		};

		this.queryView = function(view, options){
			options = options || {};
			return self.Pouch.query(view, options).catch(function(error){console.log(error);});
		}

		this.mapReduce = function(map_reduce){
			return self.Pouch.query(map_reduce).catch(function(error){console.log(error);});
		}

		this.destroy = function(object){
			return self.Pouch.remove(object).catch(function(error){console.log(error);});
		}

		this.checkDBViews = function(views){
			for(var i in views){
				self.saveView(views[i])
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