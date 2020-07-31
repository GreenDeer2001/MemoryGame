const startGameBtn = document.getElementById("start-game-btn");
const list = document.querySelectorAll(".single-element")
const elements = document.getElementById("elements");
const imgs = document.querySelectorAll("ul img");
const body = document.querySelector("body");

let firstChosse = "";
let secondChoose = "";


function setDefaultImg() {
    imgs.forEach(img => img.src = 'images/questionMark.png')
}



function initGame() {

    setDefaultImg();
    reset();
    goToMatch = false;

    const suffedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    suffedList.sort(function (a, b) { return 0.5 - Math.random() })

    for (let i = 0; i < 12; i++) {
        list[i].dataset.imgUrl = `images/cat${Math.ceil((suffedList[i] / 2))}.jpg`
        list[i].style.pointerEvents = 'initial'
    }


    console.log("Game Initialized")


}

function isValid(arg1, arg2) {
    const src1 = arg1.querySelector("img").src;
    const src2 = arg2.querySelector("img").src;
    if (src1 === src2) {
        reset();
    } else {
        setTimeout(notValidHandler, 2000)
        function notValidHandler() {
            list[arg1.id - 1].style.pointerEvents = "auto";
            list[arg2.id - 1].style.pointerEvents = "auto";
            list[arg1.id - 1].firstElementChild.src = "images/questionMark.png";
            list[arg2.id - 1].firstElementChild.src = "images/questionMark.png";
            reset();

        }
    }
}
function reset() {
    firstChosse = "";
    secondChoose = "";
    body.style.pointerEvents = "initial"
}

async function gameEngine(arg1, arg2) {


    body.style.pointerEvents = "none";
    isValid(arg1, arg2);


};



elements.addEventListener("click", (event) => {
    if (firstChosse === "" || secondChoose === "") {
        const elem = event.target;
        elem.closest("li").style.pointerEvents = "none";
        elem.src = elem.closest("li").dataset.imgUrl;


        elem.closest('li').style.transition = '1s linear 0s'

        elem.closest('li').style.transform = "rotateY(180deg)" + elem.closest('li').style.transform;






        if (firstChosse === "") {
            firstChosse = elem.closest("li");
        } else {
            secondChoose = elem.closest("li");
            console.log(firstChosse, secondChoose);
            gameEngine(firstChosse, secondChoose);
        }
    } else {
        return
    }
})


startGameBtn.addEventListener("click", initGame);
initGame();