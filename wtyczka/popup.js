
    const modeImage = document.getElementById('mode-change');
    const zoomPage = document.getElementById('zoom-in');
    const reducePage = document.getElementById('reduce');
    const resetPage = document.getElementById('resetZoom');
    const changeLanguage = document.getElementById('lang-change');
    const goToForum =  document.getElementById('check-forum');

    let currentLanguage = 'pl';
    let zoomLevel = 1; // Poziom powiększenia
    const maxZoomLevel = 2; // maksymalny poziom powiększenia
    const minZoomLevel = 0.5; // mminimalny poziom zmniejszenia

    /*ustawienia lub w html po prostu umieścić
    document.getElementById("settings-change").onclick = function() {
        localStorage.setItem('pl', currentLanguage); //do zmiany
        window.location.href = "ustawienia.html";
    }
*/
    //zmiana motywu po kliknięciu w obrazek
    modeImage.addEventListener('click', () => {
        if (document.body.classList.contains('dangerous-body')) {
            document.body.classList.remove('dangerous-body');
            document.body.classList.toggle('dangerous-dark-mode');
        } else if (document.body.classList.contains('dangerous-dark-mode')) {
            document.body.classList.remove('dangerous-dark-mode');
            document.body.classList.add('dangerous-body');
        } 
        else if (document.body.classList.contains('good-body')) {
            document.body.classList.remove('good-body');
            document.body.classList.add('good-body-mode');
        }
        else if(document.body.classList.contains('good-body-mode')){
            document.body.classList.remove('good-body-mode');
            document.body.classList.add('good-body');
        }
        else{
            document.body.classList.toggle('dark-mode');
        }
    // Zmiana  obrazka w zależności od motywu
    if ((document.body.classList.contains('dark-mode')) || (document.body.classList.contains('dangerous-dark-mode')) || (document.body.classList.contains('good-body-mode'))) {
        modeImage.src = 'src/light.png'; // Obrazek dla ciemnego motywu
    } 
    else {
        modeImage.src = 'src/dark.png'; // Obrazek dla jasnego motywu
    } 
    });

    // Funkcja do powiększania
    zoomPage.addEventListener('click', () => {
        if(zoomLevel < maxZoomLevel)
        {
            zoomLevel += 0.1; // Zwiększ poziom powiększenia
            document.body.style.zoom = zoomLevel; // Powiększ zawartość
        }
        else
        {
            if(currentLanguage == "pl"){
                alert("Osiągnięto maksymalne powiększenie.")
            }
            else{
                alert("Maximum zoom has been reached.")
            }
        }
    });

    // Funkcja do zmniejszenia
    reducePage.addEventListener('click', () => {
        if(zoomLevel > minZoomLevel)
        {
            zoomLevel -= 0.1; // Zwiększ poziom powiększenia
            document.body.style.zoom = zoomLevel; // Powiększ zawartość
        }
        else
        {
            if(currentLanguage == "pl"){
                alert("Osiągnięto minimalne pomniejszenie.")
            }
            else{
                alert("Minimum zoom has been reached.")
            }
        }
       
    });

    //Funkcja do przywrócenia zoomu
    resetPage.addEventListener('click', () => {
        zoomLevel = 1; // Zwiększ poziom powiększenia
        document.body.style.zoom = zoomLevel; // Powiększ zawartość
    });

    // Funcja zmiany języka na angielski
    changeLanguage.addEventListener('click', () => {
    if (currentLanguage == 'pl') {
        changeLanguage.src = 'src/pl.png'; // zmiana na angielski i wyświetla się możliwy polski
        document.getElementById('result').innerText = "Security of the website is being checked...";
        document.getElementById('check-forum').innerText = "Go to our forum";
        currentLanguage = 'en';
        
    } 
    else{
        changeLanguage.src = 'src/en.png'; // zmiana na polski i  wyświetla się możliwy ang
        document.getElementById('result').innerText = "Sprawdzanie bezpieczeństwa strony...";
        document.getElementById('check-forum').innerText = "Zobacz nasze forum";
        currentLanguage = 'pl';
    }
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


//WTYCZKA

document.addEventListener('DOMContentLoaded', () => {
    // Pobieranie adresu URL aktualnej karty
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;

// Wysyłanie wiadomości do background.js
chrome.runtime.sendMessage({ action: "checkUrl", url: currentUrl }, (response) => {
    const resultDiv = document.getElementById("result");
    //console.log("Otrzymano odpowiedź:", response);
    if(currentLanguage=="pl")
    {
        if (response.result == "whiteList") {
            resultDiv.textContent = "Strona zweryfikowana, nadal zachowaj środki ostrożności.";
            document.body.classList.toggle('good-body');
        }
        else if (response.result == "blackList"){
            document.body.classList.toggle('dangerous-body');
            resultDiv.textContent = "Strona niebezpieczna, natychmiast ją opuść.";
        }
        else {
            resultDiv.textContent = "Strona niezweryfikowana, uważaj.";
            resultDiv.style.color = "grey";
        }
    }
    else
    {
        if (response.result == "whiteList") {
            resultDiv.textContent = "The website has been verified, still be careful.";
            document.body.classList.toggle('good-body');
        }
        else if (response.result == "blackList"){
            resultDiv.textContent = "Dangerous website, leave it immediately.";
            document.body.classList.toggle('dangerous-body');
        }
        else {
            resultDiv.textContent = "Unverified site, be careful.";
            resultDiv.style.color = "grey";
        }
    }
});
});
});




