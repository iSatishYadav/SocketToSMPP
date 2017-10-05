exports.checkUserCredentialsAsync = function (system_id, password, errorCallback) {
    if (typeof(errorCallback) !== "function") {
        throw new Error("The errorCallback parameter must be a function");
    }
    
    if(system_id == "satish", password = "yadav"){
        errorCallback(null);
    }
    else{
        errorCallback("Invalid credentials");
    }         
}