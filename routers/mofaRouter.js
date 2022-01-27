const router = require("express").Router();
const User = require("../models/userModel");
const Mofa = require("../models/mofaModel");
const jwt = require("jsonwebtoken");

router.get("/getallmy", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const userr = await User.findById(validatedUser.user);

    const mofas = await Mofa.find({ CrewM: userr });

    for (let i = 0; i < mofas.length; i++) mofas[i].name = userr.NickName;

    res.json(mofas);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/createmofa", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const {
      isTest,
      fillDatep,
      CrewM,
      name,
      MadName,
      Emda,
      No,
      X11,
      X12,
      X13,
      X21,
      X22,
      X23,
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
      M11,
      M21,
      Mf,
    } = req.body;

    if (!CrewM) {
      return res.status(400).json({
        errorMessage: "של מי המופע?",
      });
    }

    if (!fillDatep) {
      return res.status(400).json({
        errorMessage: "מתי הוזן המופע?",
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

    const fillDate = new Date(
      fillDatep.substring(3, 5) +
        "/" +
        fillDatep.substring(0, 2) +
        "/" +
        fillDatep.substring(6, fillDatep.length) +
        "Z"
    );

    const newmofa = new Mofa({
      isTest,
      fillDate,
      CrewM,
      name,
      MadName,
      Emda,
      No,
      X11,
      X12,
      X13,
      X21,
      X22,
      X23,
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
      M11,
      M21,
      Mf,
    });

    const savednewmofa = await newmofa.save();

    res.json(savednewmofa);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});
/* 
router.get("/getallmyn/:ma", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const comm = await User.findById(validatedUser.user);

    const screww = await User.find({ MA: req.params.ma });

    const mofans = await mofan.find({ CrewM: screww });

    if (
      comm.Role === "DIRECT" ||
      (comm.Role === "SCHOOL" &&
        comm._id.toString() === screww[0].MyComm.toString())
    ) {
      for (let i = 0; i < mofans.length; i++)
        mofans[i] = await addFudsTomofan(mofans[i]);
      res.json(mofans);
    } else {
      try {
        if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

        if (comm._id.toString() === screww[0].MyAuth.toString()) {
          for (let i = 0; i < mofans.length; i++)
            mofans[i] = await addFudsTomofan(mofans[i]);
          res.json(mofans);
        } else {
          return res.status(401).json({
            errorMessage:
              'ניסית לקבל את כל החוו"דים של איש צוות אך אינך מפקד יחידה שלו',
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    }
  } catch (err) {
    try {
      const token = req.cookies.token;

      if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

      const validatedUser = jwt.verify(token, process.env.JWTSECRET);

      const userr = await User.findById(validatedUser.user);

      const screww = await User.find({ MA: req.params.ma });

      const mofans = await mofan.find({ CrewM: screww });

      if (userr._id.toString() === screww[0].MyAuth.toString()) {
        for (let i = 0; i < mofans.length; i++)
          mofans[i] = await addFudsTomofan(mofans[i]);
        res.json(mofans);
      } else {
        return res.status(401).json({
          errorMessage:
            'ניסית לקבל את כל החוו"דים של איש צוות אך אינך מפקד יחידה שלו',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }
});

router.get("/getmyavgs/", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(400).json({ errorMessage: "אינך מחובר" });

    const validatedUser = jwt.verify(token, process.env.JWTSECRET);

    const userr = await User.findById(validatedUser.user);

    const gafusers = await User.find({
      Unit: userr.Unit,
      Maslool: userr.Maslool,
    });
    const courseusers = await User.find({ CourseNo: userr.CourseNo });

    let gafmofans = [];
    let coursemofans = [];

    //  let resses = [];
    //  let ress;
    //  let emptyres;

    // for (
    //  let j = 4000;
    //  j < 6000;
    //  j++ // כי אלף שנים בעיניך כיום אתמול כי יעבר ואשמורה בלילה
    // ) {
    for (let i = 0; i < gafusers.length; i++)
      gafmofans.push(
        await mofan.find({
          CrewM: gafusers[i]._id,
        })
      );

    for (let i = 0; i < courseusers.length; i++)
      coursemofans.push(
        await mofan.find({
          CrewM: courseusers[i]._id,
        })
      );

    //gafmofans = gafmofans.filter((val) => val !== null && val !== []);
    //coursemofans = coursemofans.filter((val) => val !== null && val !== []);

    let gafbytkufa = [];
    let coursebytkufa = [];
    let ttkufa = 0;
    let temp = 0;
    while (gafmofans.length > 0) {
      ttkufa = gafmofans[0][0] && gafmofans[0][0].Tkufa;
      for (let i = 0; i < gafmofans.length; i++) {
        for (let j = 0; j < gafmofans.length; j++) {
          if (
            gafmofans[i] &&
            gafmofans[i][j] &&
            gafmofans[i][j].Tkufa === ttkufa
          ) {
            temp = gafmofans[i][j];
            gafmofans[i].splice(j, 1);
            gafbytkufa.push({ tkufa: ttkufa, mofan: temp });
          }
        }
      }
      if (gafmofans[0].length === 0) gafmofans.splice(0, 1);
    }

    while (coursemofans.length > 0) {
      ttkufa = coursemofans[0][0] && coursemofans[0][0].Tkufa;
      for (let i = 0; i < coursemofans.length; i++) {
        for (let j = 0; j < coursemofans.length; j++) {
          if (
            coursemofans[i] &&
            coursemofans[i][j] &&
            coursemofans[i][j].Tkufa === ttkufa
          ) {
            temp = coursemofans[i][j];
            coursemofans[i].splice(j, 1);
            coursebytkufa.push({ tkufa: ttkufa, mofan: temp });
          }
        }
      }
      if (coursemofans[0].length === 0) coursemofans.splice(0, 1);
    }

    let bettergaf = [];
    let inner;

    let currentt = 0;
    while (gafbytkufa.length > 0) {
      inner = [];
      currentt = gafbytkufa[0].tkufa;
      while (gafbytkufa[0] && currentt === gafbytkufa[0].tkufa) {
        inner.push(gafbytkufa[0].mofan);
        gafbytkufa.splice(0, 1);
      }
      bettergaf.push({ Tkufa: currentt, mofanArray: inner });
    }

    let bettercourse = [];

    currentt = 0;
    while (coursebytkufa.length > 0) {
      inner = [];
      currentt = coursebytkufa[0].tkufa;
      while (coursebytkufa[0] && currentt === coursebytkufa[0].tkufa) {
        inner.push(coursebytkufa[0].mofan);
        coursebytkufa.splice(0, 1);
      }
      bettercourse.push({ Tkufa: currentt, mofanArray: inner });
    }

    let gafmofanscsonly;
    let gapi;
    let gafavgsbytkufot = [];

    for (let k = 0; k < bettergaf.length; k++) {
      gafmofanscsonly = [];

      for (let i = 0; i < bettergaf[k].mofanArray.length; i++)
        gafmofanscsonly.push({
          c1: bettergaf[k].mofanArray[i].C1,
          c2: bettergaf[k].mofanArray[i].C2,
          c3: bettergaf[k].mofanArray[i].C3,
          c4: bettergaf[k].mofanArray[i].C4,
          c5: bettergaf[k].mofanArray[i].C5,
          c6: bettergaf[k].mofanArray[i].C6,
          c7: bettergaf[k].mofanArray[i].C7,
          c8: bettergaf[k].mofanArray[i].C8,
          c9: bettergaf[k].mofanArray[i].C9,
          c10: bettergaf[k].mofanArray[i].M1,
        });

      gapi = {
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        c10: 0,
      };

      for (let i = 0; i < gafmofanscsonly.length; i++)
        gapi = {
          c1: gapi.c1 + gafmofanscsonly[i].c1,
          c2: gapi.c2 + gafmofanscsonly[i].c2,
          c3: gapi.c3 + gafmofanscsonly[i].c3,
          c4: gapi.c4 + gafmofanscsonly[i].c4,
          c5: gapi.c5 + gafmofanscsonly[i].c5,
          c6: gapi.c6 + gafmofanscsonly[i].c6,
          c7: gapi.c7 + gafmofanscsonly[i].c7,
          c8: gapi.c8 + gafmofanscsonly[i].c8,
          c9: gapi.c9 + gafmofanscsonly[i].c9,
          c10: gapi.c10 + gafmofanscsonly[i].c10,
        };

      gapi = {
        c1: gapi.c1 / gafmofanscsonly.length,
        c2: gapi.c2 / gafmofanscsonly.length,
        c3: gapi.c3 / gafmofanscsonly.length,
        c4: gapi.c4 / gafmofanscsonly.length,
        c5: gapi.c5 / gafmofanscsonly.length,
        c6: gapi.c6 / gafmofanscsonly.length,
        c7: gapi.c7 / gafmofanscsonly.length,
        c8: gapi.c8 / gafmofanscsonly.length,
        c9: gapi.c9 / gafmofanscsonly.length,
        c10: gapi.c10 / gafmofanscsonly.length,
      };

      gafavgsbytkufot.push({ Tkufa: bettergaf[k].Tkufa, avg: gapi });
    }

    let coursemofanscsonly;
    let cursi;
    let courseavgsbytkufot = [];

    for (let k = 0; k < bettercourse.length; k++) {
      coursemofanscsonly = [];

      for (let i = 0; i < bettercourse[k].mofanArray.length; i++)
        coursemofanscsonly.push({
          c1: bettercourse[k].mofanArray[i].C1,
          c2: bettercourse[k].mofanArray[i].C2,
          c3: bettercourse[k].mofanArray[i].C3,
          c4: bettercourse[k].mofanArray[i].C4,
          c5: bettercourse[k].mofanArray[i].C5,
          c6: bettercourse[k].mofanArray[i].C6,
          c7: bettercourse[k].mofanArray[i].C7,
          c8: bettercourse[k].mofanArray[i].C8,
          c9: bettercourse[k].mofanArray[i].C9,
          c10: bettercourse[k].mofanArray[i].M1,
        });

      cursi = {
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        c10: 0,
      };

      for (let i = 0; i < coursemofanscsonly.length; i++)
        cursi = {
          c1: cursi.c1 + coursemofanscsonly[i].c1,
          c2: cursi.c2 + coursemofanscsonly[i].c2,
          c3: cursi.c3 + coursemofanscsonly[i].c3,
          c4: cursi.c4 + coursemofanscsonly[i].c4,
          c5: cursi.c5 + coursemofanscsonly[i].c5,
          c6: cursi.c6 + coursemofanscsonly[i].c6,
          c7: cursi.c7 + coursemofanscsonly[i].c7,
          c8: cursi.c8 + coursemofanscsonly[i].c8,
          c9: cursi.c9 + coursemofanscsonly[i].c9,
          c10: cursi.c10 + coursemofanscsonly[i].c10,
        };
      cursi = {
        c1: cursi.c1 / coursemofanscsonly.length,
        c2: cursi.c2 / coursemofanscsonly.length,
        c3: cursi.c3 / coursemofanscsonly.length,
        c4: cursi.c4 / coursemofanscsonly.length,
        c5: cursi.c5 / coursemofanscsonly.length,
        c6: cursi.c6 / coursemofanscsonly.length,
        c7: cursi.c7 / coursemofanscsonly.length,
        c8: cursi.c8 / coursemofanscsonly.length,
        c9: cursi.c9 / coursemofanscsonly.length,
        c10: cursi.c10 / coursemofanscsonly.length,
      };

      courseavgsbytkufot.push({ Tkufa: bettercourse[k].Tkufa, avg: cursi });
    }

    // if (j === 2000) {
    //   emptyres = ress;
    //    resses.push(ress);
    //  } else if (ress !== emptyres) resses.push(ress);
    //   }

    res.json({ gapi: gafavgsbytkufot, cursi: courseavgsbytkufot });
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
}); */

module.exports = router;
