

audio = new Audio('/audio/Regnvejrssang.mp4');
audio.loop = true;
audio.muted = false;



function myMove() {
  let id = null;

  clearInterval(id);
  id = setInterval(frame, 200);
  function frame() {

      let electrons = document.getElementsByClassName("electron");
      for (let i = 0; i < content.length; i++) {

          const elem = electrons[i]
          let left = Number(elem.style.left.slice(0, -1));
          let top = Number(elem.style.top.slice(0, -1));

          bbox = boundingBoxes[i]
          _left = bbox[0]
          _right = bbox[1]
          _up = bbox[2]
          _down = bbox[3]

          let dx = Math.random() - 0.5;
          let dy = Math.random() - 0.5;

          let y = top + dy*2;
          let x = left + dx*2;

          if(x <= _left) {x = x - dx*3;}
          if(y <= _up) {y = y - dy*3;}

          if(x >= _right) {x = x - dx*3;}
          if(y >= _down) {y = y - dy*3;}

          elem.style.top = y + '%';
          elem.style.left = x + '%';

          attach(elem.id, content[i]);

      }
  }
}

function attach(id, text) {
    // Get the modal
    var modal = document.getElementById("popup");
    var electron = document.getElementById(id);
    // electron.innerText = id;

    // Get the button that opens the modal
    var btn = document.getElementById(id);

    // Get the <span> element that closes the modal
    var modalText = document.getElementById("modalText");
    // var modalAuthor = document.getElementById("modalAuthor");
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modalText.innerHTML = text;
        // modalAuthor.innerText = text.author;
        modal.style.display = "block";
        if(!audio.paused) {
           audio.pause();
        }
        electron.style.color = "white";
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


content = getContent();
boundingBoxes = new Array(content.length)


size = 5

function initializeBoundingBoxes() {

    let aspect = screen.height / screen.width;

    let electrons = document.getElementsByClassName("electron");

      for (let i = 0; i < electrons.length; i++) {

          const elem = electrons[i]
          let left = Number(elem.style.left.slice(0, -1));
          let top = Number(elem.style.top.slice(0, -1));

          boundingBoxes[i] = [
              Math.max(left - size * aspect, 10),
              Math.min(left + size * aspect, 90),
              Math.max(top - size, 10),
              Math.min(top + size, 90)
          ]
      }
}

document.addEventListener("DOMContentLoaded", function(event) {


    initializeBoundingBoxes();
    myMove();
    audio.play();
    attach("battery", "Klimaforandringerne er over os, og mens jorden smelter skal vi hastigt finde nye og b??redygtige energikilder. Fremtiden inden for klimapolitik er vedvarende energikilder som vindenergi, solenergi, b??lgeenergi og vandkraft. Vi har l??rt at h??ste vejrets energi ved hj??lp af blandt andet solceller og vindm??ller, men vi har endnu ikke fundet effektive m??der at opbevare det p??. For hvad g??r vi n??r vinden ikke bl??ser? N??r solen ikke skinner? N??r b??lgerne ikke g??r h??jt? Ja, n??r vejret er imod os? I v??rket <i>Harness the weather</i> tematiseres menneskets fors??g p?? at putte vejrf??nomener p?? batterier. Batterier er fremtiden hvis vi skal leve med vedvarende energikilder. Men hvordan f??r man energien fra vejret sat i stilstand? Dette v??rk unders??ger absurditeten i menneskehedens fors??g p?? at t??jle vejret.");
});

function getContent()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/content", false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}




