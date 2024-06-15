const joi = require("@hapi/joi")
exports.userRegistrationValidation = (data) =>{
    const schema = joi.object({
        firstName:joi.string().required().label("firstname").min(4),
        lastName:joi.string().required().label("lastname").min(4),
        email:joi.string().required().label("email"),
        password:joi.string().required().label("password").min(4)
    });
    return schema.validate(data);
}
exports.loginValidation = (data) =>{
    const schema = joi.object({
        email:joi.string().required().label("email"),
        password:joi.string().required().label("password").min(4)
    });
     return schema.validate(data);
}