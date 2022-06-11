const compression = require("compression");
const cors = require("cors");
const { indexRouter } = require("./src/router/indexRouter");
const { userRouter } = require("./src/router/userRouter");

const express = require("express");
const app = express();
const port = 3000;


/* express 미들웨어 설정 */

// cors 설정
app.use(cors());

// body json 파싱
app.use(express.json());

// HTTP 요청 압축
app.use(compression());

// 라우터 분리
// app.use(indexRouter);
// app.use(userRouter);
indexRouter(app);
userRouter(app);



app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`);
});

var router = express.Router();

/*
	'/' url로 접근했을 경우,
	결과값으로 public에 있는 index.html을 반환함을 의미
	여기서 index.html은 아까 위에서 우리가 배포가능한 형태로 바꾼 Vue!
*/
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
})
