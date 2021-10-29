# TDD in React

## Dependencies to add
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