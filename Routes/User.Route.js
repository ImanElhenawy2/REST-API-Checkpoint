const UserRouter = require("express").Router();
const UsersModel = require("../Models/UsersModel");

//GET:  RETURN ALL USERS
UserRouter.get("/", async (req, res) => {
    try {
        let users = await UsersModel.find();
        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.messege);
    }
})
    .post("/", async (req, res) => {
        //POST:ADD A NEW USER TO THE DATABASE
        try {
            let user = new UsersModel({
                email: req.body.email,
                name: req.body.name,
            });

            let resBody = await user.save();

            res.status(200).send(resBody);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .put("/:id", async (req, res) => {
        //PUT:EDIT A USER BY ID
        try {
            await UsersModel.findOneAndReplace(
                { _id: req.params.id },
                req.body
            );
            res.status(200).send({ _id: req.params.id, ...req.body });
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    .delete("/:id", async (req, res) => {
        //DELETE : REMOVE A USER BY ID
        try {
            await UsersModel.deleteOne(
                { _id: req.params.id },
                req.body
            );
            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    });

module.exports = UserRouter;
