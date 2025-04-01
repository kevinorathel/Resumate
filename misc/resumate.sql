-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2025 at 09:42 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resumate`
--

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` bigint(20) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `year` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `degree`, `institution`, `year`, `user_id`) VALUES
(1, 'Master of Science, Computer Science', 'Clark University, Worcester, MA ', '2026-05-10 14:57:02.000000', 1),
(2, 'Bachelor of Technology in Computer Science Engineering', 'Rajagiri School of Engineering and Technology Kerala, India', '2021-06-01 14:57:59.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `id` bigint(20) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `description` varchar(1500) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`id`, `company`, `description`, `end_date`, `role`, `start_date`, `user_id`) VALUES
(1, 'RCG Global Services', '• Engineered and deployed RESTful APIs, optimizing data retrieval and reducing application load\r\ntimes.\r\n• Designed and implemented APIs to maintain pagination across various application pages.\r\n• Developed automated Excel report generation through new API endpoints, providing detailed data\r\ninsights.\r\n• Maintained and executed bug fixes on automated Excel sheets using back-end code.\r\n• Provided support and maintenance for application issues, ensuring smooth operation and user\r\nsatisfaction.\r\n• Designed and created databases and tables, ensuring clear and efficient relationships between\r\ndifferent data sets.\r\n• Debugged and resolved database-related issues, improving system reliability.\r\n• Implemented complex SQL queries with join conditions to support API functionality.\r\n• Created new tables and implemented POJO classes to seamlessly transition data from the database\r\nto back-end code.\r\n• Enhanced data security by encrypting critical user information with AES encryption, mitigating\r\npotential data breaches by 90% and ensuring regulatory compliance.\r\n• Managed and ensured smooth deployment across various environments.', '2024-07-01 14:58:39.000000', 'Software Engineer', '2023-06-05 14:58:39.000000', 1),
(2, 'SalesboxAI', '• Designed and implemented software for new features and functionality.\r\n• Developed and maintained web applications using Java, HTML, CSS, and JavaScript, ensuring SOC2 compliance.\r\n• Created DTOs and functions for processing mail bounces.\r\n• Contributed to developing a real-time chat feature, including sending, replying, and reacting to messages.\r\n• Investigated and resolved software defects, improving overall system reliability.\r\n• Assisted with troubleshooting and support, providing timely resolutions to technical issues.\r\n• Collaborated with team members to design and implement software solutions, fostering a cohesive development environment.\r\n• Improved system performance and scalability through code optimization and database tuning.\r\n• Participated in the full software development life cycle, from requirements gathering to deployment and maintenance.\r\n• Provided technical support for software applications and platforms, ensuring seamless operation for users.\r\n• Engaged in agile development methodologies and daily stand-up meetings, promoting efficient project management and communication.', '2023-05-31 15:02:01.000000', 'Backend Engineer', '2022-01-03 15:02:01.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` bigint(20) NOT NULL,
  `project_date` datetime(6) DEFAULT NULL,
  `project_description` varchar(1500) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `project_date`, `project_description`, `project_name`, `user_id`) VALUES
(1, '2024-12-10 15:03:05.000000', '• Created an application that allowed skilled labourers (specialists) to connect with\npotential clients\n• Implemented two distinct users for both client and specialist\n• Created a dashboard through which users can create posts whether they need a\nperson for hire or whether they are open to work\n• Bidding option was added for Specialists where they can bid their working hourly\nrates to their clients', 'Skillbridge', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `linked_in` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `linked_in`, `location`, `password`, `phone`, `summary`, `website`) VALUES
(1, 'kevin.orathel@gmail.com', 'Kevin Mathew', 'Joseph', 'https://www.linkedin.com/in/kevin-joseph-360630208/', 'Worcester, MA', 'kevin123', '+1 (508) 926-9729', 'Motivated and detail-oriented software developer with expertise in Java, HTML, JavaScript, Typescript, and\r\nCSS. Experienced in both front-end and back-end development, seeking to take the next career step with a\r\nrespected firm.', 'https://github.com/kevinorathel');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKaw3ebf3585a1ndgqnk6k6hosc` (`user_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK41lup37auw1bvwwqpgn0blbic` (`user_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKo06v2e9kuapcugnyhttqa1vpt` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `education`
--
ALTER TABLE `education`
  ADD CONSTRAINT `FKaw3ebf3585a1ndgqnk6k6hosc` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `FK41lup37auw1bvwwqpgn0blbic` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FKo06v2e9kuapcugnyhttqa1vpt` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
