Feature: projects-scopes
	As journal user
	I want to set high level containers for quests, tasks and efforts
	So I can keep context of each quest and task
	And navigate through smaller lists of quests and tasks when managing the journal

	Scenario: Create project / scope
		Given I am logged in 
		When I create a new project with name
		Then the project must appear in project listings
		And a new hashtag will be created for the project to allow referencing
		And a new global unique identifier will be assigned to the project to enable external tracking

	Scenario: Delete project / scope (hard delete)
		Given I am logged in
		And I have created at least one project
		When I select some project for deletion
		And the project I have chosen doesn't have any dependent quest, task or enclosure
		And I confirm deletion
		Then the project is completely removed from the system
		And it can't be recovered any way

	Scenario: Delete project / scope rejection (hard delete)
		Given I am logged in
		And I have created at least one project
		When I select some project for deletion
		And the project I have chosen has some dependent quest, task or enclosures
		Then the API notifies deletion error
		And the project remains untouched

	Scenario: Archive project / scope (sort of soft delete)
		Given I am logged in
		And I have created at least one project
		And the project I select is in a finished status
		When I select that project
		And I choose to archive that project
		Then the project status is set to archived status
		And the project must record the time and date of archiving
		And the project won't be shown in common lists and searches
		And the project cannot be selected for actions other than "unarchive"
		And the project status and resources cannot be updated
		And the change of project status is recorded as a new entry in General Log / Journal

	Scenario: Archive project / scope rejection
		Given I am logged in
		And I have created at least one project
		And the project I select is not in a finished status
		When I select that project
		And I choose to archive that project
		Then the API notifies archiving error
		And the project remains untouched

	Scenario: Update project / scope
		Given I am logged in
		And I have created at least one project
		When I select a project
		And I update some of its data
		And I save the changes
		Then the project must record the time and date of change
		And the project must appear in listings with its data updated
		And the detail of the project must reflect the changes as well
	
	Scenario: Focus on project
		Given I am logged in
		And I have created at least one project
		When I select a project
		And I choose action focus
		Then the current user filter is overriden by a new filter for this project 
		And all listings of quests, tasks and enclosures will show only elements related with the project I have selected.

	Scenario: Remove focus on project
		Given I am logged in
		And I have put a project on focus
		And I choose remove project focus
		Then the current user filter is removed
		And all listings will show unfiltered
