*-------------------------        Event Diary 		  -------------------------*

Total Tables = 7

1] User      - 1
2] Category  - 2
3] Sponser   - 3
4] Event     - 4
5] Register  - 5
6] Feedback  - 6
7] History   - 7

Note:- Create Tables in given sequence only.
===================================================================================================================================
-- mysql -u root -proot

CREATE DATABASE eventdiary;

use eventdiary;



-- For disabling foreign key from all table
-- SET FOREIGN_KEY_CHECKS = 0;


-- active = 0  means user account not activated, payment status not done, event not active
-- active = 1  means user account active, payment status done, event active
===================================================================================================================================

CREATE TABLE user
(
  userId integer auto_increment primary key,
  firstName varchar(100),
  lastName varchar(100),
  email varchar(100) UNIQUE,
  password varchar(100),
  phone varchar(20),
  city varchar(50),
  state varchar(50),
  gender varchar(10),
  role varchar(10),
  active integer DEFAULT 0,
  activationToken varchar(100),
  createdOn timestamp default current_timestamp
);

INSERT INTO user 
(firstName, lastName, email, password, phone, city, state, gender, role, active) values
('Event', 'Diary', 'admin', 'admin', 123456789, 'pune', 'maharashtra', 'Male', 'admin', '1'),
('akash', 'awalkar', 'akash@test.com', 'test', 614662689, 'pune', 'maharashtra', 'Male', 'user', '0'),
('akash', 'waichal', 'akashwaichal@test.com', 'test', 121546545, 'karad', 'maharashtra', 'Male', 'organizer', '0'),
('pranjal', 'patil', 'pranjal@test.com', 'test', 564198456, 'kolhapur', 'maharashtra', 'Male', 'user', '0'),
('sonali', 'bhapkar', 'sonali@test.com', 'test', 916424487, 'satara', 'maharashtra', 'Female', 'organizer', '0');

===================================================================================================================================

CREATE TABLE category
(
  categoryId integer primary key auto_increment,
  categoryName varchar(50),
  categoryDescription varchar(500),
  createdOn timestamp default current_timestamp
);

INSERT INTO category (categoryName, categoryDescription) values
('Comedy', 'Laughter'),
('Educational', 'Gathering Event'),
('Food and Drinks', 'Food Drinks'),
('Music', 'Sunburn Festival'),
('Tech Expo', 'Science Exibhition, Tech Fest'),
('Social', 'Blood Donation, Swacchata Abhiyan');

===================================================================================================================================

