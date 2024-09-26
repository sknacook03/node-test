import { doQuery } from "../../../common/database/mysql.db.js";
import { UserModels, TableName } from "../model/user.schema.js";

const UserService = {
  createUser: (payload) => {
    return doQuery(`INSERT INTO ${TableName} SET ?`, payload);
  },
  getUserAll: (columns = Object.keys(UserModels)) => {
    const options = [columns, TableName];
    return doQuery(`SELECT ?? FROM ??`, options);
  },
  getUserById: (id = {}) => {
    const sql = `SELECT * FROM ${TableName} WHERE id = ?`; // ใช้ ? แทนที่ค่าจริง
    const options = [id]; // ค่าแทนที่ ? คือ id
    return doQuery(sql, options);
  },
  getUserByName: (u_name = "") => {
    const sql = `SELECT * FROM ${TableName} WHERE LOWER(u_name) = LOWER(?)`;
    const options = [u_name]; 
    return doQuery(sql, options);
  },  
  getAvailableId: async () => {
    const sql = `SELECT MAX(id) AS maxId FROM ${TableName}`;
    const result = await doQuery(sql);
    const maxId = result[0].maxId;

    // ตรวจสอบ ID ที่ว่าง
    for (let i = 1; i <= maxId + 1; i++) {
      const exists = await doQuery(`SELECT * FROM ${TableName} WHERE id = ?`, [i]);
      if (exists.length === 0) {
        return i; // คืนค่า ID ที่ว่าง
      }
    }
    return maxId + 1; // ถ้าไม่มี ID ที่ว่าง คืนค่าหมายเลขใหม่
  },
  updateOneUserById: (id, payload) => {
    // สร้างคำสั่ง SQL สำหรับการอัปเดต
    let setClause = "";
    const values = [];

    // สร้างส่วนของคำสั่ง SET โดยการวนลูปผ่าน payload
    for (const [key, value] of Object.entries(payload)) {
      setClause += `${key} = ?, `;
      values.push(value);
    }

    //u_name = ?, u_birth_date = ?,  ลบ comma และ space ท้ายสุด
    setClause = setClause.slice(0, -2);
    console.log(setClause); //จะได้ u_name = ?, u_birth_date = ?
    // เพิ่ม id ลงใน values
    values.push(id);
    console.log(values);
    // สร้างคำสั่ง SQL โดยใช้ setClause และ tableName
    const sql = `UPDATE ${TableName} SET ${setClause} WHERE id = ?`;

    // เรียกใช้ doQuery พร้อมคำสั่ง SQL และพารามิเตอร์
    return doQuery(sql, values);
  },
  deleteUserById: (id = {}) => {
    // สร้างคำสั่ง SQL สำหรับการลบข้อมูล
    const sql = `DELETE FROM ${TableName} WHERE id = ?`;

    // เรียกใช้ doQuery พร้อมคำสั่ง SQL และพารามิเตอร์
    return doQuery(sql, [id]);
  },
};
export default UserService;
