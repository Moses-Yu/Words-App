alter table words ADD sound_url nvarchar(1000) null;

ALTER TABLE words ADD COLUMN meaning_deep_kr VARCHAR(1000) AFTER meaning_deep;

ALTER TABLE words DROP meaning_deep_kr;

SELECT * FROM words;

select * from words where word = "resume";

drop table words;

CREATE TABLE `words` (
  `word_id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(45) NOT NULL,
  `meaning` varchar(1000) NOT NULL,
  `pron` varchar(45) DEFAULT NULL,
  `types` varchar(45) DEFAULT NULL,
  `meaning_deep` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sound_url` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;