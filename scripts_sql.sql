CREATE TABLE players 
(
    id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(20) NOT NULL,
    phone VARCHAR(15),
    name VARCHAR(30) NOT NULL,
    password VARCHAR(10) NOT NULL,
    date DATETIME,
	primary key (id)
);

go

CREATE TABLE score (
    id_score INT PRIMARY KEY,
    id_user INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES players(id)
);

go