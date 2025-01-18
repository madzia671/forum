<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<h2>Logowanie</h2>
    <form method="post">
        login <input type="text" name="log"> <br>
        wiadomosc <textarea name="wiad"></textarea><br>
        <input type="submit" value="wyslij">
        <input type="reset" value="czysc">
    

    </form>

    <?php

$log=$_POST["log"];
$wiad=$_POST["wiad"];
$data=date("Y-m-d");



    $polacz = mysqli_connect("localhost","root","","czat");    
   

    $logowanie = "SELECT `id`  FROM `uzytkownicy`WHERE `login` = '$log'";

    $spr = mysqli_query($polacz, $logowanie);
    $id = mysqli_fetch_array($spr);


    if(!empty($id['id'])){
        $dodaj = "INSERT INTO `wiadomosci` VALUES ('', '$id[id]', '$wiad' , '$data') ";
        mysqli_query($polacz, $dodaj);

    }
    else {
        echo("<p><u>uzytkownik o takim loginie nie istneije!</u></p>");
    }

   
    $zapytanie = "SELECT `login`, `wiadomosc`, `data` FROM `uzytkownicy` INNER JOIN `wiadomosci` ON `uzytkownicy`.`id`=`wiadomosci`.`id` ";

    $wynik = mysqli_query($polacz, $zapytanie);

    //zwraca odp z serwera pod jakąś zmienna , ta zmienna staje się tablicą jednowymiarową, fetch_array pozwala na wyswietlenie z tablicy nei po nr a nazwach kolumn w bazie
    while($wyswietl = mysqli_fetch_array($wynik)){
        echo("<p> $wyswietl[login] $wyswietl[data] </p>
        <p> $wyswietl[wiadomosc] </p>");
    }

    mysqli_close($polacz);

    

    ?>
</body>
</html>