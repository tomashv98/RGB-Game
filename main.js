const newGame = document.querySelector(".new__colors");

const colorCtrl = (function () {
    function randomColor () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return `rgb(${r}, ${g}, ${b})`
};
return {
    generateRandomColors: (num) => {
        const arr = [];
        // Add random
        for (let i = 0; i < num; i++){
            arr.push(randomColor())
        }
        //Return
        return arr;
    },
    pickColor: (colorArr) => {
        const corNum = Math.floor(Math.random()* colorArr.length);
        return corNum
    }
}
})();

const UICtrl = (function () {
    var DOMStrings = {
        message: document.querySelector("#message"),
        h1: document.querySelector("h1"),
        easy: document.querySelector(".easy"),
        hard: document.querySelector(".hard"),
        title: document.querySelector(".title"),
        newGame: document.querySelector(".new__colors"),
        answer:document.querySelector(".answer"),
        container: document.querySelector(".container"),
        easy: document.querySelector("#easy"),
        hard: document.querySelector("#hard")
       
    }
    const box = `<div class="square"></div>`;
    return {
        clearColor: function () {
            DOMStrings.title.style.background = "#232323"
        },
        changeColor: function (colorArr, corNum) {
            document.querySelectorAll(".square").forEach((el) => {
                // Add color to squares
                el.style.background = colorArr[corNum];
        })},
        displaySquares: function (colorArr, num) {
            // Create square according to num of difficulty
            for(let i = 0; i < num; i++) {
                DOMStrings.container.insertAdjacentHTML("beforeend", box);
            }
            document.querySelectorAll(".square").forEach((el, i) => {
                // Add colors to squares
                el.style.background = colorArr[i]
            })
        },
        getDOMStrings: () => {
            return DOMStrings
        } 
    }
})();

const controller = (function (UICtrl, colorCtrl) {
    const DOM = UICtrl.getDOMStrings();

    

    const easyMode = function () {
        DOM.easy.classList.add("selected");
        DOM.hard.classList.remove("selected");
       
        createBoxes()
    };

    const hardMode = function () {
        DOM.easy.classList.remove("selected");
        DOM.hard.classList.add("selected");
     
        createBoxes()

    }
    const setDifficulty = function () {
            if (DOM.easy.className === "selected") {
                return 3
            } else if (DOM.hard.className === "selected"){
                return 6
            }
    };
    
    const deleteBlackBox = function (el) {
        el.classList.remove("blackbox")
    };
    const setUpEventListener = function (colorArr, correctAnswer) {
        document.querySelectorAll(".square").forEach((el) => {    
        // Add eventlistener to squares
        DOM.easy.addEventListener("click", easyMode);
        DOM.hard.addEventListener("click", hardMode);
        el.addEventListener("click", () => {
            const clicked = el.style.background;

            if (colorArr.indexOf(clicked) === correctAnswer){
                message.textContent = "You won";
                // Change color of title to correct answer
                UICtrl.changeColor(colorArr,correctAnswer);
                DOM.title.style.background = colorArr[correctAnswer];
                // Cant remove because wrong boxes need to change color when winning
                document.querySelectorAll(".blackbox").forEach(deleteBlackBox);
                DOM.newGame.textContent = "Play Again?";             
            } else {
                // Chagne wrong square to black
                el.classList.add("blackbox"); 
                message.textContent = "Try again!";
            }
        })
    });
};

    const createBoxes = function () {
        const prevBox = document.querySelectorAll(".square");
         if (prevBox) {
             prevBox.forEach((el) => {
                 el.parentElement.removeChild(el);
             })
         }
         // 2. Clear color arrays
         let colors = []

         // 3. Clear UI color
         UICtrl.clearColor()
         // 4. Clear play again
         DOM.newGame.textContent = "New Color"; 
         // 5. Set diff
         const difficulty = setDifficulty()
         // 6. New rgb array per difficulty
         colors = colorCtrl.generateRandomColors(difficulty);
         // New correct answer return a number in array
         const correctanswer = colorCtrl.pickColor(colors);
         // Display new questions
         DOM.answer.textContent = colors[correctanswer];
         // Display new squares colors
         UICtrl.displaySquares(colors, difficulty);
         // Setup event listener
         setUpEventListener(colors, correctanswer);       
    }
// change wrong answer to black box
// when picked right answer change them back to correct color
// remove all boxes when click new game
return {
     init: function () {

        createBoxes();
         
     }
     
}
})(UICtrl, colorCtrl);

controller.init();

newGame.addEventListener("click", controller.init)

