/** @format */
// let canvas = document.getElementById(`canvas`);
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// var c = canvas.getContext(`2d`);

// // create circle

// function Circle(x, y, dx, dy, radius) {
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.dy = dy;
//   this.radius = radius;
//   this.draw = function () {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.strokeStyle = `white`;
//     c.stroke();
//     c.fillStyle = `gray`;
//     c.fill();
//   };

//   this.update = function () {
//     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//       this.dx = -this.dx;
//     }

//     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//       this.dy = -this.dy;
//     }

//     this.x += this.dx;
//     this.y += this.dy;
//     this.draw();
//   };
// }

// var circleArray = [];

// for (let i = 0; i < 200; i++) {
//   var x = Math.random() * (innerWidth - radius * 2) + radius;
//   var y = Math.random() * (innerHeight - radius * 2) + radius;
//   var dx = Math.random() - 0.5;
//   var dy = Math.random() - 0.5;
//   var radius = 1;

//   circleArray.push(new Circle(x, y, dx, dy, radius));
// }

// var circle = new Circle(200, 200, 3, 3, 30);

// function animate() {
//   requestAnimationFrame(animate);

//   c.clearRect(0, 0, innerWidth, innerHeight);

//   for (var i = 0; i < circleArray.length; i++) {
//     circleArray[i].update();
//   }
// }
// animate();

// window.addEventListener("resize", function () {
//   canvas.style.width = window.innerWidth;
//   canvas.style.height = window.innerHeight;
//   window.location.reload();
// });

// drop down ul

let sideBarUlCategory = document.querySelector(`.sideBarUlCategory`);

let categoryLi = document.querySelectorAll(`.categoryLi`);

let sideBarUlLocation = document.querySelector(`.sideBarUlLocation`);

let locationLi = document.querySelectorAll(`.locationLi`);

sideBarUlCategory.addEventListener(`click`, e => {
  categoryLi.forEach(elm => {
    // elm.classList.toggle(`display`);
    elm.classList.toggle(`displayNone`);
    elm.classList.toggle(`display`);

    // console.log(categoryLi);
  });
});

sideBarUlLocation.addEventListener(`click`, e => {
  locationLi.forEach(elm => {
    // elm.classList.toggle(`display`);
    elm.classList.toggle(`displayNone`);
    elm.classList.toggle(`display`);

    // console.log(categoryLi);
  });
});
