SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `eventdiary`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`dac`@`localhost` PROCEDURE `sp_add_event` (IN `eventName` VARCHAR(150), IN `eventDescription` VARCHAR(5000), IN `eventVenue` VARCHAR(100), IN `eventLocation` VARCHAR(100), IN `eventDate` DATE, IN `eventTime` TIME, IN `eventDuration` TIME, IN `eventCategoryId` INT, IN `eventOrganizerId` INT, IN `eventSponserId` INT, IN `eventFee` VARCHAR(10), IN `eventImage` VARCHAR(150), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `email` VARCHAR(50), IN `phone` VARCHAR(50), IN `gender` VARCHAR(50))  BEGIN

    INSERT INTO sponser (userId, firstName, lastName, email, phone, gender) values (eventOrganizerId, firstName, lastName, email, phone, gender);
 
    INSERT INTO event (eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventOrganizerId,
    eventSponserId, eventFee, eventImage) values 
    (eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, 
    eventSponserId, eventImage);
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) DEFAULT NULL,
  `categoryDescription` varchar(500) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `categoryDescription`) VALUES
(1, 'Comedy', 'Laughter'),
(2, 'Educational', 'Gathering Event'),
(3, 'Food and Drinks', 'Food Drinks'),
(4, 'Music', 'Sunburn Festival');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventId` int(11) NOT NULL,
  `eventName` varchar(150) DEFAULT NULL,
  `eventDescription` varchar(5000) DEFAULT NULL,
  `eventVenue` varchar(100) DEFAULT NULL,
  `eventLocation` varchar(100) DEFAULT NULL,
  `eventDate` date DEFAULT NULL,
  `eventTime` time DEFAULT NULL,
  `eventDuration` time DEFAULT NULL,
  `eventCategoryId` int(11) DEFAULT NULL,
  `eventOrganizerId` int(11) DEFAULT NULL,
  `eventSponserId` int(11) DEFAULT NULL,
  `eventFee` varchar(10) DEFAULT NULL,
  `eventImage` varchar(150) DEFAULT NULL,
  `active` int(11) DEFAULT '0',
  `eventCreatedOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventId`, `eventName`, `eventDescription`, `eventVenue`, `eventLocation`, `eventDate`, `eventTime`, `eventDuration`, `eventCategoryId`, `eventOrganizerId`, `eventSponserId`, `eventFee`, `eventImage`, `active`) VALUES
(1, 'Akash ki Comedy', 'Nice Comedy Event', 'Rajaram Stadium,Ichalkaranji', 'Ichalkaranji,Maharashtra', '2020-09-20', '15:00:00', '02:00:00', 1, 8, 1, '500', '08b83b48694feb6284d5a4d745c7ea81', 1),
(7, 'Sunburn Festival', 'Dance Show', 'Amanora Park', 'Pune, Maharashtra', '2021-01-17', '20:00:00', '04:00:00', 4, 8, NULL, '1000', 'ddb23074d3d3e9e20776fd6db15153ec', 1),
(11, 'Circus', 'Hiiiiii', 'Bharati Bhavan', 'Sangli', '2021-01-27', '04:42:00', '01:39:00', 2, 8, NULL, '10', 'b1f125fe008cd7dd0c12bbf20730fb3b', 0);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `message` varchar(5000) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedbackId`, `userId`, `eventId`, `subject`, `message`) VALUES
(1, 5, 1, 'Management', 'It was a great time. very nice show. Nice management');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `historyId` int(11) NOT NULL,
  `eventId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `sponserId` int(11) DEFAULT NULL,
  `totalAudience` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`historyId`, `eventId`, `userId`, `sponserId`, `totalAudience`) VALUES
(1, 1, 3, 1, 435);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `registrationId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalAmount` int(11) DEFAULT NULL,
  `paymentType` varchar(30) DEFAULT NULL,
  `paymentAmount` varchar(10) DEFAULT NULL,
  `paymentStatus` int(11) DEFAULT '0',
  `registeredOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`registrationId`, `userId`, `eventId`, `quantity`, `totalAmount`, `paymentType`, `paymentAmount`, `paymentStatus`) VALUES
