const weatherForm = document.querySelector('form')
const inputValue = document.querySelector('input')
const view1 = document.querySelector('#view1')
const view2 = document.querySelector('#view2')

weatherForm.addEventListener('submit',(e)=>{
    //we use this to stop the browser his default action at submit action at forms that is refresh
    e.preventDefault()
    const location = inputValue.value
    getWeatherData(location)
})

function getWeatherData(location) {
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{//getting data from response with json format
        if(data.error){
            view2.textContent = data.error
            view1.textContent = ''
        }else{
            view1.textContent = "Location: " + data.location + '.'
            view2.textContent = "Temperature: " + data.temperature +'C.'
        }
        
    })
})
}