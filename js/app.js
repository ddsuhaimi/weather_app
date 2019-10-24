let cityName;

let cityInputForm = document.querySelector(".city-input");
let btnGo = document.querySelector(".btn-go");
let temp = document.querySelector(".temperature-value");
let city = document.querySelector(".city-name");
let imageOfCity;
let sectionLeftDOM = document.querySelector('.section-left');
let jsonData;
const KEY = '{YOUR_OPENWEATHERMAP_API_KEY_HERE}'
const PIXA_KEY = '{YOUR_PIXABAY_API_KEY_HERE}'
const BASE = 'https://api.openweathermap.org/data/2.5/weather?q='
const PIXA_BASE = `https://pixabay.com/api/?key=${PIXA_KEY}&`
console.log(PIXA_BASE);

btnGo.addEventListener('click', () =>{
  if (cityInputForm.value != ""){
    cityName = cityInputForm.value;

    // request the data
    getData(cityName);

    changeBackground(cityName);
  }
})

function changeBackground(cityName){
  url_request = PIXA_BASE + 'q=' + cityName + '&per_page=3&image_type=photo';
  console.log('ba')
  fetch(url_request).then(function(resp){
    return resp.json();
  }).then(function(data){
    jsonData = data;
    imageOfCity = jsonData.hits[0].webformatURL;
    imageOfCityBig = jsonData.hits[0].largeImageURL;
    console.log(jsonData);
    sectionLeftDOM.style.backgroundImage = `url(${imageOfCity})`;
    // document.body.style.backgroundImage = `url(${imageOfCityBig})`;
  });
};

cityInputForm.addEventListener('keyup', (e)=>{
  if (e.keyCode == 13){
    cityName = cityInputForm.value;

    // request the data
    getData(cityName);

    changeBackground(cityName);
  }
});

function getData(cityName) {
  url_request = BASE + cityName + '&appid=' + KEY + '&units=metric';
  fetch(url_request).then(function(resp){
    return resp.json();
  }).then(function(data){
    jsonData = data;
    showWeather(jsonData);
  });
}

function showWeather(jsonData){
  temp.innerHTML = jsonData.main.temp + '<span class="temperature-symbol">&#8451;</span>';
  city.innerHTML = cityName;
}
