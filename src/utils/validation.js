import joi from 'joi'


export const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
})


export const registerSchema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(8).required(),
    age: joi.number().integer().min(12).max(70).required(),
    gender: joi.valid('male', 'female').required()
})
