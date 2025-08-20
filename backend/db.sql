-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 23, 2024 at 10:47 PM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lfix_hrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
                           `id` bigint(20) UNSIGNED NOT NULL,
                           `name` varchar(255) NOT NULL,
                           `type` varchar(255) NOT NULL,
                           `created_at` timestamp NULL DEFAULT NULL,
                           `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `type`, `created_at`, `updated_at`) VALUES
                                                                             (1, 'Asset', 'Asset', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                             (2, 'Liability', 'Liability', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                             (3, 'Capital', 'Owner\'s Equity', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
(4, 'Withdrawal', 'Owner\'s Equity', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                             (5, 'Revenue', 'Owner\'s Equity', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
(6, 'Expense', 'Owner\'s Equity', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
                                `id` bigint(20) UNSIGNED NOT NULL,
                                `title` varchar(255) NOT NULL,
                                `description` varchar(255) NOT NULL,
                                `status` varchar(255) NOT NULL DEFAULT 'true',
                                `created_at` timestamp NULL DEFAULT NULL,
                                `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appSetting`
--

CREATE TABLE `appSetting` (
                              `id` bigint(20) UNSIGNED NOT NULL,
                              `companyName` varchar(255) NOT NULL,
                              `tagLine` varchar(255) NOT NULL,
                              `address` varchar(255) NOT NULL,
                              `phone` varchar(255) NOT NULL,
                              `email` varchar(255) NOT NULL,
                              `website` varchar(255) NOT NULL,
                              `footer` varchar(255) NOT NULL,
                              `logo` varchar(255) DEFAULT NULL,
                              `timezone` varchar(255) NOT NULL DEFAULT 'UTC',
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appSetting`
--

