/* Global Variables */
const apiKey = '9567b56fa8e3da4bf2d12137cddba73f&units=imperial'



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// generateBtn
const generate = document.getElementById('generate');


generate.addEventListener('click', (e)=>{

    e.preventDefault();

    //get user input
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const url =` https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apiKey} `;

        getWeatherData(url)
            .then((data)=> {
                // add data to POST request
                postData('/add', { temp:data.main.temp, date: newDate, content: content });
            }).then(()=> {
                // call getData to update browser content
                getData()
            }).catch((err)=> {
                console.log(err);
            });  
});



/* Function to GET Web API Data*/
const getWeatherData = async(url) => {
    // res equals to the result of fetch function
    const res = await fetch(url);
    // data equals to the result of fetch function
    const data = await res.json();
    return data;
    
};


/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const getData = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        // update new entry values
        
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round( allData.temp) + ' degree ';
        document.getElementById('content').innerHTML = allData.content;
        
    } catch (error) {
        console.log('error', error);
    }
};

