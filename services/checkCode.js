exports.checkCode = (clientCode,localCode) => {
    if(clientCode==localCode)
        return true;
    else 
        return false;
}