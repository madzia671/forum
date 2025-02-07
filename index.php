<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strona z Forum</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LedrLsqAAAAALrmqr-se8iWDJ60gxFpTvk8Egbr"></script>
</head>
<body>
    <header>
        <h1>CERBERSECURITY</h1>
        <p>Witamy na naszej stronie!</p>
    </header>
    <nav>
        <a href="main.html">Strona Główna</a>
        <a href="index.php">Forum</a>
        <a href="about.html">O Nas</a>
        <a href="galery.html">Galeria zdjęć</a>
        <a href="info.html">O wtyczce</a>
        <a href="for.html">Dla kogo?</a>
        <button id="theme-toggle">Zmień motyw</button>
    </nav>
    <main>
        <section>
            <h2>Strona Główna</h2>
            <p>Nasza strona umożliwia wyszukiwanie opinii i komentarzy, a także dodawanie własnych po weryfikacji CAPTCHA.</p>
        </section>
        
        <section>
            <h2>Forum</h2>
            
            <div>
                <h3>Komentarze</h3>
            </div>






            <form method="post">

            <input type="text" name="link" placeholder="Wpisz nazwę strony do wyszukania">
            <input type="reset" value="czysc">
            <input type="submit" value="szukaj">
            </form>
                
            <form method="post">

                <div>
                    <input type="text" name="nazwa" placeholder="Nazwa strony" required>
                </div>

                <div>
                    <textarea name="comments" placeholder="Twoja wiadomość" required></textarea>
                </div>
                <input type="reset" value="czysc">
                <input type="submit" value="dodaj">
            </form>
           
            <?php

            
$search=$_POST["search"];
$comments=$_POST["comments"];
$nazwa=$_POST["nazwa"];
$link=$_POST["link"];


$polacz = mysqli_connect("localhost","root","","forum");

// $dodaj = "INSERT INTO `wiadomosci` VALUES ('','$nazwa', '$comments' , '$link' )";
// mysqli_query($polacz, $dodaj);

// $spr = "SELECT `nazwa`  FROM `wiadomosci`";
if (!$polacz) {
    die("Błąd połączenia z bazą danych: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    
    // Jeśli użytkownik wpisze zapytanie, wykonujemy wyszukiwanie w bazie
    if (!empty($search)) {
        $query = "SELECT * FROM wiadomosci WHERE nazwa LIKE '%$search%' OR link LIKE '%$search%'";
        $result = mysqli_query($polacz, $query);
        
        if (mysqli_num_rows($result) > 0) {
            echo "<h3>Wyniki wyszukiwania:</h3>";
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<p><strong>" . htmlspecialchars($row['nazwa']) . ":</strong> " . htmlspecialchars($row['comments']) . " (<a href='" . htmlspecialchars($row['link']) . "'>" . htmlspecialchars($row['link']) . "</a>)</p>";
            }
        } else {
            echo "<p>Brak wyników dla: <strong>" . htmlspecialchars($search) . "</strong></p>";
        }
    }

    // Jeśli użytkownik dodaje nowy wpis, zapisujemy go do bazy
    if (!empty($nazwa) && !empty($comments)) {
        $dodaj = "INSERT INTO wiadomosci (nazwa, comments, link) VALUES ('$nazwa', '$comments', '$link')";
        if (mysqli_query($polacz, $dodaj)) {
            echo "<p>Dodano komentarz do bazy.</p>";
        } else {
            echo "<p>Błąd: " . mysqli_error($polacz) . "</p>";
        }
    }
}








//  //wyslanie zapytania na serwer
//  mysqli_query($polacz, $spr);

//  // zamykanie polaczenia z mysql
//  mysqli_close($polacz);


            ?>
        </section>
        <section id="try">
            <h2>Wypróbuj</h2>
            <p>Skorzystaj z naszej wtyczki, aby jeszcze łatwiej korzystać z funkcji strony.</p>
            <button>Pobierz wtyczkę</button>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 CERBERSECURITY. Wszelkie prawa zastrzeżone.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>