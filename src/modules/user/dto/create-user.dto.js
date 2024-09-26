import Joi from 'joi';

const CreateUserDto = Joi.object({
    u_name: Joi.string().max(50).required(),
    u_birth_date: Joi.date().iso().optional() // วันที่ต้องเป็นรูปแบบ ISO 8601 (YYYY-MM-DD) และไม่จำเป็นต้องมีค่า
});

export default CreateUserDto;