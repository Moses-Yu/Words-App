// // word = ["apple\r"]
// // console.log(word);
// // word[0] = word[0].replace(/\r/g,'')
// // console.log(word);

const { pool } = require("./database");
// const run = async () => {
//   let keyword = "resume";
//   try {
//     const connection = await pool.getConnection(async (conn) => conn);

//     try {
//       const searchWordQuery = "select * from words";
//     //   const searchWordParams = [keyword];

//       const [row] = await connection.query(searchWordQuery);
//       connection.release();

//       if (row[0].word == keyword) {
//         existing = true;
//       }

//       console.log(row);
//     } catch (err) {
//       console.error(` ##### insertWord Query error ##### `,err);
//       connection.release();
//       return false;
//     }
//   } catch (err) {
//     console.error(` ##### insertWord DB error #####`);
//     return false;
//   }
// };

// run()

// const {updateWord} = require("./controller");
// const { getWordFromHtml } = require("./crawling");
// // getWordFromHtml('resume')
// const run = updateWord('occur');
// run

const run = async () => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const tableName = "moses1_table";
      const insertUserQuery =
        "CREATE TABLE " +
        tableName +
        "(word_id int NOT NULL AUTO_INCREMENT, word varchar(45) NOT NULL, meaning varchar(1000) NOT NULL, pron varchar(45) DEFAULT NULL, types varchar(45) DEFAULT NULL, meaning_deep varchar(4000) DEFAULT NULL, meaning_deep_kr varchar(4000) DEFAULT NULL, sound_url varchar(1000) DEFAULT NULL, PRIMARY KEY (word_id));";

      const [row] = await connection.query(insertUserQuery);
      connection.release();
        console.log('success');
    } catch (err) {
      console.error(` ##### insertWord Query error ##### `);
      console.log(err);
      connection.release();
    }
  } catch (err) {
    console.error(` ##### insertWord DB error #####`);
  }
};

run();
