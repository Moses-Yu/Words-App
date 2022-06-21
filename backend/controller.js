const crawling = require("./crawling");
const { pool } = require("./database");
const db = require("./db");

exports.deleteWordFromUser = async (req, res) => {
  console.log("deleteWordFromUser");
  const { word_id, userName } = req.body;
  console.log(word_id, userName);
  const result = await db.deleteWordById(word_id, userName);
  if (result) {
    // console.log("delete Success");
    res.send({
      isSuccess: true,
      message: "단어를 삭제하였습니다.",
    });
  } else {
    res.send({
      isSuccess: false,
      message: "단어삭제에 실패하였습니다.",
    });
  }
};

exports.userWordList = async (req, res) => {
  console.log("userWordList");
  const userName = req.params.userName;
  const result = await db.selectUserWordList(userName);
  if (result) {
    if (result == 0) {
      res.send({
        isSuccess: false,
        message: "단어목록이 없습니다.",
        result: result,
      });
    } else {
      res.send({
        isSuccess: true,
        message: "단어목록을 불러왔습니다.",
        result: result,
      });
    }
  } else {
    res.send({
      isSuccess: false,
      message: "단어목록이 없습니다.",
    });
  }
};

exports.wordTableList = async (req, res) => {
  console.log("wordTableList");
  const userName = req.params.userName;
  const result = await db.wordTable(userName);
  if (result) {
    if (result == 0) {
      res.send({
        isSuccess: false,
        message: "단어목록이 없습니다.",
        result: result,
      });
    } else {
      res.send({
        isSuccess: true,
        message: "단어목록을 불러왔습니다.",
        result: result,
      });
    }
  } else {
    res.send({
      isSuccess: false,
      message: "단어목록이 없습니다.",
    });
  }
};

exports.addWordToMyPage = async (req, res) => {
  console.log("addWordToMyPage");
  const word = req.body.word;
  const userName = req.body.userName;

  const isExist = await db.searchWordInMyPage(userName, word.word);
  // console.log(isExist);
  if (isExist.length > 0) {
    res.send({
      isSuccess: false,
      message: "단어장에 이미 추가되었습니다.",
    });
  } else {
    const addWord = db.insertWordInMyPage(userName, word);
    if (!addWord) {
      res.send({
        isSuccess: false,
        message: "단어장 추가를 실패하였습니다.",
      });
    } else {
      // console.log("success");
      res.send({
        isSuccess: true,
        message: "단어장에 추가 하였습니다.",
      });
    }
  }
};

exports.signUp = async (req, res) => {
  console.log("signUp");
  const { userName, password } = req.body;
  const isExist = await db.selectUserByUserName(userName);
  const tableName = userName + "_table";
  console.log(isExist);
  if (isExist.length > 0) {
    res.send({ isSuccess: false, message: "아이디 중복" });
  } else {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const userQuery =
          "insert into users (userName, password) values (?,?);";
        const userParams = [userName, password];
        const [row] = await connection.query(userQuery, userParams);
        connection.release();
      } catch (err) {
        console.error(` ##### insertWord Query error ##### `);
        console.log(err);
        connection.release();
      }
    } catch (err) {
      console.error(` ##### insertWord DB error #####`);
    }

    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const insertUserQuery =
          "CREATE TABLE " +
          tableName +
          "(word_id int NOT NULL AUTO_INCREMENT, word varchar(45) NOT NULL, meaning varchar(1000) NOT NULL, pron varchar(45) DEFAULT NULL, types varchar(45) DEFAULT NULL, meaning_deep varchar(4000) DEFAULT NULL, meaning_deep_kr varchar(4000) DEFAULT NULL, sound_url varchar(1000) DEFAULT NULL, PRIMARY KEY (word_id),UNIQUE KEY word_id_UNIQUE (word_id));";
        const [row] = await connection.query(insertUserQuery);
        connection.release();
        res.send({ isSuccess: true });
      } catch (err) {
        console.error(` ##### insertWord Query error ##### `);
        console.log(err);
        connection.release();
      }
    } catch (err) {
      console.error(` ##### insertWord DB error #####`);
    }
  }
};

