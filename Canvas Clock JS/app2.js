(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setInterval(renderTime, 40);
    renderTime();
  }
  resizeCanvas();

  function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
  }

  function renderTime() {
    const radius = 200;
    ctx.strokeStyle = '#28d1fa';
    ctx.lineWidth = 17;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#28d1fa';

    var now = new Date();
    var today = now.toDateString(); // returns a string like this one -> Wed Jul 28 1993
    var time = now.toLocaleTimeString();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    var newSeconds = seconds + milliseconds / 1000;

    //   Background
    gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      5,
      canvas.width / 2,
      canvas.height / 2,
      300
    );
    gradient.addColorStop(0, '#09303a');
    gradient.addColorStop(1, 'black');
    ctx.fillStyle = gradient;
    // ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Hours
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius,
      degToRad(270),
      degToRad(hours * 30 - 90)
    );
    ctx.stroke();

    // Minutes
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius - 30,
      degToRad(270),
      degToRad(minutes * 6 - 90)
    );
    ctx.stroke();

    // Seconds
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius - 60,
      degToRad(270),
      degToRad(newSeconds * 6 - 90)
    );
    ctx.stroke();

    // Date
    ctx.font = '25px Arial';
    ctx.fillStyle = '#28d1fa';
    ctx.fillText(today, canvas.width / 2 - 100, canvas.height / 2);

    // Time
    ctx.font = '25px Arial';
    ctx.fillStyle = '#28d1fa';
    ctx.fillText(time, canvas.width / 2 - 50, canvas.height / 2 + 40);

    // Save clock to image
    var dataURL = canvas.toDataURL();

    document.getElementById('myImage').src = dataURL;

    // setInterval(renderTime, 40);
  }
})();
