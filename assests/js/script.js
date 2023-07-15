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

let total = 1000;
let roundno = 1;
let random;
let score = 0;
coin.innerHTML = total;

function ArtDetail() {
    this.title;
    this.price;
}

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

btnbid.addEventListener("click", function () {
    overlay.style.display = "block";
    random = getRandom();
    place = parseInt(amount.value);
    if (place <= total && roundno < 9) {
        if (place > random) {
            showMessage("won", place);
            setTimeout(function () {
                RemoveDisplay(msgContainer);
            }, 2000);
            setTimeout(function () {
                RemoveDisplay(overlay);
            }, 2000);
            total = changeTotal(total, place);
            score = score + 100;
            roundno++;
        } else {
            score = score + parseInt((place / random) * 10);
            showMessage("soldout", random);
            setTimeout(function () {
                RemoveDisplay(msgContainer);
            }, 2000);
            setTimeout(function () {
                RemoveDisplay(overlay);
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
    }, 2000);
});

btnskip.addEventListener("click", function () {
    if (roundno < 9) {
        arttitle.innerHTML = generatePrompt(prompt1, prompt2);
        roundno++;
        round.innerHTML = roundno;

        showMessage("skip", random);
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
    };

    img.src = document.getElementById("pixelitimg").src;
}

function showMessage(message, value) {
    msgContainer.style.display = "block";
    if (message == "soldout") {
        msgContainer.innerHTML = "Sorry, Sold Out For $<span>" + value + "</span>";
    } else if (message == "won") {
        msgContainer.innerHTML = "You Got It For $<span>" + value + "</span>";
    } else {
        msgContainer.innerHTML = "Skipped, Sold $<span>" + value + "</span>";
    }
}

function RemoveDisplay(model) {
    model.style.display = "none";
}
