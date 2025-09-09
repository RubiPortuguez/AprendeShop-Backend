-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema AprendeShopDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema AprendeShopDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `AprendeShopDB` DEFAULT CHARACTER SET utf8 ;
USE `AprendeShopDB` ;

-- -----------------------------------------------------
-- Table `AprendeShopDB`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AprendeShopDB`.`curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `nombreCurso` VARCHAR(45) NOT NULL,
  `descripcionCorta` VARCHAR(200) NOT NULL,
  `descripcionDetallada` VARCHAR(500) NOT NULL,
  `categoria` VARCHAR(20) NOT NULL,
  `nivelDificultad` VARCHAR(15) NOT NULL,
  `duracionTotal` INT UNSIGNED NOT NULL,
  `idioma` VARCHAR(2) NOT NULL,
  `precio` DOUBLE UNSIGNED NOT NULL,
  `valoracionInicial` INT UNSIGNED ZEROFILL NOT NULL,
  `imagenPrincipal` VARCHAR(100) NOT NULL,
  `materiales` VARCHAR(200) NOT NULL,
  `galeriaAdicional` VARCHAR(200) NOT NULL,
  `incluyeKit` TINYINT NOT NULL,
  `descripcionKit` VARCHAR(200) NULL,
  `estado` TINYINT NOT NULL,
  `precioKit` DOUBLE UNSIGNED NOT NULL,
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AprendeShopDB`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AprendeShopDB`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `correoElectronico` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `tipoUsuario` VARCHAR(2) NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AprendeShopDB`.`comprausuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AprendeShopDB`.`comprausuario` (
  `fk_idUsuario` INT NOT NULL,
  `fk_idCurso` INT NOT NULL,
  `idCompra` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idCompra`),
  INDEX `fk_Usuario_has_Curso_Curso1_idx` (`fk_idCurso` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Curso_Usuario_idx` (`fk_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Curso_Usuario`
    FOREIGN KEY (`fk_idUsuario`)
    REFERENCES `AprendeShopDB`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuario_has_Curso_Curso1`
    FOREIGN KEY (`fk_idCurso`)
    REFERENCES `AprendeShopDB`.`curso` (`idCurso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AprendeShopDB`.`resena`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AprendeShopDB`.`resena` (
  `fk_idUsuario` INT NOT NULL,
  `fk_idCurso` INT NOT NULL,
  `idResena` INT NOT NULL AUTO_INCREMENT,
  `calificacion` INT NOT NULL,
  `comentario` VARCHAR(250) NOT NULL,
  INDEX `fk_Usuario_has_Curso_Curso2_idx` (`fk_idCurso` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Curso_Usuario1_idx` (`fk_idUsuario` ASC) VISIBLE,
  PRIMARY KEY (`idResena`),
  CONSTRAINT `fk_Usuario_has_Curso_Usuario1`
    FOREIGN KEY (`fk_idUsuario`)
    REFERENCES `AprendeShopDB`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuario_has_Curso_Curso2`
    FOREIGN KEY (`fk_idCurso`)
    REFERENCES `AprendeShopDB`.`curso` (`idCurso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
