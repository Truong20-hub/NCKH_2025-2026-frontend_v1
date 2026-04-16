const users = require("../models/users.model");
const bcrypt = require("bcrypt");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, full_name, username } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!email || !password || !full_name || !username) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
      }

      // Kiểm tra định dạng mật khẩu
      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .json({ message: "Mật khẩu không đúng định dạng!" });
      }

      // Tìm email
      users.findByEmail(email, async (existingUser) => {
        // Lưu ý: Phải dùng try-catch cả bên trong callback
        try {
          if (existingUser) {
            return res
              .status(400)
              .json({ message: "Email này đã được sử dụng!" });
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const userData = {
            username,
            email,
            password: hashedPassword,
            full_name,
          };

          users.insert(userData, (result) => {
            if (!result) {
              return res
                .status(500)
                .json({
                  message: "Lỗi ghi dữ liệu! Kiểm tra trùng Biệt danh.",
                });
            }
            return res.status(201).json({ message: "Đăng ký thành công!" });
          });
        } catch (err) {
          return res.status(500).json({ message: "Lỗi xử lý băm mật khẩu!" });
        }
      });
    } catch (globalErr) {
      console.error("Lỗi hệ thống:", globalErr);
      return res.status(500).json({ message: "Lỗi hệ thống nghiêm trọng!" });
    }
  },

  login: (req, res) => {
    const { email, password } = req.body;

    users.findByEmail(email, async (user) => {
      try {
        if (!user)
          return res.status(404).send({ message: "Email không tồn tại!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).send({ message: "Mật khẩu không chính xác!" });

        res.send({
          message: "Đăng nhập thành công!",
          user: {
            id: user.id,
            username: user.username,
            fullname: user.full_name,
            email: user.email,
          },
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
