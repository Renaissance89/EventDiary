*-------------------------        Event Diary 		-------------------------*

Total Tables = 7

1] User      -1
2] Category  -2
3] Sponser   -3
4] Event
5] Register
6] Feedback
7] History



===================================================================================================================================

CREATE TABLE user
(
  id integer auto_increment primary key,
  firstName varchar(25),
  lastName varchar(25),
  email varchar(50),
  password varchar(100),
  phone varchar(20),
  city varchar(40),
  state varchar(40),
  gender varchar(10),
  role varchar(20),
  active integer DEFAULT 0,
  activationToken varchar(100),
  createdOn timestamp default current_timestamp
);

INSERT INTO user 
(firstName, lastName, email, password, phone, city, state, gender, role) values
('event', 'diary', 'admin@test.com', 'admin', 123456789, 'pune', 'maharashtra', 'Male', 'admin'),
('akash', 'awalkar', 'akash@test.com', 'test', 614662689, 'pune', 'maharashtra', 'Male', 'user'),
('akash', 'waichal', 'akashwaichal@test.com', 'test', 121546545, 'karad', 'maharashtra', 'Male', 'organizer'),
('pranjal', 'patil', 'pranjal@test.com', 'test', 564198456, 'kolhapur', 'maharashtra', 'Male', 'organizer'),
('adwait', 'patil', 'adwait@test.com', 'test', 614543532, 'sangli', 'maharashtra', 'Male', 'user');

===================================================================================================================================

CREATE TABLE category
(
  categoryId integer primary key auto_increment,
  categoryName varchar(25)
);

INSERT INTO category (categoryName) values
('Comedy'),
('Educational'),
('Music'),
('Tech Expo'),
('Social');

===================================================================================================================================

CREATE TABLE event (
  eventId int auto_increment primary key,
  eventName varchar(100),
  eventDescription varchar(5000),
  eventVenue varchar(50),
  eventLocation varchar(50),
  eventDate DATE,
  eventTime TIME,
  eventDuration TIME,
  eventCategoryId integer,
  eventOrganizerId integer,
  eventSponserId integer,
  eventFee varchar(10),
  active int default 1,
  eventCreatedOn timestamp DEFAULT current_timestamp,
  CONSTRAINT FK_EVENT_CATEGORY_ID FOREIGN KEY (eventCategoryId) references category(categoryId),
  CONSTRAINT FK_EVENT_USER_ID FOREIGN KEY (eventOrganizerId) references user(id),
  CONSTRAINT FK_EVENT_SPONSER_ID FOREIGN KEY (eventSponserId) references sponser(sponserId)
);

INSERT INTO event (eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId, active) values 
('Akash ki Comedy','Nice Comedy Event','Rajaram Stadium,Ichalkaranji', 'Ichalkaranji,Maharashtra','2020-09-20', '15:00:00','2:00:00','1', '500', '3', '1', '1');

===================================================================================================================================

CREATE TABLE register (
  registrationId integer auto_increment primary key,
  userId integer,
  eventId integer,
  quantity integer,
  paymentType varchar(25),
  paymentAmount varchar(10),
  paymentStatus boolean DEFAULT 0,
  registeredOn timestamp DEFAULT current_timestamp,
  CONSTRAINT FK_REGISTER_USER_ID FOREIGN KEY (userId) references user(id),
  CONSTRAINT FK_REGISTER_EVENT_ID FOREIGN KEY (eventId) references event(eventId)
);

INSERT INTO register (userId, eventId, quantity, paymentType, paymentAmount, paymentStatus) values 
('5','1','1', 'Credit Card','500', '1');


-- Query --
SELECT r.userId, r.eventId, u.firstName, u.lastName, u.email, u.city, u.state, e.eventName, e.eventDescription, e.eventVenue, e.eventFee, e.eventOrganizerId, r.quantity, r.paymentType, r.paymentAmount, r.paymentStatus FROM register r
INNER JOIN user u ON r.userId = u.id
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
  CONSTRAINT FK_FEEDBACK_USER_ID FOREIGN KEY (userId) references user(id),
  CONSTRAINT FK_FEEDBACK_EVENT_ID FOREIGN KEY (eventId) references event(eventId)
);

INSERT INTO feedback (userId, eventId, subject, message) values 
('5','1','Management', 'It was a great time. very nice show. Nice management');

===================================================================================================================================

CREATE TABLE history
(
  historyId integer primary key auto_increment,
  eventId integer,
  userId integer,
  sponserId integer,
  totalAudience integer,
  CONSTRAINT FK_HISTORY_EVENT_ID FOREIGN KEY (eventId) references event(eventId),
  CONSTRAINT FK_HISTORY_USER_ID FOREIGN KEY (userId) references user(id),
  CONSTRAINT FK_HISTORY_SPONSER_ID FOREIGN KEY (sponserId) references sponser(sponserId)
);

INSERT INTO history (eventId, userId, sponserId, totalAudience) values
('1', '5', '1', '435');

-- Query --
SELECT h.historyId, e.eventId, e.eventName, e.eventOrganizerId, e.eventVenue, u.id, u.firstName AS User F_Name, u.lastName AS User l_Name, u.email, 
s.firstName AS Sponser F_Name, s.lastName AS Sponser L_Name FROM history h
INNER JOIN event e ON e.eventId = h.eventId
INNER JOIN user u ON u.id = h.userId
INNER JOIN sponser s ON s.sponserId = h.sponserId;

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
  CONSTRAINT FK_SPONSER_USER_ID FOREIGN KEY (userId) references user(id)
)
INSERT INTO sponser (userId, firstName, lastName, email, phone,gender) values
('3','nidaan', 'gaddpawar', 'nidaan@test.com', 979166196, 'Male');

===================================================================================================================================
















