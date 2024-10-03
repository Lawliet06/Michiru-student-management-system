-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2024 at 09:00 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `students`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `joindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `joindate`) VALUES
(17, 'hg', 'lbihstonkaskuntha@gmail.com', '1234', '2024-10-02 20:16:37'),
(16, 'lk', 'lbistonkalsuntha@gmail.com', '1234', '2024-10-02 20:14:10'),
(15, 'hg', 'lbihstonkasuntha@gmail.com', '1234', '2024-10-02 20:13:27'),
(11, 'hjh', 'lbistonkasuntha@gmail.com', '1234', '2024-10-02 19:17:35'),
(14, 'jh', 'lbitonkasuntha@gmail.com', '1234', '2024-10-02 20:09:50'),
(13, 'jhj', 'lbistonksuntha@gmail.com', '1234', '2024-10-02 19:39:15'),
(12, 'jh', 'lbistonkasuntha@gmail.com', '1234', '2024-10-02 19:28:22'),
(18, 'hj', 'lbistonjhkasuntha@gmail.com', '1234', '2024-10-02 20:18:11'),
(19, 'jh', 'lbistonkkjasuntha@gmail.com', '1234', '2024-10-02 20:19:35'),
(20, 'kh', 'lbistonjhkkasuntha@gmail.com', '1234', '2024-10-02 20:20:33'),
(21, 'ggdfd', 'lbistonkasuntha@gmgdail.com', '1234', '2024-10-02 20:21:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(9) NOT NULL,
  `first_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `father_profession` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `mother_profession` varchar(255) NOT NULL,
  `father_contact` int NOT NULL,
  `mother_contact` int NOT NULL,
  `mobile_number` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `village` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `postal` varchar(255) NOT NULL,
  `full_address` varchar(255) NOT NULL,
  `joindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `dob`, `gender`, `father_name`, `father_profession`, `mother_name`, `mother_profession`, `father_contact`, `mother_contact`, `mobile_number`, `email`, `city`, `village`, `country`, `postal`, `full_address`, `joindate`) VALUES
('MVS/24/42', 'mary', 'james', '1995-11-16', 'Female', 'mbn', 'mnm', 'ass', 'sdd', 0, 0, 997767791, 'mary@gmail.com', 'Blantyre', 'fddsc', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 20:46:35'),
('MVS/24/66', 'yobu', 'khasu', '2007-06-06', 'Male', 'vf', 'mnm', 'ass', 'dssd', 0, 0, 997767791, 'yo@gmail.com', 'Blantyre', 'fddsc', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 09:33:46'),
('MVS/24/94', 'james', 'konu', '2006-07-15', 'Male', 'mbn', 'mnm', 'ass', 'dssd', 0, 0, 997767791, 'op@gmail.com', 'Blantyre', 'fddsc', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 18:24:54'),
('MVS/24/79', 'Lawrence', 'Biston Kasuntha', '2008-06-12', 'Male', 'mbn', 'mnm', 'ass', 'dssd', 0, 0, 997767791, 'l@gmail.com', 'Blantyre', 'fddsc', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 19:49:13'),
('MVS/24/36', 'Aisha', 'Mawecha', '2005-03-03', 'Female', 'mbn', 'mnm', 'kk', 'dssd', 0, 0, 997767791, 'uil@gmail.com', 'Blantyre', '', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 20:57:52'),
('MVS/24/75', 'Coufer', 'zimba', '1983-02-02', 'Male', 'mbn', 'mnm', 'wwq', 'dssd', 0, 0, 997767791, 'gfl@gmail.com', 'Blantyre', 'fddsc', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 20:59:03'),
('MVS/24/53', 'Higgings', 'Mawecha', '2010-05-03', 'Male', 'dssds', 'mnm', 'kk', 'sdd', 0, 0, 997767791, 'mbngl@gmail.com', 'Blantyre', 'fddsc', 'Malawi', 'Malawi, Blantyre', 'Malawi, Blantyre', '2024-10-03 21:00:09');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
