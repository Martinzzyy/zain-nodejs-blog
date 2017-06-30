module.exports = function(state,msg){
    return JSON.stringify({
        state:state,
        content:msg
    });
}