CREATE TABLE sponser 
(
  sponserId integer primary key auto_increment,
  userId int,
  firstName varchar(25),
  lastName varchar(25),
  email varchar(50),
  phone varchar(20),
  gender varchar(10),
  createdOn timestamp default current_timestamp,
  CONSTRAINT FK_SPONSER_USER_ID FOREIGN KEY (userId) references user(userId) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO sponser (userId, firstName, lastName, email, phone, gender) values
('3','nidaan', 'gaddpawar', 'nidaan@test.com', 979166196, 'Male'),
('7','virendra', 'tiwari', 'virendra@test.com', 196568996, 'Male');

===================================================================================================================================

CREATE TABLE event (
  eventId integer auto_increment primary key,
  eventName varchar(150),
  eventDescription varchar(5000),
  eventVenue varchar(100),
  eventLocation varchar(100),
  eventDate DATE,
  eventTime TIME,
  eventDuration TIME,
  eventCategoryId integer,
  eventOrganizerId integer,
  eventSponserId integer,
  eventFee varchar(10),
  eventImage varchar(150),
  active integer default 0,
  eventCreatedOn timestamp DEFAULT current_timestamp,
  CONSTRAINT FK_EVENT_CATEGORY_ID FOREIGN KEY (eventCategoryId) references category(categoryId) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_EVENT_USER_ID FOREIGN KEY (eventOrganizerId) references user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_EVENT_SPONSER_ID FOREIGN KEY (eventSponserId) references sponser(sponserId) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO event (eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId, active, eventImage) values 
('Akash ki Comedy','Nice Comedy Event','Rajaram Stadium,Ichalkaranji', 'Ichalkaranji,Maharashtra','2020-09-20', '15:00:00','2:00:00','1', '500', '3', '1', '0', ''),
('Blood Donation','Donate Blood, Save Lives','Apollo Hospital,Ichalkaranji', 'Ichalkaranji,Maharashtra','2020-10-20', '09:00:00','3:00:00','5', 'Free', '7', '2', '0', '');

===================================================================================================================================

CREATE TABLE register (
  registrationId integer auto_increment primary key,
  userId integer,
  eventId integer,
  quantity integer,
  totalAmount integer,
  paymentType varchar(30),
  paymentAmount varchar(10),
  paymentStatus integer DEFAULT 0,
  registeredOn timestamp DEFAULT current_timestamp,
  CONSTRAINT FK_REGISTER_USER_ID FOREIGN KEY (userId) references user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_REGISTER_EVENT_ID FOREIGN KEY (eventId) references event(eventId) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO register (userId, eventId, quantity, totalAmount, paymentType, paymentAmount, paymentStatus) values 
(12,1,2,500,'Credit Card',1000, 1);


-- Query --
SELECT r.userId, r.eventId, u.firstName, u.lastName, u.email, u.city, u.state, e.eventName, e.eventDescription, e.eventVenue, e.eventFee, e.eventOrganizerId, r.quantity, r.paymentType, r.paymentAmount, r.paymentStatus FROM register r
INNER JOIN user u ON r.userId = u.userId
INNER JOIN event e ON r.eventId = e.eventId;

===================================================================================================================================

CREATE TABLE feedback 
(
  feedbackId integer primary key auto_increment,
  userId integer,
  eventId integer,
  subject varchar(100),
  message varchar(5000),
  createdOn timestamp default current_timestamp,
  CONSTRAINT FK_FEEDBACK_USER_ID FOREIGN KEY (userId) references user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_FEEDBACK_EVENT_ID FOREIGN KEY (eventId) references event(eventId) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO feedback (userId, eventId, subject, message) values 
('5','1','Management', 'It was a great time. very nice show. Nice management'),
('6','2','Feeling Nice', 'Feeling Awesome');

===================================================================================================================================

CREATE TABLE history
(
  historyId integer primary key auto_increment,
  eventId integer,
  userId integer,
  sponserId integer,
  totalAudience integer,
  CONSTRAINT FK_HISTORY_EVENT_ID FOREIGN KEY (eventId) references event(eventId) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_HISTORY_USER_ID FOREIGN KEY (userId) references user(userId) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_HISTORY_SPONSER_ID FOREIGN KEY (sponserId) references sponser(sponserId) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO history (eventId, userId, sponserId, totalAudience) values
('1', '5', '1', '435'),
('2', '7', '2', '125');

-- Query --
SELECT h.historyId, e.eventId, e.eventName, e.eventOrganizerId, e.eventVenue, u.userId, u.firstName AS User F_Name, u.lastName AS User l_Name, u.email, 
s.firstName AS Sponser F_Name, s.lastName AS Sponser L_Name FROM history h
INNER JOIN event e ON e.eventId = h.eventId
INNER JOIN user u ON u.userId = h.userId
INNER JOIN sponser s ON s.sponserId = h.sponserId;

===================================================================================================================================

-- Working on this

CREATE TABLE eventAddress
(
  addressId integer primary key auto_increment,
  eventId integer,
  eventVenue varchar(50),
  eventLocation varchar(50),
  CONSTRAINT FK_ADDRESS_EVENT_ID FOREIGN KEY (eventId) references event(eventId) ON DELETE CASCADE ON UPDATE CASCADE
);




















