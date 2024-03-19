-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: portfeuille
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `budget`
--

DROP TABLE IF EXISTS `budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `montant` int NOT NULL,
  `rollover` tinyint NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`category_id`,`user_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`),
  KEY `fk_budget_category1_idx` (`category_id`),
  KEY `fk_budget_user1_idx` (`user_id`),
  CONSTRAINT `fk_budget_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_budget_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int NOT NULL,
  `icon` text,
  PRIMARY KEY (`id`),
  KEY `fk_Category_User1_idx` (`user_id`),
  CONSTRAINT `fk_Category_User1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compte`
--

DROP TABLE IF EXISTS `compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `montant` bigint NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Compte_user_idx` (`user_id`),
  CONSTRAINT `fk_Compte_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `facture`
--

DROP TABLE IF EXISTS `facture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `compte_id` int NOT NULL,
  `montant` int NOT NULL,
  `repetition` tinyint NOT NULL,
  `date` datetime NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `auto` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `rappel` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_facture_category1_idx` (`category_id`),
  KEY `fk_facture_user1_idx` (`user_id`),
  KEY `fk_facture_compte1_idx` (`compte_id`),
  CONSTRAINT `fk_facture_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_facture_compte1` FOREIGN KEY (`compte_id`) REFERENCES `compte` (`id`),
  CONSTRAINT `fk_facture_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `objectif`
--

DROP TABLE IF EXISTS `objectif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objectif` (
  `id` int NOT NULL AUTO_INCREMENT,
  `compte_id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` int NOT NULL,
  `date_cible` datetime NOT NULL,
  `montant_touch` tinyint NOT NULL,
  PRIMARY KEY (`id`,`compte_id`,`user_id`),
  KEY `fk_Objectif_compte1_idx` (`compte_id`),
  KEY `fk_objectif_user1_idx` (`user_id`),
  CONSTRAINT `fk_Objectif_compte1` FOREIGN KEY (`compte_id`) REFERENCES `compte` (`id`),
  CONSTRAINT `fk_objectif_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `compte_id` int DEFAULT NULL,
  `montant` int NOT NULL,
  `type` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `commentaire` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `toaccount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transaction_category1_idx` (`category_id`),
  KEY `fk_transaction_compte1_idx` (`compte_id`),
  KEY `fk_transaction_user1_idx` (`user_id`),
  CONSTRAINT `fk_transaction_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_transaction_compte1` FOREIGN KEY (`compte_id`) REFERENCES `compte` (`id`),
  CONSTRAINT `fk_transaction_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text NOT NULL,
  `token` text,
  `cookieSecure` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-19 16:04:06
