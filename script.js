const questions = [
    {
        question:"comment on déclare une variable en javascript",
        reponses:["var x;", "let x;","Toutes les réponses ci-dessus"],
        correcte:2,
    },
    {
        question:"Qui a créé JavaScript ?",
        reponses:["Brendan Eich", "James Gosling", "Guido van Rossum","Bjarne Stroustrup"],
        correcte:0,
    }
];
const quitter=document.getElementById("quitter");
quitter.addEventListener("click",()=>{
    acceuil.style.display="block";
    quiz.style.display="none";
})

const quiz=document.querySelector(".quiz");
const acceuil=document.querySelector(".bouton-acceuil")
const bouton= document.getElementById("commencer");
bouton.addEventListener("click",()=>{
acceuil.style.display="none";
quiz.style.display="block";
})

const reponses= document.querySelector(".reponses");
const question= document.getElementById("question");
let index=0;

function afficherQuestion(){
reponses.innerHTML="";
question.innerHTML=questions[index].question;
questions[index].reponses.forEach((element ,index )=> {
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
}
let reponseValidee = false; 
function verifierReponse(){
    const radios = document.getElementsByName("reponses");
    let valeur;
    for(let i=0;i<radios.length;i++){
        const radio= radios[i];
        const labelContainer= radio.closest(".label-container");
   if(parseInt(radio.value)==questions[index].correcte){
    valeur=true;
    labelContainer.style.border = "2px solid green";
   }else{
    valeur=false;
    labelContainer.style.border = "2px solid red";
   }
    }
    reponseValidee = true;
}
function nextQuestion(){
    if(!reponseValidee){
        alert("Veuillez valider votre réponse avant de passer à la question suivante !");
        return;
    }
    index++;
    reponseValidee = false; 
    if(index<questions.length){
        afficherQuestion();
    }else{
        index=0;
        quiz.style.display="none";
        acceuil.style.display="block";
    }   
}
