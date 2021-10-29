# TDD in React

## Extra Dependencies
Two extra dependencies have been added to the Typescript create-react-app template.
- `bootstrap` - Allows the addition of bootstrap styling
- `msw` - Mock Service Worker provides a test server that makes it easy to create stubs for integration testing.

To add them to your project, run the commands below:

``` bash
yarn add bootstrap
yarn add -D msw
```

## Story to implement
```
As a marketing team member
I want my audience to be able to provide their names and emails
So that I can contact them with wicked sweet offers.
```

### Acceptance Criteria
- Audience should be able to provide their name and email
- The form should not be submittable if the name contains numbers or special characters.
- The form should not be submittable if the email is not valid.
- The name and email should be sent to '3rd Party Email Service'.
- The contact ID should be displayed after submission.
