import Joi from 'joi';

export const CreateBookDto = Joi.object({
    title: Joi.string().required(), 
    author: Joi.string().optional().default('NaN'),
});
