const { pool } = require("./database");
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async (keyword) => {
  try {
    return await axios.get(
      `https://small.dic.daum.net/search.do?q=${encodeURI(keyword)}`
    );
  } catch (err) {
    console.log(err);
  }
};

const getHtml1 = async (id) => {
  try {
    return await axios.get(`https://small.dic.daum.net${id}`);
  } catch (err) {
    console.log(err);
  }
};

const parsing = async (keyword) => {
  const html = await getHtml(keyword);
  const $ = cheerio.load(html.data);
  const id = $(".txt_cleansch").attr("href");
  console.log(id);

  const html1 = await getHtml1(id);
  const $1 = cheerio.load(html1.data);
  const $meaningList = $1(".txt_mean");

  let word = {
    meaning: "",
  };

  let i = 1;

  $meaningList.each((idx, node) => {
    word.meaning = word.meaning + ` ${i++}. ` + $(node).text();
  });

  word.meaning = word.meaning.trim();
  console.log(word);
};

parsing("apple");
