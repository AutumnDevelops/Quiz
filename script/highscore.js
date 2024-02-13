const scores = $("#score_list");
const score_list = JSON.parse(localStorage.getItem("scores")) || [];

scores.html(score_list.map(score =>{
  return `<li style = "font-size:20px;"><i class="fa-regular fa-star"></i> ${score.player} : ${score.score} <i class="fa-regular fa-star"></i></li>`;
}).join(""));