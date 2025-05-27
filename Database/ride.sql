select * from student;

create database ridesharingapplication;
use ridesharingapplication;

select * from  users;
select * from  ride_feedback;
select * from  booked_rides;
select * from  payments;
select * from  vehicle;
select * from driver;
SELECT * FROM driver WHERE username = 'Arun';




ALTER TABLE booked_rides ADD CONSTRAINT FK_driver FOREIGN KEY (driver_id) REFERENCES users (id);

SELECT username, COUNT(*)
FROM users
GROUP BY username

HAVING COUNT(*) > 1;

ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);

SELECT * FROM booked_rides WHERE user_id =1;


ALTER TABLE users DROP last_logout_time;
ALTER TABLE users ADD COLUMN last_logout_time TIMESTAMP;



