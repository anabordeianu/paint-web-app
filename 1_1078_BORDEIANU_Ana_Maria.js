var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");
var painting = document.getElementById("continut");
var paintStyle = getComputedStyle(painting);
canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));

var butonGrosime = document.getElementById("grosime");
var butonCuloare = document.getElementById("culoare");
var butonFundal = document.getElementById("fundal");
var butonLinie = document.getElementById("linie");
var butonDreptunghi = document.getElementById("dreptunghi");
var butonElipsa = document.getElementById("elipsa");
var butonTriunghi = document.getElementById("triunghi");
var butonSalvare = document.getElementById("salvare");
var butonStergere = document.getElementById("stergere");

var mouse = { x: 0, y: 0 }; // pentru a retine coordonatele mouse-ului

// am creat variabile pentru toate butoanele construite in zona de html

butonGrosime.addEventListener("click", function (e) {
  context.lineWidth = document.getElementById("grosime").value;
  // preluam valoarea setata pentru grosimea liniei din controlul vizual
});

butonCuloare.addEventListener("change", function (e) {
  context.strokeStyle = document.getElementById("culoare").value;
  // preluam valoarea setata din cotrolul vizual (codul hexa) si o schimbam
});

butonFundal.addEventListener("change", function (e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = document.getElementById("fundal").value; // preluam valoarea setata din cotrolul vizual (codul hexa)
  context.fillRect(0, 0, canvas.width, canvas.height); // se coloreaza suprafata canvas-ului
});

// desenare linie

butonLinie.addEventListener("click", function (e) {
  //Functia pentru desenare
  desenare = function () {
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
  };

  //Click pentru a porni desenarea
  canvas.addEventListener(
    "mousedown",
    function (e) {
      //desenam in canvas
      context.beginPath();
      context.moveTo(mouse.x, mouse.y);
      canvas.addEventListener("mousemove", desenare, false);
    },
    false
  );

  //Identificare coordonate mouse
  canvas.addEventListener(
    "mousemove",
    function (e) {
      mouse.x = e.pageX - this.getBoundingClientRect().left;
      mouse.y = e.pageY - this.getBoundingClientRect().top;
    },
    false
  );

  //Ridicare click, desenarea se opreste
  canvas.addEventListener(
    "mouseup",
    function () {
      canvas.removeEventListener("mousemove", desenare, false);
    },
    false
  );
});

//desenare dreptunghi

butonDreptunghi.addEventListener("click", function (e) {
  //Functia pentru desenarea dreptunghiului
  desenareDreptunghi = function () {
    context.strokeStyle = "black";
    context.fillRect(mouse.x, mouse.y, mouse.w, mouse.h);
  };

  //Click pentru a porni desenarea
  canvas.addEventListener(
    "mousedown",
    function (e) {
      context.beginPath();
      mouse.x = e.pageX - this.getBoundingClientRect().left;
      mouse.y = e.pageY - this.getBoundingClientRect().top;
      canvas.addEventListener("mousemove", desenareDreptunghi, false);
    },
    false
  );

  //Identificare coordonate mouse
  canvas.addEventListener(
    "mousemove",
    function (e) {
      mouse.w = e.pageX - this.offsetLeft - mouse.x;
      mouse.h = e.pageY - this.offsetTop - mouse.y;
    },
    false
  );

  //Ridicare click, desenarea se opreste
  canvas.addEventListener(
    "mouseup",
    function (e) {
      canvas.removeEventListener("mousemove", desenareDreptunghi, false);
    },
    false
  );
});

//desenare cerc

butonElipsa.addEventListener("click", function (e) {
  //Functia pentru desenare elipsa
  desenareElipsa = function () {
    var cerc = Math.sqrt(
      Math.pow(e.pageX - this.getBoundingClientRect().left, 2) +
        Math.pow(e.pageY - this.getBoundingClientRect().top),
      2
    );
    context.beginPath();
    context.arc(e.pageX, e.pageY, cerc, 0, 2 * Math.PI, false);
    context.stroke();
  };

  //Click pentru a porni desenarea
  canvas.addEventListener(
    "mousedown",
    function (e) {
      context.beginPath();
      mouse.x = e.pageX - this.getBoundingClientRect().left;
      mouse.y = e.pageY - this.getBoundingClientRect().top;
      //context.moveTo(mouse.x, mouse.y);
      canvas.addEventListener("mousemove", desenareElipsa, false);
    },
    false
  );

  //Identificare coordonate mouse
  canvas.addEventListener(
    "mousemove",
    function (e) {
      mouse.x = e.pageX - this.getBoundingClientRect().left;
      mouse.y = e.pageY - this.getBoundingClientRect().top;
    },
    false
  );

  //Ridicare click, desenarea se opreste
  canvas.addEventListener(
    "mouseup",
    function (e) {
      canvas.removeEventListener("mousemove", desenareElipsa, false);
    },
    false
  );
});

butonTriunghi.addEventListener("click", function (e) {
  //Functia pentru desenarea triunghiului
  desenareTriunghi = function () {
    context.moveTo(mouse.x, mouse.y);
    context.lineTo(mouse.y, mouse.x);
    context.lineTo(mouse.x, mouse.x);
    context.closePath();

    context.strokeStyle = "black";
    ctx.stroke();
    context.fillStyle = "black";
    context.fill();
  };

  //Click pentru a porni desenarea
  canvas.addEventListener(
    "mousedown",
    function (e) {
      context.beginPath();
      mouse.x = e.pageX - this.getBoundingClientRect().left;
      mouse.y = e.pageY - this.getBoundingClientRect().top;
      canvas.addEventListener("mousemove", desenareTriunghi, false);
    },
    false
  );

  //Identificare coordonate mouse
  canvas.addEventListener(
    "mousemove",
    function (e) {
      mouse.w = e.pageX - this.offsetLeft - mouse.x;
      mouse.h = e.pageY - this.offsetTop - mouse.y;
    },
    false
  );

  //Ridicare click, desenarea se opreste
  canvas.addEventListener(
    "mouseup",
    function (e) {
      canvas.removeEventListener("mousemove", desenareTriunghi, false);
    },
    false
  );
});

//buton salvare

butonSalvare.addEventListener("click", function () {
  var numeImagine = prompt("Introduceti numele fisierului");
  var canvasDataURL = canvas.toDataURL();
  var a = document.createElement("a");
  a.href = canvasDataURL;
  a.download = numeImagine || "drawing";
  a.click();
});

//buton golire canvas

butonStergere.addEventListener("click", function (e) {
  // Golim suprafata canvas-ului
  context.clearRect(0, 0, canvas.width, canvas.height);
});
