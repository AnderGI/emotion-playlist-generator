Feature: Register User
  Register users into our system
  Generate Spotify User Projection data

  Scenario: User LogIn. Happy Path.
    Given I send a PUT request to "/spotify-users/9ed3e1f7-36b6-4546-94f7-3d354e4ad8fb" with JSON request body:
    """
    {
      "spotify_id": "1234567890",
      "spotify_email": "randomuser@example.com",
      "spotify_display_name": "RandomUser123",
      "spotify_product": "premium",
      "spotify_uri": "spotify:user:1234567890",
      "spotify_type": "user",
      "country": "US",
      "refresh_token": "dGhpcyBpcyBhIHNhbXBsZSBwcm9kdWNlZCBieSBhIHJlc2ZyZXNoIHRva2VuLg=="
    }
    """
    Then the response status code should be 201
    Then the response body should be empty
  
  Scenario: User LogIn. Bad Request. Not A Valid UUid
    Given I send a PUT request to "/spotify-users/545615478489165478" with JSON request body:
    """
    {
      "spotify_id": "1234567890",
      "spotify_email": "randomuser@example.com",
      "spotify_display_name": "RandomUser123",
      "spotify_product": "premium",
      "spotify_uri": "spotify:user:1234567890",
      "spotify_type": "user",
      "country": "US",
      "refresh_token": "dGhpcyBpcyBhIHNhbXBsZSBwcm9kdWNlZCBieSBhIHJlc2ZyZXNoIHRva2VuLg=="
    }
    """
    Then the response status code should be 400
    Then the response body should be empty

  Scenario: User LogIn. Bad Request. Not a valid json format
    Given I send a PUT request to "/spotify-users/9ed3e1f7-36b6-4546-94f7-3d354e4ad8fb" with JSON request body:
    """
    {
      "spotify_id": 14562,
      "spotify_email": "randomuser@example.com",
      "spotify_display_name": true,
      "spotify_product": 4895,
      "spotify_uri": "spotify:user:1234567890",
      "spotify_type": false,
      "country": "US",
      "refresh_token": "dGhpcyBpcyBhIHNhbXBsZSBwcm9kdWNlZCBieSBhIHJlc2ZyZXNoIHRva2VuLg=="
    }
    """
    Then the response status code should be 400
    Then the response body should be empty