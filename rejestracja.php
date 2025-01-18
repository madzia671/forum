<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    /* label {width: 50px;padding-right: 20px;} */
        
    </style>
</head>
<body>
    <h2>Rejestracja</h2>
    <form method="post">
        imie <input type="text" name="imie"> <br>
        nazwisko <input type="text" name="nazwisko"> <br>
        email <input type="text" name="email"> <br>
        login <input type="text" name="login"> <br>
        haslo <input type="password" name="haslo"> <br>
        <input type="reset" value="czysc">
        <input type="submit" value="zarejestruj">
    

    </form>
    <?php

$imie=$_POST["imie"];
$nazwisko=$_POST["nazwisko"];
$email=$_POST["email"];
$login=$_POST["login"];
$haslo=$_POST["haslo"];


function mb_ucfirst($s) {
    return mb_strtoupper(mb_substr($s,0,1)).mb_substr($s,1);
} 

if($imie != '' && $nazwisko != '' && $email != '' && $login != '' && $haslo != '' && sizeof($_POST) > 0){
    if(preg_match("^[A-ZĄĆĘŁŃÓŚŹŻ]*[a-ząćęłńóśźż]*$^",$imie)&&preg_match("^[A-ZĄĆĘŁŃÓŚŹŻ]*[a-ząćęłńóśźż]*$^",$nazwisko)&&preg_match("^[\w\.\-\+]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$^",$email))
    {
        $imie = mb_strtolower($imie);
        $nazwisko = mb_strtolower($nazwisko);
        $imie = mb_ucfirst($imie);
        $nazwisko = mb_ucfirst($nazwisko);
        $haslo=sha1($haslo);
    }}

    // polaczyc sie z serwerem mysqli_connect
    // serwer, uzytkownik, haslo, baza
    // $polacz to identyfikator polaczenia
    $polacz = mysqli_connect("localhost","root","","czat");

    // tworzymy zapytanie zeby informacje wpisane na str zostaly zapisane w tabeli w bazie
    //$zapytanie = "INSERT INTO `uzytkownicy` VALUES ('','$imie', '$nazwisko', '$email', '$login','$haslo')";

    $log = "SELECT `login`  FROM `uzytkownicy`";

    $spr = mysqli_query($polacz, $log);
    $logow = mysqli_fetch_array($spr);


   

    $logowanie = "SELECT `login`  FROM `uzytkownicy`";

    $spr = mysqli_query($polacz, $logowanie);
    $logow = mysqli_fetch_array($spr);


    if(empty($logow['login'])){
        $dodaj = "INSERT INTO `uzytkownicy` VALUES ('','$imie', '$nazwisko', '$email', '$login','$haslo')";
        mysqli_query($polacz, $dodaj);

    }
    else {
        echo("<p><u>uzytkownik o takim loginie nie istneije!</u></p>");
    }

    //wyslanie zapytania na serwer
    mysqli_query($polacz, $zapytanie);

    // zamykanie polaczenia z mysql
    mysqli_close($polacz);



?>
    
</body>
</html>