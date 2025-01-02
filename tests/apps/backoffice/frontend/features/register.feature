Feature: Register Page
  When a user interacts with the aplication
  It should be rendered with a registering page if no JWT is found
  If so it should redirect to /register
  If JWT is found it should be redirected to dashboard

  Scenario: Check the register page redirection when no JWT is found
    Given I send a GET request to "/"
    Then the response status code should be 302
    Then user should be redirected to "/register"

  Scenario: Check the register page redirection when JWT is found
    Given I send a GET request to "/" with a jwt cookie appended "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    Then the response status code should be 302
    Then user should be redirected to "/dashboard"
  
  Scenario: Check the register page rendering when no JWT is found
    Given I send a GET request to "/register"
    Then the response status code should be 200
    Then the response header "content-type" should be "text/html; charset=utf-8"
    Then the response text should contain "<h1>Log in Page</h1>"
    Then the response text should contain '<form action="/login" method="get">'
    Then the response text should contain '<button>Log in with spotify</button>'