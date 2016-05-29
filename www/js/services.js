angular.module('journal-material.services', [])

.service("journal-material.services.SortCriteriaEnumService", function(){
	this.Enum = {
		"DATE_ASC": 1,
		"DATE_DESC": 2,
		"NAME_ASC": 3,
		"NAME_DESC": 4,
		"CREATION_ASC": 5,
		"CREATION_DESC": 6,
		"UPDATED_ASC": 7,
		"UPDATED_DESC": 8,
		"LAST_JOURNAL_DESC": 9,
		"LAST_DONE_DESC": 10
	};
})

;