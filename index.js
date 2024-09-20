


/* Card Game start */
let gameBoxArray = [
    {
        id: 1,
        img: "./assets/card1.png",
        bImg: "./assets/main.png"
    },
    {
        id: 4,
        img: "./assets/card4.png",
        bImg: "./assets/main.png"
    },
    {
        id: 5,
        img: "./assets/card5.png",
        bImg: "./assets/main.png"
    },
    {
        id: 3,
        img: "./assets/card3.png",
        bImg: "./assets/main.png"
    },
    {
        id: 2,
        img: "./assets/card2.png",
        bImg: "./assets/main.png"
    },
    {
        id: 5,
        img: "./assets/card5.png",
        bImg: "./assets/main.png"
    },
    {
        id: 2,
        img: "./assets/card2.png",
        bImg: "./assets/main.png"
    },
    {
        id: 1,
        img: "./assets/card1.png",
        bImg: "./assets/main.png"
    },
    {
        id: 3,
        img: "./assets/card3.png",
        bImg: "./assets/main.png"
    },
    {
        id: 4,
        img: "./assets/card4.png",
        bImg: "./assets/main.png"
    },
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledGameBoxArray = shuffleArray(gameBoxArray);



const boxCards = document.querySelector(".boxCards");


function gameCard(array) {


    let seconds = 0;
let minutes = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
   
    document.getElementById('timer').textContent = 
      (minutes < 10 ? "0" + minutes : minutes) + ":" + 
      (seconds < 10 ? "0" + seconds : seconds);
  }, 1000); 
}

startTimer()
    const lol = new Audio('./audio/Disgruntled Gramophone - QuickSounds.com.mp3');
    const success = new Audio('./audio/Long Chime Sound - QuickSounds.com.mp3');
    const finis = new Audio('./audio/Wish You Merry Christmas - QuickSounds.com.mp3');
    const resetSound = new Audio('./audio/rest.mp3');
    array.forEach(function (item) {

        boxCards.innerHTML += `
        <div  class="card">
        <div class="card-inner">
            <div class="card-front">
                <img id=${item.id} src="${item.bImg}" alt="Ön Yüz">
            </div>
            <div class="card-back">
                <img   src="${item.img}" alt="Arka Yüz">
            </div>
        </div>
    </div>
        `
    })

    function resetTimer() {
        clearInterval(timerInterval);
        seconds = 0;
        minutes = 0;
        document.getElementById('timer').textContent = "00:00";
      }
    
    let idArray = [];
    let life = 0;
    const cardInner = document.querySelectorAll(".card-inner");
    const h2 = document.querySelector("h2");
    const reset = document.querySelector(".reset");
    h2.innerHTML = life;
    const allCard = document.querySelectorAll(".card")
        .forEach((card, i) => card.addEventListener("click", (e) => {
            const id = Number(e.target.id);
            cardInner[i].style.transform = "rotateY(180deg)";
          
            id !== 0 && idArray.push(e.target.id);
            if (idArray.length > 1) {
                cardInner.forEach(item =>console.log(item.style.transform) )
                
                if (idArray[0] === idArray[1]) {
                    success.play();
                    cardInner.forEach(item => {
                        if(item.style.transform == "rotateY(180deg)"){
                            item.style.transform = "rotateY(181deg)"
                            setTimeout(()=>{
                                item.style.opacity = "0";
                            },1000)
                        }

                        if([...cardInner].every(item =>item.style.transform === "rotateY(181deg)")){
                            finis.play();
                            setTimeout(()=>{
                                resetTimer();
                               location.reload();
                            },5000)

                        }
                        
                        
                    })
                    console.log("beraberdi");
                    idArray = []
                } else {
                    lol.play();
                    life++;
                    h2.innerHTML = life;
                    idArray = [];
                    setTimeout(() => {
                        cardInner.forEach(item => {
                            if(item.style.transform !== "rotateY(181deg)"){
                                item.style.transform = "rotateY(0deg)"
                            }
                        })
                    }, 700)
                }

            }
        }));

        reset.addEventListener("click",()=>{
            cardInner.forEach(item => item.style.transform = "rotateY(0deg)")
            resetSound.play();
            life = 0;
            h2.innerHTML = life;
            resetTimer();
            startTimer();
        })

}

gameCard(gameBoxArray)





/* 

const allBox = document.querySelectorAll(".box");

allBox.forEach((box) => {

    box.addEventListener("click", () => {
        allBox.forEach((box) => {
            box.style.backgroundColor = "";
        })
        if (box.nextElementSibling)
            box.nextElementSibling.style.backgroundColor = "red";
        console.log(box.nextElementSibling);

        if (box.nextElementSibling === null) {
            allBox[0].style.backgroundColor = "red";
        }
    })
})



function createCard(frontImg, backImg) {
    return `
    <div class="card">
        <div class="card-inner">
            <div class="card-front">
                <img src="${frontImg}" alt="Ön Yüz">
            </div>
            <div class="card-back">
                <img src="${backImg}" alt="Arka Yüz">
            </div>
        </div>
    </div>`;
}


function createBox(cards, boxClass) {
    let boxContent = `<div class="${boxClass}">`;
    cards.forEach(card => {
        boxContent += createCard(card.bImg, card.img);
    });
    boxContent += '</div>';
    return boxContent;
}

const boxCards = document.querySelector(".boxCards");

function gameCards(array) {
    let htmlContent = "";
    const boxCard = [
        { bImg: 'assets/main.png', img: 'assets/card2.png' }
    ];
   
    htmlContent = createBox(boxCard, 'box1');
    
    

    
    const box2Cards = [
        { bImg: 'assets/main.png', img: 'assets/card2.png' },
        { bImg: 'assets/main.png', img: 'assets/card1.png' }
    ];
    htmlContent += createBox(box2Cards, 'box2');


    const box3Cards = [
        { bImg: 'assets/main.png', img: 'assets/card1.png' },
        { bImg: 'assets/main.png', img: 'assets/card1.png' },
        { bImg: 'assets/main.png', img: 'assets/card1.png' },
        { bImg: 'assets/main.png', img: 'assets/card1.png' }
    ];
    htmlContent += createBox(box3Cards, 'box3');

   
    htmlContent += createBox(box2Cards, 'box2');

    
    htmlContent += createCard('assets/main.png', 'assets/card1.png');

    boxCards.innerHTML = htmlContent;
}

gameCards(gameBoxArray);
 */