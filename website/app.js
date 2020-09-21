/* Global Variables */
let myURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let my_key = '&appid=56442fbfd81a0c019669306caded57e5&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', getInfo);

function getInfo(event){

  const theZip = document.getElementById('zip').value;
  const user_feeling = document.getElementById('feelings').value;

  getReqWeather(myURL , theZip , my_key)
  .then(function(data){
    postData('/addData', {temp: data.main.temp , date: newDate, user_feeling });
    updateUI();
  });
}

// to make a GET request to the openweathermap API
const getReqWeather = async (myURL , recentZip , my_key)=>{
  const result = await fetch(myURL + recentZip + my_key);
  try {
    const myData = await result.json();
    return myData;
  } catch(error){
    console.log("error", error);
  }
};

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};


const updateUI = async() => {
  const req = await fetch('/all');
  try{
    const allData = await req.json();
    document.getElementById('date').innerHTML = "The Date is: " + allData.date ;
    document.getElementById('temp').innerHTML = "The temprature is: " +  allData.temp ;
    document.getElementById('content').innerHTML ="Feeling : " + allData.user_feeling ;
  } catch(error){
    console.log("error", error);
  }
};
