/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Tokyo', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 13350000, name: 'Tokyo'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, url, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = {};

for (var i = 0; i < 3; i++) {
    var request = requests[i];

    getData(request, callback);
}

function callback(error, request, result) {
        responses[request] = result;
        var l = [];
        for (K in responses) {
            l.push(K);
        }
        if (l.length == 3) {
            var countries = [], cities = [], population = 0;
            for (i = 0; i < responses['/countries'].length; i++) {
                if (responses['/countries'][i].continent === 'Africa') {
                    countries.push(responses['/countries'][i].name);
                }
            }

            for (i = 0; i < responses['/cities'].length; i++) {
                for (j = 0; j < countries.length; j++) {
                    if (responses['/cities'][i].country === countries[j]) {
                        cities.push(responses['/cities'][i].name);
                    }
                }
            }

            for (i = 0; i < responses['/populations'].length; i++) {
                for (j = 0; j < cities.length; j++) {
                    if (responses['/populations'][i].name === cities[j]) {
                        population += responses['/populations'][i].count;
                    }
                }
            }

            console.log('Total population in African cities: ' + population);
            alert('population is '+ cityOrCountry());
        }
    };


/**
 * Берет у пользователя название города или страны; 
 * Назначает метод поиска, используя глобальную переменную responses;
 * Возвращает вычисленную численность населения
 */
var cityOrCountry = function() {
    var entered = window.prompt('Enter city or country to count population');
    for (var i = 0, len = responses['/countries'].length; i < len; i++){
        if (entered == responses['/countries'][i].name) {
            return getCountryPop(entered);
        }
    }
    for (var i = 0, len = responses['/cities'].length; i < len; i++){
        console.log(responses['/cities'][i]);
        if (entered == responses['/cities'][i].name) {
            return getCityPop(entered);
        }
    }
    return 'unknown. City or country not found';
};


/**
 *Возвращает население страны
 @param {string} country
 */
function getCountryPop(country){
    var cities = [];
    var population = 0;

    for (var i = 0, len = responses['/cities'].length; i < len; i++){
        if (responses['/cities'][i].country == country) {
            cities.push(responses['/cities'][i].name);
        }
    }

    for (var c = 0; c < cities.length; c++){
        population += getCityPop(cities[c]);
    }

    return population;
}


/**
 *Возвращает население города
 @param {string} country
 */
function getCityPop(city){
    for (var i = 0, len = responses['/populations'].length; i < len; i++){
        if (responses['/populations'][i].name == city) {
            return responses['/populations'][i].count;  
        }
    }
}





