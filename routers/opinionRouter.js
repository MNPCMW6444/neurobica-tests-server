const router = require("express").Router();
const User = require("../models/userModel");
const Opinion = require("../models/opinionModel");
const jwt = require("jsonwebtoken");

async function addFudsToOpinion(theopinion) {
  let josnres = theopinion.toJSON();
  const screww = await User.findById(josnres.CrewM);
  josnres.CrewM = screww;
  const commm = await User.findById(josnres.Commander);
  josnres.Commander = commm;
  const authh = await User.findById(josnres.Authorizer);
  josnres.Authorizer = authh;
  return josnres;
}

router.get("/getallmy", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const userr = await User.findById(validatedUser.user);

    const opinions = await Opinion.find({ CrewM: userr });

    for (let i = 0; i < opinions.length; i++)
      opinions[i] = await addFudsToOpinion(opinions[i]);

    res.json(opinions);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/getmyOpinion/:id", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const userr = await User.findById(validatedUser.user);

    const opinion = await Opinion.findById(req.params.id);

    if (opinion.CrewM.toJSON() != userr._id.toJSON())
      return res
        .status(400)
        .json({ errorMessage: "אינך יכול לצפות בחוו''ד זה מכיוון שאינו שלך" });

    res.json(await addFudsToOpinion(opinion));
  } catch (err) {
    res.status(401).send();
  }
});

