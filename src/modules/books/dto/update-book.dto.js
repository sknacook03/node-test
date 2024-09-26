import Joi from "joi";
export const UpdateBookDto = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
});
