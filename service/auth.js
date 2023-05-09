const sessionIdToUserMap = new Map();

function setValue(key, value){
    sessionIdToUserMap.set(key, value);
}

function getValue(key){
    return sessionIdToUserMap.get(key);
}

module.exports = {
    setValue, getValue
}