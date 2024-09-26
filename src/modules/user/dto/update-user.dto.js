import Joi from 'joi';

const UpdateUserDto = Joi.object({
    // ไม่ได้ระบุ id ใน schema เพราะ id ควรจะอยู่ใน URL params
    u_name: Joi.string().max(50).optional(), // u_name ไม่จำเป็นต้องมีค่า
    u_birth_date: Joi.date().iso().optional() // u_birth_date เป็นวันที่ตามรูปแบบ ISO 8601 และไม่จำเป็นต้องมีค่า
});

export default UpdateUserDto;