import React, { useState } from "react";

const Admin = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [subject, setSubject] = useState("");

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      question,
      options,
      correctAnswer,
      subject,
    };

    fetch("http://localhost:8085/questions/addQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response from the server
        console.log(responseData);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    // Reset the form
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setSubject("");
  };

  return (
    <div>
      <h1>Main Component</h1>

      <form onSubmit={handleSubmit}>
        <div className="question-input">
          <label>Question:</label>
          <input type="text" value={question} onChange={handleQuestionChange} />
        </div>

        <div className="options-input">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              type="text"
              key={index}
              value={option}
              onChange={(event) => handleOptionChange(event, index)}
            />
          ))}
        </div>

        <div className="correct-answer-input">
          <label>Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={handleCorrectAnswerChange}
          />
        </div>

        <div className="subject-input">
          <label>Subject:</label>
          <input type="text" value={subject} onChange={handleSubjectChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;
