const app = require("express").Router();
const checkAuth = require("../middleware/checkAuth");

app.get("/", checkAuth.isAdmin, (req, res) => {
    let sessionIDsArray = [];
    const getSessions = (req) => {
        return new Promise((resolve, reject) => {
            req.sessionStore.all( (err, sessions) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(sessions)
                    for(var session in sessions) {
                        let sessionID = session
                        let userID = sessions[session].passport.user
                        let obj = {}
                        obj[sessionID] = userID
                        sessionIDsArray.push(obj)
                        // console.log(sessionIDsArray)
            
                    }
                    // console.log(sessionIDsArray)
                    resolve(sessionIDsArray)
                }
                })
        })
    }

    getSessions(req)
        .then((array) => {
            // console.log(array)
            userID = []
            sessionID = []
            for (let i=0; i < array.length; i++) {
                let session = array[i]
                for (seshID in session) {
                    sessionID.push(seshID)
                    userID.push(session[seshID])
                }
            }
            // console.log(userID)
            res.render("admin", {
                array: array,
                sessions: sessionID, 
                user: req.user,
                userID: userID,
              });
        })
    });

module.exports = app;

app.post("/destroy/:key?", checkAuth.isAdmin, (req, res) => {
    // console.log("POST")
    req.sessionStore.destroy(req.params.key.replace(":",""));
    res.redirect("/admin");
});