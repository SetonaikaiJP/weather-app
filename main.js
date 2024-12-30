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

const tableContainer = getElement('div', 'table-container')

const table = getElement('ul', 'table')

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

tableContainer.append(
  table
)

container.append(
  mainTitle,
  themeSwtitchBtn,
  weatherContainer,
  tableContainer
)

// ------------------------------------------------------------------------

// city?unitGroup=metric&key=AT8BM3QEXYAMZH68R7E36LYTD&contentType=json
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const apiKey = 'AT8BM3QEXYAMZH68R7E36LYTD'

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}?unitGroup=metric&key=${apiKey}&contentType=json`)

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

  table.innerHTML = ''

  var data = await response.json()

  console.log(data)

  // Current Weather
  cityName.textContent = `${data.address.charAt(0).toUpperCase()}${data.address.slice(1)}`
  weatherTemp.textContent = `${Math.ceil(data.currentConditions.temp)}°C`
  weatherHumidity.textContent = `${Math.ceil(data.currentConditions.humidity)}%`
  
  // Next three Days Weather
  function getTableItem(title, temp, humidity) {
    const tableItem = getElement('li', 'table-item')
    const tableItemText = getElement('p', 'table-item-text')
    const tableItemTemp = getElement('p', 'table-item-temp')
    const tableItemHumidity = getElement('p', 'table-item-humidity')
    
    tableItemText.textContent = title
    tableItemTemp.textContent = `${temp} °C`
    tableItemHumidity.textContent = `${humidity} %`
    
    tableItem.append(
      tableItemText,
      tableItemTemp,
      tableItemHumidity
    )
  
    return tableItem
  }
  
  const Days = ['today', 'tomorrow', 'in three days']
  
  for (let i=0; i<Days.length; i++) {
    const tableItem = getTableItem(
      Days[i],
      data.days[i].temp,
      data.days[i].humidity
    )
    table.append(tableItem)
  }

  tableContainer.style.display = 'flex'
  
  // Weather Icon rendering

  if (data.currentConditions.snow > 0) {
    weatherIcon.classList.remove('wi-day-sunny')
    weatherIcon.classList.add('wi-snow')
  }
  
  if (data.currentConditions.temp > 0) {
    weatherTempImg.classList.add('wi-thermometer')
  } else if (data.currentConditions.temp <= 0) {
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

    themeSwtitchBtn.click()
  }
})

app.append(container)