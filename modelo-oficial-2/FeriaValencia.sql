CREATE DATABASE FeriaValencia;

USE FeriaValencia;

CREATE TABLE suscriptores (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `idioma` varchar(5) NOT NULL,
  `suscrito` int NOT NULL,
  `fecha_nac` varchar(11) NOT NULL,
  `tipoUsuario` varchar(20) NOT NULL,
  PRIMARY KEY (`idUsuario`)
);

CREATE TABLE mensaje (
  `idMensaje` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idMensaje`)
);

CREATE TABLE envios (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idMensaje` int NOT NULL,
  `fecha_envio` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idMensaje` (`idMensaje`),
  CONSTRAINT `envios_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `suscriptores` (`idUsuario`),
  CONSTRAINT `envios_ibfk_2` FOREIGN KEY (`idMensaje`) REFERENCES `mensaje` (`idMensaje`)
);




