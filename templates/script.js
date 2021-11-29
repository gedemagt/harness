

audio = new Audio('/audio/Regnvejrssang.mp4');
audio.loop = true;

let position = {
    e1: 0,
    e2: 60,
    e3: 120,
    e4: 180,
    e5: 240,
    e6: 300,
}


function myMove() {
  let id = null;

  clearInterval(id);
  id = setInterval(frame, 200);
  function frame() {

      let electrons = document.getElementsByClassName("electron");

      for (let i = 0; i < electrons.length; i++) {
          const elem = electrons[i]
          let left = Number(elem.style.left.slice(0, -1));
          let top = Number(elem.style.top.slice(0, -1));

          let dx = Math.random() - 0.5;
          let dy = Math.random() - 0.5;

          let x = top + dx*2;
          let y = left + dy*2;

          elem.style.top = x % 100 + '%';
          elem.style.left = y % 100 + '%';

          attach(elem.id, "What?!");

      }
  }
}

function attach(id, text) {
    // Get the modal
    var modal = document.getElementById("popup");

    // Get the button that opens the modal
    var btn = document.getElementById(id);

    // Get the <span> element that closes the modal
    var modalText = document.getElementById("modalText")
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modalText.innerText = text;
        modal.style.display = "block";
        if(!audio.paused) {
           audio.pause();
        }
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        if(audio.paused) {
           audio.play();
        }
      }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

    myMove();
    if(audio.paused) {
       audio.play();
    }

    attach("battery", "Klimaforandringerne er over os, og mens jorden smelter skal vi hastigt finde nye og bæredygtige energikilder. Fremtiden inden for klimapolitik er vedvarende energikilder som vindenergi, solenergi, bølgeenergi og vandkraft. Vi har lært at høste vejrets energi ved hjælp af blandt andet solceller og vindmøller, men vi har endnu ikke fundet effektive måder at opbevare det på. For hvad gør vi når vinden ikke blæser? Når solen ikke skinner? Når bølgerne ikke går højt? Ja, når vejret er imod os? I værket Harness the weather tematiseres menneskets forsøg på at putte vejrfænomener på batterier. Batterier er fremtiden hvis vi skal leve med vedvarende energikilder. Men hvordan får man energien fra vejret sat i stilstand? Dette værk undersøger absurditeten i menneskehedens forsøg på at tøjle vejret.");

});




