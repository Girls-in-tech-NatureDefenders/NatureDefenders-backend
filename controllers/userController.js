const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { handleErrors } = require("../errorResponse/handleErrors");
const secret = process.env.MY_SECRET;

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
    return jwt.sign({ id, role }, secret, {
        expiresIn: maxAge,
    });
};

// module.exports.login_get =(req, res)=>{

// }
module.exports.register_post = async (req, res) => {
    const { fullName, email, password, countryOfResidence, selectedRole } =
        req.body;

    try {
        const user = await User.create({
            fullName,
            email,
            password,
            countryOfResidence,
            role: selectedRole,
        });
        const token = createToken(user._id, user.role);
        res.cookie("jwt", token, { maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, user.role);
        res.cookie("jwt", token, { maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, token });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
