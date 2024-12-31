Feature: Register User
  Register users into our system
  Generate Spotify User Projection data

  Scenario: Send Put Request To Backoffice api
    Given I send a PUT request to "/spotifyUsers/065f2655-aef3-4b1b-94cb-fddb18f84e7e" with JSON request body:
    """
    {
      "spotifyDisplayName": "blablabla",
      "spotifyUri": "spotify:user:blablabla",
      "spotifyMail":  "blablabla@gmail.com",
      "accessToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.4Tw5AYa9_1QD7EEHh4ZQdqk2jF9P7z4E9VXVoK2MA1o",
      "refreshToken": "dGhpcyBpcyBhIHNhbXBsZSBwcm9kdWNlZCBieSBhIGh1bWFuIG9yIHN5c3RlbSBnZW5lcmF0ZWQgdG9rZW4uIHRoZXJlIGlzIG5vIGFjdHVhbCBzdHJ1Y3R1cmUgaGVyZQ==",
      "productType": "premium",
      "countryCode": "ES",
      "ipAddress": "178.161.152.62" 
    }
    """
    Then the response status code should be 201
    Then the response body should be empty