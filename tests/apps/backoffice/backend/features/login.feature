Feature: Authentication flow with no user logged in cookies or session

  Scenario: User visits the root endpoint 
    Given I send a GET request to "/"
    Then the response status should be 302
    Then the response headers location should include "/auth"
    
  Scenario: User visits the /auth endpoint 
    Given I send a GET request to "/auth"
    Then the response status should be 302
    Then the response headers location should include "https://accounts.spotify.com/authorize?"