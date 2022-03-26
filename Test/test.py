import MySQLdb

conn = MySQLdb.connect(
    user="crawl_usr",
    passwd="test001",
    host="localhost",
    db="crawl_data"
)
print(type(conn))
cursor = conn.cursor()
print(type(cursor))

cursor.execute("DROP TABLE IF EXISTS words")
cursor.execute("CREATE TABLE words (word text, description text)")

word = "apple"
description = "사과"


cursor.execute(f"INSERT INTO words VALUES(\"{word}\",\"{description}\")")
conn.commit()
conn.close()