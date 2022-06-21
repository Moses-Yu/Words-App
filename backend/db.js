const { pool } = require("./database");

exports.deleteWordById = async function (id, userName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery =
        "DELETE FROM " + userName + "_table WHERE (word_id = ?);";
      const selectUserParams = [id];

      const [row] = await connection.query(selectUserQuery, selectUserParams);
      connection.release();
      // return row;
      return true;
    } catch (err) {
      console.error(` ##### deleteWordById Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### deleteWordById DB error #####`);
    console.log(err);
    return false;
  }
};

exports.selectUser = async function (userName, password) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery =
        "select * from users where userName = ? and password = ?";
      const selectUserParams = [userName, password];

      const [row] = await connection.query(selectUserQuery, selectUserParams);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### selectUser Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectUser DB error #####`);
    console.log(err);
    return false;
  }
};

exports.selectUserWordList = async function (userName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery = "select * from " + userName + "_table";
      const [row] = await connection.query(selectUserQuery);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### selectUserWordList Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectUserWordList DB error #####`);
    console.log(err);
    return false;
  }
};

exports.wordTable = async function (userName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery = "select * from words";
      const [row] = await connection.query(selectUserQuery);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### wordTable Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### wordTable DB error #####`);
    console.log(err);
    return false;
  }
};

exports.selectUserByUserName = async function (userName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery = "select * from users where userName = ?";
      const selectUserParams = [userName];

      const [row] = await connection.query(selectUserQuery, selectUserParams);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### selectUser Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### selectUser DB error #####`);
    console.log(err);
    return false;
  }
};

exports.searchWordInMyPage = async function (userName, word) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const selectUserQuery =
        "select * from " + userName + "_table where word = ?";
      const selectUserParams = [word];
      const [row] = await connection.query(selectUserQuery, selectUserParams);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### searchWordInMyPage Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### searchWordInMyPage DB error #####`);
    console.log(err);
    return false;
  }
};

exports.insertWordInMyPage = async function (userName, word) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const userQuery =
        "insert into " +
        userName +
        "_table (word, meaning, pron, types, meaning_deep, meaning_deep_kr, sound_url) values (?,?,?,?,?,?,?);";
      const userParams = [
        word.word,
        word.meaning,
        word.pron,
        word.types,
        word.meaning_deep,
        word.meaning_deep_kr,
        word.sound_url,
      ];
      const [row] = await connection.query(userQuery, userParams);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### insertWordInMyPage Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### insertWordInMyPage DB error #####`);
    console.log(err);
    return false;
  }
};
