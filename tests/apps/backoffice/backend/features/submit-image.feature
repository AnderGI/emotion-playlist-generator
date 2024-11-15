Feature: Submit Image endpoint
  In order to correlate images to emotions 
  An authenticated user must be able to submit images

  Scenario: Put a valid image
    Given I send a PUT request to "/images/919f1d78-8caa-4311-bdbf-fbb093685fe6" with body:
    """
    {
      "path":"C:/Users/agiba/OneDrive/Escritorio/REPOS/emotion-playlist-generator/uploads/example.png"
    }
    """
    Then the response status code should be 201
    Then the response should be empty

  Scenario: Put an invaid image
    Given I send a PUT request to "/images/919f1d78-8caa-4311-bdbf-fbb093685fe6" with body:
    """
    {
      "path":55
    }
    """
    Then the response status code should be 422
