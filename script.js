//======LOCAL STORAGE UPPGIFTER=======
//placeholder uppgifter
const username = "aaa";
const password = "123";

//============
//EJ INLOGGAD:
//============ 

//Skapa logIN fält i header
function notLoggedIn() {
    //===Användar namn fält
    let usernameInputField = document.createElement("input");
        usernameInputField.placeholder = "Användarnamn";

    //===Lösenord fält
    let passwordInputField = document.createElement("input");
        passwordInputField.placeholder = "Lösenord";
        passwordInputField.type = "password";

    //===Login knapp
    let loginButton = document.createElement("button");
        loginButton.innerText = "Logga In";
    document.getElementById("logInlogOut").append(usernameInputField, passwordInputField, loginButton);

    //Fånga upp användar uppgifter med click
    loginButton.addEventListener("click", () => {
        let usernameInput = usernameInputField.value
        let passwordInput = passwordInputField.value

        //Om rätt uppgifter byt vy till INLOGGAD
        if(usernameInput == username && passwordInput == password) {
            usernameInputField.remove();
            passwordInputField.remove();
            loginButton.remove();
            LoggedIn();

        //Om fel uppgifter byt vy till FEL INLOGGNING    
        } else {
            wrongLogin();
        }
    })
};
notLoggedIn();


//Main - Uppmana användaren att logga in, registrerings fält
 

        //Fånga upp användar uppgifter med click

            //Hämta local storage uppgifter

            //Ändra uppgifterna - lägg till ny användare

            //Spara uppgifterna

            //Bekräfta att användare är registrerad och kan logga in nu

 

 //=========
 //INLOGGAD:
 //=========
 //Header - visa logOUT knapp och en logga(bild eller text)   

//Skapa logOUT knapp i header
function LoggedIn(){

    //===Login knapp
    let logOutButton = document.createElement("button");
    logOutButton.innerText = "Logga Ut";
    document.getElementById("logInlogOut").append(logOutButton);

    //Main - Välkomna "Username"
    document.getElementById("main").innerHTML = "Välkommen 'username'!"

    //Vid click byt vy till EJ INLOGGAD
    logOutButton.addEventListener("click", () => {     
        logOutButton.remove();  
        notLoggedIn();
        location.reload();
    })
};

 

//===============
//FEL INLOGGNING:
//===============
//Main - Meddela användaren att uppgifetrna är fel
function wrongLogin() {
    let headingText = document.getElementById("headingText");
        headingText.innerText = "Oj! Det verkar som att du uppgave fel uppgifter!"
        document.getElementById("headingText").style.color = "red";

    let callToAction = document.getElementById("callToAction");
        callToAction.innerText = "Vänligen testa att logga in igen eller registrera dig nedan om du är en ny användare!"    
        document.getElementById("callToAction").style.color = "red";
};

