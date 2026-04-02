-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: games_system
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `plataforma` varchar(50) DEFAULT NULL,
  `ano_lanc` int DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `data_cadast` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url_imagem` text,
  `trofeus` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (4,'The Witcher 3','RPG','PC, PS, Xbox, Switch',2015,59.99,'2026-03-27 16:50:23',NULL,78),(5,'Arc Raiders','Tiro','PC, PS, Xbox',2025,149.88,'2026-03-27 16:54:41',NULL,50),(7,'Assassins Creed Black Flag','Aventura','Pc, Ps, Xbox',2013,79.90,'2026-03-27 17:39:36',NULL,60),(9,'Elden Ring','Souls-Like','Pc, PS, Xbox',2022,249.99,'2026-03-27 18:17:32',NULL,42),(10,'Resident Evil 2 Remake','Horror, Puzzle','Pc, PS, xbox',2019,89.90,'2026-03-27 18:18:38',NULL,44),(11,'The Evil Within','Horror','pc, xbox, ps',2014,69.90,'2026-03-27 18:43:53',NULL,42),(15,'Resident Evil 4 Remake','horror, ação','pc, xbox, ps',2023,149.99,'2026-03-27 19:09:27',NULL,46),(16,'Dying Light The Beast','açao','Pc, ps, xbox',2025,249.99,'2026-03-30 17:56:55',NULL,30),(17,'Resident Evil Requiem','ação, Horror','pc, ps, xbox',2026,249.99,'2026-04-01 16:37:35',NULL,49),(18,'The Last of Us Part II','ação','pc, ps',2020,249.99,'2026-04-01 18:35:34',NULL,45);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-01 15:50:24
