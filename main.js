const app = document.querySelector('#app')

function getElement(HTMLTag, className) {
  const element = document.createElement(HTMLTag)
  element.classList.add(className)

  return element
}

const container = getElement('div', 'container')

const mainTitle = getElement('h1','main-title')
mainTitle.textContent = 'Weather App'

const themeSwtitchBtn = getElement('button', 'theme-swtich-btn')
themeSwtitchBtn.textContent = 'Dark Mode'

const link = getElement('button','link')
link.textContent = 'Tap'

const weatherContainer = getElement('div', 'weather-container')

const cityName = getElement('h2', 'city-name')
const weatherIcon = getElement('i', 'weather-icon')
const weatherTemp = getElement('p','weather-temp')
const weatherHumidity = getElement('p','weather-humidity')
const infoBox = getElement('div','info-box')
const input = getElement('input', 'input')

const errorLabel = getElement('p','error')
const btn = getElement('button', 'btn')
btn.textContent = 'Search'
input.type = 'text'

cityName.textContent = 'CITY NAME'
weatherIcon.classList.add('wi', 'wi-day-sunny')
weatherTemp.textContent = '28°C'
weatherHumidity.textContent = '60%'
input.placeholder = 'Enter City'
input.maxLength = 20

const weatherTempDiv = getElement('div', 'weather-temp-div')
const weatherHumidityDiv = getElement('div', 'weather-humidity-div')
const weatherTempImg = getElement('i', 'weather-temp-img')
const weatherHumidityImg = getElement('i', 'weather-humidity-img')

weatherTempImg.classList.add('wi', 'wi-thermometer')

weatherTempDiv.append(
  weatherTempImg,
  weatherTemp
)

weatherHumidityDiv.append(
  weatherHumidity
)

infoBox.append(
  weatherTempDiv,
  weatherHumidityDiv
)

weatherContainer.append(
  cityName,
  weatherIcon,
  infoBox,
  input,
  errorLabel,
  btn
)

container.append(
  mainTitle,
  themeSwtitchBtn,
  weatherContainer
)

// ------------------------------------------------------------------------

const apiKey = '2e37d33f36113619f7f1c23c2b99a0a6'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

  if (response.status === 404) {
    errorLabel.style.display = 'block'
    errorLabel.textContent = 'City not found'
  } else if (response.status === 200) {
    errorLabel.style.display = 'none'
  }

  if (input.value === '') {
    errorLabel.style.display = 'block'
    errorLabel.textContent = 'Enter a city'
  }

  var data = await response.json()

  console.log(data)

  cityName.textContent = data.name
  weatherTemp.textContent = `${Math.floor(data.main.temp)}°C`
  weatherHumidity.textContent = `${data.main.humidity}%`

  switch (data.weather[0].main) {
    case 'Clear': {
      weatherIcon.classList.add('wi','wi-day-sunny')
    } break
    case 'Clouds': {
      weatherIcon.classList.add('wi','wi-day-cloudy')
    } break
    case 'Rain': {
      weatherIcon.classList.add('wi','wi-day-rain')
    } break
    case 'Fog': {
      weatherIcon.classList.add('wi','wi-day-fog')
    } break
    case 'Snow': {
      weatherIcon.classList.add('wi','wi-day-snow')
    } break
    case 'Thunderstorm': {
      weatherIcon.classList.add('wi','wi-day-thunderstorm')
    } break
    default: {
      weatherIcon.classList.add('wi','wi-horizon-alt')
    } break
  }
  
  if (data.main.temp > 0) {
    weatherTempImg.classList.add('wi-thermometer')
  } else if (data.main.temp <= 0) {
    weatherTempImg.classList.add('wi-thermometer-exterior')
  }
}

let themeState = 'light'
themeSwtitchBtn.addEventListener('click', () => {
  if (themeState === 'light') {
    themeState = 'dark'
    themeSwtitchBtn.textContent = 'Light Mode'
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.904)'
    mainTitle.style.color = 'white'
    weatherContainer.classList.add('dark-container')
  } else if (themeState === 'dark') {
    themeState = 'light'
    themeSwtitchBtn.textContent = 'Dark Mode'
    container.style.backgroundColor = 'rgba(145, 140, 180, 0.904)'
    mainTitle.style.color = 'black'
    weatherContainer.classList.remove('dark-container')
  }
})

btn.addEventListener('click', () => {
  input.innerHTML = ``
  checkWeather(input.value)
})

input.addEventListener('keypress', (e) => {

  if (e.key === 'Enter') {
    checkWeather(input.value)

    btn.click()
  }
})

app.append(container)