INSERT INTO `appSetting` (`id`, `companyName`, `tagLine`, `address`, `phone`, `email`, `website`, `footer`, `logo`, `timezone`, `created_at`, `updated_at`) VALUES
    (1, 'Company Name', 'Tag Line', 'Address', '2345678', 'company@gmail.com', 'Website', 'Footer', NULL, 'UTC', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `assignedTask`
--

CREATE TABLE `assignedTask` (
                                `id` bigint(20) UNSIGNED NOT NULL,
                                `taskId` bigint(20) UNSIGNED NOT NULL,
                                `userId` bigint(20) UNSIGNED NOT NULL,
                                `status` varchar(255) NOT NULL DEFAULT 'true',
                                `created_at` timestamp NULL DEFAULT NULL,
                                `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
                              `id` bigint(20) UNSIGNED NOT NULL,
                              `userId` bigint(20) UNSIGNED NOT NULL,
                              `inTime` datetime NOT NULL,
                              `outTime` datetime DEFAULT NULL,
                              `ip` varchar(255) DEFAULT NULL,
                              `comment` varchar(255) DEFAULT NULL,
                              `punchBy` int(11) DEFAULT NULL,
                              `totalHour` double DEFAULT NULL,
                              `inTimeStatus` varchar(255) DEFAULT NULL,
                              `outTimeStatus` varchar(255) DEFAULT NULL,
                              `status` varchar(255) NOT NULL DEFAULT 'true',
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `award`
--

CREATE TABLE `award` (
                         `id` bigint(20) UNSIGNED NOT NULL,
                         `name` varchar(255) NOT NULL,
                         `description` varchar(255) DEFAULT NULL,
                         `image` varchar(255) DEFAULT NULL,
                         `status` varchar(255) NOT NULL DEFAULT 'true',
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `award`
--

INSERT INTO `award` (`id`, `name`, `description`, `image`, `status`, `created_at`, `updated_at`) VALUES
                                                                                                     (1, 'Employee of the Month', 'Awarded to the employee of the month', 'https://i.imgur.com/3Lm2Wwv.png', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                     (2, 'Employee of the Year', 'Awarded to the employee of the year', 'https://i.imgur.com/3Lm2Wwv.png', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `awardHistory`
--

CREATE TABLE `awardHistory` (
                                `id` bigint(20) UNSIGNED NOT NULL,
                                `userId` bigint(20) UNSIGNED NOT NULL,
                                `awardId` bigint(20) UNSIGNED NOT NULL,
                                `awardedDate` datetime NOT NULL,
                                `comment` varchar(255) DEFAULT NULL,
                                `status` varchar(255) NOT NULL DEFAULT 'true',
                                `created_at` timestamp NULL DEFAULT NULL,
                                `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
                              `id` bigint(20) UNSIGNED NOT NULL,
                              `name` varchar(255) NOT NULL,
                              `status` varchar(255) NOT NULL DEFAULT 'true',
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
                                                                                  (1, 'Admin', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (2, 'HR', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (3, 'IT', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (4, 'Marketing', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (5, 'Sales', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (6, 'Accounting', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (7, 'Production', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (8, 'Logistics', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (9, 'Customer Service', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (10, 'Research and Development', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (11, 'Quality Assurance', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (12, 'Purchasing', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (13, 'Legal', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (14, 'Facilities', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (15, 'Security', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                  (16, 'Management', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `name` varchar(255) NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
                                                                                   (1, 'CEO', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                   (2, 'COO', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                   (3, 'CFO', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `designationHistory`
--

CREATE TABLE `designationHistory` (
                                      `id` bigint(20) UNSIGNED NOT NULL,
                                      `userId` bigint(20) UNSIGNED NOT NULL,
                                      `designationId` bigint(20) UNSIGNED NOT NULL,
                                      `startDate` datetime NOT NULL,
                                      `endDate` datetime DEFAULT NULL,
                                      `comment` varchar(255) DEFAULT NULL,
                                      `status` varchar(255) NOT NULL DEFAULT 'true',
                                      `created_at` timestamp NULL DEFAULT NULL,
                                      `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
                             `id` bigint(20) UNSIGNED NOT NULL,
                             `userId` bigint(20) UNSIGNED NOT NULL,
                             `degree` varchar(255) NOT NULL,
                             `institution` varchar(255) NOT NULL,
                             `fieldOfStudy` varchar(255) NOT NULL,
                             `result` varchar(255) NOT NULL,
                             `studyStartDate` datetime NOT NULL,
                             `studyEndDate` datetime DEFAULT NULL,
                             `status` varchar(255) NOT NULL DEFAULT 'true',
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
                         `id` bigint(20) UNSIGNED NOT NULL,
                         `senderEmail` varchar(255) NOT NULL,
                         `receiverEmail` varchar(255) NOT NULL,
                         `subject` varchar(255) DEFAULT NULL,
                         `body` longtext DEFAULT NULL,
                         `emailStatus` varchar(255) DEFAULT NULL,
                         `status` varchar(255) NOT NULL DEFAULT 'true',
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emailConfig`
--

CREATE TABLE `emailConfig` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `emailConfigName` varchar(255) NOT NULL,
                               `emailHost` varchar(255) NOT NULL,
                               `emailPort` varchar(255) NOT NULL,
                               `emailUser` varchar(255) NOT NULL,
                               `emailPass` varchar(255) NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `emailConfig`
--

INSERT INTO `emailConfig` (`id`, `emailConfigName`, `emailHost`, `emailPort`, `emailUser`, `emailPass`, `status`, `created_at`, `updated_at`) VALUES
    (1, 'OS HRM', 'mail.osapp.net', '465', 'no-reply@osapp.net', '@omega@2020', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `employmentStatus`
--

CREATE TABLE `employmentStatus` (
                                    `id` bigint(20) UNSIGNED NOT NULL,
                                    `name` varchar(255) NOT NULL,
                                    `colourValue` varchar(255) NOT NULL,
                                    `description` varchar(255) DEFAULT NULL,
                                    `status` varchar(255) NOT NULL DEFAULT 'true',
                                    `created_at` timestamp NULL DEFAULT NULL,
                                    `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employmentStatus`
--

INSERT INTO `employmentStatus` (`id`, `name`, `colourValue`, `description`, `status`, `created_at`, `updated_at`) VALUES
                                                                                                                      (1, 'Intern', '#00FF00', 'Intern', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                      (2, 'Permanent', '#FF0000', 'Permanent', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                      (3, 'Staff', '#FFFF00', 'Staff', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                      (4, 'Terminated', '#00FFFF', 'Terminated', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
                       `id` bigint(20) UNSIGNED NOT NULL,
                       `companyId` bigint(20) UNSIGNED NOT NULL,
                       `jobTitle` varchar(255) NOT NULL,
                       `jobDescription` text NOT NULL,
                       `jobRequirement` text NOT NULL,
                       `jobLocationId` bigint(20) UNSIGNED DEFAULT NULL,
                       `jobCategoryId` bigint(20) UNSIGNED NOT NULL,
                       `totalPosition` int(11) NOT NULL,
                       `startTime` datetime NOT NULL,
                       `endTime` datetime NOT NULL,
                       `jobTypeId` bigint(20) UNSIGNED NOT NULL,
                       `jobWorkExperienceId` bigint(20) UNSIGNED NOT NULL,
                       `jobPayBy` varchar(255) NOT NULL,
                       `startingSalary` double DEFAULT NULL,
                       `maximumSalary` double DEFAULT NULL,
                       `exactSalary` double DEFAULT NULL,
                       `jobPaySystem` varchar(255) DEFAULT NULL,
                       `status` varchar(255) NOT NULL DEFAULT 'true',
                       `created_at` timestamp NULL DEFAULT NULL,
                       `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobApplication`
--

CREATE TABLE `jobApplication` (
                                  `id` bigint(20) UNSIGNED NOT NULL,
                                  `jobId` bigint(20) UNSIGNED NOT NULL,
                                  `name` varchar(255) NOT NULL,
                                  `email` varchar(255) NOT NULL,
                                  `phone` varchar(255) NOT NULL,
                                  `address` varchar(255) DEFAULT NULL,
                                  `cv` varchar(255) NOT NULL,
                                  `coverLater` text DEFAULT NULL,
                                  `status` varchar(255) NOT NULL DEFAULT 'true',
                                  `created_at` timestamp NULL DEFAULT NULL,
                                  `updated_at` timestamp NULL DEFAULT NULL,
                                  `applicationStatusId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobApplicationStatus`
--

CREATE TABLE `jobApplicationStatus` (
                                        `id` bigint(20) UNSIGNED NOT NULL,
                                        `applicationStatus` varchar(255) NOT NULL,
                                        `status` varchar(255) NOT NULL DEFAULT 'true',
                                        `created_at` timestamp NULL DEFAULT NULL,
                                        `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobApplicationStatus`
--

INSERT INTO `jobApplicationStatus` (`id`, `applicationStatus`, `status`, `created_at`, `updated_at`) VALUES
                                                                                                         (1, 'APPLIED', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (2, 'REVIEWING', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (3, 'SELECTED FOR INTERVIEW', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (4, 'INTERVIEWING', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (5, 'INTERVIEWED', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (6, 'HIRED', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (7, 'REJECTED', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                                         (8, 'CANCELLED', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `jobCategory`
--

CREATE TABLE `jobCategory` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `jobCategoryName` varchar(255) NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobCategory`
--

INSERT INTO `jobCategory` (`id`, `jobCategoryName`, `status`, `created_at`, `updated_at`) VALUES
                                                                                              (1, 'IT', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (2, 'Engineering', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (3, 'Sales', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (4, 'Content', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `jobInterview`
--

CREATE TABLE `jobInterview` (
                                `id` bigint(20) UNSIGNED NOT NULL,
                                `jobApplicationId` bigint(20) UNSIGNED NOT NULL,
                                `scheduleDate` date NOT NULL,
                                `scheduleTime` time NOT NULL,
                                `comment` varchar(255) DEFAULT NULL,
                                `interviewStatus` varchar(255) NOT NULL DEFAULT 'PENDING',
                                `status` varchar(255) NOT NULL DEFAULT 'true',
                                `created_at` timestamp NULL DEFAULT NULL,
                                `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobInterviewMember`
--

CREATE TABLE `jobInterviewMember` (
                                      `id` bigint(20) UNSIGNED NOT NULL,
                                      `jobInterviewId` bigint(20) UNSIGNED NOT NULL,
                                      `userId` bigint(20) UNSIGNED NOT NULL,
                                      `status` varchar(255) NOT NULL DEFAULT 'true',
                                      `created_at` timestamp NULL DEFAULT NULL,
                                      `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobLocation`
--

CREATE TABLE `jobLocation` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `countryName` varchar(255) NOT NULL,
                               `jobLocation` varchar(255) NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobSkills`
--

CREATE TABLE `jobSkills` (
                             `id` bigint(20) UNSIGNED NOT NULL,
                             `jobCategoryId` bigint(20) UNSIGNED NOT NULL,
                             `jobSkillName` varchar(255) NOT NULL,
                             `status` varchar(255) NOT NULL DEFAULT 'true',
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobType`
--

CREATE TABLE `jobType` (
                           `id` bigint(20) UNSIGNED NOT NULL,
                           `jobTypeName` varchar(255) NOT NULL,
                           `status` varchar(255) NOT NULL DEFAULT 'true',
                           `created_at` timestamp NULL DEFAULT NULL,
                           `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobType`
--

INSERT INTO `jobType` (`id`, `jobTypeName`, `status`, `created_at`, `updated_at`) VALUES
                                                                                      (1, 'Full Time', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                      (2, 'Part Time', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                      (3, 'On Contact', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                      (4, 'Internship', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                      (5, 'Remote', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `jobWorkExperience`
--

CREATE TABLE `jobWorkExperience` (
                                     `id` bigint(20) UNSIGNED NOT NULL,
                                     `workExperience` varchar(255) NOT NULL,
                                     `status` varchar(255) NOT NULL DEFAULT 'true',
                                     `created_at` timestamp NULL DEFAULT NULL,
                                     `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaveApplication`
--

CREATE TABLE `leaveApplication` (
                                    `id` bigint(20) UNSIGNED NOT NULL,
                                    `userId` bigint(20) UNSIGNED NOT NULL,
                                    `leaveType` varchar(255) NOT NULL,
                                    `leaveFrom` datetime NOT NULL,
                                    `leaveTo` datetime NOT NULL,
                                    `acceptLeaveFrom` datetime DEFAULT NULL,
                                    `acceptLeaveTo` datetime DEFAULT NULL,
                                    `acceptLeaveBy` int(11) DEFAULT NULL,
                                    `leaveDuration` int(11) DEFAULT NULL,
                                    `reason` varchar(255) DEFAULT NULL,
                                    `reviewComment` varchar(255) DEFAULT NULL,
                                    `attachment` varchar(255) DEFAULT NULL,
                                    `status` varchar(255) NOT NULL DEFAULT 'PENDING',
                                    `created_at` timestamp NULL DEFAULT NULL,
                                    `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leavePolicy`
--

CREATE TABLE `leavePolicy` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `name` varchar(255) NOT NULL,
                               `paidLeaveCount` int(11) NOT NULL,
                               `unpaidLeaveCount` int(11) NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leavePolicy`
--

INSERT INTO `leavePolicy` (`id`, `name`, `paidLeaveCount`, `unpaidLeaveCount`, `status`, `created_at`, `updated_at`) VALUES
                                                                                                                         (1, 'Policy 8-12', 8, 12, 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                         (2, 'Policy 12-15', 12, 15, 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                         (3, 'Policy 15-15', 15, 15, 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
                              `id` int(10) UNSIGNED NOT NULL,
                              `migration` varchar(255) NOT NULL,
                              `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
                                                          (1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
                                                          (2, '2023_07_10_040532_create_employment_status_table', 1),
                                                          (3, '2023_07_10_040552_create_department_table', 1),
                                                          (4, '2023_07_10_040609_create_role_table', 1),
                                                          (5, '2023_07_10_040624_create_shift_table', 1),
                                                          (6, '2023_07_10_040639_create_users_table', 1),
                                                          (7, '2023_07_11_071240_create_education_table', 1),
                                                          (8, '2023_07_11_111057_update_users_table', 1),
                                                          (9, '2023_07_12_065307_create_permission_table', 1),
                                                          (10, '2023_07_12_090218_create_role_permission_table', 1),
                                                          (11, '2023_07_16_082632_create_designation_table', 1),
                                                          (12, '2023_07_16_082811_create_designation_history_table', 1),
                                                          (13, '2023_07_16_090929_create_salary_history_table', 1),
                                                          (14, '2023_07_17_043455_create_app_setting_table', 1),
                                                          (15, '2023_07_17_080852_create_account_table', 1),
                                                          (16, '2023_07_17_081817_create_sub_account_table', 1),
                                                          (17, '2023_07_17_101745_create_transaction_table', 1),
                                                          (18, '2023_08_15_072853_create_announcement_table', 1),
                                                          (19, '2023_08_16_041506_create_award_table', 1),
                                                          (20, '2023_08_16_065556_create_award_history_table', 1),
                                                          (21, '2023_08_29_081018_create_email_config_table', 1),
                                                          (22, '2023_08_30_065226_create_email_table', 1),
                                                          (23, '2023_09_05_055747_create_project_table', 1),
                                                          (24, '2023_09_05_060014_create_public_holiday_table', 1),
                                                          (25, '2023_09_05_060058_create_milestone_table', 1),
                                                          (26, '2023_09_05_060215_create_task_status_table', 1),
                                                          (27, '2023_09_05_060318_create_priority_table', 1),
                                                          (28, '2023_09_05_060432_create_task_table', 1),
                                                          (29, '2023_09_05_061613_create_project_team_table', 1),
                                                          (30, '2023_09_05_062418_create_project_team_member_table', 1),
                                                          (31, '2023_09_05_062619_create_assigned_task_table', 1),
                                                          (32, '2023_09_05_102951_create_weekly_holiday_table', 1),
                                                          (33, '2023_09_06_040656_create_leave_policy_table', 1),
                                                          (34, '2023_09_06_053958_add_foreign_key_to_users', 1),
                                                          (35, '2023_09_06_073113_create_leave_application_table', 1),
                                                          (36, '2023_09_07_035153_create_attendance_table', 1),
                                                          (37, '2023_09_07_102931_create_payslip_table', 1),
                                                          (38, '2023_11_22_110118_create_job_category_table', 1),
                                                          (39, '2023_11_22_132351_create_job_type_table', 1),
                                                          (40, '2023_11_22_150353_create_job_location_table', 1),
                                                          (41, '2023_11_22_153008_create_job_skills_table', 1),
                                                          (42, '2023_11_22_163435_create_job_work_experience_table', 1),
                                                          (43, '2023_11_23_131425_create_job_table', 1),
                                                          (44, '2023_11_25_144904_create_job_application_table', 1),
                                                          (45, '2023_11_25_154930_create_job_interview_table', 1),
                                                          (46, '2023_11_25_185831_create_job_interview_member_table', 1),
                                                          (47, '2023_11_30_121107_create_skills_by_job_table', 1),
                                                          (48, '2024_01_04_151236_create_job_application_status_table', 1),
                                                          (49, '2024_01_04_172259_add_relation_to_job_application_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `milestone`
--

CREATE TABLE `milestone` (
                             `id` bigint(20) UNSIGNED NOT NULL,
                             `projectId` bigint(20) UNSIGNED NOT NULL,
                             `name` varchar(255) NOT NULL,
                             `startDate` datetime NOT NULL,
                             `endDate` datetime NOT NULL,
                             `description` varchar(255) NOT NULL,
                             `status` varchar(255) NOT NULL DEFAULT 'PENDING',
                             `created_at` timestamp NULL DEFAULT NULL,
                             `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payslip`
--

CREATE TABLE `payslip` (
                           `id` bigint(20) UNSIGNED NOT NULL,
                           `userId` bigint(20) UNSIGNED NOT NULL,
                           `salaryMonth` int(11) NOT NULL,
                           `salaryYear` int(11) NOT NULL,
                           `salary` double(8,2) NOT NULL,
                           `paidLeave` int(11) NOT NULL,
                           `unpaidLeave` int(11) NOT NULL,
                           `monthlyHoliday` int(11) NOT NULL,
                           `publicHoliday` int(11) NOT NULL,
                           `workDay` int(11) NOT NULL,
                           `shiftWiseWorkHour` double(8,2) NOT NULL,
                           `monthlyWorkHour` double(8,2) NOT NULL,
                           `hourlySalary` double(8,2) NOT NULL,
                           `workingHour` double(8,2) NOT NULL,
                           `salaryPayable` double(8,2) NOT NULL,
                           `bonus` double(8,2) NOT NULL,
                           `bonusComment` varchar(255) DEFAULT NULL,
                           `deduction` double(8,2) NOT NULL,
                           `deductionComment` varchar(255) DEFAULT NULL,
                           `totalPayable` double(8,2) NOT NULL,
                           `paymentStatus` varchar(255) NOT NULL DEFAULT 'UNPAID',
                           `created_at` timestamp NULL DEFAULT NULL,
                           `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
                              `id` bigint(20) UNSIGNED NOT NULL,
                              `name` varchar(255) NOT NULL,
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `created_at`, `updated_at`) VALUES
                                                                        (1, 'create-rolePermission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (2, 'readAll-rolePermission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (3, 'readSingle-rolePermission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (4, 'update-rolePermission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (5, 'delete-rolePermission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (6, 'create-transaction', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (7, 'readAll-transaction', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (8, 'readSingle-transaction', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (9, 'update-transaction', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (10, 'delete-transaction', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (11, 'create-permission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (12, 'readAll-permission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (13, 'readSingle-permission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (14, 'update-permission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (15, 'delete-permission', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (16, 'create-dashboard', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (17, 'readAll-dashboard', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (18, 'readSingle-dashboard', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (19, 'update-dashboard', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (20, 'delete-dashboard', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (21, 'create-user', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (22, 'readAll-user', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (23, 'readSingle-user', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (24, 'update-user', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (25, 'delete-user', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (26, 'create-role', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (27, 'readAll-role', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (28, 'readSingle-role', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (29, 'update-role', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (30, 'delete-role', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (31, 'create-designation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (32, 'readAll-designation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (33, 'readSingle-designation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (34, 'update-designation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (35, 'delete-designation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (36, 'create-account', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (37, 'readAll-account', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (38, 'readSingle-account', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (39, 'update-account', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (40, 'delete-account', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (41, 'create-setting', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (42, 'readAll-setting', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (43, 'readSingle-setting', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (44, 'update-setting', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (45, 'delete-setting', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (46, 'create-email', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (47, 'readAll-email', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (48, 'readSingle-email', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (49, 'update-email', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (50, 'delete-email', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (51, 'create-attendance', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (52, 'readAll-attendance', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (53, 'readSingle-attendance', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (54, 'update-attendance', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (55, 'delete-attendance', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (56, 'create-department', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (57, 'readAll-department', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (58, 'readSingle-department', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (59, 'update-department', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (60, 'delete-department', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (61, 'create-education', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (62, 'readAll-education', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (63, 'readSingle-education', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (64, 'update-education', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (65, 'delete-education', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (66, 'create-payroll', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (67, 'readAll-payroll', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (68, 'readSingle-payroll', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (69, 'update-payroll', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (70, 'delete-payroll', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (71, 'create-leaveApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (72, 'readAll-leaveApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (73, 'readSingle-leaveApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (74, 'update-leaveApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (75, 'delete-leaveApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (76, 'create-shift', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (77, 'readAll-shift', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (78, 'readSingle-shift', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (79, 'update-shift', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (80, 'delete-shift', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (81, 'create-employmentStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (82, 'readAll-employmentStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (83, 'readSingle-employmentStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (84, 'update-employmentStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (85, 'delete-employmentStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (86, 'create-announcement', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (87, 'readAll-announcement', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (88, 'readSingle-announcement', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (89, 'update-announcement', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (90, 'delete-announcement', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (91, 'create-salaryHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (92, 'readAll-salaryHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (93, 'readSingle-salaryHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (94, 'update-salaryHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (95, 'delete-salaryHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (96, 'create-designationHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (97, 'readAll-designationHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (98, 'readSingle-designationHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (99, 'update-designationHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (100, 'delete-designationHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (101, 'create-award', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (102, 'readAll-award', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (103, 'readSingle-award', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (104, 'update-award', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (105, 'delete-award', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (106, 'create-awardHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (107, 'readAll-awardHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (108, 'readSingle-awardHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (109, 'update-awardHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (110, 'delete-awardHistory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (111, 'create-file', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (112, 'readAll-file', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (113, 'readSingle-file', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (114, 'update-file', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (115, 'delete-file', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (116, 'create-leavePolicy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (117, 'readAll-leavePolicy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (118, 'readSingle-leavePolicy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (119, 'update-leavePolicy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (120, 'delete-leavePolicy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (121, 'create-weeklyHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (122, 'readAll-weeklyHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (123, 'readSingle-weeklyHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (124, 'update-weeklyHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (125, 'delete-weeklyHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (126, 'create-publicHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (127, 'readAll-publicHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (128, 'readSingle-publicHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (129, 'update-publicHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (130, 'delete-publicHoliday', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (131, 'create-project', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (132, 'readAll-project', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (133, 'readSingle-project', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (134, 'update-project', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (135, 'delete-project', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (136, 'create-milestone', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (137, 'readAll-milestone', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (138, 'readSingle-milestone', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (139, 'update-milestone', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (140, 'delete-milestone', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (141, 'create-task', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (142, 'readAll-task', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (143, 'readSingle-task', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (144, 'update-task', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (145, 'delete-task', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (146, 'create-projectTeam', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (147, 'readAll-projectTeam', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (148, 'readSingle-projectTeam', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (149, 'update-projectTeam', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (150, 'delete-projectTeam', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (151, 'create-taskDependency', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (152, 'readAll-taskDependency', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (153, 'readSingle-taskDependency', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (154, 'update-taskDependency', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (155, 'delete-taskDependency', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (156, 'create-taskStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (157, 'readAll-taskStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (158, 'readSingle-taskStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (159, 'update-taskStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (160, 'delete-taskStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (161, 'create-taskTime', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (162, 'readAll-taskTime', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (163, 'readSingle-taskTime', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (164, 'update-taskTime', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (165, 'delete-taskTime', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (166, 'create-priority', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (167, 'readAll-priority', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (168, 'readSingle-priority', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (169, 'update-priority', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (170, 'delete-priority', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (171, 'create-assignedTask', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (172, 'readAll-assignedTask', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (173, 'readSingle-assignedTask', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (174, 'update-assignedTask', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (175, 'delete-assignedTask', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (176, 'create-emailConfig', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (177, 'readAll-emailConfig', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (178, 'readSingle-emailConfig', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (179, 'update-emailConfig', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (180, 'delete-emailConfig', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (181, 'create-jobCategory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (182, 'readAll-jobCategory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (183, 'readSingle-jobCategory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (184, 'update-jobCategory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (185, 'delete-jobCategory', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (186, 'create-jobSkills', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (187, 'readAll-jobSkills', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (188, 'readSingle-jobSkills', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (189, 'update-jobSkills', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (190, 'delete-jobSkills', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (191, 'create-jobLocation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (192, 'readAll-jobLocation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (193, 'readSingle-jobLocation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (194, 'update-jobLocation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (195, 'delete-jobLocation', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (196, 'create-jobType', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (197, 'readAll-jobType', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (198, 'readSingle-jobType', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (199, 'update-jobType', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (200, 'delete-jobType', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (201, 'create-jobWorkExperience', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (202, 'readAll-jobWorkExperience', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (203, 'readSingle-jobWorkExperience', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (204, 'update-jobWorkExperience', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (205, 'delete-jobWorkExperience', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (206, 'create-jobPayBy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (207, 'readAll-jobPayBy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (208, 'readSingle-jobPayBy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (209, 'update-jobPayBy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (210, 'delete-jobPayBy', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (211, 'create-job', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (212, 'readAll-job', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (213, 'readSingle-job', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (214, 'update-job', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (215, 'delete-job', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (216, 'create-jobApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (217, 'readAll-jobApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (218, 'readSingle-jobApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (219, 'update-jobApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (220, 'delete-jobApplication', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (221, 'create-jobInterview', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (222, 'readAll-jobInterview', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (223, 'readSingle-jobInterview', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (224, 'update-jobInterview', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (225, 'delete-jobInterview', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (226, 'create-jobApplicationStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (227, 'readAll-jobApplicationStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (228, 'readSingle-jobApplicationStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (229, 'update-jobApplicationStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                        (230, 'delete-jobApplicationStatus', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
                                          `id` bigint(20) UNSIGNED NOT NULL,
                                          `tokenable_type` varchar(255) NOT NULL,
                                          `tokenable_id` bigint(20) UNSIGNED NOT NULL,
                                          `name` varchar(255) NOT NULL,
                                          `token` varchar(64) NOT NULL,
                                          `abilities` text DEFAULT NULL,
                                          `last_used_at` timestamp NULL DEFAULT NULL,
                                          `expires_at` timestamp NULL DEFAULT NULL,
                                          `created_at` timestamp NULL DEFAULT NULL,
                                          `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `priority`
--

CREATE TABLE `priority` (
                            `id` bigint(20) UNSIGNED NOT NULL,
                            `name` varchar(255) NOT NULL,
                            `status` varchar(255) NOT NULL DEFAULT 'true',
                            `created_at` timestamp NULL DEFAULT NULL,
                            `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `priority`
--

INSERT INTO `priority` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
                                                                                (1, 'Low', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                (2, 'Medium', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                (3, 'High', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
                           `id` bigint(20) UNSIGNED NOT NULL,
                           `projectManagerId` bigint(20) UNSIGNED NOT NULL,
                           `name` varchar(255) NOT NULL,
                           `startDate` datetime NOT NULL,
                           `endDate` datetime NOT NULL,
                           `description` varchar(255) NOT NULL,
                           `status` varchar(255) NOT NULL DEFAULT 'PENDING',
                           `created_at` timestamp NULL DEFAULT NULL,
                           `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projectTeam`
--

CREATE TABLE `projectTeam` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `projectTeamName` varchar(255) NOT NULL,
                               `projectId` bigint(20) UNSIGNED NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projectTeamMember`
--

CREATE TABLE `projectTeamMember` (
                                     `id` bigint(20) UNSIGNED NOT NULL,
                                     `projectTeamId` bigint(20) UNSIGNED NOT NULL,
                                     `userId` bigint(20) UNSIGNED NOT NULL,
                                     `status` varchar(255) NOT NULL DEFAULT 'true',
                                     `created_at` timestamp NULL DEFAULT NULL,
                                     `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publicHoliday`
--

CREATE TABLE `publicHoliday` (
                                 `id` bigint(20) UNSIGNED NOT NULL,
                                 `name` varchar(255) NOT NULL,
                                 `date` datetime NOT NULL,
                                 `status` varchar(255) NOT NULL DEFAULT 'true',
                                 `created_at` timestamp NULL DEFAULT NULL,
                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publicHoliday`
--

INSERT INTO `publicHoliday` (`id`, `name`, `date`, `status`, `created_at`, `updated_at`) VALUES
                                                                                             (1, 'New Year', '2024-05-23 00:00:00', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                             (2, 'Independence Day', '2024-05-26 00:00:00', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                             (3, 'Christmas', '2024-06-04 00:00:00', 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
                        `id` bigint(20) UNSIGNED NOT NULL,
                        `name` varchar(255) NOT NULL,
                        `status` varchar(255) NOT NULL DEFAULT 'true',
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
                                                                            (1, 'admin', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                            (2, 'employee', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                            (3, 'customer', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `rolePermission`
--

CREATE TABLE `rolePermission` (
                                  `id` bigint(20) UNSIGNED NOT NULL,
                                  `roleId` bigint(20) UNSIGNED NOT NULL,
                                  `permissionId` bigint(20) UNSIGNED NOT NULL,
                                  `created_at` timestamp NULL DEFAULT NULL,
                                  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rolePermission`
--

INSERT INTO `rolePermission` (`id`, `roleId`, `permissionId`, `created_at`, `updated_at`) VALUES
                                                                                              (1, 1, 1, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (2, 1, 2, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (3, 1, 3, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (4, 1, 4, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (5, 1, 5, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (6, 1, 6, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (7, 1, 7, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (8, 1, 8, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (9, 1, 9, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (10, 1, 10, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (11, 1, 11, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (12, 1, 12, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (13, 1, 13, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (14, 1, 14, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (15, 1, 15, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (16, 1, 16, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (17, 1, 17, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (18, 1, 18, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (19, 1, 19, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (20, 1, 20, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (21, 1, 21, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (22, 1, 22, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (23, 1, 23, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (24, 1, 24, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (25, 1, 25, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (26, 1, 26, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (27, 1, 27, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (28, 1, 28, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (29, 1, 29, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (30, 1, 30, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (31, 1, 31, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (32, 1, 32, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (33, 1, 33, '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                              (34, 1, 34, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (35, 1, 35, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (36, 1, 36, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (37, 1, 37, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (38, 1, 38, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (39, 1, 39, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (40, 1, 40, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (41, 1, 41, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (42, 1, 42, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (43, 1, 43, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (44, 1, 44, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (45, 1, 45, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (46, 1, 46, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (47, 1, 47, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (48, 1, 48, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (49, 1, 49, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (50, 1, 50, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (51, 1, 51, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (52, 1, 52, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (53, 1, 53, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (54, 1, 54, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (55, 1, 55, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (56, 1, 56, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (57, 1, 57, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (58, 1, 58, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (59, 1, 59, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (60, 1, 60, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (61, 1, 61, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (62, 1, 62, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (63, 1, 63, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (64, 1, 64, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (65, 1, 65, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (66, 1, 66, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (67, 1, 67, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (68, 1, 68, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (69, 1, 69, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (70, 1, 70, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (71, 1, 71, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (72, 1, 72, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (73, 1, 73, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (74, 1, 74, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (75, 1, 75, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (76, 1, 76, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (77, 1, 77, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (78, 1, 78, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (79, 1, 79, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (80, 1, 80, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (81, 1, 81, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (82, 1, 82, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (83, 1, 83, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (84, 1, 84, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (85, 1, 85, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (86, 1, 86, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (87, 1, 87, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (88, 1, 88, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (89, 1, 89, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (90, 1, 90, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (91, 1, 91, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (92, 1, 92, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (93, 1, 93, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (94, 1, 94, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (95, 1, 95, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (96, 1, 96, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (97, 1, 97, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (98, 1, 98, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (99, 1, 99, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (100, 1, 100, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (101, 1, 101, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (102, 1, 102, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (103, 1, 103, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (104, 1, 104, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (105, 1, 105, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (106, 1, 106, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (107, 1, 107, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (108, 1, 108, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (109, 1, 109, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (110, 1, 110, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (111, 1, 111, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (112, 1, 112, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (113, 1, 113, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (114, 1, 114, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (115, 1, 115, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (116, 1, 116, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (117, 1, 117, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (118, 1, 118, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (119, 1, 119, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (120, 1, 120, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (121, 1, 121, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (122, 1, 122, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (123, 1, 123, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (124, 1, 124, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (125, 1, 125, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (126, 1, 126, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (127, 1, 127, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (128, 1, 128, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (129, 1, 129, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (130, 1, 130, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (131, 1, 131, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (132, 1, 132, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (133, 1, 133, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (134, 1, 134, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (135, 1, 135, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (136, 1, 136, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (137, 1, 137, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (138, 1, 138, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (139, 1, 139, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (140, 1, 140, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (141, 1, 141, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (142, 1, 142, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (143, 1, 143, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (144, 1, 144, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (145, 1, 145, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (146, 1, 146, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (147, 1, 147, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (148, 1, 148, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (149, 1, 149, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (150, 1, 150, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (151, 1, 151, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (152, 1, 152, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (153, 1, 153, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (154, 1, 154, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (155, 1, 155, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (156, 1, 156, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (157, 1, 157, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (158, 1, 158, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (159, 1, 159, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (160, 1, 160, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (161, 1, 161, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (162, 1, 162, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (163, 1, 163, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (164, 1, 164, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (165, 1, 165, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (166, 1, 166, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (167, 1, 167, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (168, 1, 168, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (169, 1, 169, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (170, 1, 170, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (171, 1, 171, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (172, 1, 172, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (173, 1, 173, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (174, 1, 174, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (175, 1, 175, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (176, 1, 176, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (177, 1, 177, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (178, 1, 178, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (179, 1, 179, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (180, 1, 180, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (181, 1, 181, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (182, 1, 182, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (183, 1, 183, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (184, 1, 184, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (185, 1, 185, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (186, 1, 186, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (187, 1, 187, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (188, 1, 188, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (189, 1, 189, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (190, 1, 190, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (191, 1, 191, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (192, 1, 192, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (193, 1, 193, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (194, 1, 194, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (195, 1, 195, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (196, 1, 196, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (197, 1, 197, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (198, 1, 198, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (199, 1, 199, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (200, 1, 200, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (201, 1, 201, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (202, 1, 202, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (203, 1, 203, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (204, 1, 204, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (205, 1, 205, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (206, 1, 206, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (207, 1, 207, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (208, 1, 208, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (209, 1, 209, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (210, 1, 210, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (211, 1, 211, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (212, 1, 212, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (213, 1, 213, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (214, 1, 214, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (215, 1, 215, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (216, 1, 216, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (217, 1, 217, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (218, 1, 218, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (219, 1, 219, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (220, 1, 220, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (221, 1, 221, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (222, 1, 222, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (223, 1, 223, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (224, 1, 224, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (225, 1, 225, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (226, 1, 226, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (227, 1, 227, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (228, 1, 228, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (229, 1, 229, '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                              (230, 1, 230, '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `salaryHistory`
--

CREATE TABLE `salaryHistory` (
                                 `id` bigint(20) UNSIGNED NOT NULL,
                                 `userId` bigint(20) UNSIGNED NOT NULL,
                                 `salary` double(8,2) NOT NULL,
                                 `startDate` datetime NOT NULL,
                                 `endDate` datetime DEFAULT NULL,
                                 `comment` varchar(255) DEFAULT NULL,
                                 `status` varchar(255) NOT NULL DEFAULT 'true',
                                 `created_at` timestamp NULL DEFAULT NULL,
                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
                         `id` bigint(20) UNSIGNED NOT NULL,
                         `name` varchar(255) NOT NULL,
                         `startTime` datetime NOT NULL,
                         `endTime` datetime NOT NULL,
                         `workHour` double(8,2) DEFAULT NULL,
                         `status` varchar(255) NOT NULL DEFAULT 'true',
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`id`, `name`, `startTime`, `endTime`, `workHour`, `status`, `created_at`, `updated_at`) VALUES
                                                                                                                 (1, 'Morning', '2023-04-02 09:00:00', '2023-04-02 15:00:00', 8.00, 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                 (2, 'Afternoon', '2023-04-02 16:00:00', '2023-04-02 00:00:00', 8.00, 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                                 (3, 'Night', '2023-04-02 00:00:00', '2023-04-02 08:00:00', 8.00, 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `skillsByJob`
--

CREATE TABLE `skillsByJob` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `jobId` bigint(20) UNSIGNED NOT NULL,
                               `jobSkillId` bigint(20) UNSIGNED NOT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subAccount`
--

CREATE TABLE `subAccount` (
                              `id` bigint(20) UNSIGNED NOT NULL,
                              `name` varchar(255) NOT NULL,
                              `accountId` bigint(20) UNSIGNED NOT NULL,
                              `status` varchar(255) NOT NULL DEFAULT 'true',
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subAccount`
--

INSERT INTO `subAccount` (`id`, `name`, `accountId`, `status`, `created_at`, `updated_at`) VALUES
                                                                                               (1, 'Cash', 1, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (2, 'Bank', 1, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (3, 'Inventory', 1, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (4, 'Accounts Receivable', 1, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (5, 'Accounts Payable', 2, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (6, 'Capital', 3, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (7, 'Withdrawal', 4, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (8, 'Sales', 5, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (9, 'Cost of Sales', 6, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (10, 'Salary', 6, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (11, 'Rent', 6, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (12, 'Utilities', 6, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (13, 'Discount Earned', 5, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49'),
                                                                                               (14, 'Discount Given', 6, 'true', '2024-05-23 17:45:49', '2024-05-23 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
                        `id` bigint(20) UNSIGNED NOT NULL,
                        `projectId` bigint(20) UNSIGNED NOT NULL,
                        `milestoneId` bigint(20) UNSIGNED NOT NULL,
                        `priorityId` bigint(20) UNSIGNED NOT NULL,
                        `taskStatusId` bigint(20) UNSIGNED NOT NULL,
                        `name` varchar(255) NOT NULL,
                        `startDate` datetime NOT NULL,
                        `endDate` datetime NOT NULL,
                        `completionTime` double(8,2) NOT NULL,
                        `description` varchar(255) NOT NULL,
                        `status` varchar(255) NOT NULL DEFAULT 'true',
                        `created_at` timestamp NULL DEFAULT NULL,
                        `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taskStatus`
--

CREATE TABLE `taskStatus` (
                              `id` bigint(20) UNSIGNED NOT NULL,
                              `projectId` bigint(20) UNSIGNED NOT NULL,
                              `name` varchar(255) NOT NULL,
                              `status` varchar(255) NOT NULL DEFAULT 'true',
                              `created_at` timestamp NULL DEFAULT NULL,
                              `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
                               `id` bigint(20) UNSIGNED NOT NULL,
                               `date` datetime NOT NULL,
                               `debitId` bigint(20) UNSIGNED NOT NULL,
                               `creditId` bigint(20) UNSIGNED NOT NULL,
                               `particulars` varchar(255) NOT NULL,
                               `amount` double(8,2) NOT NULL,
                               `type` varchar(255) DEFAULT NULL,
                               `relatedId` int(11) DEFAULT NULL,
                               `status` varchar(255) NOT NULL DEFAULT 'true',
                               `created_at` timestamp NULL DEFAULT NULL,
                               `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `id` bigint(20) UNSIGNED NOT NULL,
                         `firstName` varchar(255) NOT NULL,
                         `lastName` varchar(255) NOT NULL,
                         `username` varchar(255) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `phone` varchar(255) DEFAULT NULL,
                         `street` varchar(255) DEFAULT NULL,
                         `city` varchar(255) DEFAULT NULL,
                         `state` varchar(255) DEFAULT NULL,
                         `zipCode` varchar(255) DEFAULT NULL,
                         `country` varchar(255) DEFAULT NULL,
                         `joinDate` datetime DEFAULT NULL,
                         `leaveDate` datetime DEFAULT NULL,
                         `employeeId` varchar(255) DEFAULT NULL,
                         `bloodGroup` varchar(255) DEFAULT NULL,
                         `image` varchar(255) DEFAULT NULL,
                         `employmentStatusId` bigint(20) UNSIGNED DEFAULT NULL,
                         `departmentId` bigint(20) UNSIGNED DEFAULT NULL,
                         `roleId` bigint(20) UNSIGNED NOT NULL,
                         `shiftId` bigint(20) UNSIGNED DEFAULT NULL,
                         `isLogin` varchar(255) NOT NULL DEFAULT 'false',
                         `created_at` timestamp NULL DEFAULT NULL,
                         `updated_at` timestamp NULL DEFAULT NULL,
                         `status` varchar(255) NOT NULL DEFAULT 'true',
                         `leavePolicyId` bigint(20) UNSIGNED DEFAULT NULL,
                         `weeklyHolidayId` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `email`, `phone`, `street`, `city`, `state`, `zipCode`, `country`, `joinDate`, `leaveDate`, `employeeId`, `bloodGroup`, `image`, `employmentStatusId`, `departmentId`, `roleId`, `shiftId`, `isLogin`, `created_at`, `updated_at`, `status`, `leavePolicyId`, `weeklyHolidayId`) VALUES
    (1, 'Admin', 'Admin', 'admin', '$2y$10$psiRMNVXiPbJV/EENdrIweNGHyt/4IKaq0baFcwjE172kGkfQQq8O', 'admin@gmail.com', '01700000000', 'Dhaka', 'Dhaka', 'Dhaka', '1200', 'Bangladesh', '2021-07-10 00:00:00', NULL, '0001', 'A+', 'admin.jpg', 1, 1, 1, 1, 'false', '2024-05-23 17:45:48', '2024-05-23 17:45:48', 'true', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `weeklyHoliday`
--

CREATE TABLE `weeklyHoliday` (
                                 `id` bigint(20) UNSIGNED NOT NULL,
                                 `name` varchar(255) NOT NULL,
                                 `startDay` varchar(255) NOT NULL,
                                 `endDay` varchar(255) NOT NULL,
                                 `status` varchar(255) NOT NULL DEFAULT 'true',
                                 `created_at` timestamp NULL DEFAULT NULL,
                                 `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `weeklyHoliday`
--

INSERT INTO `weeklyHoliday` (`id`, `name`, `startDay`, `endDay`, `status`, `created_at`, `updated_at`) VALUES
                                                                                                           (1, 'Saturday-Thursday', 'Saturday', 'Thursday', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48'),
                                                                                                           (2, 'Sunday-Friday', 'Sunday', 'Friday', 'true', '2024-05-23 17:45:48', '2024-05-23 17:45:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appSetting`
--
ALTER TABLE `appSetting`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assignedTask`
--
ALTER TABLE `assignedTask`
    ADD PRIMARY KEY (`id`),
  ADD KEY `assignedtask_taskid_foreign` (`taskId`),
  ADD KEY `assignedtask_userid_foreign` (`userId`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
    ADD PRIMARY KEY (`id`),
  ADD KEY `attendance_userid_foreign` (`userId`);

--
-- Indexes for table `award`
--
ALTER TABLE `award`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `award_name_unique` (`name`);

--
-- Indexes for table `awardHistory`
--
ALTER TABLE `awardHistory`
    ADD PRIMARY KEY (`id`),
  ADD KEY `awardhistory_userid_foreign` (`userId`),
  ADD KEY `awardhistory_awardid_foreign` (`awardId`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `designation_name_unique` (`name`);

--
-- Indexes for table `designationHistory`
--
ALTER TABLE `designationHistory`
    ADD PRIMARY KEY (`id`),
  ADD KEY `designationhistory_userid_foreign` (`userId`),
  ADD KEY `designationhistory_designationid_foreign` (`designationId`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
    ADD PRIMARY KEY (`id`),
  ADD KEY `education_userid_foreign` (`userId`);

--
-- Indexes for table `email`
--
ALTER TABLE `email`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emailConfig`
--
ALTER TABLE `emailConfig`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employmentStatus`
--
ALTER TABLE `employmentStatus`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employmentstatus_name_unique` (`name`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
    ADD PRIMARY KEY (`id`),
  ADD KEY `job_companyid_foreign` (`companyId`),
  ADD KEY `job_joblocationid_foreign` (`jobLocationId`),
  ADD KEY `job_jobcategoryid_foreign` (`jobCategoryId`),
  ADD KEY `job_jobtypeid_foreign` (`jobTypeId`),
  ADD KEY `job_jobworkexperienceid_foreign` (`jobWorkExperienceId`);

--
-- Indexes for table `jobApplication`
--
ALTER TABLE `jobApplication`
    ADD PRIMARY KEY (`id`),
  ADD KEY `jobapplication_jobid_foreign` (`jobId`),
  ADD KEY `jobapplication_applicationstatusid_foreign` (`applicationStatusId`);

--
-- Indexes for table `jobApplicationStatus`
--
ALTER TABLE `jobApplicationStatus`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobCategory`
--
ALTER TABLE `jobCategory`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobInterview`
--
ALTER TABLE `jobInterview`
    ADD PRIMARY KEY (`id`),
  ADD KEY `jobinterview_jobapplicationid_foreign` (`jobApplicationId`);

--
-- Indexes for table `jobInterviewMember`
--
ALTER TABLE `jobInterviewMember`
    ADD PRIMARY KEY (`id`),
  ADD KEY `jobinterviewmember_jobinterviewid_foreign` (`jobInterviewId`),
  ADD KEY `jobinterviewmember_userid_foreign` (`userId`);

--
-- Indexes for table `jobLocation`
--
ALTER TABLE `jobLocation`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobSkills`
--
ALTER TABLE `jobSkills`
    ADD PRIMARY KEY (`id`),
  ADD KEY `jobskills_jobcategoryid_foreign` (`jobCategoryId`);

--
-- Indexes for table `jobType`
--
ALTER TABLE `jobType`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobWorkExperience`
--
ALTER TABLE `jobWorkExperience`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaveApplication`
--
ALTER TABLE `leaveApplication`
    ADD PRIMARY KEY (`id`),
  ADD KEY `leaveapplication_userid_foreign` (`userId`);

--
-- Indexes for table `leavePolicy`
--
ALTER TABLE `leavePolicy`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `leavepolicy_name_unique` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestone`
--
ALTER TABLE `milestone`
    ADD PRIMARY KEY (`id`),
  ADD KEY `milestone_projectid_foreign` (`projectId`);

--
-- Indexes for table `payslip`
--
ALTER TABLE `payslip`
    ADD PRIMARY KEY (`id`),
  ADD KEY `payslip_userid_foreign` (`userId`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permission_name_unique` (`name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `priority`
--
ALTER TABLE `priority`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
    ADD PRIMARY KEY (`id`),
  ADD KEY `project_projectmanagerid_foreign` (`projectManagerId`);

--
-- Indexes for table `projectTeam`
--
ALTER TABLE `projectTeam`
    ADD PRIMARY KEY (`id`),
  ADD KEY `projectteam_projectid_foreign` (`projectId`);

--
-- Indexes for table `projectTeamMember`
--
ALTER TABLE `projectTeamMember`
    ADD PRIMARY KEY (`id`),
  ADD KEY `projectteammember_projectteamid_foreign` (`projectTeamId`),
  ADD KEY `projectteammember_userid_foreign` (`userId`);

--
-- Indexes for table `publicHoliday`
--
ALTER TABLE `publicHoliday`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolePermission`
--
ALTER TABLE `rolePermission`
    ADD PRIMARY KEY (`id`),
  ADD KEY `rolepermission_roleid_foreign` (`roleId`),
  ADD KEY `rolepermission_permissionid_foreign` (`permissionId`);

--
-- Indexes for table `salaryHistory`
--
ALTER TABLE `salaryHistory`
    ADD PRIMARY KEY (`id`),
  ADD KEY `salaryhistory_userid_foreign` (`userId`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shift_name_unique` (`name`);

--
-- Indexes for table `skillsByJob`
--
ALTER TABLE `skillsByJob`
    ADD PRIMARY KEY (`id`),
  ADD KEY `skillsbyjob_jobid_foreign` (`jobId`),
  ADD KEY `skillsbyjob_jobskillid_foreign` (`jobSkillId`);

--
-- Indexes for table `subAccount`
--
ALTER TABLE `subAccount`
    ADD PRIMARY KEY (`id`),
  ADD KEY `subaccount_accountid_foreign` (`accountId`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
    ADD PRIMARY KEY (`id`),
  ADD KEY `task_projectid_foreign` (`projectId`),
  ADD KEY `task_milestoneid_foreign` (`milestoneId`),
  ADD KEY `task_priorityid_foreign` (`priorityId`),
  ADD KEY `task_taskstatusid_foreign` (`taskStatusId`);

--
-- Indexes for table `taskStatus`
--
ALTER TABLE `taskStatus`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taskstatus_projectid_name_unique` (`projectId`,`name`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
    ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_debitid_foreign` (`debitId`),
  ADD KEY `transaction_creditid_foreign` (`creditId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_employmentstatusid_foreign` (`employmentStatusId`),
  ADD KEY `users_departmentid_foreign` (`departmentId`),
  ADD KEY `users_roleid_foreign` (`roleId`),
  ADD KEY `users_shiftid_foreign` (`shiftId`),
  ADD KEY `users_leavepolicyid_foreign` (`leavePolicyId`),
  ADD KEY `users_weeklyholidayid_foreign` (`weeklyHolidayId`);

--
-- Indexes for table `weeklyHoliday`
--
ALTER TABLE `weeklyHoliday`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appSetting`
--
ALTER TABLE `appSetting`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assignedTask`
--
ALTER TABLE `assignedTask`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `award`
--
ALTER TABLE `award`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `awardHistory`
--
ALTER TABLE `awardHistory`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `designationHistory`
--
ALTER TABLE `designationHistory`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emailConfig`
--
ALTER TABLE `emailConfig`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employmentStatus`
--
ALTER TABLE `employmentStatus`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobApplication`
--
ALTER TABLE `jobApplication`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobApplicationStatus`
--
ALTER TABLE `jobApplicationStatus`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `jobCategory`
--
ALTER TABLE `jobCategory`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobInterview`
--
ALTER TABLE `jobInterview`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobInterviewMember`
--
ALTER TABLE `jobInterviewMember`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobLocation`
--
ALTER TABLE `jobLocation`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobSkills`
--
ALTER TABLE `jobSkills`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobType`
--
ALTER TABLE `jobType`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobWorkExperience`
--
ALTER TABLE `jobWorkExperience`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaveApplication`
--
ALTER TABLE `leaveApplication`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leavePolicy`
--
ALTER TABLE `leavePolicy`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `milestone`
--
ALTER TABLE `milestone`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payslip`
--
ALTER TABLE `payslip`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `priority`
--
ALTER TABLE `priority`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projectTeam`
--
ALTER TABLE `projectTeam`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projectTeamMember`
--
ALTER TABLE `projectTeamMember`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publicHoliday`
--
ALTER TABLE `publicHoliday`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rolePermission`
--
ALTER TABLE `rolePermission`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `salaryHistory`
--
ALTER TABLE `salaryHistory`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `skillsByJob`
--
ALTER TABLE `skillsByJob`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subAccount`
--
ALTER TABLE `subAccount`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskStatus`
--
ALTER TABLE `taskStatus`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `weeklyHoliday`
--
ALTER TABLE `weeklyHoliday`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignedTask`
--
ALTER TABLE `assignedTask`
    ADD CONSTRAINT `assignedtask_taskid_foreign` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignedtask_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
    ADD CONSTRAINT `attendance_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `awardHistory`
--
ALTER TABLE `awardHistory`
    ADD CONSTRAINT `awardhistory_awardid_foreign` FOREIGN KEY (`awardId`) REFERENCES `award` (`id`),
  ADD CONSTRAINT `awardhistory_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `designationHistory`
--
ALTER TABLE `designationHistory`
    ADD CONSTRAINT `designationhistory_designationid_foreign` FOREIGN KEY (`designationId`) REFERENCES `designation` (`id`),
  ADD CONSTRAINT `designationhistory_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `education`
--
ALTER TABLE `education`
    ADD CONSTRAINT `education_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `job`
--
ALTER TABLE `job`
    ADD CONSTRAINT `job_companyid_foreign` FOREIGN KEY (`companyId`) REFERENCES `appSetting` (`id`),
  ADD CONSTRAINT `job_jobcategoryid_foreign` FOREIGN KEY (`jobCategoryId`) REFERENCES `jobCategory` (`id`),
  ADD CONSTRAINT `job_joblocationid_foreign` FOREIGN KEY (`jobLocationId`) REFERENCES `jobLocation` (`id`),
  ADD CONSTRAINT `job_jobtypeid_foreign` FOREIGN KEY (`jobTypeId`) REFERENCES `jobType` (`id`),
  ADD CONSTRAINT `job_jobworkexperienceid_foreign` FOREIGN KEY (`jobWorkExperienceId`) REFERENCES `jobWorkExperience` (`id`);

--
-- Constraints for table `jobApplication`
--
ALTER TABLE `jobApplication`
    ADD CONSTRAINT `jobapplication_applicationstatusid_foreign` FOREIGN KEY (`applicationStatusId`) REFERENCES `jobApplicationStatus` (`id`),
  ADD CONSTRAINT `jobapplication_jobid_foreign` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`);

--
-- Constraints for table `jobInterview`
--
ALTER TABLE `jobInterview`
    ADD CONSTRAINT `jobinterview_jobapplicationid_foreign` FOREIGN KEY (`jobApplicationId`) REFERENCES `jobApplication` (`id`);

--
-- Constraints for table `jobInterviewMember`
--
ALTER TABLE `jobInterviewMember`
    ADD CONSTRAINT `jobinterviewmember_jobinterviewid_foreign` FOREIGN KEY (`jobInterviewId`) REFERENCES `jobInterview` (`id`),
  ADD CONSTRAINT `jobinterviewmember_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `jobSkills`
--
ALTER TABLE `jobSkills`
    ADD CONSTRAINT `jobskills_jobcategoryid_foreign` FOREIGN KEY (`jobCategoryId`) REFERENCES `jobCategory` (`id`);

--
-- Constraints for table `leaveApplication`
--
ALTER TABLE `leaveApplication`
    ADD CONSTRAINT `leaveapplication_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `milestone`
--
ALTER TABLE `milestone`
    ADD CONSTRAINT `milestone_projectid_foreign` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payslip`
--
ALTER TABLE `payslip`
    ADD CONSTRAINT `payslip_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
    ADD CONSTRAINT `project_projectmanagerid_foreign` FOREIGN KEY (`projectManagerId`) REFERENCES `users` (`id`);

--
-- Constraints for table `projectTeam`
--
ALTER TABLE `projectTeam`
    ADD CONSTRAINT `projectteam_projectid_foreign` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectTeamMember`
--
ALTER TABLE `projectTeamMember`
    ADD CONSTRAINT `projectteammember_projectteamid_foreign` FOREIGN KEY (`projectTeamId`) REFERENCES `projectTeam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projectteammember_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rolePermission`
--
ALTER TABLE `rolePermission`
    ADD CONSTRAINT `rolepermission_permissionid_foreign` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `rolepermission_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);

--
-- Constraints for table `salaryHistory`
--
ALTER TABLE `salaryHistory`
    ADD CONSTRAINT `salaryhistory_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `skillsByJob`
--
ALTER TABLE `skillsByJob`
    ADD CONSTRAINT `skillsbyjob_jobid_foreign` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`),
  ADD CONSTRAINT `skillsbyjob_jobskillid_foreign` FOREIGN KEY (`jobSkillId`) REFERENCES `jobSkills` (`id`);

--
-- Constraints for table `subAccount`
--
ALTER TABLE `subAccount`
    ADD CONSTRAINT `subaccount_accountid_foreign` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
    ADD CONSTRAINT `task_milestoneid_foreign` FOREIGN KEY (`milestoneId`) REFERENCES `milestone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_priorityid_foreign` FOREIGN KEY (`priorityId`) REFERENCES `priority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_projectid_foreign` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_taskstatusid_foreign` FOREIGN KEY (`taskStatusId`) REFERENCES `taskStatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskStatus`
--
ALTER TABLE `taskStatus`
    ADD CONSTRAINT `taskstatus_projectid_foreign` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
    ADD CONSTRAINT `transaction_creditid_foreign` FOREIGN KEY (`creditId`) REFERENCES `subAccount` (`id`),
  ADD CONSTRAINT `transaction_debitid_foreign` FOREIGN KEY (`debitId`) REFERENCES `subAccount` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
    ADD CONSTRAINT `users_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `users_employmentstatusid_foreign` FOREIGN KEY (`employmentStatusId`) REFERENCES `employmentStatus` (`id`),
  ADD CONSTRAINT `users_leavepolicyid_foreign` FOREIGN KEY (`leavePolicyId`) REFERENCES `leavePolicy` (`id`),
  ADD CONSTRAINT `users_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `users_shiftid_foreign` FOREIGN KEY (`shiftId`) REFERENCES `shift` (`id`),
  ADD CONSTRAINT `users_weeklyholidayid_foreign` FOREIGN KEY (`weeklyHolidayId`) REFERENCES `weeklyHoliday` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
