CREATE TABLE `congviec` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `MucTieuId` bigint NOT NULL,
  `TieuDe` varchar(200) NOT NULL,
  `ThoiGianDuKien` int DEFAULT NULL,
  `DaHoanThanh` tinyint(1) DEFAULT '0',
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `MucTieuId` (`MucTieuId`),
  CONSTRAINT `congviec_ibfk_1` FOREIGN KEY (`MucTieuId`) REFERENCES `muctieu` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `goiyai` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `MucTieuId` bigint DEFAULT NULL,
  `NoiDungGoiY` text,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  KEY `MucTieuId` (`MucTieuId`),
  CONSTRAINT `goiyai_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `goiyai_ibfk_2` FOREIGN KEY (`MucTieuId`) REFERENCES `muctieu` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `goiyai` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `MucTieuId` bigint DEFAULT NULL,
  `NoiDungGoiY` text,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  KEY `MucTieuId` (`MucTieuId`),
  CONSTRAINT `goiyai_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `goiyai_ibfk_2` FOREIGN KEY (`MucTieuId`) REFERENCES `muctieu` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `khunggio` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `LichId` bigint DEFAULT NULL,
  `MucTieuId` bigint DEFAULT NULL,
  `CongViecId` bigint DEFAULT NULL,
  `ThoiGianBatDau` datetime NOT NULL,
  `ThoiGianKetThuc` datetime NOT NULL,
  `TrangThai` varchar(20) DEFAULT 'free',
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  KEY `LichId` (`LichId`),
  KEY `MucTieuId` (`MucTieuId`),
  KEY `CongViecId` (`CongViecId`),
  CONSTRAINT `khunggio_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`),
  CONSTRAINT `khunggio_ibfk_2` FOREIGN KEY (`LichId`) REFERENCES `lich` (`Id`),
  CONSTRAINT `khunggio_ibfk_3` FOREIGN KEY (`MucTieuId`) REFERENCES `muctieu` (`Id`),
  CONSTRAINT `khunggio_ibfk_4` FOREIGN KEY (`CongViecId`) REFERENCES `congviec` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `lich` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `TieuDe` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  CONSTRAINT `lich_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `muctieu` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `TieuDe` varchar(200) NOT NULL,
  `MoTa` text,
  `DoUuTien` enum('thap','trung_binh','cao') DEFAULT 'trung_binh',
  `TrangThai` enum('lap_ke_hoach','dang_thuc_hien','hoan_thanh','huy_bo') DEFAULT 'lap_ke_hoach',
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  CONSTRAINT `muctieu_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `nguoidung` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `TenDangNhap` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `HoTen` varchar(100) DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `TenDangNhap` (`TenDangNhap`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `nhatkytiendo` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `MucTieuId` bigint DEFAULT NULL,
  `CongViecId` bigint DEFAULT NULL,
  `PhanTramTienDo` tinyint DEFAULT NULL,
  `ThoiGianGhi` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  KEY `MucTieuId` (`MucTieuId`),
  KEY `CongViecId` (`CongViecId`),
  CONSTRAINT `nhatkytiendo_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `nhatkytiendo_ibfk_2` FOREIGN KEY (`MucTieuId`) REFERENCES `muctieu` (`Id`),
  CONSTRAINT `nhatkytiendo_ibfk_3` FOREIGN KEY (`CongViecId`) REFERENCES `congviec` (`Id`),
  CONSTRAINT `nhatkytiendo_chk_1` CHECK ((`PhanTramTienDo` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `thongbao` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `NguoiDungId` bigint NOT NULL,
  `MucTieuId` bigint DEFAULT NULL,
  `CongViecId` bigint DEFAULT NULL,
  `Loai` varchar(30) NOT NULL,
  `TieuDe` varchar(150) DEFAULT NULL,
  `DaDoc` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `NguoiDungId` (`NguoiDungId`),
  KEY `MucTieuId` (`MucTieuId`),
  KEY `CongViecId` (`CongViecId`),
  CONSTRAINT `thongbao_ibfk_1` FOREIGN KEY (`NguoiDungId`) REFERENCES `nguoidung` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `thongbao_ibfk_2` FOREIGN KEY (`MucTieuId`) REFERENCES `muctieu` (`Id`),
  CONSTRAINT `thongbao_ibfk_3` FOREIGN KEY (`CongViecId`) REFERENCES `congviec` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;