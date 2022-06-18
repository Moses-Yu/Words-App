const { pool } = require("./database");
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