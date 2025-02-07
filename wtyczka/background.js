/*
czarna lista nie działa dlatego zakometerowane + chciałam sprawdzić czy działa zmienianie rozmiaru, dlatego znajduje się tam witryna vlo
nie działa wyświetlanie okna po prostu, chciałam by się wyświetało tylko, gdy jest niezabezpiecznona lub bezpieczna
*/
const banksWhiteList = [
  "https://www.pkobp.pl",
  "https://www.pekao.pl",
  "https://www.santander.pl/",
  "https://www.mbank.pl/",
  "https://www.ing.pl/",
  "https://www.bnpparibas.pl/",
  "https://www.bankmillennium.pl/",
  "https://www.aliorbank.pl/",
  "https://www.citibank.pl/",
  "https://www.velobank.pl/",
  "https://www.credit-agricole.pl/klienci-indywidualni",
  "https://country.db.com/poland/",
  "https://www.sgb.pl/",
  "https://www.bankbps.pl/",
  "https://www.bosbank.pl/klient-indywidualny",
  "https://www.santanderconsumer.pl/",
  "https://www.bph.pl/pl/",
  "https://www.pocztowy.pl/",
  "https://nestbank.pl/o-banku",
  "https://www.toyotabank.pl/",
  "https://www.dnb.pl/pl/",
  "https://banknowy.pl/n_banknowy/portal",
  "https://plusbank.pl/",
  "https://www.ipko.pl/",

  "https://www.pekao24.pl/logowanie",
  "https://www.centrum24.pl/",
  "https://online.mbank.pl/pl/Login",
  "https://login.ingbank.pl/mojeing/app/#login",
  "https://goonline.bnpparibas.pl/#!/login",
  "https://www.bankmillennium.pl/logowanie",
  "https://system.aliorbank.pl/sign-in",
  "https://www.citibankonline.pl/apps/auth/signin/",
  "https://secure.velobank.pl/login",
  "https://ca24.credit-agricole.pl/web-ca24/login/login",
  "https://identity.db.com/auth/realms/global/protocol/openid-connect/auth?client_id=102294-1_HIPONET-PL&response_type=code&login=true&redirect_uri=https://dbhiponet.deutschebank.pl/frontend-web/app/j_spring_security_check",
  "https://sgb24.pl/frontend-web/app/auth.html#/content/login",
  "https://online.bankbps.pl/frontend-web/app/auth.html#/content/login",
  "https://bosbank24.pl/app/auth.html#/content/login",
  "https://online.santanderconsumer.pl/Authentication/",
  "https://online.bph.pl/pi/auth/login/step1",
  "https://online.pocztowy.pl/login/main",
  "https://login.nestbank.pl/login",
  "https://konto.toyotabank.pl/frontend-web/app/auth.html#/content/login",
  "https://ue.dnb.pl/login",
  "https://www.banknowy24.pl/ebank/start",
  "https://plusbank24.pl/web-client/login!input.action?token=4d5e897a-99d9-4620-ad55-e07e9bfce2c6&readonly=false#&csrfVerifyToken=c025d3d3-7768-4a31-bcb2-8f968e4a277f",

  "https://www.ipkobiznes.pl/",
  "https://www.pekaobiznes24.pl/do/login",
  "https://ibiznes24.pl/login.html#/login",
  "https://online.mbank.pl/pl/LoginPB",
  "https://ingbusiness.pl/gib/login",
  "https://login.bnpparibas.pl/login/Redirect?SAMLRequest=fZBNa8MwDIb%2FSvC9%2BXCaNhZJIGyXwnZZx%2B5uqrSGRM4se5T9%2Bnktg26HHSU9j16khvU8LdAHf6YXfA%2FIPrnMEzFcB60IjsBqNgykZ2TwA%2Bz75yeQaQ6Ls94OdhJ3yv%2BGZkbnjSWR7B5bkW%2BULOvtqFS5kXpUtVyrotCl0ljlctyK5A0dR7wV0Y4Oc8AdsdfkYyuX61UhV3n9WlQgFRSVSPqfhAdLHGZ0e3QfZojWES8xMRLeO3MIHm%2BEodNfpGu%2BL4FrmuvO3i%2BQZSdraTKEB%2FNJyOmBlkXHPZrTZWqye%2BFW%2FX5q9wU%3D",
  "https://www.bankmillennium.pl/przedsiebiorstwa",
  "https://bn.aliorbank.pl/hades/do/Login",
  "https://login.isso.db.com/websso/sso_custom_multi_auth_flex_Logon.sso?ct_orig_uri=https%3A%2F%2Flogin.isso.db.com%3A443%2Fwebsso%2Fsso_FallThrough.sso&requesting_slave=https%3A%2F%2Fwww.toolbar.autobahn.db.com%2Fappmarket%2Fauth_res%3Freferrer%3D%252Fappmarket&viaFT=false",
  "https://iboss24.pl/corpo_web/auth/login.jsp",
  "https://biznes.pocztowy.pl/cbp-webapp/bi#!login",
  "https://portal.toyotaleasing.pl/",
  "https://login.bankmillennium.pl/retail/login/",
  "https://bosbank24.pl/bosfaktor/login.jsf",
  "https://m.plusbank24.pl/web-client/lajt/login!input.action?token=6c2f60ca-d028-441b-af0c-6cb93e4311b1&readonly=false",

  //podczas przeglądania//
  "https://duckduckgo.com",
  "https://www.bing.com",
  "https://www.google.pl/",
  "https://www.yahoo.com/"

];



