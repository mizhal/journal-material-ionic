angular.module('journal-material.Quests.services', [])

.service("journal-material.Quests.services.QuestService", function(){

	var statuses_names = {
		"OPEN": "Abiertas", 
		"FOCUS": "Foco", 
		"BLOCKED": "En espera", 
		"SCHEDULED": "En calendario", 
		"CANCELLED": "Canceladas", 
		"FAILED": "Fallidas", 
		"DONE": "Completas"
	};

	/** private **/
	/** END: private **/

	/** public **/
	this.TranslateStatus = function(status){
		return statuses_names[status];
	}

	/** END: public **/
})

;