exports.searchWord = async (req, res) => {
  console.log("searchWord");
  const keyword = req.params.word;
  let word;
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const searchWordQuery = "select * from words where word = ?";
      const searchWordParams = [keyword];

      const [row] = await connection.query(searchWordQuery, searchWordParams);
      connection.release();
      console.log(row);
      word = row[0];
      //   res.send(row[0]);
    } catch (err) {
      console.error(` ##### searchWord Query error ##### `, err);
      connection.release();
      res.send.err(err);
      return false;
    }
  } catch (err) {
    console.error(` ##### searchWord DB error #####`);
    console.log(err);
    res.send(err);
  }

  if (word) {
    res.send({ 
      result: word,
      isSuccess:true,
      message: "db에서 단어 검색 성공"
    });
  } else {
    const wordFromDb = await crawling.getWordFromHtml(keyword);
    if (wordFromDb) {
      res.send({
        isSuccess: true,
        result: wordFromDb,
        message: "단어 검색 성공",
      });
    } else {
      res.send({
        isSuccess: false,
        message: "단어를 검색할 수 없습니다.",
      });
    }
  }
};

exports.addWord = async (keyword) => {
  const word = getWordFromHtml(keyword);

  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertUserQuery =
        "insert into words (word, meaning, pron, types, meaning_deep, meaning_deep_kr, sound_url) values (?,?,?,?,?,?,?);";
      const insertUserParams = [
        keyword,
        word.meaning,
        word.pron,
        word.types,
        word.meaning_deep,
        word.meaning_deep_kr,
        word.sound_url,
      ];
      const [row] = await connection.query(insertUserQuery, insertUserParams);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### insertWord Query error ##### `);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### insertWord DB error #####`);
    return false;
  }
};

exports.updateWord = async (keyword) => {
  let wordFromDb;
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const searchWordQuery = "select * from words where word = ?";
      const searchWordParams = [keyword];

      const [row] = await connection.query(searchWordQuery, searchWordParams);
      connection.release();
      console.log(row);
      wordFromDb = row[0];
      //   res.send(row[0]);
    } catch (err) {
      console.error(` ##### searchWord Query error ##### `, err);
      connection.release();
      //   res.send.err(err);
      return false;
    }
  } catch (err) {
    console.error(` ##### searchWord DB error #####`);
    console.log(err);
    // res.send(err);
  }

  const word = await crawling.getWordFromHtml(keyword);

  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertUserQuery =
        "UPDATE words SET word = ?, meaning = ?, pron = ?, types = ?, meaning_deep = ?, meaning_deep_kr = ?, sound_url = ? WHERE word_id = ?";
      // "INSERT INTO words (id, word, meaning, pron, types, meaning_deep, meaning_deep_kr, sound_url) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE score1 = VALUES(score1),";
      const insertUserParams = [
        wordFromDb.word,
        word.meaning,
        word.pron,
        word.types,
        word.meaning_deep,
        word.meaning_deep_kr,
        word.sound_url,
        wordFromDb.word_id,
      ];
      const [row] = await connection.query(insertUserQuery, insertUserParams);
      connection.release();
      return row;
    } catch (err) {
      console.error(` ##### updateWord Query error ##### `);
      console.log(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(` ##### updateWord DB error #####`);
    return false;
  }
};

exports.login = async function (req, res) {
  const { userName, password } = req.body;
  console.log(userName, password);
  if (!userName || !password) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원정보를 입력해주세요.",
    });
  }

  // 회원여부 검사
  const isValidUser = await db.selectUser(userName, password);
  if (!isValidUser) {
    return res.send({
      isSuccess: false,
      code: 410,
      message: "DB 에러, 담당자에게 문의해주세요.",
    });
  }
  if (isValidUser.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "존재하지 않는 회원입니다..",
    });
  }
  // jwt 토큰 발급
  // const [userInfo] = isValidUser;
  // const userIdx = userInfo.userIdx;

  // const token = jwt.sign(
  //   { userIdx: userIdx }, // 페이로드,
  //   jwtSecret // 시크릿 키
  // );
  console.log(isValidUser);
  return res.send({
    result: isValidUser,
    isSuccess: true,
    code: 200,
    message: "로그인 성공",
  });
};
