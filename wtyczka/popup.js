
    const modeImage = document.getElementById('mode-change'); //do zmiany motywu
    const zoomPage = document.getElementById('zoom-in'); //do powiększenia popupu wtyczki
    const reducePage = document.getElementById('reduce'); //do zmnieszenia popupu wtyczki
    const resetPage = document.getElementById('resetZoom'); //do zresetowania rozmiaru popupu wtyczki
    const changeLanguage = document.getElementById('lang-change'); //do zmiany języka
    const goToForum =  document.getElementById('check-forum'); //do przejścia do forum

    let currentLanguage = localStorage.getItem('currentLanguage') || 'pl'; //Język
    let zoomLevel = parseFloat(localStorage.getItem('zoomLevel')) || 1; // Poziom powiększenia
    let whichMode = localStorage.getItem('whichMode') || "dark"; //biały lub czarny motyw

    const maxZoomLevel = 2; // maksymalny poziom powiększenia
    const minZoomLevel = 0.5; // mminimalny poziom zmniejszenia


    /*do ustawień - miały być
    document.getElementById("settings-change").onclick = function() {
        window.location.href = "ustawienia.html";
    }
    */

    function saveSettings() {  //zapisywanie ustawień
        localStorage.setItem('currentLanguage', currentLanguage);
        localStorage.setItem('zoomLevel', zoomLevel);
        localStorage.setItem('whichMode', whichMode);
    }

    function loadSettings() { //wczytywanie ustawień
    currentLanguage = localStorage.getItem('currentLanguage') || 'pl'; //Język
    zoomLevel = parseFloat(localStorage.getItem('zoomLevel')) || 1; // Poziom powiększenia
    whichMode = localStorage.getItem('whichMode') || "dark"; //jasny lub ciemny motyw

    document.body.style.zoom = zoomLevel; 

    if (whichMode=="light") {
        modeImage.src = 'src/dark.png'; // Obrazek dla jasnego motywu
    }
    else {
        modeImage.src = 'src/light.png'; // Obrazek dla ciemnego motywu
    }

    if(currentLanguage=="pl"){
        document.getElementById('check-forum').innerText = "Zobacz nasze forum";
        changeLanguage.src = 'src/en.png'; 
    }
    else {
        document.getElementById('check-forum').innerText = "Go to our forum";
        changeLanguage.src = 'src/pl.png'; 
    }}


