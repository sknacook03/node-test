const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/user");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`[ERROR FETCHING PRODUCT]: ${error.message}`);
  }
};

const formatDateToDBStyle = (isoString) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

    queueMicrotask;iureturn `${year}-${month}-${day}`;
};

const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};

const add_user = document.getElementsByClassName("add")[0];
add_user.addEventListener("click", async () => {
  const user_form = document.getElementById("user-form");
  user_form.style.display =
    user_form.style.display === "block" ? "none" : "block";
});

const main = async () => {
  const users = await fetchUsers();
  console.log(users);

  const tableHeader = document.getElementById("table-head");
  const tableBody = document.getElementById("table-body");

  // เคลียร์แถวใน tbody
  tableBody.innerHTML = "";

  if (users.length === 0) {
    tableHeader.classList.add("hidden");
  } else {
    tableHeader.classList.remove("hidden");
    addProductToTable(users);
  }
};

const addProductToTable = (users) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // เคลียร์ตารางก่อนเพิ่มข้อมูลใหม่

  users.forEach((user) => {
    const row = document.createElement("tr");
    const formattedDate = formatDateToDBStyle(user.u_birth_date);

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.u_name}</td>
      <td>${formattedDate}</td>
    `;

    // ปุ่ม Edit
    const editCell = document.createElement("td");
    const edit_bt = document.createElement("button");
    edit_bt.innerText = "Edit";
    edit_bt.classList.add("edit-btn");
    edit_bt.addEventListener("click", () => handleEdit(user));

    editCell.appendChild(edit_bt);
    row.appendChild(editCell);

    // ปุ่ม Delete
    const deleteCell = document.createElement("td");
    const delete_bt = document.createElement("button");
    delete_bt.innerText = "Delete";
    delete_bt.classList.add("delete-btn");
    delete_bt.addEventListener("click", () => handleDelete(user.id));

    deleteCell.appendChild(delete_bt);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
};

// ฟังก์ชันสำหรับแก้ไขผู้ใช้
const handleEdit = (user) => {
  const edit_form = document.getElementById("edit-user-form");
  const showId = document.getElementById("showId");

  showId.innerText = `Edit User ID : ${user.id}`;
  document.getElementById("edit-user-form").dataset.userId = user.id;
  document.getElementById("name-edit").value = user.u_name;
  document.getElementById("birthday-edit").value = formatDateToDBStyle(
    user.u_birth_date
  );
  edit_form.style.display = "block"; 
};

// ฟังก์ชันสำหรับลบผู้ใช้
const handleDelete = async (userId) => {
  console.log(`Deleting user: ${userId}`);
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("User deleted successfully");
      main();
    } else {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  } catch (error) {
    console.error(`[ข้อผิดพลาดในการลบข้อมูล User]: ${error.message}`);
  }
};
const submitForm = async (event) => {
  event.preventDefault(); // ป้องกันการ reload หน้า
  const u_name = document.getElementById("name").value;
  const u_birth_date = document.getElementById("birthday").value || "NaN";

  try {
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ u_name, u_birth_date }),
    });
    if (!isValidDate(u_birth_date)) {
      alert("กรุณาใส่วันที่ในรูปแบบ yyyy-mm-dd");
      return;
    }
    if (response.ok) {
      console.log("User added successfully");
      main();
      const user_form = document.getElementById("user-form");
      user_form.style.display = "none";
      document.getElementById("name").value = "";
      document.getElementById("birthday").value = "";
    } else {
      console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล:");
    }
  } catch (error) {
    console.error(`[ข้อผิดพลาดในการเพิ่มข้อมูล User]: ${error.message}`);
  }
};

const editSubmitForm = async (event) => {
  event.preventDefault(); // ป้องกันการ reload หน้า
  const u_name = document.getElementById("name-edit").value;
  const u_birth_date = document.getElementById("birthday-edit").value || "NaN";
  const userId = document.getElementById("edit-user-form").dataset.userId;

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ u_name, u_birth_date }),
    });

    if (!isValidDate(u_birth_date)) {
      alert("กรุณาใส่วันที่ในรูปแบบ yyyy-mm-dd");
      return; 
    }

    if (response.ok) {
      console.log("User updated successfully");
      main();
      const edit_form = document.getElementById("edit-user-form");
      edit_form.style.display = "none";
      const close_back = document.querySelector(".back-btn");
      if (close_back) {
        close_back.remove();
      }
    } else {
      console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล:");
    }
  } catch (error) {
    console.error(`[ข้อผิดพลาดในการแก้ไขข้อมูล User]: ${error.message}`);
  }
};

const searchSubmitForm = async (event) => {
  event.preventDefault(); // ป้องกันการ reload หน้า
  const searchValue = document.getElementById("search").value;
  try {
    const isId = !isNaN(searchValue);

    let response;
    if (isId) {
      response = await fetch(`http://localhost:3000/user/${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      response = await fetch(`http://localhost:3000/user/name/${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (response.ok) {
      const getUser = await response.json();
      const users = getUser.data;
      addProductToTable(users);

      const conTable = document.getElementsByClassName("con-table")[0];

      const close_back = document.querySelector(".back-btn");
      if (close_back) {
        close_back.remove();
      }

      const back_bt = document.createElement("button");
      back_bt.innerText = "Back";
      back_bt.classList.add("back-btn");
      back_bt.addEventListener("click", () => {
        main();
        back_bt.remove();
      });

      conTable.appendChild(back_bt);
    } else {
      console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูล:");
    }
  } catch (error) {
    console.error(`[ข้อผิดพลาดในการค้นหาข้อมูล User]: ${error.message}`);
  }
};

// เพิ่ม Event Listener สำหรับการส่งฟอร์ม
document.getElementById("user-form").addEventListener("submit", submitForm);
document
  .getElementById("edit-user-form")
  .addEventListener("submit", editSubmitForm);
document
  .getElementById("search-form")
  .addEventListener("submit", searchSubmitForm);

main();
