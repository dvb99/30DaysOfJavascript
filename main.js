

const personalitiesList = [ 'instructor', 'student', 'mentor' ];

const delays = [12, 4, 8]

// add children to <div class="page-head__ticker">
const ticker = document.getElementById('page-head__ticker');


personalitiesList.forEach((personality,index) => {

    const msg = document.createElement('p');
    msg.classList.add(`msg`);
    

    const span = document.createElement('span');
    span.textContent = personality;
    span.style.animationDelay = `${delays[index]}s`;

    msg.appendChild(span);

    ticker.appendChild(msg);

});




const proglang = ["python", "REact", "Html"]

const proglangText = document.getElementById('techName');

let proglangIndex = 0;

// change the text content of the techName element every 2 seconds

setInterval(() => {
    proglangIndex = (proglangIndex + 1) % proglang.length;
    proglangText.textContent = proglang[proglangIndex];
}, 2000);