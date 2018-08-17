$(document).ready(function(){

  var lat, long, temp, celsius, fahrenheit, backgroundImage;
  let currenttime = null,
          date = null;

  let update = function () {
      date = moment(new Date())
      currenttime.html(date.format('h:mm a'));
  };

      currenttime = $('#currenttime')
      update();
      setInterval(update, 1000);


  function getLocation(){
    $.ajax({
    url:'https://geoip-db.com/jsonp',
    jsonpCallback: "callback",
    dataType: 'jsonp',
    success: function(location){
      lat = location.latitude;
      long = location.longitude;
      $('.city').html(location.city);
      $('.state').html(location.state);
      getWeather();
    },
    error: function(error){
      alert(error);
    }
  });
  }
  function getWeather(){
    $.ajax({
      url:'https://fcc-weather-api.glitch.me/api/current?lon=' + long + '&lat=' + lat,
      dataType: 'json',
      success: function(data){
        var temp = data.main.temp;
        celsius = Math.round(temp) + "C°";;
        fahrenheit = Math.round(temp*1.8+32) + "F°";
        backgroundImage = data.weather[0].id;
        $('.iconImage').attr('src', data.weather[0].icon);
        $('.detail').html(data.weather[0].main);
        $('.toggle').html(celsius);
        $('.toggle').attr('val','C');
        renderImage(backgroundImage);
                console.log(backgroundImage);
        $('#currentdate').html(moment().format("dddd, MMMM Do YYYY"));
        $('#currenttime').html(moment().format("h:mm a"));
      },
      error: function(error){
        alert(error + 'error with getWeather');
      }
    });
  }


  function renderImage(){
    let c_i = 0;
    let currentweatherimage;
    function backgroundslides(){
      c_i = (c_i + 1) % currentweatherimage.length;
      $('.b_image').css({'background': 'url(' + currentweatherimage[c_i] + ')'});
    }

    if(backgroundImage >= 200 && backgroundImage <= 232){
      //thunderstorm
      currentweatherimage = ["images/thunderstorm/andreas-fidler-450724-unsplash.jpg","images/thunderstorm/lee-junda-366904-unsplash.jpg"];
    }
    else if(300 <= backgroundImage && backgroundImage <= 531){
      //rain
      currentweatherimage = ["images/rain/john-wilson-1103-unsplash.jpg", "images/rain/reza-shayestehpour-14238-unsplash.jpg"];
    }
    else if(600 <= backgroundImage && backgroundImage <= 622){
      //snow
      currentweatherimage = ["images/snow/olivier-lemieux-537516-unsplash.jpg","images/snow/simon-matzinger-489475-unsplash.jpg"];
    }
    else if(700 <= backgroundImage && backgroundImage <= 781){
      //atmosphere
      currentweatherimage = ["images/atmosphere/chris-leipelt-138817-unsplash.jpg"];
    }
    else{
      //clear
      currentweatherimage = ["http://placehold.it/350x150"]
      //["images/clearday/john-westrock-748984-unsplash.jpg","images/clearday/james-connolly-363041-unsplash.jpg"];
      //if(){}
      if(801 <= backgroundImage && backgroundImage <= 804){
        //clouds
      currentweatherimage = ["images/cloudday/andrew-ruiz-5578-unsplash.jpg","images/cloudday/redd-angelo-269934-unsplash.jpg"];
      }
    }
      backgroundslides();
    setInterval(backgroundslides, 3000);
  }

  setInterval(moment, 60000);

  $('.toggle').on('click', function(){
    if($('.toggle').attr('val')=='C'){
      $('.toggle').html(fahrenheit);
      $('.toggle').attr('val','F');
    }
    else if($('.toggle').attr('val')=='F'){
      $('.toggle').html(celsius);
      $('.toggle').attr('val','C');
    }
  });
  getLocation();
});

//for later
/*
add time and img that goes with it.
sunny credits =
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@jampatcon?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from James Connolly"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">James Connolly</span></a>

Photo by Andrew Ruiz on Unsplash
*/
