// Requiring modules
const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
 
// Token obtained from bot father
const token = '5845307983:AAGgscFizRR7huwDjqyBmXn0Fblcb2deaKE'
 
let bot = new TelegramBot(token, { polling: true });
 
// Create a bot that uses 'polling' to
// fetch new updates
bot.on("polling_error", (err) => console.log(err));
 
// The 'msg' is the received Message from user and
// 'match' is the result of execution above
// on the text content
bot.onText(/\/city (.+)/, function (msg, match) {
 
    // Getting the name of movie from the message
    // sent to bot
    let city = match[1];
    let chatId = msg.chat.id
    let query =
'http://api.openweathermap.org/data/2.5/weather?q='
        + city + '&appid=b382290b179ebedf22fb0e06bed5d5e0'
    // let iconcode = a.weather[0].icon;
    // let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
 
    // Key obtained from openweathermap API
    request(query, function (error, response, body) {
 
        if (!error && response.statusCode == 200) {
 
            bot.sendMessage(chatId,
                '_Fetching data for_ ' + city
                + '...', { parse_mode: "Markdown" })
                .then(msg) ; {
                res = JSON.parse(body)
                var temp = Math.round((parseInt(
                    res.main.temp_min) - 273.15), 2)
 
                // Kelvin to celsius and then round
                // off and conversion to atm
                var pressure = Math.round(parseInt(
                        res.main.pressure) - 1013.15)
 
                var rise = new Date(parseInt(
                        res.sys.sunrise) * 1000);
 
                var set = new Date(parseInt(
                        res.sys.sunset) * 1000);
                // Unix time to IST time conversion
                
                

                bot.sendMessage(chatId, '**** '
                    + res.name + ' ****\nTemperature: '
                    + String(temp) + '°C\nHumidity: ' +
                    res.main.humidity + ' %\nWeather: '
                    + res.weather[0].description +
                    '\nPressure: ' + String(pressure)
                    + ' atm\nSunrise: ' +
                    rise.toLocaleTimeString() +
                    ' \nSunset: ' +
                    set.toLocaleTimeString() +
                    '\nCountry: ' + res.sys.country)
            }
 
            // Sending back the response from
            // the bot to user. The response
            // has many other details also
            // which can be used or sent as
            // per requirement
        }
    })
})