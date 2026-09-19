CREATE DATABASE IF NOT EXISTS autolote_db;

USE autolote_db;

-- =========================================
-- TABLA: usuarios
-- =========================================

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL
);

-- =========================================
-- TABLA: vehiculos
-- =========================================

CREATE TABLE vehiculos (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio YEAR NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    disponibilidad VARCHAR(30) NOT NULL,
    imagen_url VARCHAR(500)
);

-- =========================================
-- TABLA: clientes
-- =========================================

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL
);

-- =========================================
-- TABLA: consultas
-- =========================================

CREATE TABLE consultas (
    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_vehiculo INT NOT NULL,
    fecha DATETIME NOT NULL,
    descripcion TEXT,
    estado VARCHAR(30) NOT NULL,

    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_vehiculo)
        REFERENCES vehiculos(id_vehiculo)
);

-- =========================================
-- TABLA: ventas
-- =========================================

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_vehiculo INT NOT NULL,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_venta DATETIME NOT NULL,
    precio_total DECIMAL(12,2) NOT NULL,
    impuestos DECIMAL(12,2) NOT NULL,

    FOREIGN KEY (id_vehiculo)
        REFERENCES vehiculos(id_vehiculo),

    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);