router.get("/getallmyn/:ma", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const comm = await User.findById(validatedUser.user);

    const screww = await User.find({ MA: req.params.ma });

    const opinions = await Opinion.find({ CrewM: screww });

    if (
      comm.Role === "DIRECT" ||
      (comm.Role === "SCHOOL" &&
        comm._id.toString() === screww[0].MyComm.toString())
    ) {
      for (let i = 0; i < opinions.length; i++)
        opinions[i] = await addFudsToOpinion(opinions[i]);
      res.json(opinions);
    } else {
      return res.status(401).json({
        errorMessage:
          'ניסית לקבל את כל החוו"דים של איש צוות אך אינך מפקד גף שלו',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.put("/editOpinion/:id", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const userr = await User.findById(validatedUser.user);

    const opinionId = req.params.id;

    if (!opinionId)
      return res.status(400).json({
        errorMessage: "יש בעיה... לא התקבל מזהה חוו''ד",
      });
    const opinionn = await Opinion.findById(opinionId);
    if (opinionn === "not found")
      return res.status(400).json({
        errorMessage: 'יש בעיה... לא נמצא חוו"ד התואם את המזהה שהתקבל',
      });

    const {
      CrewM,
      gSigned,
      Tkufa,
      gfillDate,
      MonthsNo,
      Position,
      C1,
      C2,
      C3,
      C4,
      C5,
      C6,
      C7,
      C8,
      C9,
      M1,
      M2,
      Tp,
      Fp,
    } = req.body;

    if (!gSigned) {
      return res.status(400).json({
        errorMessage: "האם החווד חתום?",
      });
    }
    if (!Tkufa) {
      return res.status(400).json({
        errorMessage: "לאיזה תקופה החווד?",
      });
    }
    if (!gfillDate) {
      return res.status(400).json({
        errorMessage: "מתי הוזן החווד?",
      });
    }
    if (!MonthsNo) {
      return res.status(400).json({
        errorMessage: "כמה חודשים פיקדת?",
      });
    }
    if (MonthsNo < 0)
      return res
        .status(400)
        .json({
          errorMessage: "לא ייתכן שפיקדת פחות מ0 חודשים / הזנת תו שאינו מספר",
        });
    if (!Position) {
      return res.status(400).json({
        errorMessage: "מה תפקיד הפקוד?",
      });
    }

    if (
      !(
        C1 == 4 ||
        C1 == 5 ||
        C1 == 6 ||
        C1 == 7 ||
        C1 == 8 ||
        C1 == 9 ||
        C1 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 1 חסר" });

    if (
      !(
        C2 == 4 ||
        C2 == 5 ||
        C2 == 6 ||
        C2 == 7 ||
        C2 == 8 ||
        C2 == 9 ||
        C2 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 2 חסר" });

    if (
      !(
        C3 == 4 ||
        C3 == 5 ||
        C3 == 6 ||
        C3 == 7 ||
        C3 == 8 ||
        C3 == 9 ||
        C3 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 3 חסר" });

    if (
      !(
        C4 == 4 ||
        C4 == 5 ||
        C4 == 6 ||
        C4 == 7 ||
        C4 == 8 ||
        C4 == 9 ||
        C4 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 4 חסר" });

    if (
      !(
        C5 == 4 ||
        C5 == 5 ||
        C5 == 6 ||
        C5 == 7 ||
        C5 == 8 ||
        C5 == 9 ||
        C5 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 5 חסר" });

    if (
      !(
        C6 == 4 ||
        C6 == 5 ||
        C6 == 6 ||
        C6 == 7 ||
        C6 == 8 ||
        C6 == 9 ||
        C6 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 6 חסר" });

    if (
      !(
        C7 == 4 ||
        C7 == 5 ||
        C7 == 6 ||
        C7 == 7 ||
        C7 == 8 ||
        C7 == 9 ||
        C7 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 7 חסר" });

    if (
      !(
        C8 == 4 ||
        C8 == 5 ||
        C8 == 6 ||
        C8 == 7 ||
        C8 == 8 ||
        C8 == 9 ||
        C8 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 8 חסר" });

    if (
      !(
        C9 == 4 ||
        C9 == 5 ||
        C9 == 6 ||
        C9 == 7 ||
        C9 == 8 ||
        C9 == 9 ||
        C9 == 10
      )
    ) {
      return res.status(400).json({
        errorMessage: "חסר קריטריון כלשהו",
      });
    }

    if (
      !(
        M1 == 4 ||
        M1 == 5 ||
        M1 == 6 ||
        M1 == 7 ||
        M1 == 8 ||
        M1 == 9 ||
        M1 == 10
      )
    ) {
      return res.status(400).json({
        errorMessage: "חסר ציון מסכם",
      });
    }

    if (!(M2 == 0 || M2 == 1 || M2 == 2 || M2 == 3 || M2 == 4)) {
      return res.status(400).json({
        errorMessage: "חסר פוטנציאל להובלה",
      });
    }

    if (!Tp) {
      return res.status(400).json({
        errorMessage: "לא התקבלו יעדים לשיפור",
      });
    }

    if (!Fp) {
      return res.status(400).json({
        errorMessage: "לא התקבל סיכם",
      });
    }

    if (userr.Role === "DIRECT") {
      const crewmm = await User.findById(CrewM);
      const fillDate = new Date(
        gfillDate.substring(3, 5) +
          "/" +
          gfillDate.substring(0, 2) +
          "/" +
          gfillDate.substring(6, gfillDate.length) +
          "Z"
      );
      const Signed = gSigned === "כן";
      if (crewmm.MyComm.toString() === userr._id.toString()) {
        opinionn.Signed = Signed;
        opinionn.Tkufa = Tkufa;
        opinionn.fillDate = fillDate;
        opinionn.MonthsNo = MonthsNo;
        opinionn.Position = Position;
        opinionn.C1 = C1;
        opinionn.C2 = C2;
        opinionn.C3 = C3;
        opinionn.C4 = C4;
        opinionn.C5 = C5;
        opinionn.C6 = C6;
        opinionn.C7 = C7;
        opinionn.C8 = C8;
        opinionn.C9 = C9;
        opinionn.M1 = M1;
        opinionn.M2 = M2;
        opinionn.Tp = Tp;
        opinionn.Fp = Fp;

        const savedOpinion = await opinionn.save();

        res.json(savedOpinion);
      } else
        return res.status(401).json({
          errorMessage: "ניסיתי לעדכן חווד של פקוד בגף אך אינך מפקד גף שלו",
        });
    } else {
      return res.status(401).json({
        errorMessage: "ניסיתי לעדכן חווד של פקוד בגף אך אינך מפקד בכללי",
      });
    }
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/createOpinion", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const userr = await User.findById(validatedUser.user);

    const {
      CrewM,
      gSigned,
      Tkufa,
      gfillDate,
      MonthsNo,
      Position,
      C1,
      C2,
      C3,
      C4,
      C5,
      C6,
      C7,
      C8,
      C9,
      M1,
      M2,
      Tp,
      Fp,
    } = req.body;

    if (!CrewM) {
      return res.status(400).json({
        errorMessage: "של מי החווד?",
      });
    }
    if (!gSigned) {
      return res.status(400).json({
        errorMessage: "האם החווד חתום?",
      });
    }
    if (!Tkufa) {
      return res.status(400).json({
        errorMessage: "לאיזה תקופה החווד?",
      });
    }
    if (!gfillDate) {
      return res.status(400).json({
        errorMessage: "מתי הוזן החווד?",
      });
    }
    if (!MonthsNo) {
      return res.status(400).json({
        errorMessage: "כמה חודשים פיקדת?",
      });
    }
    if (MonthsNo < 0)
      return res
        .status(400)
        .json({
          errorMessage: "לא ייתכן שפיקדת פחות מ0 חודשים / הזנת תו שאינו מספר",
        });
    if (!Position) {
      return res.status(400).json({
        errorMessage: "מה תפקיד הפקוד?",
      });
    }

    if (
      !(
        C1 == 4 ||
        C1 == 5 ||
        C1 == 6 ||
        C1 == 7 ||
        C1 == 8 ||
        C1 == 9 ||
        C1 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 1 חסר" });

    if (
      !(
        C2 == 4 ||
        C2 == 5 ||
        C2 == 6 ||
        C2 == 7 ||
        C2 == 8 ||
        C2 == 9 ||
        C2 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 2 חסר" });

    if (
      !(
        C3 == 4 ||
        C3 == 5 ||
        C3 == 6 ||
        C3 == 7 ||
        C3 == 8 ||
        C3 == 9 ||
        C3 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 3 חסר" });

    if (
      !(
        C4 == 4 ||
        C4 == 5 ||
        C4 == 6 ||
        C4 == 7 ||
        C4 == 8 ||
        C4 == 9 ||
        C4 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 4 חסר" });

    if (
      !(
        C5 == 4 ||
        C5 == 5 ||
        C5 == 6 ||
        C5 == 7 ||
        C5 == 8 ||
        C5 == 9 ||
        C5 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 5 חסר" });

    if (
      !(
        C6 == 4 ||
        C6 == 5 ||
        C6 == 6 ||
        C6 == 7 ||
        C6 == 8 ||
        C6 == 9 ||
        C6 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 6 חסר" });

    if (
      !(
        C7 == 4 ||
        C7 == 5 ||
        C7 == 6 ||
        C7 == 7 ||
        C7 == 8 ||
        C7 == 9 ||
        C7 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 7 חסר" });

    if (
      !(
        C8 == 4 ||
        C8 == 5 ||
        C8 == 6 ||
        C8 == 7 ||
        C8 == 8 ||
        C8 == 9 ||
        C8 == 10
      )
    )
      return res.status(400).json({ errorMessage: "פרמטר 8 חסר" });

    if (
      !(
        C9 == 4 ||
        C9 == 5 ||
        C9 == 6 ||
        C9 == 7 ||
        C9 == 8 ||
        C9 == 9 ||
        C9 == 10
      )
    ) {
      return res.status(400).json({
        errorMessage: "חסר קריטריון כלשהו",
      });
    }

    if (
      !(
        M1 == 4 ||
        M1 == 5 ||
        M1 == 6 ||
        M1 == 7 ||
        M1 == 8 ||
        M1 == 9 ||
        M1 == 10
      )
    ) {
      return res.status(400).json({
        errorMessage: "חסר ציון מסכם",
      });
    }

    if (!(M2 == 0 || M2 == 1 || M2 == 2 || M2 == 3 || M2 == 4)) {
      return res.status(400).json({
        errorMessage: "חסר פוטנציאל להובלה",
      });
    }

    if (!Tp) {
      return res.status(400).json({
        errorMessage: "לא התקבלו יעדים לשיפור",
      });
    }

    if (!Fp) {
      return res.status(400).json({
        errorMessage: "לא התקבל סיכם",
      });
    }

    if (userr.Role === "DIRECT") {
      const crewmm = await User.findById(CrewM);
      const hiscomm = await User.findById(crewmm.MyComm);
      const hisauth = await User.findById(crewmm.MyAuth);
      const wasMyCommMA = hiscomm.MA;
      const wasMyCommRank = hiscomm.Rank;
      const wasMyCommLastName = hiscomm.LastName;
      const wasMyCommFirstName = hiscomm.FirstName;

      const wasMyAuthMA = hisauth.MA;
      const wasMyAuthRank = hisauth.Rank;
      const wasMyAuthLastName = hisauth.LastName;
      const wasMyAuthFirstName = hisauth.FirstName;
      const wasRank = crewmm.Rank;
      const wasDereg = crewmm.Dereg;
      const wasMaslool = crewmm.Maslool;
      const wasSoogHatsava = crewmm.SoogHatsava;
      const wasUnit = crewmm.Unit;
      const wasMyComm = crewmm.MyComm;
      const wasMyAuth = crewmm.MyAuth;
      const fillDate = new Date(
        gfillDate.substring(3, 5) +
          "/" +
          gfillDate.substring(0, 2) +
          "/" +
          gfillDate.substring(6, gfillDate.length) +
          "Z"
      );
      const Signed = gSigned === "כן";
      if (crewmm.MyComm.toString() === userr._id.toString()) {
        if ((await Opinion.findOne({ CrewM: crewmm, Tkufa: Tkufa })) === null) {
          const newOpinion = new Opinion({
            CrewM,
            Signed,
            Tkufa,
            fillDate,
            MonthsNo,
            Position,
            wasRank,
            wasDereg,
            wasMaslool,
            wasSoogHatsava,
            wasUnit,
            wasMyCommMA,
            wasMyCommRank,
            wasMyCommLastName,
            wasMyCommFirstName,
            wasMyAuthMA,
            wasMyAuthRank,
            wasMyAuthLastName,
            wasMyAuthFirstName,
            C1,
            C2,
            C3,
            C4,
            C5,
            C6,
            C7,
            C8,
            C9,
            M1,
            M2,
            Tp,
            Fp,
          });

          const savedOpinion = await newOpinion.save();

          res.json(savedOpinion);
        } else
          return res.status(400).json({
            errorMessage: "כבר קיים חווד לתקופה זו, ערוך אותו",
          });
      } else
        return res.status(401).json({
          errorMessage: "ניסיתי לעדכן חווד של פקוד בגף אך אינך מפקד גף שלו",
        });
    } else {
      return res.status(401).json({
        errorMessage: "ניסיתי לעדכן חווד של פקוד בגף אך אינך מפקד בכללי",
      });
    }
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

module.exports = router;
