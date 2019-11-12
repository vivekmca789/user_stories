-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 10, 2019 at 01:59 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_stories`
--

-- --------------------------------------------------------

--
-- Table structure for table `students_datas`
--

CREATE TABLE `students_datas` (
  `studentId` int(11) NOT NULL,
  `studentName` varchar(150) DEFAULT NULL,
  `studentEmailId` varchar(150) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `is_Suspend` enum('Yes','No') NOT NULL DEFAULT 'No',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0-Inactive, 1-Active',
  `createDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students_datas`
--

INSERT INTO `students_datas` (`studentId`, `studentName`, `studentEmailId`, `teacherId`, `is_Suspend`, `status`, `createDate`, `updateDate`) VALUES
(1, NULL, 'testing1@mail.com', 1, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(2, NULL, 'testing2@mail.com', 1, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(3, NULL, 'testing4@mail.com', 1, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(4, NULL, 'testing3@mail.com', 1, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(5, NULL, 'test1@mail.com', 2, 'Yes', 1, '2019-11-10 10:38:19', '2019-11-10 01:35:17'),
(6, NULL, 'test2@mail.com', 2, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(7, NULL, 'test3@mail.com', 2, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(8, NULL, 'test4@mail.com', 2, 'No', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19');

-- --------------------------------------------------------

--
-- Table structure for table `teachers_datas`
--

CREATE TABLE `teachers_datas` (
  `teacherId` int(11) NOT NULL,
  `teacherName` varchar(150) DEFAULT NULL,
  `teacherEmailId` varchar(150) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0 - Inactive, 1 - Active',
  `createDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers_datas`
--

INSERT INTO `teachers_datas` (`teacherId`, `teacherName`, `teacherEmailId`, `status`, `createDate`, `updateDate`) VALUES
(1, NULL, 'testing@gmail.com', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19'),
(2, NULL, 'test@gmail.com', 1, '2019-11-10 10:38:19', '2019-11-10 10:38:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students_datas`
--
ALTER TABLE `students_datas`
  ADD PRIMARY KEY (`studentId`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `teachers_datas`
--
ALTER TABLE `teachers_datas`
  ADD PRIMARY KEY (`teacherId`),
  ADD UNIQUE KEY `teacherEmailId` (`teacherEmailId`),
  ADD KEY `teacherId` (`teacherId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students_datas`
--
ALTER TABLE `students_datas`
  MODIFY `studentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `teachers_datas`
--
ALTER TABLE `teachers_datas`
  MODIFY `teacherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
