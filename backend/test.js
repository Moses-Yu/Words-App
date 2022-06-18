// // word = ["apple\r"]
// // console.log(word);
// // word[0] = word[0].replace(/\r/g,'')
// // console.log(word);


// const { pool } = require("./database");
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