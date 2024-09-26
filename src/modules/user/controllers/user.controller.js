import UserService from "../services/user.service.js";

const UserController = {
  addUser: async (req, res) => {
    const { u_name, u_birth_date } = req.body;
    console.log(u_name, u_birth_date);
    
    try {
      const availableId = await UserService.getAvailableId();
      const created = await UserService.createUser({ id: availableId, u_name, u_birth_date });

      res.status(201).json({
        success: true,
        data: created,
        URL: req.url,
      });
    } catch (error) {
      console.error(`Error adding user: ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  showAllUser: async (req, res) => {
    try {
      const users = await UserService.getUserAll();
      res.status(200).json({
        success: true,
        data: users,
        URL: req.url,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    const users = await UserService.getUserById(id);
    res.status(200).json({
      success: true,
      data: users,
    });
  },
  getProductByName: async (req, res) => {
    const { u_name } = req.params;
    const users = await UserService.getUserByName(u_name);
    res.status(200).json({
      success: true,
      data: users,
    });
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID is required" });
      }
      const { u_name, u_birth_date } = req.body;
      const updated = await UserService.updateOneUserById(id, {
        u_name,
        u_birth_date,
      });
      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (err) {
      throw new Error(`Error updating user: ${err.message}`);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID is required" });
      }

      const result = await UserService.deleteUserById(id);
      // ตรวจสอบว่ามีแถวที่ถูกลบหรือไม่
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Data not found" });
      }
      res.status(200).json({
        success: true,
        message: "Data deleted successfully",
        data: result,
      });
    } catch (err) {
      console.error(`Error deleting data: ${err.message}`);
      res.status(500).json({
        success: false,
        message: `Error deleting data: ${err.message}`,
      });
    }
  },
};
export default UserController;