(1, 5, 1, 1, 500, 'Credit Card', '500', 1),
(42, 8, 1, 1, 500, NULL, '500', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sponser`
--

CREATE TABLE `sponser` (
  `sponserId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(25) DEFAULT NULL,
  `lastName` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sponser`
--

INSERT INTO `sponser` (`sponserId`, `userId`, `firstName`, `lastName`, `email`, `phone`, `gender`) VALUES
(1, 3, 'nidaan', 'gaddpawar', 'nidaan@test.com', '979166196', 'Male'),
(2, 7, 'virendra', 'tiwari', 'virendra@test.com', '196568996', 'Male'),
(3, 7, 'prasad', 'veer', 'prasad@test.com', '999999999', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `active` int(11) DEFAULT '0',
  `activationToken` varchar(100) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `email`, `password`, `phone`, `city`, `state`, `gender`, `role`, `active`, `activationToken`) VALUES
(1, 'Event', 'Diary', 'admin', 'admin', '123456789', 'pune', 'maharashtra', 'Male', 'admin', 1, NULL),
(2, 'akash', 'awalkar', 'akash@test.com', 'test', '614662689', 'pune', 'maharashtra', 'Male', 'user', 1, NULL),
(3, 'akash', 'waichal', 'akashwaichal@test.com', 'test', '121546545', 'karad', 'maharashtra', 'Male', 'organizer', 1, ''),
(4, 'pranjal', 'patil', 'pranjal@test.com', 'test', '564198456', 'kolhapur', 'maharashtra', 'Male', 'organizer', 1, ''),
(5, 'adwait', 'patil', 'adwait@test.com', 'test', '614543532', 'sangli', 'maharashtra', 'Male', 'user', 1, NULL),
(6, 'sonali', 'bhapkar', 'sonali@test.com', 'test', '916424487', 'satara', 'maharashtra', 'Female', 'user', 1, ''),
(7, 'soniya', 'patil', 'soniya@test.com', 'test', '982568936', 'kalyan', 'maharashtra', 'Female', 'organizer', 1, ''),
(8, 'Akash', 'Avalkar', 'akashawalkar2000@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '123456', 'Ichi', 'Maharashtra', 'Male', 'organizer', 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventId`),
  ADD KEY `FK_EVENT_CATEGORY_ID` (`eventCategoryId`),
  ADD KEY `FK_EVENT_USER_ID` (`eventOrganizerId`),
  ADD KEY `FK_EVENT_SPONSER_ID` (`eventSponserId`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackId`),
  ADD KEY `FK_FEEDBACK_USER_ID` (`userId`),
  ADD KEY `FK_FEEDBACK_EVENT_ID` (`eventId`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`historyId`),
  ADD KEY `FK_HISTORY_EVENT_ID` (`eventId`),
  ADD KEY `FK_HISTORY_USER_ID` (`userId`),
  ADD KEY `FK_HISTORY_SPONSER_ID` (`sponserId`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`registrationId`),
  ADD KEY `FK_REGISTER_USER_ID` (`userId`),
  ADD KEY `FK_REGISTER_EVENT_ID` (`eventId`);

--
-- Indexes for table `sponser`
--
ALTER TABLE `sponser`
  ADD PRIMARY KEY (`sponserId`),
  ADD KEY `FK_SPONSER_USER_ID` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedbackId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `historyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `registrationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `sponser`
--
ALTER TABLE `sponser`
  MODIFY `sponserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `FK_EVENT_CATEGORY_ID` FOREIGN KEY (`eventCategoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_EVENT_SPONSER_ID` FOREIGN KEY (`eventSponserId`) REFERENCES `sponser` (`sponserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_EVENT_USER_ID` FOREIGN KEY (`eventOrganizerId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `FK_FEEDBACK_EVENT_ID` FOREIGN KEY (`eventId`) REFERENCES `event` (`eventId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_FEEDBACK_USER_ID` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK_HISTORY_EVENT_ID` FOREIGN KEY (`eventId`) REFERENCES `event` (`eventId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_HISTORY_SPONSER_ID` FOREIGN KEY (`sponserId`) REFERENCES `sponser` (`sponserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_HISTORY_USER_ID` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `register`
--
ALTER TABLE `register`
  ADD CONSTRAINT `FK_REGISTER_EVENT_ID` FOREIGN KEY (`eventId`) REFERENCES `event` (`eventId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_REGISTER_USER_ID` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sponser`
--
ALTER TABLE `sponser`
  ADD CONSTRAINT `FK_SPONSER_USER_ID` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
