const questions = [
    {
        question: "comment on déclare une variable en javascript",
        reponses: ["var x;", "let x;", "Toutes les réponses ci-dessus"],
        correcte: 2,
        theme: "javascript",
    },
    {
        question: "comment on déclare une constante en javascript",
        reponses: ["const x;", "let x;", "Toutes les réponses ci-dessus"],
        correcte: 1,
        theme: "javascript",
        time: 10,
    },
    {
        question: "Qui a créé JavaScript ?",
        reponses: ["Brendan Eich", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"],
        correcte: 0,
        theme: "html",
    },
    {
        question: "Qui a créé css ?",
        reponses: ["Brendan Eich", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"],
        correcte: 0,
        theme: "css",
    }
];
const themesDiv = document.getElementById("themes");
const quiz = document.querySelector(".quiz");
const acceuil = document.querySelector(".bouton-acceuil")
const bouton = document.getElementById("commencer");
const quitter = document.getElementById("quitter");
const themebutons = document.querySelectorAll(".theme-btn");
const controlButtons = document.querySelector(".controlButtons");

const reponses = document.querySelector(".reponses");
const question = document.getElementById("question");
let index = 0;

const valider = document.getElementById("valider");
const suivant = document.getElementById("suivant");
const retour = document.getElementById("retour");

const pseudobutton = document.getElementById("pseudobutton");
const pseudoname = document.getElementById("pseudoname");

let questionsFilter = [];
let indice = 0;

const timerDisplay = document.querySelector(".timer");
let tempsrestant;

function choisirQuestion(theme) {
    questionsFilter = [];
    indice = 0;
    questions.forEach((question) => {
        if (question.theme === theme) {
            questionsFilter.push(question);
        }

    })
    if (questionsFilter.length > 0) {
        afficherQuestion();
        themesDiv.style.display = "none";
        quiz.style.display = "block";
        controlButtons.style.display = "flex";
        suivant.style.display = "block";
        retour.style.display = "block";
        valider.style.display = "block";

    } else {
        alert("pas de quiz encore!")
    }
}
// console.log(themebutons);
themebutons.forEach(btn => {
    btn.addEventListener("click", () => {
        const themeChoisie = btn.dataset.theme;
        // console.log(themeChoisie);
        choisirQuestion(themeChoisie);

    })

})

quitter.addEventListener("click", () => {
    const pseudo = document.querySelector(".pseudo");
    acceuil.style.display = "block";
    quiz.style.display = "none";
    themesDiv.style.display = "none";
    controlButtons.style.display = "none";
    quitterDiv.style.display = "none";
    pseudo.style.display = "none";

    questionsFilter = [];
    index = 0;
})
bouton.addEventListener("click", () => {
    acceuil.style.display = "none";
    // quiz.style.display = "block";
})
const username = document.getElementById("username");
let pseudonameValue = localStorage.getItem("pseudoname");
username.innerHTML = `bonjour ${pseudonameValue}`;
let timer
function startTimer() {
    tempsrestant =questionsFilter[index].time || 15;
    const timerDisplay  = document.getElementById("timer");
    timer = setInterval(() => {
        tempsrestant--;
        timerDisplay.textContent = tempsrestant;
          if (tempsrestant == 0) {
            clearInterval(timer);
            alert("Temps écoulé ! La réponse est considérée comme fausse.");
            userAnswers[index] = null;
            reponseValidee = true;
            nextQuestion();
        }
    }, 1000);

}

function afficherQuestion() {
    reponses.innerHTML = "";
    question.innerHTML = questionsFilter[index].question;
    timerDisplay.style.display = "block";
    questionsFilter[index].reponses.forEach((element, index) => {
        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container");
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "reponses";
        radio.value = index;
        label.appendChild(radio);
        const text = document.createTextNode(element);
        label.appendChild(text);
        reponses.appendChild(document.createElement("br"));
        labelContainer.appendChild(label);
        reponses.appendChild(labelContainer);
    });
    startTimer();
}

let userAnswers = [];
let reponseValidee = false;
function verifierReponse() {
    let valeur;
    let userChoice = null;
    const radios = document.getElementsByName("reponses");
    for (let i = 0; i < radios.length; i++) {
        const radio = radios[i];
        const labelContainer = radio.closest(".label-container");
        if (radio.checked) {
            userChoice = parseInt(radio.value);
            // userChoice = radio.nextSibling.textContent; 
        }
        if (parseInt(radio.value) == questionsFilter[index].correcte) {
            valeur = true;
            labelContainer.style.border = "2px solid green";
        } else {
            valeur = false;
            labelContainer.style.border = "2px solid red";
        }
    }
    timerDisplay.style.display = "block";
    userAnswers[index] = userChoice;
    console.log(userAnswers);
    reponseValidee = true;
    clearInterval(timer);
}
function nextQuestion() {
    if (!reponseValidee) {
        alert("Veuillez valider votre réponse avant de passer à la question suivante !");
        return;
    }
    index++;
    reponseValidee = false;
    if (index < questionsFilter.length) {
        afficherQuestion();
    } else {
        let score = 0;
        for (let i = 0; i < questionsFilter.length; i++) {
            if (userAnswers[i] === questionsFilter[i].correcte) {
                score++;
            }
        }
        const result = {
            pseudo: localStorage.getItem("pseudoname"),
            theme: questionsFilter[0]?.theme || "unknown",
            score: score,
            Responses: userAnswers,
            date: new Date().toLocaleString()
        };

        let results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));
        alert(`Bravo ${result.pseudo} ! Votre score est ${score} / ${questionsFilter.length}`);
        index = 0;
        userAnswers = [];
        quiz.style.display = "none";
        controlButtons.style.display = "none";
        quitterDiv.style.display = "none";
        acceuil.style.display = "block";
    }
}


// function pseudo() {
//     const pseudo = document.querySelector(".pseudo");
//     quiz.style.display = "none";
//     pseudo.style.display = "block";
//     suivant.style.display = "none";
//     retour.style.display = "none";
//     valider.style.display = "none";

// }
const quitterDiv = document.querySelector(".quitter");

function pseudo() {
    const pseudo = document.querySelector(".pseudo");
    acceuil.style.display = "none";
    quiz.style.display = "none";
    themesDiv.style.display = "none";


    pseudo.style.display = "block";
    quitterDiv.style.display = "block";
    suivant.style.display = "none";
    retour.style.display = "none";

    valider.style.display = "none";
    quitter.style.display = "block";
}

function envoyerPseudo() {
    const pseudo = document.querySelector(".pseudo");
    let pseudonameValue = pseudoname.value
    localStorage.setItem("pseudoname", pseudonameValue);
    // afficherQuestion();
    // pseudobutton.style.display="none";
    // pseudoname.style.display="none";
    //   suivant.style.display="block";
    //   retour.style.display="block";
    //   valider.style.display="block"
    pseudo.style.display = "none";
    themesDiv.style.display = "block";
}

