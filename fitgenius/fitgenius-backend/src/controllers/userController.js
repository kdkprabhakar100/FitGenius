const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email phonenumber age');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
