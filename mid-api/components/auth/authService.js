const authModel = require('./auth');
const bcrypt = require('bcryptjs');


module.exports.getUserByUsername = async (username) =>{
    const result = await authModel.findOne({username: username});
    return result;
}

module.exports.getUserByID= async (id) =>{
    const result = await authModel.findOne({_id: id});
    return result;
}

module.exports.createUser = async (username, password, name, phone) =>{
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new authModel({ username, password: hash, name, phone });
    return newUser.save();
}

module.exports.updateUser = async (id, name, phone) => {
    const result = await authModel.updateOne({ '_id': id }, { $set: { 'name': name, 'phone': phone }}, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
}