function makeElement(type, text) {
    let element = document.createElement(type);
    if (text !== null) {
        element.textContent = text;
    }
    return element;
}

const container = document.querySelector('#container');
const errorContainer = document.querySelector('#errorContainer');
const showBtn = document.querySelector('#showBtn');

showBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let location = document.querySelector('input').value.trim();

    if (document.querySelector('h2') && location) {
        container.removeChild(document.querySelector('section'));
        document.querySelector('input').style.border = '';
    }

    if (isNaN(location) && location !== undefined) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=37c689d8c93066153ad764c1c8ca9a0d`)
            .then(function (response) {
                errorContainer.textContent = '';

                let country = response.data.sys.country;
                let h2 = makeElement('h2', location + `, ${country}`);
                let temp = makeElement('p', `Temperature: ${(response.data.main.temp - 273.15).toFixed(2)}°C`);
                let feelsLike = makeElement('p', `Feels Like: ${(response.data.main.feels_like - 273.15).toFixed(2)}°C`);
                let humidity = makeElement('p', `Humidity: ${response.data.main.humidity}%`);
                let pressure = makeElement('p', `Pressure: ${response.data.main.pressure} hPa`);
                let temp_max = makeElement('p', `Max Temperature: ${(response.data.main.temp_max - 273.15).toFixed(2)}°C`);
                let temp_min = makeElement('p', `Min Temperature: ${(response.data.main.temp_min - 273.15).toFixed(2)}°C`);
                let wind = makeElement('p', `Wind: ${response.data.wind.speed} kmh`);

                let section = makeElement('section');

                section.appendChild(h2);
                section.appendChild(temp);
                section.appendChild(feelsLike);
                section.appendChild(humidity);
                section.appendChild(pressure);
                section.appendChild(temp_max);
                section.appendChild(temp_min);
                section.appendChild(wind);
                container.appendChild(section);
            }).catch(function () {
                if (location) {
                    let p = makeElement('p', 'Sorry, not found.');
                    errorContainer.appendChild(p);
                } else {
                    document.querySelector('input').style.border = 'solid red';
                }
            })

        document.querySelector('input').value = '';
        document.querySelector('input').style.border = '';
    } else {
        if (location) {
            let p = makeElement('p', 'Please enter location, not numbers!');
            errorContainer.appendChild(p);
            document.querySelector('input').style.border = '';
        } else {
            document.querySelector('input').style.border = 'solid red';
        }
    }
    document.querySelector('input').value = '';
});