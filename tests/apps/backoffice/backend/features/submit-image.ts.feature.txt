Feature: Submit an Image endpoint
  In order to correlate images to emotions 
  An authenticated user must be able to submit images

  Scenario: Happy Path.
    Given I send a PUT request via form to "/images/4224d249-e721-4f1d-b32b-ce8eefaaf6dc"
    Then the response status code should be 201
    Then the response should be empty

  Scenario: Put request with invalid uuid in request params.
    Given I send a PUT request via form to "/images/45468"
    Then the response status code should be 422
    Then the response should be:
    """
    [
      {
        "id": {
          "location": "body",
          "msg": "Invalid value",
          "param": "id",
          "value": "45468"
        }
      }
    ]
    """


  Scenario: Invalid request content type.
    Given I send a PUT request to "/images/4224d249-e721-4f1d-b32b-ce8eefaaf6dc" with body:
    """
    {
      "mock":"nhjagshvh"
    }
    """
    Then the response status code should be 415
    Then the response should be empty