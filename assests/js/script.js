let round = document.querySelector(".box-round-no");
let coin = document.querySelector(".box-coin-value");
let download = document.querySelector(".icon-download");
let amount = document.querySelector(".bid-number");
let btnskip = document.querySelector(".btn-skip");
let btnbid = document.querySelector(".btn-bid");
let arttitle = document.querySelector(".pixel-art-title");
let mainImg = document.getElementById("pixelitimg");
let msgContainer = document.querySelector(".sold-container");
let overlay = document.querySelector(".overlay");
let btninfoclose = document.querySelector(".btn-info-close");
let displayinfo = document.querySelector(".display-info");
let displayscore = document.getElementById("score-card");
let resetbtn = document.querySelector('.btn-result-close');

let total = 1000;
let roundno = 1;
let random;
let score = 0;
coin.innerHTML = total;

function ArtDetail(title,price) {
  this.title = title;
  this.price = price;
} 

function Score(score)
{
  this.score = score;
}

let ScoreNum = new Score(0);


let detailScore = [];

prompt1 = [
  "Painting",
  "Sculpture",
  "Photography",
  "Drawing",
  "Printmaking",
  "Collage",
  "Ceramics",
  "Installation",
  "Performance",
  "Mixed media",
  "Textile",
  "Mosaic",
  "Pottery",
  "Film",
  "Architecture",
  "Digital art",
  "Street art",
  "Graphic design",
  "Woodworking",
  "Glassblowing",
];
prompt2 = [
  "Vibrant",
  "Lively",
  "Chromatic",
  "Playful",
  "Rainbow",
  "Whimsical",
  "Bold",
  "Neon",
  "Psychedelic",
  "Nostalgic",
  "Quirky",
  "Glitchy",
  "Arcade-inspired",
  "Groovy",
  "Technicolor",
  "Exuberant",
  "Pop art",
  "Flashy",
  "Kaleidoscopic",
];
unsplah = [
  "Art",
  "Night",
  "light",
  "color",
  "wallpapers",
  "texture",
  "abstact",
  "pattern",
  "architecture",
  "Design",
  "Detail",
  "Geometric",
  "Angles",
  "Vivid",
  "Bright",
  "background",
  "shapes",
  "decorative",
  "cheerful",
  "rainbow",
  "ornament",
  "editorial",
  "painting",
  "sclupture",
  ,
  "watercolor",
  "illustration",
  "oilpainting",
  "symbolism",
  "magic",
  "religion",
  "costume",
];

changeImage();
arttitle.innerHTML = generatePrompt(prompt1, prompt2);

btninfoclose.addEventListener("click", function () {
  displayinfo.classList.add("display-close");
});

btnbid.addEventListener("click", function () {
  overlay.style.display = "block";
  random = getRandom();
  place = parseInt(amount.value);

  if (place <= total && roundno <= 9) {
    if (place > random) {
        let ScoreObj = new ArtDetail(arttitle.innerText,place);
        detailScore.push(ScoreObj);
      showMessage("won", place);

      setTimeout(function () {
        RemoveDisplay(msgContainer);
        overlay.style.display = "none";
      }, 2000);
      total = changeTotal(total, place);
      score = score + 100;
      ScoreNum.score = score;
      roundno++;
    } else {
      score = score + parseInt((place / random) * 10);
      ScoreNum.score = score;
      showMessage("soldout", random);
      setTimeout(function () {
        RemoveDisplay(msgContainer);
        overlay.style.display = "none";
      }, 2000);
      roundno++;
    }

    setTimeout(function () {
      arttitle.innerHTML = generatePrompt(prompt1, prompt2);
      changeImage();
    }, 2000);
  }
  setTimeout(function () {
    round.innerHTML = roundno;
    overlay.style.display = "none";

    if (roundno == 10 || total == 0) {
      round.innerHTML = roundno - 1;
      showScore();
    }


  }, 2000);
});

btnskip.addEventListener("click", function () {
  if (roundno < 9) {
    random = getRandom();
    overlay.style.display = "block";

    arttitle.innerHTML = generatePrompt(prompt1, prompt2);
    roundno++;

    showMessage("skip", random);
    setTimeout(function () {
      RemoveDisplay(msgContainer);
      overlay.style.display = "none";
      changeImage();
      round.innerHTML = roundno;
    }, 2000);
  } else {
    showScore();
  }
});

function changeTotal(total, bidplace) {
  total = total - bidplace;
  coin.innerHTML = total;
  return total;
}

function getRandom() {
  return parseInt(Math.random() * 700 + 50);
}

function generatePrompt(prompt1, prompt2) {
  return (
    prompt2[parseInt(Math.random() * prompt2.length)] +
    " " +
    prompt1[parseInt(Math.random() * prompt1.length)]
  );
}

function changeImage() {
  var img = new Image();
  mainImg.src =
    "https://source.unsplash.com/random/?" +
    unsplah[parseInt(Math.random() * unsplah.length)] +
    "," +
    unsplah[parseInt(Math.random() * unsplah.length)] +
    unsplah[parseInt(Math.random() * unsplah.length)];
  img.onload = function () {
    const px = new pixelit();
    px.draw().pixelate();
    document.getElementById("pixelitimg").style.display = "hidden";
    document.getElementById("pixelitcanvas").style.display = "block";
    btninfoclose.style.width = "100%";
    btninfoclose.style.transform = "scale(1)";
  };
  img.src = document.getElementById("pixelitimg").src;
}

function showMessage(message, value) {
  msgContainer.classList.remove("sold-closed");
  if (message == "soldout") {
    msgContainer.innerHTML = "Sorry, Sold Out For $<span>" + value + "</span>";
  } else if (message == "won") {
    msgContainer.innerHTML = "You Got It For $<span>" + value + "</span>";
  } else {
    msgContainer.innerHTML = "Skipped, Sold $<span>" + value + "</span>";
  }
}

function RemoveDisplay(model) {
  model.classList.add("sold-closed");
}

function showScore() {
  overlay.style.display = "block";
  overlay.style.backgroundColor = "#19182573";
  displayscore.classList.remove("display-close");
  document.querySelector('.display-result-head').innerHTML = `<i class="fa-solid fa-trophy"></i> Your Score : ${ScoreNum.score}`;
  detailScore.map((item)=>{
  document.querySelector('.display-result-tail').insertAdjacentHTML ("afterbegin",`<p><i class="fa-solid fa-bolt"></i> ${item.price} - You Bought ${item.title}</p>`);

})

document.querySelector('.btn-result-close').style.width = "100%";
document.querySelector('.btn-result-close').style.transform = "scale(1)";

}

resetbtn.addEventListener('click', function(){
  overlay.style.display = 'none';
  displayscore.classList.add("display-close");
  changeImage();
  arttitle.innerHTML = generatePrompt(prompt1, prompt2);
  score = 0;
  ScoreNum.score =0;
  roundno = 1;
  round.innerHTML = roundno;
  total = changeTotal(1000,0);
  detailScore.splice(0,detailScore.length);
  overlay.style.backgroundColor = "#19182500";
  removeAllChildNodes(document.querySelector('.display-result-tail'));


})

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
