const max = 5; 
const your_score = localStorage.getItem('your_score');
const player = $(".user");
const current_score = $("#your_score");
current_score.text(your_score);
const button = $("#submit");
let scores = JSON.parse(localStorage.getItem("scores")) || [];

player.on("keyup", function(event){
    if(event.keyCode === 13){ 
        save_score();
    }
    button.prop("disabled", !player.val());
});

button.on("click", function (){
    save_score();
    window.location.href = "highscore.html"; 
});

function save_score(){
    const score = {
        score: your_score,
        player: player.val(),
    };
    scores.push(score);
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, max);
    localStorage.setItem("scores", JSON.stringify(scores));
};
