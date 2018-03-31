var moment = require('moment')//for timestamp


var generateMessage = (from,text) =>{
    return {
        from,
        text,
        //createdAt: new Date().getTime()
        createdAt: moment.valueOf()
}}

var generateLocation = (from,lat,lng)=>{
    return{
        from,
        url:'https://www.google.com/maps?q='+lat+','+lng,
       // createdAt: new Date().getTime()
        createdAt: moment.valueOf()
    }
}
module.exports = {
    generateMessage,
    generateLocation
}