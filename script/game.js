const question = $("#question");
const choices = $(".answer_text");
const score_counter = $("#score");
const question_counter = $("#question_number");
const timer = $("#countdown");
const api = "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple";


let add_score = 1;
let max_questions = 10;
let score = 0;
let counter = 0;
let seconds = 0;
let correct_answer = false;
let interval;
let question_database;
let currentQuestion;

function start_game(){
  counter = 0;
  score = 0;
  question_database = currentQuestion.slice();
      next_question();
};

$.ajax({
  url: api,
  method: "GET",
    }).done(function (loadedQuestions){
      currentQuestion = loadedQuestions.results.map((loadedQuestion) =>{
      let new_question ={
      question: loadedQuestion.question,
    };
      let answerChoices = [...loadedQuestion.incorrect_answers];
        new_question.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
        new_question.answer - 1, 0,loadedQuestion.correct_answer
    );
        answerChoices.forEach((choice, index) => {
        new_question["choice" + (index + 1)] = choice;
      });
        return new_question;
  });
  start_game();
});

function next_question(){
  counter++;
  seconds = 10;
  interval = setInterval(countdown, 1000);
    if (counter >= max_questions) {
       return window.location.assign("end.html");
    };

  function countdown(){
    if (seconds == 0) {
      clearInterval(interval);
      next_question();
    }else{
      seconds--;
      timer.html(`${seconds}/10`);
    }};
  score_counter.text(`${score}/${max_questions}`);
  question_counter.text(`${counter}/${max_questions}`);
  const question_index = Math.floor(Math.random() * question_database.length);
  currentQuestion = question_database[question_index];
  question.html(currentQuestion.question);

  choices.each(function(){
    const number = $(this).data("number");
    $(this).html(currentQuestion["choice" + number]);
  });

  question_database.splice(question_index, 1);
  correct_answer = true;
}

choices.click(function(e) {
  if (!correct_answer) return;
  clearInterval(interval);
  correct_answer = false;
  const selected_choice = $(e.target);
  const selected_answer = selected_choice.data("number");

  let class_to_apply = "incorrect";
  if (selected_answer == currentQuestion.answer) {
    class_to_apply = "correct";
  };

  selected_choice.addClass(class_to_apply);

  if (class_to_apply == "correct"){
    increment_Score(add_score);
    clearInterval(interval);
  };

  function increment_Score(num){
    score += num;
    score_counter.text(`${score}/${max_questions}`);
  };

  localStorage.setItem("your_score", score);

  setTimeout(function (){
    selected_choice.removeClass(class_to_apply);
    next_question();
  }, 1000)});

start_game();