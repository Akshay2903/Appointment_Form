const User = require('../model/user');

exports.saveDataToDatabase = async (req,res, next) => {
    try {
        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        res.status(201).json(data);
    } catch (error) {
        console.error(`Error saving data ${error}`);
        res.status(500).json({ error: 'Error saving data to the database'});
    }
};

exports.deleteDataFromDatabase = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.destroy({where: {id:id}});
        res.status(201).json({message: 'Deleted data from database'});
    } catch (error) {
        console.log(error);
    }
};

exports.getAllData = async (req, res, next) => {
    try {
        const dbData = await User.findAll();
        const data = dbData.map(data => data.dataValues);
        res.status(201).json(data);
    } catch (error) {
        console.error(`Error saving data ${error}`);
        res.status(500).json({error: 'Error saving data to the database'});
    }
}