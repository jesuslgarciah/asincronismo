const XMLHTTPRequest = require('xmlhttprequest').XMLHttpRequest;
const URL_API = 'https://rickandmortyapi.com/api/character/'

function fecthData(url_api, callback){
    const xhttp = new XMLHTTPRequest()
    //          peticion, url, true or false asincronismo
    xhttp.open('GET', url_api, true)
    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){
            if(xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText))
            }else{
                const error = new Error(`Error ${url_api}`)
                return callback(error, null)
            }
        }
    }
    xhttp.send()
}

fecthData(URL_API, function(error1, data1){
    if(error1) return console.error(error1)
        
    fecthData(URL_API + data1.results[0].id, function(error2, data2){
        if (error2) return console.error(error2)

        fecthData(data2.origin.url, function(error3, data3){
            if (error3) return console.error(error3)

            console.log(data1.info.count)
            console.log(data2.name)
            console.log(data3.dimension)
        })
    })
})