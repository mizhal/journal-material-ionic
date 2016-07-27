Feature: Log in
	As a service user
	I want to log into the service
	So I can access and update my journal
	
	Scenario: Common login
		Given I have registered myself with the API
		When I provide correct credentials
		Then the API welcomes me

	Scenario: Wrong login
		Given I have registered myself with the API
		When I provide wrong credentials
		Then the API gives an error message

	Scenario: Unknown login
		Given I never have registered an account with the API
		When I provide some credentials
		Then the API gives an error message

	Scenario: Register 
		Given My credentials are not registered yet
		When I register with new credentials
		Then the API notifies I am successfully registered

	Scenario: Already registered
		Given my credentials are registered in the system
		When I register with the same credentials
		Then the API gives an error message

	Scenario: Forgotten password
		Given I have registered myself with the API
		When I have forgotten my credentials
		And I request the API to recover my account
		Then the API provides an alternative method to recover credentials by means of another service account owned by me
