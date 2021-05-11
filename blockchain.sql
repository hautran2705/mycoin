-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: blockchain
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block` (
  `index` int NOT NULL,
  `timestamp` double DEFAULT NULL,
  `transactions` json DEFAULT NULL,
  `hash` varchar(100) DEFAULT NULL,
  `previousBlockHash` varchar(100) DEFAULT NULL,
  `nonce` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
INSERT INTO `block` VALUES (1,1620719993234,'[{\"date\": \"11/5/2021\", \"amount\": 1000000, \"sender\": \"system-reward\", \"recipient\": \"c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea\", \"transactionId\": \"de46be30b22e11eb95a1f9cff95c1cce\"}]','0','0',0),(2,1620725489888,'[{\"date\": \"11/5/2021\", \"amount\": 123, \"sender\": \"c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea\", \"recipient\": \"4dcea18faf577a21dde50c1e6931a3fa429c696c4ed1601f285db93cef0b2b2e\", \"transactionId\": \"9a62c170b23b11eb86fb997db570e53e\"}, {\"date\": \"11/5/2021\", \"amount\": 321, \"sender\": \"c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea\", \"recipient\": \"4dcea18faf577a21dde50c1e6931a3fa429c696c4ed1601f285db93cef0b2b2e\", \"transactionId\": \"9ca907f0b23b11eb86fb997db570e53e\"}, {\"date\": \"11/5/2021\", \"amount\": 654, \"sender\": \"c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea\", \"recipient\": \"4dcea18faf577a21dde50c1e6931a3fa429c696c4ed1601f285db93cef0b2b2e\", \"transactionId\": \"9efcbbf0b23b11eb86fb997db570e53e\"}]','0004b9ad223f7aba24db2379e403e4794532197135880798e1127ee5f4e4ca48','0',11572),(3,1620739893314,'[{\"date\": \"11/5/2021\", \"amount\": 123, \"sender\": \"c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea\", \"recipient\": \"33d9a97c1b37811c08cec98f2987f25e0b7ce69c205fde51157dc003469e2750\", \"transactionId\": \"2299a790b25d11eba5ffcf78a8c006d7\"}]','000f818845d74a73502975082204457038148503928985459091b3116463298c','0004b9ad223f7aba24db2379e403e4794532197135880798e1127ee5f4e4ca48',2437),(4,1620739930670,'[{\"date\": \"11/5/2021\", \"amount\": 10, \"sender\": \"system-reward\", \"recipient\": \"33d9a97c1b37811c08cec98f2987f25e0b7ce69c205fde51157dc003469e2750\", \"transactionId\": \"33a9f0d0b25d11eba5ffcf78a8c006d7\"}]','00092561f07af8eb71e129cd225aede1a7660441249b52bca54b6edf84a46997','000f818845d74a73502975082204457038148503928985459091b3116463298c',915);
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `key`
--

DROP TABLE IF EXISTS `key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `key` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privatekey` varchar(50) DEFAULT NULL,
  `publickey` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `key`
--

LOCK TABLES `key` WRITE;
/*!40000 ALTER TABLE `key` DISABLE KEYS */;
INSERT INTO `key` VALUES (1,'1ea67840b14811ebaf83a51b45471f1b','c503cc00d91539eaa146f656120311f64953394874d3466399a2e46c3382c4ea'),(2,'f4b65ff0b18d11ebbf915f7920a8a6ce','4dcea18faf577a21dde50c1e6931a3fa429c696c4ed1601f285db93cef0b2b2e'),(3,'3be2cee0b25b11eba0b38b0665aff0ab','8b03451292a63f3efb0141321fd1ba34c9a598e5ed3656bd1834364e62b807ed'),(4,'30f26760b25c11eba0b38b0665aff0ab','19f2a9ad7066e09bd9502c4f6b30719e88b1eed6ec427f868d57cf72209e3afc'),(5,'bed00010b25c11eba0b38b0665aff0ab','eb264a33061e436f62219aaaa270c30a5fb2fc528678d0565350792c7f19cc62'),(6,'fb644540b25c11eba5ffcf78a8c006d7','33d9a97c1b37811c08cec98f2987f25e0b7ce69c205fde51157dc003469e2750');
/*!40000 ALTER TABLE `key` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-11 20:36:58
