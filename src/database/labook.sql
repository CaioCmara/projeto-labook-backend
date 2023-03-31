-- Active: 1680298533150@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
    );

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    posts(
        id TEXT NOT NULL UNIQUE,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

SELECT * FROM posts;

DROP TABLE posts;

CREATE TABLE
    likesDislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        has_like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

SELECT * FROM "likesDislikes";

DROP TABLE "likesDislikes";

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "u001",
        "Caio",
        "caio1801@gmail.com",
        "marleylindo20",
        "admin"
    ), (
        "u002",
        "Marley",
        "cachorro@hotmail.com",
        "biscoito123",
        "normal"
    );

INSERT INTO
    posts(
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VAlUES (
        "p001",
        "u001",
        "Tenho o cachorro mais lindo do mundo",
        2210,
        0
    ), (
        "p002",
        "u001",
        "Esporte Clube Vitoria",
        1,
        49254
    ), ("p003", "u002", "Auu", 942, 339);

INSERT INTO
    "likesDislikes"(user_id, post_id, has_like)
VALUES ("u001", "p002", 1), ("u001", "p001", 1), ("u002", "p001", 0);

 
 SELECT 
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;
