angular.module('journal-material.services', [])

.service("journal-material.services.SortCriteriaService", function(){
		var self = this;

		this.Enum = {
			DATE_DESC: "DATE_DESC",
			DATE_ASC: "DATE_ASC",
			NAME_DESC: "NAME_DESC",
			NAME_ASC: "NAME_ASC",
			LAST_JOURNAL_DESC: "LAST_JOURNAL_DESC",
			UPDATED_DESC: "UPDATED_DESC"
		}
		
		this.prepareSortParams = function(_id, sort_criteria, sort_criteria_params){
			var params_lambda = sort_criteria_params[sort_criteria];
			if(params_lambda)
				return params_lambda(_id)
			else 
				throw "sort criterium " + sort_criteria + " not supported";
		}
})

.service("journal-material.services.UUIDService", 
[
	function(){
		var self = this;

		self.SALT = "5iuHO5DP0ygXYvXLCvM-A0@fN0Bs-Bpwr9-(2Tzb";

		/*** Attribution: http://codepen.io/Jvsierra/pen/BNbEjW ***/
		this.generate = function () {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return [s4() + s4(), 
		  	s4(), s4(), s4(), 
		    s4() + s4() + s4()];
		}

		this.longUuid = function(){
			var parts = self.generate();
			return parts.join("-");
		}

		/**
			Long UUIDs are presented as base-16 (hex) encoded integers, thus tend to 
			be long an unmanageable as references (for example for copying in a 
			paper notebook). If we re-encode the integer using an alphabet with more
			characters, we could obtain a shorter string. Hashids library encodes
			integers using an alphabet of 62 characters (thus base-62) as we wanted.
			
			The process has no collisions (two long uuids generating the same short
			uuid), because it is only a translation and not a hashing function.  
		**/
		this.shortUuid = function(long_uuid){
			var parts = long_uuid.split("-");
			var integer = parseInt(parts.join(""), 16);

			var hashids = new Hashids(self.SALT, 0, "0123456789abcdef");

			return hashids.encode(integer);
		}
	}
])

.service("journal-material.services.HasTimestampFactory", 
[
	"journal-material.services.UUIDService",
	function(UUIDService){
		this.interfaces = ["HasTimestamp", "UUID"];
		this._new = function(){
			var uuid = UUIDService.longUuid()
			return {
				uuid: uuid,
				shortUuid: UUIDService.shortUuid(uuid),
				created_at: (new Date()).toISOString(),
				updated_at: (new Date()).toISOString()
			};
		}
	}
])

;