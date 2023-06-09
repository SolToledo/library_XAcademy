CREATE TABLE Users(
	id int not null primary key auto_increment,
	name varchar(100) not null,
	lastname varchar(100),
	email varchar(150),
  password varchar(150)
)

CREATE TABLE Libraries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

CREATE TABLE Books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  isbn VARCHAR(255) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  year INT,
  libraryId INT,
  FOREIGN KEY (libraryId) REFERENCES Libraries(id)
);


