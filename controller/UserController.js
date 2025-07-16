import bcrypt from "bcrypt";
import  {UserModel}  from "../model/UserModel.js";

const UserController = {
    // Bütün istifadəçiləri gətir (şifrəsiz)
    getAll: async (req, res) => {
        try {
            const users = await UserModel.find({}, "-password"); // password sahəsini çıxarırıq
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send("Server error.");
        }
    },

    // Qeydiyyat
    register: async (req, res) => {
        try {
            const { email, password, username, contactNumber } = req.body;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send({success: false, message:"This email is already registered." });
            }


            const newUser = new UserModel({
                email,
                password,
                username,
                contactNumber
            });

            await newUser.save();

            const { password: _, ...userWithoutPassword } = newUser.toObject();

            res.status(201).json(userWithoutPassword);
        } catch (error) {
            res.status(500).send("Error registering user.");
        }
    },

    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).send("You need to register first.");
            }

            console.log(password);
            console.log(user.password);
            
            const isPasswordCorrect = password === user.password;
            if (!isPasswordCorrect) {
                return res.status(401).send("Wrong password.");
            }

            const { password: _, ...userWithoutPassword } = user.toObject();

            res.status(200).json({
                message: "Login successful.",
                user: userWithoutPassword,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error logging in.");
        }
    }
};

export default UserController;