///////////////FUNKCJE DODATKOWE///////////////

    function changingMode() { //zamiana motywu
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;
        chrome.runtime.sendMessage({ action: "checkUrl", url: currentUrl }, (response) => {
        const resultDiv = document.getElementById("result");
        
        // Resetowanie klas
        document.body.classList.remove('good-body', 'dangerous-body', 'dark-mode', 'good-body-mode', 'dangerous-dark-mode');

        if (whichMode=='light'){
            modeImage.src = 'src/light.png'; 
            whichMode = 'dark';
            //main();
            if (response.result == "whiteList") {
                document.body.classList.add('good-body-mode');
            }
            else if (response.result == "blackList") {
                document.body.classList.add('dangerous-dark-mode');
                
            }
            else if (response.result == "undefinedList") {
                document.body.classList.add('dark-mode');
        }}

        else {
            modeImage.src = 'src/dark.png'; 
            whichMode = 'light';
            //main();
            if (response.result == "whiteList") {
                document.body.classList.add('good-body');
            }
            else if (response.result == "blackList") {
                document.body.classList.add('dangerous-body');
            }
            else if (response.result == "undefinedList") {
                resultDiv.style.color = "grey";
        }} 

        saveSettings();
    });});}

    //powiększenie
    function changingZoomPlus(){
        if(zoomLevel < maxZoomLevel){
            zoomLevel += 0.1; // Zwiększ poziom powiększenia
            document.body.style.zoom = zoomLevel; // Powiększ zawartość
            saveSettings();
        }
        else {
            if(currentLanguage == "pl") {
                alert("Osiągnięto maksymalne powiększenie.")
            }
            else {
                alert("Maximum zoom has been reached.")
            }
        }
    }

    //pomniejszenie
    function changingZoomMinus(){
        if(zoomLevel > minZoomLevel) {
            zoomLevel -= 0.1; // Zwiększ poziom pomniejszenia
            document.body.style.zoom = zoomLevel; // Pomniejsz zawartość
            saveSettings();
        }
        else {
            if(currentLanguage == "pl") {
                alert("Osiągnięto minimalne pomniejszenie.")
            }
            else {
                alert("Minimum zoom has been reached.")
            }
        }
    }

    //reset rozmiaru
    function changingZoomZero(){
        zoomLevel = 1; // Zwiększ poziom powiększenia
        document.body.style.zoom = zoomLevel; // Powiększ zawartość
        saveSettings();
    }


 //////////PO KLIKNIĘCIU //////////////


    //zmiana motywu po kliknięciu w obrazek
    modeImage.addEventListener('click', () => {
        changingMode();
    });

    //powiększenie po kliknięciu w A+
    zoomPage.addEventListener('click', () => {
        changingZoomPlus();
    });

    // zmniejszenie po kliknięciu w A-
    reducePage.addEventListener('click', () => {
        changingZoomMinus();
    });

    //przywrócenie zoomu po kliknięciu w A0
    resetPage.addEventListener('click', () => {
        changingZoomZero();
    });

    // Funcja zmiany języka na angielski
    changeLanguage.addEventListener('click', () => {
        
        if (currentLanguage == 'pl') {
            document.getElementById('check-forum').innerText = "Go to our forum";
            changeLanguage.src = 'src/pl.png'; // zmiana na angielski i wyświetla się możliwy polski
            currentLanguage = 'en';
            main();
        }
        else {
            changeLanguage.src = 'src/en.png'; // zmiana na polski i  wyświetla się możliwy ang
            document.getElementById('check-forum').innerText = "Zobacz nasze forum";
            currentLanguage = 'pl';
            main();
        }

        saveSettings();

    });

    //obsługa przycisku przejścia do forum w nowej karcie        
    goToForum.addEventListener('click', () => {
        if(currentLanguage == "pl")
        {
            if (confirm("Przejść na stronę forum? Zostaniesz przeniesiony na nową kartę.")) {
                window.open('https://forumgde.infy.uk/main.html?i=1', '_blank');
            } 
        }
        else
        {
            if (confirm("Do you want to leave this website and go to forum?")) {
                window.open('https://forumgde.infy.uk/main.html?i=1', '_blank');
            } 
        }
    });



///////////////WTYCZKA/////////////


document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    main();
});

//głowna funkcja pogramu
function main()
{
    // Pobieranie adresu URL aktualnej karty
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;
            // Wysyłanie wiadomości do background.js
            chrome.runtime.sendMessage({ action: "checkUrl", url: currentUrl }, (response) => {
            const resultDiv = document.getElementById("result");
            
            if(whichMode =="light")
            {
                if (response.result == "whiteList") {
                    document.body.classList.add('good-body');
                }
                else if (response.result == "blackList") {
                    document.body.classList.add('dangerous-body');
                }
                else if (response.result == "undefinedList") {
                    resultDiv.style.color = "grey";
            }}
            else if(whichMode =="dark")
            {
                if (response.result == "whiteList") {
                    document.body.classList.add('good-body-mode');
                }
                else if (response.result == "blackList") {
                    document.body.classList.add('dangerous-dark-mode');
                    
                }
                else if (response.result == "undefinedList") {
                    document.body.classList.add('dark-mode');
            }}

            if(currentLanguage=="pl"){
                if (response.result == "whiteList") {
                    resultDiv.textContent = "Strona zweryfikowana, nadal zachowaj środki ostrożności.";
                }
                else if (response.result == "blackList") {
                    resultDiv.textContent = "Strona niebezpieczna, natychmiast ją opuść.";
                }
                else if (response.result == "undefinedList") {
                    resultDiv.textContent = "Strona niezweryfikowana, uważaj.";
                }
                else {
                    document.getElementById('result').innerText = "Sprawdzanie bezpieczeństwa strony...";
                }}
            else {
                if (response.result == "whiteList") {
                    resultDiv.textContent = "The website has been verified, still be careful.";
                }
                else if (response.result == "blackList"){
                    resultDiv.textContent = "Dangerous website, leave it immediately.";
                }
                else if (response.result == "undefinedList") {
                    resultDiv.textContent = "Unverified site, be careful.";
                }
                else {
                    document.getElementById('result').innerText = "Security of the website is being checked...";
                }}    
            });
        });
}




