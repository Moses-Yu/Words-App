const crawling = require("./crawling");
const { pool } = require("./database");
const { selectUser } = require("./db");

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
    res.send(word);
  } else {
    const wordFromDb = await crawling.getWordFromHtml(keyword);
    if (wordFromDb) {
      res.send(wordFromDb);
    } else {
        res.send({
            message: '단어를 검색할 수 없습니다.'
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
  const isValidUser = await selectUser(userName, password);
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
