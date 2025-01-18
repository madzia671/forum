<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>

<form method="POST">

<label for="nick">Nick: </label><input type="text" name="nick" ><br>    
<label for="kom">Komentarz: </label><textarea name="kom" id="" cols="30" rows="10"></textarea><br>
<div>
<input type="submit" value="Dodaj" class="dod">
<input type="reset" value="Wyczyść" class="wyw">
</div>

</form>
    
</body>

</html>

<?php 

$nick = $_POST["nick"];
$kom = $_POST["kom"]; 
$data = date("Y-m-d");
$godz = date("H-m-s");




if ($nick == NULL || $kom == NULL) {
    echo("Wpisz coś <br>");
}


else {
 



$plik = fopen("komy.txt", "a");
fwrite($plik, "$nick: $kom $data $godz <br>");


$plik = fopen("komy.txt","r");
$roz = filesize("komy.txt");
$zaw = fread($plik, $roz);
echo("$zaw");
fclose($plik);
}







?>