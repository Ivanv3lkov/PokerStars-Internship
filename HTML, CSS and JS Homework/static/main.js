let container = document.querySelector('#container');
let errors = document.querySelector('#error')
let showBtn = document.querySelector('button')

showBtn.addEventListener('click', (e) => {
    function makeEl(type, text) {
        let el = document.createElement(type);
        if (text !== null) {
            el.textContent = text;
        }
        return el;
    }

    e.preventDefault();
    let location = document.querySelector('input').value.trim();

    if (document.querySelector('h2') && location) {
        container.removeChild(document.querySelector('section'));
        document.querySelector('input').style.border = '';
    }

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=27246259aabc1b11ce70b1b84bb09bf4`)
        .then(function (response) {
            errors.textContent = '';
            
            let country = response.data.sys.country;
            let h2 = makeEl('h2', location + `, ${country}`);
            let temp = makeEl('p', `Temperature: ${(response.data.main.temp - 273.15).toFixed(2)}°C`);
            let feelsLike = makeEl('p', `Feels Like: ${(response.data.main.feels_like - 273.15).toFixed(2)}°C`);
            let humidity = makeEl('p', `Humidity: ${response.data.main.humidity}%`);
            let pressure = makeEl('p', `Pressure: ${response.data.main.pressure} hPa`);
            let temp_max = makeEl('p', `Max Temperature: ${(response.data.main.temp_max - 273.15).toFixed(2)}°C`);
            let temp_min = makeEl('p', `Min Temperature: ${(response.data.main.temp_min - 273.15).toFixed(2)}°C`);
            let wind = makeEl('p', `Wind: ${response.data.wind.speed} kmh`);

            let section = makeEl('section');

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
                let p = document.createElement('p');
                p.innerText = 'Sorry, not found.'
                errors.appendChild(p);
            } else {
                document.querySelector('input').style.border = 'solid red';
            }
        })

    document.querySelector('input').value = '';
})