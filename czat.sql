-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Paź 19, 2023 at 01:35 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `czat_gr1`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL,
  `imie` varchar(30) DEFAULT NULL,
  `nazwisko` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `login` varchar(30) DEFAULT NULL,
  `haslo` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id`, `imie`, `nazwisko`, `email`, `login`, `haslo`) VALUES
(2, 'magda', 'kaczorowska', 'magda.kaczorowska@gmail.com', 'magkacz', 'lubiekaczki'),
(3, 'jan', 'nowak', 'j.nowak@gmail.com', 'jnow', 'zaq1wsx'),
(4, 'stefan', 'batory', 'stefciu2115@gmail.com', 'stefek420', 'marysia'),
(5, 'jan', 'pawel', 'j.paw2137@gmail.com', 'pawelek2137', 'lubierudedzieci'),
(8, 'Magda', 'Kaczka', 'magkacz@gmail.com', 'madzia', 'chcespac'),
(9, 'jan', 'rampampam', 'lidl.parking@gmail.com', 'janek', 'lidl'),
(10, 'jan', 'rampampam', 'j.rampampam@gmail.com', 'janek slonik', 'rampampam'),
(13, 'Magda', 'kaczka', 'magkacz@gmail.com', 'szmeterling', 'niemamjuzpomyslow'),
(14, 'Magda', 'Kaczka', 'magkacz@gmail.com', 'madzia', 'jp'),
(16, 'Magda', 'Kaczka', 'magkacz@gmail.com', 'magkacz', '5f9c32ea089ceed7754eb27bf7574a0c20b4172b'),
(19, 'Magda', 'Kaczka', 'magakczorow@gmail.com', 'magkacz', '8d133fed56d5daa9f6bebb916e9b431a90d22bac'),
(20, 'Magda', 'Kaczka', 'magakczorow@gmail.com', 'magkacz', '8d133fed56d5daa9f6bebb916e9b431a90d22bac'),
(21, 'Ksd', 'Asxdf', 'asd@ads.pl', 'magkacz', '3da541559918a808c2402bba5012f6c60b27661c'),
(23, 'Asf', 'Asd', 'adf@asd.pl', 'magkacz', '4cc19aaff82f60ac4097f935ab4a06ad4f0891cc'),
(24, 'Awertgbm', 'Asxcnvjnaszjk', 'sudiwk@dsucj.pl', 'magkacz', 'cdf547ed4c64e6994af35cfcd69c4204c9227a97'),
(25, 'Jd', 'Dada', 'sduyg@ad.pl', 'magkacz', 'cdf547ed4c64e6994af35cfcd69c4204c9227a97'),
(26, 'Asdf', 'Asdfv', 'SDF@dsu.pl', 'magkacz', '659c7936cdd271571e4084e0520e0368dca1e3e0'),
(27, 'Asdvb', 'Asdfb', 'asdf@ds.pl', 'magkacz', '9bbb09c0f97638e659f8d410cf953343fc92fffc'),
(28, 'Asdbn', 'Asdbn', 'zxsdc@sd.pl', 'asdf', 'f1b699cc9af3eeb98e5de244ca7802ae38e77bae'),

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wiadomosci`
--

CREATE TABLE `wiadomosci` (
  `idw` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `wiadomosc` text DEFAULT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wiadomosci`
--

INSERT INTO `wiadomosci` (`idw`, `id`, `wiadomosc`, `data`) VALUES
(1, 16, 'hej hej ', '0000-00-00'),
(2, 13, 'hej', '2023-10-18'),
(3, 5, 'asdgfhjhgdv', '2023-10-11'),
(4, 4, 'jp wszystko wina kaczynskiego', '2023-10-05'),
(5, 14, 'brzuch mnie boli', '2023-10-19'),
(6, 2, 'test', '2023-10-19'),
(7, 2, 'test', '2023-10-19'),
(8, 2, 'jd', '2023-10-19');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `wiadomosci`
--
ALTER TABLE `wiadomosci`
  ADD PRIMARY KEY (`idw`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `wiadomosci`
--
ALTER TABLE `wiadomosci`
  MODIFY `idw` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `wiadomosci`
--
ALTER TABLE `wiadomosci`
  ADD CONSTRAINT `wiadomosci_ibfk_1` FOREIGN KEY (`id`) REFERENCES `uzytkownicy` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;