// URL do pliku .txt
//const CERT = 'https://hole.cert.pl/domains/v2/domains.txt';
const BlackListCert = ["https://www.vlogdynia.pl/"];

// Funkcja do pobrania i przetworzenia pliku
async function fetchBlackList() {
    try {
        // Pobierz plik
        const response = await fetch('domains.txt');
        
        // Sprawdź, czy odpowiedź jest poprawna
        if (!response.ok) {
            throw new Error('Black list is not available now.');
        }

        // Przeczytaj tekst z odpowiedzi
        const text = await response.text();

        // Podziel tekst na wiersze
        const lines = text.split('\n');

        // Dodaj każdy wiersz do listy
        lines.forEach(line => {
            if (line.trim()) { // Sprawdź, czy wiersz nie jest pusty
                BlackListCert.push(line.trim());
            }
        });
    } catch (error) {
        console.error('ERROR:', error);
    }
}


  function checkUrl(url) {
    // Sprawdzenie, czy URL zaczyna się od któregoś z adresów bazowych
    const existsOnWhiteList = banksWhiteList.some(link=> url.startsWith(link));
    // Funkcja do sprawdzania, czy URL jest w bazie danych ////////////////
    //const existsOnBlackList = BlackListCert.includes(url);
    const existsOnBlackList = BlackListCert.some(link=> url.includes(link));
    if(existsOnBlackList == true){
      chrome.action.setIcon({ path: "src/blackLOGO.png" });
      return "blackList"; // istnieje na czarnej liście
    }
    else if(existsOnWhiteList == true) {
      chrome.action.setIcon({ path: "src/whiteLOGO.png" });
      return "whiteList"; // istnieje na białej liście
    }
    else{
      chrome.action.setIcon({ path: "src/logo.png" });
      return "undefinedList"; // nie znana jest autentyczność strony
    }
  }

  // Nasłuchiwanie na wiadomości z popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkUrl") {
      const result = checkUrl(request.url);
      sendResponse({ result });
    }
  });

chrome.runtime.onInstalled.addListener(() => {
  fetchBlackList();
});


// Nasłuchiwanie na zmiany w zakładkach
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
      checkUrl(tab.url); // Automatyczne sprawdzanie URL po załadowaniu strony
  }
});
/*
chrome.runtime.onStartup.addListener(() => {
  chrome.action.openPopup();
});
*/


