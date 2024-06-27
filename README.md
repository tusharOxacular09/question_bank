## Question and Voting API

# Introduction

This project provides a simple API to create questions with multiple options, vote for these options, and manage the questions and options. It's an open application, meaning no authentication or user identity is required.

# Features

- Create a Question: You can add as many questions as you want.
- Add Options to a Question: Each question can have multiple options.
- Add a Vote to an Option: Vote for any option of a question.
- Delete a Question: (Optional) A question can't be deleted if one of its options has votes.
- Delete an Option: (Optional) An option can't be deleted if it has even one vote.
- View a Question: Retrieve a question with its options and all the votes given to it.
  Usages
- This API is designed to allow users to create and manage questions and their options, as well as to vote on these options.

# Steps to Setup Locally

1. Clone the Repository:

- git clone git@github.com:tusharOxacular09/question_bank.git
- cd question_bank

2. Install Dependencies:

- npm install

3. Set Up Environment Variables:

- Create a .env file in the root of the project and add the following variables:
- MONGO_URI=your_mongodb_connection_string
- PORT=your_preferred_port

4. Start the Server:

- npm start

# Test the Endpoints:

Use a tool like Postman or curl to test the endpoints.

1. Create a Question

- Endpoint: POST /questions/create
- Description: Create a new question.
- Request Body:
  {
  "question": "Your question text here?"
  }

2. Add Options to a Question

- Endpoint: POST /questions/:id/options/create
- Description: Add options to a question.
  Request Body:
  {
  "options": [
  {
  "text": "Option 1",
  },
  {
  "text": "Option 2",
  }
  ]
  }

3. Add a Vote to an Option

- Endpoint: GET /options/:questionId/:optionId/add_vote
- Description: Add a vote to an option of a question.

4. View a Question

- Endpoint: GET /questions/:id
- Description: View a question with its options and all the votes given to it.

5. Delete a Question

- Endpoint: DELETE /questions/:id/delete
- Description: Delete a question. A question can't be deleted if one of its options has votes.

6. Delete an Option

- Endpoint: DELETE /options/:questionId/:optionId/delete
- Description: Delete an option. An option can't be deleted if it has even one vote.

## Conclusion

This Question and Voting API is a simple yet powerful tool for creating, managing, and voting on questions and their options. It can serve as a foundation for more complex applications, or as a standalone solution for quick surveys and polls. Contributions and feedback are welcome to help improve and extend the functionality of this project. Happy coding!
