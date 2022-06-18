const axios = require("axios");
const cheerio = require("cheerio");
// const { updateWord } = require("./controller");

const getHtml = async (keyword) => {
  try {
    return await axios.get(`https://dic.daum.net/search.do?q=${keyword}`);
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

exports.getWordFromHtml = async (keyword) => {
  const html = await getHtml(keyword);
  //   console.log(html);
  const $ = cheerio.load(html.data);
  //   console.log($.html());
  const id = $(".tit_cleansch > a").attr("href");
  // console.log(id);

  if (id == undefined) {
    console.log("id is undefined");
    return false;
  } else {
    const html1 = await getHtml1(id);
    const $1 = cheerio.load(html1.data);

    let word = {
      word: keyword,
      meaning: "",
      types: "",
      meaning_deep: "",
      meaning_deep_kr: "",
      pron: "",
      sound_url: "",
    };

    let i = 1;
    $1(".txt_mean").each((idx, node) => {
      word.meaning = word.meaning + ` ${i++}. ` + $(node).text();
    });
    word.meaning = word.meaning.trim();
    i = 1;

    word.pron = word.pron + $1(".txt_pronounce:eq(0)").text();
    word.sound_url = $1(".listen_voice:eq(0) > a").attr("href");

    let s = "";
    i = 0;
    $1(".txt_ex").each((idx, node) => {
      s = $(node).text();
      s = s + `@@@`;
      if(i++ % 2 == 0)
        word.meaning_deep = word.meaning_deep + s;
      else
        word.meaning_deep_kr = word.meaning_deep_kr + s;
    });

    console.log(word);
    return word;
  }

  // const searchAndAddWord = async (keyword) => {
  //   let existing = false;
  //   try {
  //     const connection = await pool.getConnection(async (conn) => conn);

  //     try {
  //       const searchWordQuery = "select * from words where word = ?";
  //       const searchWordParams = [keyword];

  //       const [row] = await connection.query(searchWordQuery, searchWordParams);
  //       connection.release();

  //       if (row[0] == undefined) {
  //         existing = false;
  //       } else {
  //         console.log(keyword, row[0]);
  //         existing = true;
  //       }
  //     } catch (err) {
  //       console.error(` ##### insertWord Query error ##### `, err);
  //       connection.release();
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error(` ##### insertWord DB error #####`);
  //     return false;
  //   }

  //   if (!existing) {
  //     try {
  //       const connection = await pool.getConnection(async (conn) => conn);

  //       try {
  //         const insertUserQuery =
  //           "insert into words (word, meaning, pron, types, meaning_deep, sound_url) values (?,?,?,?,?,?);";
  //         const insertUserParams = [
  //           keyword,
  //           word.meaning,
  //           word.pron,
  //           word.types,
  //           word.meaning_deep,
  //           word.sound_url,
  //         ];

  //         const [row] = await connection.query(
  //           insertUserQuery,
  //           insertUserParams
  //         );
  //         connection.release();
  //         return row;
  //       } catch (err) {
  //         console.error(` ##### insertWord Query error ##### `);
  //         connection.release();
  //         return false;
  //       }
  //     } catch (err) {
  //       console.error(` ##### insertWord DB error #####`);
  //       return false;
  //     }
  //   }
  // };
};

// const run = async () => {
//   words = [
//     "resume",
//     "applicant",
//     "requirement",
//     "meet",
//     "qualified\r",
//     "candidate\r",
//     "confidence\r",
//     "highly\r",
//     "professional\r",
//     "interview\r",
//     "hire\r",
//     "training\r",
//     "reference\r",
//     "position\r",
//     "achievement\r",
//     "impressed\r",
//     "excellent\r",
//     "eligible\r",
//     "identify\r",
//     "associate\r",
//     "condition\r",
//     "employment\r",
//     "lack\r",
//     "managerial\r",
//     "diligent\r",
//     "familiar\r",
//     "proficiency\r",
//     "prospective\r",
//     "appeal\r",
//     "specialize\r",
//     "apprehensive\r",
//     "consultant\r",
//     "entitle\r",
//     "degree\r",
//     "payroll\r",
//     "recruit\r",
//     "certification\r",
//     "occupation\r",
//     "wage\r",
//     "attire\r",
//     "code\r",
//     "concern\r",
//     "policy\r",
//     "comply\r",
//     "regulation\r",
//     "exception\r",
//     "adhere\r",
//     "severely\r",
//     "refrain\r",
//     "permission\r",
//     "access\r",
//     "thoroughly\r",
//     "revise\r",
//     "approach\r",
//     "approval\r",
//     "form\r",
//     "immediately\r",
//     "inspection\r",
//     "arrangement\r",
//     "procedure\r",
//     "negative\r",
//     "mandate\r",
//     "effect\r",
//     "drastically\r",
//     "according to\r",
//     "enable\r",
//     "standard\r",
//     "constant\r",
//     "act\r",
//     "compensation\r",
//     "ban\r",
//     "obligation\r",
//     "authorize\r",
//     "prohibit\r",
//     "abolish\r",
//     "enforce\r",
//     "habit\r",
//     "lagislation\r",
//     "restrict\r",
//     "accustomed\r",
//     "corporation\r",
//     "demanding\r",
//     "colleague\r",
//     "division\r",
//     "request\r",
//     "efficiently\r",
//     "manage\r",
//     "submit\r",
//     "directly\r",
//     "remind\r",
//     "instruct\r",
//     "deadline\r",
//     "sample\r",
//     "notify\r",
//     "perform\r",
//     "monitor\r",
//     "deserve\r",
//     "assignment\r",
//     "entire\r",
//     "release\r",
//     "extension\r",
//     "electronically\r",
//     "attendance\r",
//     "absolutely\r",
//     "delegate\r",
//     "attentively\r",
//     "supervision\r",
//     "workshop\r",
//     "draw\r",
//     "revision\r",
//     "reluctantly\r",
//     "acquaint\r",
//     "convey\r",
//     "check\r",
//     "headquarters\r",
//     "file\r",
//     "oversee\r",
//     "involved\r",
//     "concentrate\r",
//     "lax\r",
//     "procrastinate\r",
//     "combined\r",
//     "accomplish\r",
//     "voluntarily\r",
//     "undertake\r",
//     "assume\r",
//     "occasionally\r",
//     "employee\r",
//     "assist\r",
//     "satisfied\r",
//     "manner\r",
//     "responsible\r",
//     "conduct\r",
//     "adjust\r",
//     "personnel\r",
//     "agree\r",
//     "supervise\r",
//     "coworker\r",
//     "direct\r",
//     "confidential\r",
//     "assign\r",
//     "leading\r",
//     "formal\r",
//     "remove\r",
//     "collect\r",
//     "coordinate\r",
//     "hardly\r",
//     "abstract\r",
//     "directory\r",
//     "accountable\r",
//     "skillfully\r",
//     "exclusive\r",
//     "intention\r",
//     "transform\r",
//     "respectful\r",
//     "duplicate\r",
//     "contrary\r",
//     "disturbing\r",
//     "engage\r",
//     "foster\r",
//     "neutrality\r",
//     "widely\r",
//     "sophisticated\r",
//     "timely\r",
//     "realistically\r",
//     "promptly\r",
//     "accessible\r",
//     "implement\r",
//     "feedback\r",
//     "outstanding\r",
//     "inform\r",
//     "replacement\r",
//     "announcement\r",
//     "department\r",
//     "permanently\r",
//     "fulfill\r",
//     "outline\r",
//     "explain\r",
//     "contain\r",
//     "compile\r",
//     "subsequent\r",
//     "overview\r",
//     "provider\r",
//     "matter\r",
//     "expertise\r",
//     "demonstrate\r",
//     "remainder\r",
//     "essential\r",
//     "divide\r",
//     "major\r",
//     "compliance\r",
//     "clarify\r",
//     "face\r",
//     "follow\r",
//     "aspect\r",
//     "apparently\r",
//     "aware\r",
//     "extended\r",
//     "accidentally\r",
//     "advisable\r",
//     "concerned\r",
//     "speak\r",
//     "collection\r",
//     "exhibition\r",
//     "celebrity\r",
//     "live\r",
//     "improvise\r",
//     "popular\r",
//     "donation\r",
//     "alumni\r",
//     "present\r",
//     "admission\r",
//     "banquet\r",
//     "anniversary\r",
//     "required\r",
//     "succeed\r",
//     "rest\r",
//     "fundraising\r",
//     "resume\r",
//     "issue\r",
//     "subscription\r",
//     "appear\r",
//     "accompany\r",
//     "edition\r",
//     "specifically\r",
//     "anonymous\r",
//     "commit\r",
//     "information\r",
//     "audience\r",
//     "author\r",
//     "note\r",
//     "antique\r",
//     "manuscript\r",
//     "beneficial\r",
//     "upcoming\r",
//     "lend\r",
//     "current\r",
//     "local\r",
//     "variety\r",
//     "advocate\r",
//     "contributor\r",
//     "defy\r",
//     "fascinating\r",
//     "showing\r",
//     "survey\r",
//     "analysis\r",
//     "respondent\r",
//     "competition\r",
//     "consistently\r",
//     "demand\r",
//     "do one's utmost\r",
//     "expand\r",
//     "advanced\r",
//     "postpone\r",
//     "additional\r",
//     "appreciate\r",
//     "demonstration\r",
//     "buy\r",
//     "examine\r",
//     "effective\r",
//     "like\r",
//     "especially\r",
//     "closely\r",
//     "reserve\r",
//     "cooperate\r",
//     "very\r",
//     "consecutive\r",
//     "expectation\r",
//     "publicize\r",
//     "raise\r",
//     "extremely\r",
//     "affect\r",
//     "target\r",
//     "campaign\r",
//     "probable\r",
//     "focus\r",
//     "seasonal\r",
//     "impact\r",
//     "comparison\r",
//     "gap\r",
//     "mounting\r",
//     "reflective\r",
//     "advertisement\r",
//     "marginal\r",
//     "customer\r",
//     "influence\r",
//     "instantly\r",
//     "creative\r",
//     "aggressively\r",
//     "aim\r",
//     "strategy\r",
//     "indicate\r",
//     "attract\r",
//     "experience\r",
//     "analyze\r",
//     "introduce\r",
//     "advise\r",
//     "subscribe\r",
//     "absence\r",
//     "means\r",
//     "prefer\r",
//     "advantage\r",
//     "forward\r",
//     "contemporary\r",
//     "discussion\r",
//     "initial\r",
//     "steadily\r",
//     "necessarily\r",
//     "resolve\r",
//     "detect\r",
//     "intensify\r",
//     "favorably\r",
//     "cover\r",
//     "less\r",
//     "majority\r",
//     "adopt\r",
//     "largely\r",
//     "disregard\r",
//     "effort\r",
//     "incentive\r",
//     "need\r",
//     "mastermind\r",
//     "stagnant\r",
//     "dramatically\r",
//     "brisk\r",
//     "unstable\r",
//     "rapidly\r",
//     "soar\r",
//     "assert\r",
//     "boost\r",
//     "analyst\r",
//     "potential\r",
//     "pleased\r",
//     "remain\r",
//     "limited\r",
//     "costly\r",
//     "particular\r",
//     "drastic\r",
//     "evenly\r",
//     "evidence\r",
//     "prospect\r",
//     "lead\r",
//     "fall\r",
//     "period\r",
//     "indicator\r",
//     "industry\r",
//     "likely\r",
//     "boom\r",
//     "director\r",
//     "substitute\r",
//     "consequence\r",
//     "fairly\r",
//     "economical\r",
//     "thrive\r",
//     "implication\r",
//     "wane\r",
//     "prosperity\r",
//     "depression\r",
//     "dwindle\r",
//     "impede\r",
//     "promising\r",
//     "adversity\r",
//     "purchase\r",
//     "installment\r",
//     "affordable\r",
//     "exactly\r",
//     "auction\r",
//     "authentic\r",
//     "charge\r",
//     "notice\r",
//     "experienced\r",
//     "instruction\r",
//     "expert\r",
//     "warranty\r",
//     "refund\r",
//     "subscriber\r",
//     "delivery\r",
//     "price\r",
//     "receipt\r",
//     "offer\r",
//     "carefully\r",
//     "benefit\r",
//     "exclusively\r",
//     "description\r",
//     "relatively\r",
//     "spare\r",
//     "preparation\r",
//     "area\r",
//     "clearance\r",
//     "alter\r",
//     "apply\r",
//     "mutually\r",
//     "method\r",
//     "acceptable\r",
//     "desire\r",
//     "redeemable\r",
//     "officially\r",
//     "consumption\r",
//     "qualify\r",
//     "fabric\r",
//     "valid\r",
//     "vendor\r",
//     "research\r",
//     "devise\r",
//     "revolutionary\r",
//     "innovative\r",
//     "feature\r",
//     "inspiration\r",
//     "sufficiently\r",
//     "patent\r",
//     "envision\r",
//     "extend\r",
//     "following\r",
//     "intend\r",
//     "grant\r",
//     "allow\r",
//     "inspect\r",
//     "improve\r",
//     "increasingly\r",
//     "invest\r",
//     "various\r",
//     "upgrade\r",
//     "manual\r",
//     "explore\r",
//     "response\r",
//     "appearance\r",
//     "successful\r",
//     "hold\r",
//     "advance\r",
//     "reliable\r",
//     "quality\r",
//     "domestic\r",
//     "development\r",
//     "availability\r",
//     "update\r",
//     "accurate\r",
//     "complicate\r",
//     "accomplished\r",
//     "inquiry\r",
//     "indication\r",
//     "manufacturer\r",
//     "compatible\r",
//     "superior\r",
//     "absolute\r",
//     "broaden\r",
//     "corrosion\r",
//     "equipment\r",
//     "automate\r",
//     "specification\r",
//     "properly\r",
//     "safety\r",
//     "precaution\r",
//     "operate\r",
//     "processing\r",
//     "capacity\r",
//     "assemble\r",
//     "utilize\r",
//     "place\r",
//     "fill\r",
//     "manufacturing\r",
//     "renovate\r",
//     "decision\r",
//     "material\r",
//     "success\r",
//     "attribute\r",
//     "efficiency\r",
//     "limit\r",
//     "tailored\r",
//     "component\r",
//     "capable\r",
//     "economize\r",
//     "flexible\r",
//     "comparable\r",
//     "produce\r",
//     "respectively\r",
//     "device\r",
//     "trim\r",
//     "launch\r",
//     "separately\r",
//     "expiration\r",
//     "maneuver\r",
//     "coming\r",
//     "damaged\r",
//     "prevent\r",
//     "power\r",
//     "chemical\r",
//     "complaint\r",
//     "deal\r",
//     "argumentative\r",
//     "appropriately\r",
//     "respond\r",
//     "infuriate\r",
//     "curteous\r",
//     "satisfaction\r",
//     "inconvenience\r",
//     "complete\r",
//     "specific\r",
//     "return\r",
//     "replace\r",
//     "presentation\r",
//     "evaluation\r",
//     "confident\r",
//     "cause\r",
//     "commentary\r",
//     "notification\r",
//     "apologize\r",
//     "interact\r",
//     "certain\r",
//     "commitment\r",
//     "applaud\r",
//     "biography\r",
//     "critical\r",
//     "depend on\r",
//     "combine\r",
//     "priority\r",
//     "observe\r",
//     "defective\r",
//     "reflect\r",
//     "attitude\r",
//     "disappoint\r",
//     "inquire\r",
//     "insert\r",
//     "disclose\r",
//     "guarantee\r",
//     "politely\r",
//     "seriously\r",
//     "international\r",
//     "attraction\r",
//     "itinerary\r",
//     "exotic\r",
//     "diverse\r",
//     "superb\r",
//     "baggage\r",
//     "destination\r",
//     "missing\r",
//     "locate\r",
//     "approximately\r",
//     "duty\r",
//     "process\r",
//     "board\r",
//     "comfortable\r",
//     "declare\r",
//     "specify\r",
//     "depart\r",
//     "emergency\r",
//     "passenger\r",
//     "outgoing\r",
//     "tightly\r",
//     "tour\r",
//     "carrier\r",
//     "customarily\r",
//     "confuse\r",
//     "arrive\r",
//     "brochure\r",
//     "involve\r",
//     "ship\r",
//     "suitcase\r",
//     "unavailable\r",
//     "fill out/in\r",
//     "customs\r",
//     "away\r",
//     "dramatic\r",
//     "hospitality\r",
//     "indulge\r",
//     "proximity\r",
//     "seating\r",
//     "unlimited\r",
//     "proposal\r",
//     "alliance\r",
//     "stipulation\r",
//     "term\r",
//     "compromise\r",
//     "negotiation\r",
//     "agreement\r",
//     "deadlock\r",
//     "review\r",
//     "contract\r",
//     "signature\r",
//     "originally\r",
//     "direction\r",
//     "initially\r",
//     "expire\r",
//     "collaborate\r",
//     "dedicate\r",
//     "revised\r",
//     "imperative\r",
//     "cooperatively\r",
//     "commission\r",
//     "omit\r",
//     "conflict\r",
//     "renew\r",
//     "proficient\r",
//     "confidentiality\r",
//     "dispute\r",
//     "objection\r",
//     "define\r",
//     "impression\r",
//     "security\r",
//     "option\r",
//     "proceed\r",
//     "modify\r",
//     "narrow\r",
//     "bid\r",
//     "settle\r",
//     "terminate\r",
//     "challenging\r",
//     "foundation\r",
//     "completely\r",
//     "refuse\r",
//     "temporarily\r",
//     "dealer\r",
//     "bulk\r",
//     "inventory\r",
//     "short\r",
//     "cost\r",
//     "selection\r",
//     "commercial\r",
//     "order\r",
//     "provide\r",
//     "contact\r",
//     "invoice\r",
//     "move\r",
//     "supply\r",
//     "discount\r",
//     "distribute\r",
//     "acquisition\r",
//     "assure\r",
//     "subject\r",
//     "seek\r",
//     "satisfactory\r",
//     "confirmation\r",
//     "unable\r",
//     "payment\r",
//     "measure\r",
//     "bargain\r",
//     "stock\r",
//     "affordability\r",
//     "clientele\r",
//     "acclaim\r",
//     "represent\r",
//     "rating\r",
//     "encompass\r",
//     "finalize\r",
//     "market\r",
//     "retail\r",
//     "commodity\r",
//     "quote\r",
//     "consignment\r",
//     "fragile\r",
//     "perishable\r",
//     "deliver\r",
//     "ensure\r",
//     "courier\r",
//     "carton\r",
//     "address\r",
//     "shipment\r",
//     "particularly\r",
//     "adequately\r",
//     "article\r",
//     "efficient\r",
//     "agency\r",
//     "enclose\r",
//     "careful\r",
//     "pick up\r",
//     "carry\r",
//     "attach\r",
//     "formerly\r",
//     "package\r",
//     "react\r",
//     "content\r",
//     "convenience\r",
//     "acknowledge\r",
//     "caution\r",
//     "correspondence\r",
//     "separate\r",
//     "remarkable\r",
//     "handle\r",
//     "warehouse\r",
//     "impose\r",
//     "storage\r",
//     "detach\r",
//     "envelope\r",
//     "exclusion\r",
//     "recipient\r",
//     "affix\r",
//     "incorrect\r",
//     "oblige\r",
//     "step\r",
//     "check in\r",
//     "compensate\r",
//     "complimentary\r",
//     "chef\r",
//     "container\r",
//     "elegant\r",
//     "flavor\r",
//     "accommodate\r",
//     "available\r",
//     "reception\r",
//     "in advance\r",
//     "refreshments\r",
//     "make\r",
//     "cater\r",
//     "reservation\r",
//     "beverage\r",
//     "confirm\r",
//     "cancel\r",
//     "rate\r",
//     "conveniently\r",
//     "decorate\r",
//     "information\r",
//     "retain\r",
//     "atmosphere\r",
//     "cuisine\r",
//     "sequence\r",
//     "extensive\r",
//     "prior\r",
//     "book\r",
//     "amenity\r",
//     "belongings\r",
//     "entirely\r",
//     "ease\r",
//     "ingredient\r",
//     "sip\r",
//     "stir\r",
//     "choice\r",
//     "complication\r",
//     "freshness\r",
//     "occupancy\r",
//     "decline\r",
//     "markedly\r",
//     "increase\r",
//     "revenue\r",
//     "projection\r",
//     "substantial\r",
//     "anticipate\r",
//     "significantly\r",
//     "estimate\r",
//     "shift\r",
//     "fee\r",
//     "production\r",
//     "sale\r",
//     "impressive\r",
//     "representative\r",
//     "recent\r",
//     "exceed\r",
//     "improvement\r",
//     "employer\r",
//     "regular\r",
//     "summarize\r",
//     "typically\r",
//     "whole\r",
//     "growth\r",
//     "figure\r",
//     "steady\r",
//     "frequent\r",
//     "achieve\r",
//     "assumption\r",
//     "share\r",
//     "incur\r",
//     "slightly\r",
//     "profit\r",
//     "reliant\r",
//     "illustrate\r",
//     "inaccurate\r",
//     "percentage\r",
//     "reduce\r",
//     "tend\r",
//     "audit\r",
//     "accounting\r",
//     "budget\r",
//     "financial\r",
//     "curtail\r",
//     "deficit\r",
//     "recently\r",
//     "substantially\r",
//     "committee\r",
//     "frequently\r",
//     "capability\r",
//     "proceeds\r",
//     "reimburse\r",
//     "considerably\r",
//     "adequate\r",
//     "total\r",
//     "allocate\r",
//     "inspector\r",
//     "preferred\r",
//     "quarter\r",
//     "interrupt\r",
//     "browse\r",
//     "prompt\r",
//     "deduct\r",
//     "measurement\r",
//     "shorten\r",
//     "amend\r",
//     "calculate\r",
//     "exempt\r",
//     "deficient\r",
//     "compare\r",
//     "fortunate\r",
//     "expenditure\r",
//     "accurately\r",
//     "worth\r",
//     "excess\r",
//     "fiscal\r",
//     "incidental\r",
//     "inflation\r",
//     "liable\r",
//     "spend\r",
//     "turnover\r",
//     "announce\r",
//     "interested\r",
//     "active\r",
//     "accept\r",
//     "foresee\r",
//     "expansion\r",
//     "relocate\r",
//     "competitor\r",
//     "asset\r",
//     "contribute\r",
//     "dedicated\r",
//     "misplace\r",
//     "considerable\r",
//     "last\r",
//     "emerge\r",
//     "grow\r",
//     "select\r",
//     "merge\r",
//     "imply\r",
//     "vital\r",
//     "persist\r",
//     "independent\r",
//     "force\r",
//     "establish\r",
//     "initiate\r",
//     "enhance\r",
//     "renowned\r",
//     "informed\r",
//     "minutes\r",
//     "waive\r",
//     "reach\r",
//     "authority\r",
//     "acquire\r",
//     "surpass\r",
//     "run\r",
//     "improbable\r",
//     "edge\r",
//     "simultaneously\r",
//     "reveal\r",
//     "productivity\r",
//     "uncertain\r",
//     "premier\r",
//     "agenda\r",
//     "convene\r",
//     "refute\r",
//     "coordination\r",
//     "unanimous\r",
//     "convince\r",
//     "consensus\r",
//     "defer\r",
//     "usually\r",
//     "reschedule\r",
//     "meeting\r",
//     "determine\r",
//     "report\r",
//     "comment\r",
//     "phase\r",
//     "approve\r",
//     "enclosed\r",
//     "easy\r",
//     "record\r",
//     "suggestion\r",
//     "attention\r",
//     "object\r",
//     "coincidentally\r",
//     "crowded\r",
//     "undergo\r",
//     "outcome\r",
//     "narrowly\r",
//     "differ\r",
//     "discuss\r",
//     "give\r",
//     "brief\r",
//     "distract\r",
//     "emphasis\r",
//     "press\r",
//     "organize\r",
//     "mention\r",
//     "persuasive\r",
//     "understanding\r",
//     "adjourn\r",
//     "constructive\r",
//     "preside\r",
//     "irrelevant\r",
//     "constraint\r",
//     "host\r",
//     "annual\r",
//     "purpose\r",
//     "enroll\r",
//     "lecture\r",
//     "participant\r",
//     "attend\r",
//     "encourage\r",
//     "leave\r",
//     "recommendation\r",
//     "conference\r",
//     "schedule\r",
//     "include\r",
//     "result\r",
//     "register\r",
//     "require\r",
//     "grateful\r",
//     "overtime\r",
//     "responsibility\r",
//     "assent\r",
//     "regard\r",
//     "tentative\r",
//     "welcome\r",
//     "function\r",
//     "commence\r",
//     "objective\r",
//     "excited\r",
//     "reimbursement\r",
//     "treatment\r",
//     "honor\r",
//     "emphasize\r",
//     "entry\r",
//     "bonus\r",
//     "salary\r",
//     "earn\r",
//     "arise\r",
//     "labor\r",
//     "union\r",
//     "existing\r",
//     "exploit\r",
//     "appoint\r",
//     "appraisal\r",
//     "promote\r",
//     "skilled\r",
//     "radically\r",
//     "exceptional\r",
//     "appreciation\r",
//     "evaluate\r",
//     "suggest\r",
//     "preference\r",
//     "management\r",
//     "predict\r",
//     "transfer\r",
//     "award\r",
//     "mandatory\r",
//     "competent\r",
//     "performance\r",
//     "reward\r",
//     "search\r",
//     "inexperienced\r",
//     "early\r",
//     "designate\r",
//     "executive\r",
//     "dedication\r",
//     "unanimously\r",
//     "progress\r",
//     "congratulate\r",
//     "dismiss\r",
//     "independence\r",
//     "participation\r",
//     "praise\r",
//     "accomplishment\r",
//     "deliberation\r",
//     "leadership\r",
//     "retire\r",
//     "nomination\r",
//     "reorganize\r",
//     "serve\r",
//     "encouragement\r",
//     "resignation\r",
//     "strictly\r",
//     "congestion\r",
//     "alleviate\r",
//     "divert\r",
//     "detour\r",
//     "fuel\r",
//     "malfunction\r",
//     "permit\r",
//     "transportation\r",
//     "opportunity\r",
//     "clearly\r",
//     "ongoing\r",
//     "detailed\r",
//     "alternative\r",
//     "obtain\r",
//     "designated\r",
//     "intersection\r",
//     "equip\r",
//     "commute\r",
//     "downtown\r",
//     "automotive\r",
//     "closure\r",
//     "vehicle\r",
//     "platform\r",
//     "official\r",
//     "transit\r",
//     "fare\r",
//     "expense\r",
//     "trust\r",
//     "head\r",
//     "drive\r",
//     "fine\r",
//     "pass\r",
//     "securely\r",
//     "prominently\r",
//     "reserved\r",
//     "average\r",
//     "collision\r",
//     "tow\r",
//     "reverse\r",
//     "obstruct\r",
//     "delinquent\r",
//     "overdue\r",
//     "regrettably\r",
//     "balance\r",
//     "deposit\r",
//     "investigation\r",
//     "account\r",
//     "statement\r",
//     "amount\r",
//     "withdrawal\r",
//     "previously\r",
//     "due\r",
//     "receive\r",
//     "expect\r",
//     "certificate\r",
//     "document\r",
//     "spending\r",
//     "successfully\r",
//     "bill\r",
//     "pleasure\r",
//     "study\r",
//     "summary\r",
//     "temporary\r",
//     "lower\r",
//     "transaction\r",
//     "double\r",
//     "identification\r",
//     "dissatisfaction\r",
//     "in common\r",
//     "interest\r",
//     "reject\r",
//     "relation\r",
//     "tentatively\r",
//     "alternatively\r",
//     "attentive\r",
//     "convert\r",
//     "heavily\r",
//     "loan\r",
//     "unexpected\r",
//     "cash\r",
//     "mortgage\r",
//     "payable\r",
//     "personal\r",
//     "investment\r",
//     "uncreative\r",
//     "inherently\r",
//     "secure\r",
//     "foreseeable\r",
//     "innate\r",
//     "property\r",
//     "on behalf of\r",
//     "lease\r",
//     "sponsor\r",
//     "propose\r",
//     "support\r",
//     "distribution\r",
//     "consider\r",
//     "nearly\r",
//     "consent\r",
//     "gratitude\r",
//     "consult\r",
//     "advice\r",
//     "partially\r",
//     "evident\r",
//     "reliability\r",
//     "cautious\r",
//     "insight\r",
//     "portfolio\r",
//     "possible\r",
//     "speculation\r",
//     "solely\r",
//     "entrepreneur\r",
//     "eventually\r",
//     "shareholder\r",
//     "outlook\r",
//     "stability\r",
//     "bond\r",
//     "depreciation\r",
//     "increasing\r",
//     "prevalent\r",
//     "rapid\r",
//     "unprecedented\r",
//     "yield\r",
//     "furnished\r",
//     "residence\r",
//     "spacious\r",
//     "drape\r",
//     "unoccupied\r",
//     "renovation\r",
//     "appropriate\r",
//     "delay\r",
//     "community\r",
//     "construction\r",
//     "repair\r",
//     "currently\r",
//     "regularly\r",
//     "arrange\r",
//     "location\r",
//     "restore\r",
//     "presently\r",
//     "numerous\r",
//     "abandon\r",
//     "contractor\r",
//     "develop\r",
//     "maintain\r",
//     "densely\r",
//     "prepare\r",
//     "finally\r",
//     "district\r",
//     "renewal\r",
//     "compulsory\r",
//     "interfere\r",
//     "relocation\r",
//     "totally\r",
//     "actually\r",
//     "architect\r",
//     "enlarge\r",
//     "install\r",
//     "permanent\r",
//     "suppose\r",
//     "adjacent\r",
//     "consist\r",
//     "utility\r",
//     "conserve\r",
//     "chance\r",
//     "forecast\r",
//     "waste\r",
//     "dispose\r",
//     "recycling\r",
//     "clear\r",
//     "damage\r",
//     "significant\r",
//     "solution\r",
//     "occur\r",
//     "ideal\r",
//     "preserve\r",
//     "aid\r",
//     "excessive\r",
//     "intensively\r",
//     "vary\r",
//     "pleasing\r",
//     "mark\r",
//     "inaccessible\r",
//     "disturb\r",
//     "pollutant\r",
//     "emission\r",
//     "dense\r",
//     "environmental\r",
//     "consistent\r",
//     "leak\r",
//     "organization\r",
//     "continually\r",
//     "contaminate\r",
//     "disaster\r",
//     "discharge\r",
//     "resource\r",
//     "prominent\r",
//     "deplete\r",
//     "purify\r",
//     "endangered\r",
//     "extinction\r",
//     "drought\r",
//     "inflict\r",
//     "migration\r",
//     "ecology\r",
//     "habitat\r",
//     "fatigue\r",
//     "checkup\r",
//     "symptom\r",
//     "physician\r",
//     "diagnosis\r",
//     "prescribe\r",
//     "recovery\r",
//     "recognize\r",
//     "join\r",
//     "comprehensive\r",
//     "participate\r",
//     "recommend\r",
//     "necessary\r",
//     "ability\r",
//     "operation\r",
//     "cleanliness\r",
//     "duration\r",
//     "examination\r",
//     "eliminate\r",
//     "easily\r",
//     "dental\r",
//     "dietary\r",
//     "related\r",
//     "transmit\r",
//     "periodically\r",
//     "reaction\r",
//     "simple\r",
//     "coverage\r",
//     "exposure\r",
//     "pharmaceutical\r",
//     "premium\r",
//     "relieve\r",
//     "combination\r",
//     "conscious\r",
//     "deprivation\r",
//     "health\r",
//     "induce\r",
//     "insurance\r",
//     "nutrition\r",
//     "prevention\r",
//     "susceptible\r",
//   ];

//   let i = 0;
//   for (let index = 1149; index < words.length; index++) {
//     words[index] = words[index].replace(/\r/g, "");
//     await updateWord(words[index]);
//   }
//   console.log(words);
// };

// run();

// searchAndAddWord("apple");