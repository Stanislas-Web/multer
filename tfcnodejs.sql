-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Lun 18 Novembre 2019 à 21:42
-- Version du serveur: 5.5.8
-- Version de PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `tfcnodejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `ecoles`
--

CREATE TABLE IF NOT EXISTS `ecoles` (
  `idEcole` int(11) NOT NULL AUTO_INCREMENT,
  `nomEcole` varchar(100) NOT NULL,
  `categorieEcole` varchar(100) NOT NULL,
  `communeEcole` varchar(100) NOT NULL,
  `quartierEcole` varchar(100) NOT NULL,
  `avenueEcole` varchar(100) NOT NULL,
  `numeroEcole` varchar(100) NOT NULL,
  `logoEcole` varchar(100) NOT NULL,
  PRIMARY KEY (`idEcole`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `ecoles`
--

INSERT INTO `ecoles` (`idEcole`, `nomEcole`, `categorieEcole`, `communeEcole`, `quartierEcole`, `avenueEcole`, `numeroEcole`, `logoEcole`) VALUES
(1, 'Institut Diasiwa', 'privée', 'Matete', 'blvrd', 'bvrd', '34 b', 'sta.jpg'),
(2, 'Institut Diasiwa', 'privée', 'Matete', 'blvrd', 'bvrd', '34 b', 'sta.jpg');
