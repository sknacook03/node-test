import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

//กำหนดการเชื่อมต่อฐานข้อมูล:
const db = mysql.createConnection({
    host    : process.env.MYSQL_HOST, // หรือชื่อโฮสต์ของ MySQL server
    user    : process.env.MYSQL_USER, // ชื่อผู้ใช้ MySQL
    password: process.env.MYSQL_PASSWORD, // รหัสผ่าน MySQL
    database: process.env.MYSQL_DB_NAME, // ชื่อฐานข้อมูล MySQL ที่ต้องการเชื่อมต่อ
  });

//เปิดการเชื่อมต่อ MySQL ด้วยเมธอด connect()
db.connect((error) => {
    if (error) {
      console.error(`Not connect MySQL: ${error}`);
      return;
    }
    //แสดงหมายเลขที่ใช้ระบุแต่ละการเชื่อมต่อที่ MySQL Server 
    console.log(`connected MySQL as id: ${db.threadId}`);
});  
export const doQuery = (sql, options)=>{
    return new Promise ((resolve,reject)=>{
        db.query(sql, options, (err, res)=>{
            if(err){
                throw err
            }
            resolve(res)
        })
    })
}

export default db