Feature: Submit an Image endpoint
  In order to correlate images to emotions 
  An authenticated user must be able to submit images

  Scenario: Happy Path.
    Given I send a PUT request via form to "/images/a554fa96-792c-475d-8b4f-4bf055a6fe79"
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
    Given I send a PUT request to "/images/d9c76966-a514-4245-a53b-347353fa6927" with body:
    """
    {
      "mock":"nhjagshvh"
    }
    """
    Then the response status code should be 415
    Then the response should be empty