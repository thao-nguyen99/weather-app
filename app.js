
window.addEventListener('load', function(){
 if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{
   let long=position.coords.longitude;
   let lat=position.coords.latitude;
   let locationTimezone=document.querySelector('.location-timezone');
   let tem_span=document.querySelector('.tem');
   let temDescription=document.querySelector('.tem-description');
   let measure=document.querySelector('.f');
   const degreeSec=document.querySelector('.degree-sec');
   const proxy=`https://cors-anywhere.herokuapp.com/`;
   const api=`${proxy}https://api.darksky.net/forecast/9ea1470dcf21f60a32c366ae2a6e7389/${lat},${long}`;
   fetch(api)
    .then(Response => {
      return Response.json();
    })
    .then(data=>{
      console.log(data);
      let {temperature, summary, icon}=data.currently; 
      tem_span.textContent=temperature;
      temDescription.textContent=summary;
      let location=data.timezone;
      locationTimezone.textContent=location;
      //icon
      let currentIcon=icon.replace(/-/g,"_").toUpperCase();
      let icon_canvas=document.querySelector('.icon');
      var skycons = new Skycons({"color": "pink"});
      //function setIcon(icon_canvas, currentIcon){
      skycons.set(icon_canvas, Skycons[currentIcon]);
      skycons.play();
      //};
      
      
      // fahrenheit to celcius
      degreeSec.addEventListener('click', ()=>{
          if (measure.textContent==='F'){
            let temC=Math.floor((temperature-32)*5/9*100)/100;
            tem_span.textContent=temC;
            measure.textContent="C";
          } else{
            measure.textContent="F";
            tem_span.textContent=temperature;
          };
      });
    });
  });
 }
});

function twoDigits(num){
  if (num<10){
    return ('0'+num);
  } else {
    return num
  }
 
};

function setTime(){
  const time= new Date();
  let hour=document.querySelector('.hour');
  let mins=document.querySelector('.mins');
  let secs=document.querySelector('.secs');
  let date=document.querySelector('.date');
  hour.textContent=twoDigits(time.getHours());
  mins.textContent=twoDigits(time.getMinutes());
  secs.textContent=twoDigits(time.getSeconds());

  var days = new Array(7);
        days[0] = "Sunday";
        days[1] = "Monday";
        days[2] = "Tuesday";
        days[3] = "Wednesday";
        days[4] = "Thursday";
        days[5] = "Friday";
        days[6] = "Saturday";
        var r = days[time.getDay()];
      date.textContent=r;

//fulldate
  const fullDate=document.querySelector('.full-date');
    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
  fullDate.textContent=formatDate(time);
};
setInterval(setTime, 1);

