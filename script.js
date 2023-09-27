const questions = [
{
  question: "Choose the correct HTML element for the largest heading:",
  answers: ["<heading>", "<head>", "<h1>", "<h6>"],
  correct: 3,
},
{
  question: "In HTML, which attribute is used to specify that an input field must be filled out?",
  answers: ["placeholder", "required", "formvalidate", "validate"],
  correct: 1,
},
{
  question: "What does CSS stand for?",
  answers: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"],
  correct: 0,
  },
// Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const feedbackContainer = document.getElementById("feedback");
const scoreContainer = document.getElementById("score");
const timerContainer = document.getElementById("timer");
const submitButton = document.getElementById("submit-button");

function displayQuestion() {
const currentQuestion = questions[currentQuestionIndex];
questionContainer.textContent = currentQuestion.question;
answersContainer.innerHTML = "";

currentQuestion.answers.forEach((answer, index) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "answer";
  input.value = index;
  answersContainer.appendChild(input);

  const label = document.createElement("label");
  label.textContent = answer;
  answersContainer.appendChild(label);
});
}

function submitAnswer() {
const selectedAnswer = parseInt(document.querySelector("input[name='answer']:checked").value);

if (selectedAnswer === questions[currentQuestionIndex].correct) {
  score++;
  feedbackContainer.textContent = "Correct!";
} else {
  feedbackContainer.textContent = "Incorrect!";
}

currentQuestionIndex++;
if (currentQuestionIndex < questions.length) {
  displayQuestion();
} else {
  endQuiz();
}
}

function endQuiz() {
quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} out of ${questions.length}</p>`;
timerContainer.style.display = "none";
submitButton.disabled = true;
submitButton.textContent = "Quiz Completed";
}

function startTimer(timeLimit) {
let timeLeft = timeLimit;
const timerInterval = setInterval(() => {
  timerContainer.textContent = timeLeft;
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timerInterval);
    feedbackContainer.textContent = "Time's up!";
    submitButton.disabled = true;
    submitButton.textContent = "Next";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
}, 1000);
}

displayQuestion();
startTimer(15); // Set the time limit for each question (in seconds)