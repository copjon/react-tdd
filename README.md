# TDD in React

# Overview
[from Martin Fowler](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

Test-Driven Development (TDD) is a technique for building software that guides software development by writing tests. It was developed by Kent Beck in the late 1990's as part of Extreme Programming. In essence you follow three simple steps repeatedly:

Write a test for the next bit of functionality you want to add.
Write the functional code until the test passes.
Refactor both new and old code to make it well structured.
You continue cycling through these three steps, one test at a time, building up the functionality of the system. Writing the test first, what XPE2 calls Test-First Programming, provides two main benefits. Most obviously it's a way to get SelfTestingCode, since you can only write some functional code in response to making a test pass. The second benefit is that thinking about the test first forces you to think about the interface to the code first. This focus on interface and how you use a class helps you separate interface from implementation.

## Lesson
This lesson will provide an opportunity to practice TDD by providing a basic user story to work on.

### Getting Started
There are two npm projects in this repository. The `/empty-project` directory provides a blank create-react-app project with a few extra dependencies installed to practice the exercise bellow. The `/complete` directory provides a completed solution to review. To get started with either project first run `yarn install` and then `yarn test` to kick off the jest test runner.

#### A quick note on the setup of this project
Two extra dependencies have been added to the Typescript create-react-app template.
- `bootstrap` - Allows the addition of bootstrap styling.
- `msw` - Mock Service Worker provides a test server that makes it easy to create stubs for integration testing.

The blank project was created by running the following commands:

``` bash
yarn create react-app [empty-project] --template Typescript
yarn add bootstrap
yarn add -D msw
```

### React Testing Library
`@testing-library/react` is provided out of the box from the create-react-app template. It collects many tools to help React developers write unit tests around their components. Before you get started, take some time to familiarize yourself with it's utilities by reviewing the [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/). It also helpful to review one of the testing-libraries core testing tools: [Jest](https://jestjs.io/docs/getting-started).

## Excercise
Practice your TDD skills by implementing the story below.
```
As a marketing team member
I want my audience to be able to provide their names and emails
So that I can contact them with wicked sweet offers.
```

#### Acceptance Criteria
- Audience should be able to provide their name and email
- The form should not be submittable if the name contains numbers or special characters.
- The form should not be submittable if the email is not valid.
- The name and email should be sent to '3rd Party Email Service'.
- The contact ID should be displayed after submission.
