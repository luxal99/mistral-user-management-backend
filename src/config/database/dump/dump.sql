-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: user_management
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` enum('CAN_SEE_CODE','CAN_SEE_DESCRIPTION') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'CAN_SEE_CODE'),(2,'CAN_SEE_DESCRIPTION');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `id_user_info` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `id_user_info` (`id_user_info`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_user_info`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin',1,'$2b$10$Z5eYmfJUhOiJDPIpV7OdHOXOUede6TmawnRrc5xJug1FGG3gRJh5i'),(9,'nakic998',14,'$2b$10$diyPan.sp4GSqBeKEvx2yO/nD4o0NRSn7WjueUOz278qrpGY3U/ma'),(10,'srkic76',15,'$2b$10$vu9taVh4X5dvwciMPgXne.cbN5zjFFEx.MtuBkT5.arOTEBnFhk42'),(12,'milenak',17,'$2b$10$uTiO4mMqy4fG0FA70TnIUOJHTG.lV9gto4dPuojCTD5jyrBi4Xy.6'),(20,'jelena98',27,'$2b$10$GR4kTN36OYi3Q3tcSqRvquYB47ty6yNj4TiPBdmvdji4n9nu3uLTW'),(21,'marko.jankovic',28,'$2b$10$8DquoYMIR4IxYsBTkk1YcObcP69SRlLLiaZFXCDS/tXRZSlij.28W');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','CREATED') DEFAULT 'CREATED',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'Aleksa','Lukic','lukicaleksa04@gmail.com','ACTIVE'),(9,'Aleksa','Lukic','lukic.aleksa@example.com','CREATED'),(12,'Goran','Milosevic','mail2@gmail.com','CREATED'),(13,'Nikola','Petrovic','nikip98@gmail.com','CREATED'),(14,'Natasa','Petrovic','nakipp@gmail.com','CREATED'),(15,'Srdjan','Djokic','srki993@gmail.com','CREATED'),(16,'Mladen','Jovanovic','jovanovic76@gmail.com','CREATED'),(17,'Milena','Krstic','miksi56@gmail.com','INACTIVE'),(18,'David','Draskovic','davidd34@gmail.com','CREATED'),(19,'Danijela','Jovic','djovic@gmail.com','CREATED'),(20,'Danilo','Djurdjevic','ddanilo66@gmali.com','CREATED'),(21,'Nemanja','Milic','milen@gmai.com','CREATED'),(22,'ewqewqe','ewqeqew','ewqewqeq','CREATED'),(25,'dqwdqwdq','dwqdqwdq','qcqdwqdwq','CREATED'),(26,'dqwqdwq','dqdwqdq','qwqdwq','CREATED'),(27,'Jelena','ilic','jelena.ili@gmail.com','CREATED'),(28,'Marko','Jankovic','marko.jankovic@gmail.com','CREATED');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions_permission`
--

DROP TABLE IF EXISTS `user_permissions_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions_permission` (
  `userId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`permissionId`),
  KEY `IDX_5b72d197d92b8bafbe7906782e` (`userId`),
  KEY `IDX_c43a6a56e3ef281cbfba9a7745` (`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions_permission`
--

LOCK TABLES `user_permissions_permission` WRITE;
/*!40000 ALTER TABLE `user_permissions_permission` DISABLE KEYS */;
INSERT INTO `user_permissions_permission` VALUES (1,1),(1,2),(9,1);
/*!40000 ALTER TABLE `user_permissions_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-04 19:49:29
