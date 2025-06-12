import { Admin } from '../model/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const registerNewAdmin = async (req, res) => {
    try {
        const adminExist = await Admin.findOne({ email: req.body.email });
        if (adminExist) return res.status(409).json({ message: "Email already taken" });

        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        await Admin.create(req.body);

        res.status(201).json({ message: "Registered Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const adminExist = await Admin.findOne({ email: req.body.email });
        if (!adminExist) return res.status(404).json({ message: "Email does not exist" });

        const isMatched = await bcrypt.compare(req.body.password, adminExist.password);
        if (!isMatched) return res.status(401).json({ message: "Invalid Password" });

        const token = jwt.sign(
            { email: adminExist.email, id: adminExist._id },
                       'f351bde270198284e160885955749ff1541e81ac341e97f85dced21e0749204b488186e280067b14d7d0b331124490d93205c4dba2222a4b1838f77048f8a69aee3c00407cf8dee3ba170a55193ba9749c36b13fcbc9d69aa2214c501cce174fb7b204c1e48476f2a08d61f822e38f804d65c1abf9472936ddc8646f5551ce95',

            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            admin: {
                email: adminExist.email,
                id: adminExist._id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
