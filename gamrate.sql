-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 09:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamrate`
--

-- --------------------------------------------------------

--
-- Table structure for table `igra`
--

CREATE TABLE `igra` (
  `id` int(11) NOT NULL,
  `naziv` varchar(100) DEFAULT NULL,
  `zanr` varchar(50) DEFAULT NULL,
  `slika_url` text DEFAULT NULL,
  `kupi_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `igra`
--

INSERT INTO `igra` (`id`, `naziv`, `zanr`, `slika_url`, `kupi_url`) VALUES
(335, 'The Witcher 3', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg', 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/'),
(336, 'Cyberpunk 2077', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg', 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'),
(337, 'Elden Ring', 'Action RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg', 'https://store.steampowered.com/app/1245620/ELDEN_RING/'),
(338, 'Counter-Strike: Global Offensive', 'FPS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg', 'https://store.steampowered.com/app/730/Counter-Strike_Global_Offensive/'),
(339, 'Minecraft', 'Sandbox', 'https://assets-prd.ignimgs.com/2021/12/14/minecraft-1639513933156.jpg', 'https://store.steampowered.com/app/252490/Minecraft/'),
(340, 'FIFA 23', 'Sports', 'https://m.media-amazon.com/images/M/MV5BODdjODAyMTAtMDlkYS00ZDE3LWI4MTQtZDc1ZjY1YzQ5MzU2XkEyXkFqcGc@._V1_.jpg', 'https://store.steampowered.com/app/1506830/FIFA_23/'),
(341, 'Valorant', 'Shooter', 'https://cdn.cloudflare.steamstatic.com/steam/apps/8850/library_600x900.jpg', 'https://playvalorant.com/'),
(342, 'Assassin\'s Creed Valhalla', 'Adventure', 'https://upload.wikimedia.org/wikipedia/en/f/ff/Assassin%27s_Creed_Valhalla_cover.jpg', 'https://store.steampowered.com/app/1096920/Assassins_Creed_Valhalla/'),
(343, 'League of Legends', 'MOBA', 'https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2021/09/league-of-legends.jpeg?fit=1607%2C895&ssl=1', 'https://na.leagueoflegends.com/'),
(344, 'Hollow Knight', 'Metroidvania', 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900.jpg', 'https://store.steampowered.com/app/367520/Hollow_Knight/'),
(345, 'Stardew Valley', 'Simulation', 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/library_600x900.jpg', 'https://store.steampowered.com/app/413150/Stardew_Valley/'),
(346, 'Among Us', 'Party', 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/library_600x900.jpg', 'https://store.steampowered.com/app/945360/Among_Us/'),
(347, 'Dota 2', 'MOBA', 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/library_600x900.jpg', 'https://store.steampowered.com/app/570/Dota_2/'),
(348, 'Overwatch', 'Shooter', 'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg', 'https://playoverwatch.com/'),
(349, 'Cuphead', 'Platformer', 'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/library_600x900.jpg', 'https://store.steampowered.com/app/268910/Cuphead/'),
(351, 'Dead Cells', 'Roguelike', 'https://cdn.cloudflare.steamstatic.com/steam/apps/588650/library_600x900.jpg', 'https://store.steampowered.com/app/588650/Dead_Cells/'),
(352, 'Sekiro: Shadows Die Twice', 'Action', 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg', 'https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice_Collectors_Edition/'),
(353, 'Hades', 'Roguelike', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/library_600x900.jpg', 'https://store.steampowered.com/app/1145360/Hades/'),
(354, 'Terraria', 'Sandbox', 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg', 'https://store.steampowered.com/app/105600/Terraria/'),
(355, 'Fall Guys', 'Battle Royale', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/library_600x900.jpg', 'https://store.steampowered.com/app/1097150/Fall_Guys/'),
(356, 'Dark Souls III', 'Action RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900.jpg', 'https://store.steampowered.com/app/374320/DARK_SOULS_III/'),
(357, 'Rainbow Six Siege', 'Tactical Shooter', 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/library_600x900.jpg', 'https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/'),
(358, 'Portal 2', 'Puzzle', 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/library_600x900.jpg', 'https://store.steampowered.com/app/620/Portal_2/'),
(359, 'The Last of Us Part II', 'Action', 'https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png', 'https://store.playstation.com/en-us/product/UP9000-CUSA03585_00-THELASTOFUSPARTII'),
(360, 'Mass Effect Legendary Edition', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/library_600x900.jpg', 'https://store.steampowered.com/app/1328670/Mass_Effect_Legendary_Edition/'),
(361, 'Celeste', 'Platformer', 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/library_600x900.jpg', 'https://store.steampowered.com/app/504230/Celeste/'),
(362, 'Firewatch', 'Adventure', 'https://cdn.cloudflare.steamstatic.com/steam/apps/383870/library_600x900.jpg', 'https://store.steampowered.com/app/383870/Firewatch/'),
(363, 'The Elder Scrolls V: Skyrim', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/72850/library_600x900.jpg', 'https://store.steampowered.com/app/72850/The_Elder_Scrolls_V_Skyrim/'),
(364, 'Metro Exodus', 'FPS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/412020/library_600x900.jpg', 'https://store.steampowered.com/app/412020/Metro_Exodus/'),
(365, 'Bioshock Infinite', 'FPS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/8870/library_600x900.jpg', 'https://store.steampowered.com/app/8870/BioShock_Infinite/'),
(366, 'Ori and the Blind Forest', 'Platformer', 'https://cdn.cloudflare.steamstatic.com/steam/apps/261570/library_600x900.jpg', 'https://store.steampowered.com/app/261570/Ori_and_the_Blind_Forest/'),
(367, 'Dark Souls II', 'Action RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/335300/library_600x900.jpg', 'https://store.steampowered.com/app/335300/DARK_SOULS_II/'),
(368, 'Fallout 4', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/377160/library_600x900.jpg', 'https://store.steampowered.com/app/377160/Fallout_4/'),
(369, 'Persona 5 Royal', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/library_600x900.jpg', 'https://store.playstation.com/en-us/product/UP1004-CUSA13677_00-PERSONA5ROYAL000'),
(370, 'Dead by Daylight', 'Horror', 'https://cdn.cloudflare.steamstatic.com/steam/apps/381210/library_600x900.jpg', 'https://store.steampowered.com/app/381210/Dead_by_Daylight/'),
(371, 'Resident Evil Village', 'Horror', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/library_600x900.jpg', 'https://store.steampowered.com/app/1196590/Resident_Evil_Village/'),
(372, 'Assassin\'s Creed Odyssey', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/812140/library_600x900.jpg', 'https://store.steampowered.com/app/812140/Assassins_Creed_Odyssey/'),
(373, 'Monster Hunter World', 'Action RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/library_600x900.jpg', 'https://store.steampowered.com/app/582010/Monster_Hunter_World/'),
(374, 'Hogwarts Legacy', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg', 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/'),
(375, 'The Elder Scrolls Online', 'MMORPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/306130/library_600x900.jpg', 'https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/'),
(376, 'Metro 2033 Redux', 'FPS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/286690/library_600x900.jpg', 'https://store.steampowered.com/app/286690/Metro_2033_Redux/'),
(377, 'Apex Legends', 'Battle Royale', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg', 'https://store.steampowered.com/app/1172470/Apex_Legends/'),
(378, 'GTA V', 'Action', 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg', 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/'),
(379, 'Dark Souls Remastered', 'Action RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/570940/library_600x900.jpg', 'https://store.steampowered.com/app/570940/DARK_SOULS_REMASTERED/'),
(380, 'Call of Duty: Warzone', 'Battle Royale', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg', 'https://store.steampowered.com/app/1172470/Call_of_Duty_Warzone/'),
(381, 'Rainbow Six Extraction', 'Tactical Shooter', 'https://upload.wikimedia.org/wikipedia/en/9/98/Rainbow_Six_Extraction_cover_art.jpg', 'https://store.steampowered.com/app/1155690/Tom_Clancys_Rainbow_Six_Extraction/'),
(382, 'Forza Horizon 5', 'Racing', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg', 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/'),
(383, 'The Sims 4', 'Simulation', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/library_600x900.jpg', 'https://store.steampowered.com/app/1222670/The_Sims_4/'),
(384, 'Rust', 'Survival', 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/library_600x900.jpg', 'https://store.steampowered.com/app/252490/Rust/'),
(385, 'Fallout: New Vegas', 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/22380/library_600x900.jpg', 'https://store.steampowered.com/app/22380/Fallout_New_Vegas/'),
(386, 'Portal', 'Puzzle', 'https://cdn.cloudflare.steamstatic.com/steam/apps/400/library_600x900.jpg', 'https://store.steampowered.com/app/400/Portal/'),
(387, 'Borderlands 3', 'FPS', 'https://cdn.cloudflare.steamstatic.com/steam/apps/397540/library_600x900.jpg', 'https://store.steampowered.com/app/397540/Borderlands_3/'),
(388, 'Rocket League', 'Sports', 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/library_600x900.jpg', 'https://store.steampowered.com/app/252950/Rocket_League/'),
(389, 'Dead Space', 'Horror', 'https://cdn.cloudflare.steamstatic.com/steam/apps/17470/library_600x900.jpg', 'https://store.steampowered.com/app/17470/Dead_Space/'),
(390, 'Team Fortress 2', 'Shooter', 'https://cdn.cloudflare.steamstatic.com/steam/apps/440/library_600x900.jpg', 'https://store.steampowered.com/app/440/Team_Fortress_2/'),
(391, 'GTA VI', 'Shooter', 'https://media-rockstargames-com.akamaized.net/seis-8878371b7eac6fbe31244d4cfde113a7f532fdb5727e70ceeaf8b3c73eca808f/meta/800x800.jpg', 'https://www.rockstargames.com/VI');

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `ime` varchar(50) DEFAULT NULL,
  `prezime` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `lozinka` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `ime`, `prezime`, `email`, `lozinka`, `role`) VALUES
(1, 'Edis', 'Dreic', 'dreicedis@gmail.com', '123456', 'user'),
(2, 'Aco', 'Acovic', 'acoacovic@gmail.com', '123456', 'user'),
(3, 'Baranin', 'Barski', 'barski@gmail.com', '123456', 'user'),
(4, 'Kole', 'Kolovic', 'kole@gmail.com', '123456', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `lajk`
--

CREATE TABLE `lajk` (
  `id` int(11) NOT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  `igra_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ocjena`
--

CREATE TABLE `ocjena` (
  `id` int(11) NOT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  `igra_id` int(11) DEFAULT NULL,
  `ocjena` int(11) DEFAULT NULL,
  `komentar` text DEFAULT NULL,
  `datum` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ocjena`
--

INSERT INTO `ocjena` (`id`, `korisnik_id`, `igra_id`, `ocjena`, `komentar`, `datum`) VALUES
(1, 1, 335, 5, 'Super!', '2025-06-16 01:17:25'),
(2, 2, 335, 5, 'Najjaca igrica na svijet', '2025-06-16 01:20:51'),
(3, 3, 335, 1, 'Trop ', '2025-06-16 01:21:10');

-- --------------------------------------------------------

--
-- Table structure for table `prati`
--

CREATE TABLE `prati` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) DEFAULT NULL,
  `prati_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `igra`
--
ALTER TABLE `igra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `lajk`
--
ALTER TABLE `lajk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnik_id` (`korisnik_id`),
  ADD KEY `igra_id` (`igra_id`);

--
-- Indexes for table `ocjena`
--
ALTER TABLE `ocjena`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnik_id` (`korisnik_id`),
  ADD KEY `igra_id` (`igra_id`);

--
-- Indexes for table `prati`
--
ALTER TABLE `prati`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `prati_id` (`prati_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `igra`
--
ALTER TABLE `igra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=392;

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lajk`
--
ALTER TABLE `lajk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ocjena`
--
ALTER TABLE `ocjena`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prati`
--
ALTER TABLE `prati`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lajk`
--
ALTER TABLE `lajk`
  ADD CONSTRAINT `lajk_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`),
  ADD CONSTRAINT `lajk_ibfk_2` FOREIGN KEY (`igra_id`) REFERENCES `igra` (`id`);

--
-- Constraints for table `ocjena`
--
ALTER TABLE `ocjena`
  ADD CONSTRAINT `ocjena_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`),
  ADD CONSTRAINT `ocjena_ibfk_2` FOREIGN KEY (`igra_id`) REFERENCES `igra` (`id`);

--
-- Constraints for table `prati`
--
ALTER TABLE `prati`
  ADD CONSTRAINT `prati_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `korisnik` (`id`),
  ADD CONSTRAINT `prati_ibfk_2` FOREIGN KEY (`prati_id`) REFERENCES `korisnik` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
