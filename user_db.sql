-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 10, 2025 at 12:37 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Afghanistan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(2, 'Albania', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(3, 'Algeria', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(4, 'Andorra', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(5, 'Angola', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(6, 'Antigua and Barbuda', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(7, 'Argentina', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(8, 'Armenia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(9, 'Australia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(10, 'Austria', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(11, 'Azerbaijan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(12, 'Bahamas', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(13, 'Bahrain', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(14, 'Bangladesh', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(15, 'Barbados', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(16, 'Belarus', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(17, 'Belgium', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(18, 'Belize', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(19, 'Benin', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(20, 'Bhutan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(21, 'Bolivia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(22, 'Bosnia and Herzegovina', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(23, 'Botswana', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(24, 'Brazil', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(25, 'Brunei Darussalam', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(26, 'Bulgaria', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(27, 'Burkina Faso', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(28, 'Burundi', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(29, 'Cabo Verde', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(30, 'Cambodia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(31, 'Cameroon', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(32, 'Canada', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(33, 'Central African Republic', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(34, 'Chad', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(35, 'Chile', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(36, 'China', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(37, 'Colombia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(38, 'Comoros', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(39, 'Congo (Congo-Brazzaville)', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(40, 'Congo (Democratic Republic)', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(41, 'Costa Rica', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(42, 'Croatia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(43, 'Cuba', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(44, 'Cyprus', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(45, 'Czech Republic (Czechia)', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(46, 'Denmark', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(47, 'Djibouti', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(48, 'Dominica', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(49, 'Dominican Republic', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(50, 'Ecuador', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(51, 'Egypt', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(52, 'El Salvador', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(53, 'Equatorial Guinea', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(54, 'Eritrea', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(55, 'Estonia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(56, 'Eswatini', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(57, 'Ethiopia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(58, 'Fiji', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(59, 'Finland', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(60, 'France', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(61, 'Gabon', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(62, 'Gambia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(63, 'Georgia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(64, 'Germany', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(65, 'Ghana', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(66, 'Greece', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(67, 'Grenada', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(68, 'Guatemala', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(69, 'Guinea', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(70, 'Guinea-Bissau', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(71, 'Guyana', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(72, 'Haiti', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(73, 'Honduras', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(74, 'Hungary', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(75, 'Iceland', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(76, 'India', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(77, 'Indonesia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(78, 'Iran', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(79, 'Iraq', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(80, 'Ireland', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(81, 'Israel', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(82, 'Italy', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(83, 'Jamaica', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(84, 'Japan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(85, 'Jordan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(86, 'Kazakhstan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(87, 'Kenya', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(88, 'Kiribati', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(89, 'Korea (North)', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(90, 'Korea (South)', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(91, 'Kuwait', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(92, 'Kyrgyzstan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(93, 'Laos', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(94, 'Latvia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(95, 'Lebanon', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(96, 'Lesotho', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(97, 'Liberia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(98, 'Libya', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(99, 'Liechtenstein', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(100, 'Lithuania', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(101, 'Luxembourg', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(102, 'Madagascar', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(103, 'Malawi', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(104, 'Malaysia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(105, 'Maldives', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(106, 'Mali', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(107, 'Malta', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(108, 'Marshall Islands', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(109, 'Mauritania', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(110, 'Mauritius', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(111, 'Mexico', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(112, 'Micronesia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(113, 'Moldova', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(114, 'Monaco', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(115, 'Mongolia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(116, 'Montenegro', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(117, 'Morocco', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(118, 'Mozambique', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(119, 'Myanmar (Burma)', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(120, 'Namibia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(121, 'Nauru', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(122, 'Nepal', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(123, 'Netherlands', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(124, 'New Zealand', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(125, 'Nicaragua', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(126, 'Niger', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(127, 'Nigeria', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(128, 'North Macedonia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(129, 'Norway', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(130, 'Oman', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(131, 'Pakistan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(132, 'Palau', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(133, 'Panama', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(134, 'Papua New Guinea', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(135, 'Paraguay', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(136, 'Peru', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(137, 'Philippines', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(138, 'Poland', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(139, 'Portugal', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(140, 'Qatar', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(141, 'Romania', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(142, 'Russia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(143, 'Rwanda', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(144, 'Saint Kitts and Nevis', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(145, 'Saint Lucia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(146, 'Saint Vincent and the Grenadines', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(147, 'Samoa', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(148, 'San Marino', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(149, 'Sao Tome and Principe', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(150, 'Saudi Arabia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(151, 'Senegal', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(152, 'Serbia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(153, 'Seychelles', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(154, 'Sierra Leone', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(155, 'Singapore', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(156, 'Slovakia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(157, 'Slovenia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(158, 'Solomon Islands', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(159, 'Somalia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(160, 'South Africa', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(161, 'South Sudan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(162, 'Spain', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(163, 'Sri Lanka', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(164, 'Sudan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(165, 'Suriname', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(166, 'Sweden', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(167, 'Switzerland', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(168, 'Syria', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(169, 'Taiwan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(170, 'Tajikistan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(171, 'Tanzania', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(172, 'Thailand', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(173, 'Timor-Leste', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(174, 'Togo', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(175, 'Tonga', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(176, 'Trinidad and Tobago', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(177, 'Tunisia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(178, 'Turkey', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(179, 'Turkmenistan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(180, 'Tuvalu', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(181, 'Uganda', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(182, 'Ukraine', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(183, 'United Arab Emirates', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(184, 'United Kingdom', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(185, 'United States of America', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(186, 'Uruguay', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(187, 'Uzbekistan', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(188, 'Vanuatu', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(189, 'Vatican City', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(190, 'Venezuela', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(191, 'Vietnam', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(192, 'Yemen', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(193, 'Zambia', '2025-01-02 10:08:05', '2025-01-02 10:08:05'),
(194, 'Zimbabwe', '2025-01-02 10:08:05', '2025-01-02 10:08:05');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `player_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `slug`, `created_at`, `updated_at`, `player_image`) VALUES
(1, 'aa1', 'aa1', '2025-01-06 10:56:02', '2025-01-06 10:56:02', NULL),
(2, 'bb2', 'bb2', '2025-01-06 10:56:02', '2025-01-06 10:56:02', NULL),
(3, 'cc', 'cc', '2025-01-06 10:56:02', '2025-01-06 10:56:02', NULL),
(4, 'dd', 'dd', '2025-01-06 10:56:02', '2025-01-06 10:56:02', NULL),
(5, 'qq', 'qq', '2025-01-06 11:11:51', '2025-01-06 11:11:51', NULL),
(6, 'ee', 'ee', '2025-01-06 11:11:51', '2025-01-06 11:11:51', NULL),
(7, 'rr', 'rr', '2025-01-06 11:11:51', '2025-01-06 11:11:51', NULL),
(8, 'tt', 'tt', '2025-01-06 11:11:51', '2025-01-06 11:11:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `player_stats`
--

CREATE TABLE `player_stats` (
  `id` int(11) NOT NULL,
  `series_match_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `player_point` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `percentage` int(11) DEFAULT NULL,
  `wicket` int(11) DEFAULT NULL,
  `run` int(11) DEFAULT NULL,
  `catches` int(11) DEFAULT NULL,
  `run_out` int(11) DEFAULT NULL,
  `played_no` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_stats`
--

INSERT INTO `player_stats` (`id`, `series_match_id`, `team_id`, `player_id`, `player_point`, `created_at`, `updated_at`, `percentage`, `wicket`, `run`, `catches`, `run_out`, `played_no`) VALUES
(1, 1, 1, 1, '7', '2025-01-09 10:14:22', '2025-01-09 10:14:22', 0, 7, 50, 5, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_from` timestamp NULL DEFAULT NULL,
  `date_to` timestamp NULL DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `host_country_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`id`, `name`, `date_from`, `date_to`, `short_name`, `host_country_id`, `created_at`, `updated_at`) VALUES
(1, 'Ind vs Eng T20 Series', '2025-02-04 18:30:00', '2025-02-24 18:30:00', 'T20 Series', 76, '2025-01-02 10:38:49', '2025-01-02 10:38:49'),
(2, 'India vs Australia T20 Series', '2025-03-08 18:30:00', '2025-03-30 18:30:00', 'Ind vs Aus T20', 75, '2025-01-06 06:35:11', '2025-01-06 06:35:11'),
(3, 'India vs Australia T20 Series', '2025-03-31 18:30:00', '2025-04-29 18:30:00', 'Ind vs Aus T20', 76, '2025-01-06 07:07:22', '2025-01-06 07:07:22'),
(4, 'India vs Australia T20 Series', '2024-12-31 18:30:00', '2025-01-09 18:30:00', 'Ind vs Aus T20', 9, '2025-01-06 07:28:20', '2025-01-06 07:28:20'),
(5, 'India vs Australia T20 Series', '2025-01-06 18:30:00', '2025-01-28 18:30:00', 'Ind vs Aus T20', 9, '2025-01-06 07:31:05', '2025-01-06 07:31:05'),
(6, 'India vs Australia T20 Series', '2025-01-13 18:30:00', '2025-01-15 18:30:00', 'Ind vs Aus T20', 9, '2025-01-06 07:39:42', '2025-01-06 07:39:42'),
(7, 'India vs Australia T20 Series', '2025-01-08 18:30:00', '2025-01-15 18:30:00', 'Ind vs Aus T20', 3, '2025-01-06 07:42:28', '2025-01-06 07:42:28'),
(8, 'India vs Australia T20 Series', '2025-01-15 18:30:00', '2025-01-22 18:30:00', 'Ind vs Aus T20', 8, '2025-01-06 07:43:25', '2025-01-06 07:43:25');

-- --------------------------------------------------------

--
-- Table structure for table `series_matches`
--

CREATE TABLE `series_matches` (
  `id` int(11) NOT NULL,
  `series_id` int(11) NOT NULL,
  `time_from` datetime DEFAULT NULL,
  `time_to` datetime DEFAULT NULL,
  `team1_id` int(11) DEFAULT NULL,
  `team2_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stadium` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `series_matches`
--

INSERT INTO `series_matches` (`id`, `series_id`, `time_from`, `time_to`, `team1_id`, `team2_id`, `created_at`, `updated_at`, `stadium`) VALUES
(1, 1, '2025-02-15 14:00:00', '2025-02-15 18:00:00', 1, 2, '2025-01-02 10:49:15', '2025-01-02 10:49:15', NULL),
(2, 1, '2025-01-17 00:00:00', '2025-01-30 00:00:00', 1, 2, '2025-01-06 10:12:52', '2025-01-06 10:12:52', NULL),
(3, 1, '2025-01-08 00:00:00', '2025-01-16 00:00:00', 1, 2, '2025-01-06 10:20:58', '2025-01-06 10:20:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `support`
--

INSERT INTO `support` (`id`, `subject`, `message`, `user_id`, `created_at`) VALUES
(1, 'Hi', 'Testing', 24, '2024-12-31 10:04:28');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `short_name`, `country_id`, `created_at`, `updated_at`) VALUES
(1, 'India', 'IND', 76, '2025-01-02 10:55:35', '2025-01-02 10:55:35'),
(2, 'Australia', 'Aus', 9, '2025-01-06 08:42:33', '2025-01-06 08:42:33');

-- --------------------------------------------------------

--
-- Table structure for table `team_squad`
--

CREATE TABLE `team_squad` (
  `id` int(11) NOT NULL,
  `series_match_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `player_type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_playing` tinyint(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team_squad`
--

INSERT INTO `team_squad` (`id`, `series_match_id`, `team_id`, `player_id`, `player_type`, `created_at`, `updated_at`, `is_playing`) VALUES
(6, 1, 1, 1, 'ar', '2025-01-09 09:24:14', '2025-01-09 09:24:14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `is_verified` tinyint(1) NOT NULL COMMENT '1 == verified user\r\n0 == un verified user	',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 == active user\r\n0 == inactive user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `otp`, `is_verified`, `created_at`, `updated_at`, `user_image`, `status`) VALUES
(24, 'Vazir Singh', 'vazirdhull@gmail.com', '1234567890', '$2b$10$hY3Do2Iyydv56DBoJOwM6e0ihmXLPLIQ0aGLVjtxWT7U5mobIzIEm', '404840', 1, '2024-12-31 07:24:39', '2025-01-02 07:46:26', 'http://localhost:3000/uploads/users/24/1735802927979.png', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `series_matches`
--
ALTER TABLE `series_matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_squad`
--
ALTER TABLE `team_squad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `player_stats`
--
ALTER TABLE `player_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `series_matches`
--
ALTER TABLE `series_matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `team_squad`
--
ALTER TABLE `team_squad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
