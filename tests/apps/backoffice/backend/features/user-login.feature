Feature: Register User
  Register users into our system
  Generate Spotify User Projection data

  Scenario: User LogIn. Happy Path.
    Given I send a POST request to "/spotify-users" with JSON request body:
    """
    {
      "spotifyId": "1234567890",
      "spotifyEmail": "randomuser@example.com",
      "spotifyDisplayName": "RandomUser123",
      "country": "US",
      "refreshToken": "dGhpcyBpcyBhIHNhbXBsZSBwcm9kdWNlZCBieSBhIHJlc2ZyZXNoIHRva2VuLg=="
    }
    """
    Then the response status code should be 201
    Then the response body should be empty
  
  Scenario: User LogIn. Bad Request. Not A JSON 
    Given I send a POST request to "/spotify-users" with JSON request body:
    """
    {
      "spotifyId": false,
      "spotifyEmail": "randomuser@example.com",
      "spotifyDisplayName": "RandomUser123",
      "country": 1234,
      "refreshToken": "dGhpcyBpcyBhIHNhbXBsZSBwcm9kdWNlZCBieSBhIHJlc2ZyZXNoIHRva2VuLg=="
    }
    """
    Then the response status code should be 400
    Then the response body should be empty

  Scenario: User LogIn. Bad Request. Not A JSON 
    Given I send a POST request to "/spotify-users" with JSON request body:
    """
    {
      "spotifyEmail": "randomuser@example.com",
      "spotifyDisplayName": "RandomUser123"
    }
    """
    Then the response status code should be 400
    Then the response body should be empty