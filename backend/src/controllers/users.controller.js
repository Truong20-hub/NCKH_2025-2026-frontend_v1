const users = require("../models/users.model");
const bcrypt = require("bcrypt");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, full_name } = req.body;

      if (!email || !password || !full_name) {
        return res.status(400).send({ message: "Vui lòng nhập đủ thông tin!" });
      }

      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .send({ message: "Mật khẩu không đúng định dạng!" });
      }

      // Sửa lỗi tại đây: Kiểm tra email trước, sau đó mới băm mật khẩu
      users.findByEmail(email, async (existingUser) => {
        try {
          if (existingUser) {
            return res
              .status(400)
              .send({ message: "Email này đã được sử dụng!" });
          }

          // Thực hiện băm mật khẩu
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const userData = {
            username: email.split("@")[0],
            email: email,
            password: hashedPassword,
            full_name: full_name,
          };

          users.insert(userData, (result) => {
            if (!result) {
              return res
                .status(500)
                .send({ message: "Lỗi ghi dữ liệu vào TiDB!" });
            }
            return res.status(201).send({ message: "Đăng ký thành công!" });
          });
        } catch (innerErr) {
          console.error("Lỗi bên trong callback:", innerErr);
          return res
            .status(500)
            .send({ message: "Lỗi xử lý mã hóa mật khẩu!" });
        }
      });
    } catch (globalErr) {
      console.error("Lỗi hệ thống (Global):", globalErr);
      res.status(500).send({ message: "Lỗi hệ thống!" });
    }
  },

  login: (req, res) => {
    const { email, password } = req.body;

    users.findByEmail(email, async (user) => {
      try {
        if (!user)
          return res.status(404).send({ message: "Email không tồn tại!" });

        // Bcrypt compare trả về promise nên phải await hoặc dùng callback
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).send({ message: "Mật khẩu không chính xác!" });

        res.send({
          message: "Đăng nhập thành công!",
          user: { id: user.id, fullname: user.full_name, email: user.email },
        });
      } catch (err) {
        console.error("Lỗi đăng nhập:", err);
        res.status(500).send({ message: "Lỗi xác thực người dùng!" });
      }
    });
  },

  // --- CÁC HÀM CRUD KHÁC ---
  getAll: (req, res) => {
    users.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    users.getById(req.params.id, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    users.update(req.body, req.params.id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    users.delete(req.params.id, (result) => {
      res.send(result);
    });
  },
};
