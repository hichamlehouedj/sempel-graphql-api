--
-- Table structure for table `automobil`
--

`automobil` (
  `id` int(11) NOT NULL,
  `id_chauffeur` int(11) DEFAULT NULL,
  `typeAuto` varchar(50) DEFAULT NULL,
  `nameAuto` varchar(50) DEFAULT NULL,
  `numAuto` varchar(30) DEFAULT NULL,
  `monarchie` varchar(20) DEFAULT NULL,
  `date_add` datetime DEFAULT NULL,
  `statu_auto` int(11) NOT NULL DEFAULT 0
}


--
-- Table structure for table `box`
--

`box` (
  `id` int(11) NOT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_status` int(11) DEFAULT NULL,
  `id_magasin` int(11) DEFAULT NULL,
  `name_client` varchar(50) DEFAULT NULL,
  `phon1_Recipient` varchar(20) DEFAULT NULL,
  `phon2_Recipient` varchar(20) DEFAULT NULL,
  `date_received` datetime DEFAULT NULL,
  `place_delivery_city` varchar(100) DEFAULT NULL,
  `place_delivery_address` int(11) DEFAULT NULL,
  `receiving_delegate` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `id_location_mony` int(11) DEFAULT NULL,
  `code_order` varchar(20) DEFAULT NULL,
  `number_Receipt` varchar(30) DEFAULT NULL,
  `Amount_with_delivery` double DEFAULT NULL,
  `Delivery_cost` double DEFAULT NULL,
  `pays_secondair` double DEFAULT NULL,
  `pays_driver` double DEFAULT NULL,
  `Company_profits` double DEFAULT NULL,
  `price_box` double DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `facture` int(11) DEFAULT 0,
  `nom_destinataire` varchar(50) DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `boxid`
--

`boxid` (
  `id_box` int(11) NOT NULL,
  `id_invoice` int(11) NOT NULL,
  `id` int(11) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `chauffeur`
--

`chauffeur` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone1` varchar(20) DEFAULT NULL,
  `phone2` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `salary` double DEFAULT NULL,
  `image` longblob DEFAULT NULL,
  `date_add` datetime DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

`client` (
  `name` varchar(50) DEFAULT NULL,
  `dateFirstWork` datetime DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `wilya` varchar(50) DEFAULT NULL,
  `note` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `image` longblob DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `exchange_detection`
--

`exchange_detection` (
  `id` int(11) NOT NULL,
  `namePerson` varchar(50) DEFAULT NULL,
  `mony` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `Reason` varchar(200) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `gains`
--

`gains` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `total` double DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `informationcompany`
--

`informationcompany` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `website` varchar(40) DEFAULT NULL,
  `addresse` varchar(40) DEFAULT NULL,
  `phone1` varchar(20) DEFAULT NULL,
  `phone2` varchar(20) DEFAULT NULL,
  `image` longblob DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `informationgmail`
--

`informationgmail` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `passowrd` varchar(30) DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

`invoice` (
  `id` int(11) NOT NULL,
  `number_box` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `total_money_box` double NOT NULL,
  `total_money_tax` double NOT NULL,
  `total_money` double NOT NULL,
  `id_client` int(11) DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `location_money`
--

`location_money` (
  `id` int(11) NOT NULL,
  `location` varchar(20) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `magasins`
--

`magasins` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `money`
--

`money` (
  `id` int(11) NOT NULL,
  `total_profits` double NOT NULL,
  `total_losses` double NOT NULL,
  `date_calcul` datetime NOT NULL,
  `user` varchar(30) DEFAULT NULL,
  `id_chauffeur` int(11) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `moneyemployee`
--

`moneyemployee` (
  `id` int(11) NOT NULL,
  `total_profites` double DEFAULT NULL,
  `total_losses` double DEFAULT NULL,
  `data_calcul` datetime NOT NULL,
  `id_officer` int(11) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `money_export`
--

`money_export` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `date` date NOT NULL,
  `value` double NOT NULL,
  `cause` varchar(200) NOT NULL,
  `note` varchar(200) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `officer`
--

`officer` (
  `id` int(11) NOT NULL,
  `id_people` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `nameEmp` varchar(50) DEFAULT NULL,
  `imgDocumentEmp` longblob DEFAULT NULL,
  `imgEmp` longblob DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `codeEmp` int(11) DEFAULT NULL,
  `divsionJob` varchar(50) DEFAULT NULL,
  `PrevCompany` varchar(50) DEFAULT NULL,
  `experienceEmp` varchar(50) DEFAULT NULL,
  `round` varchar(50) DEFAULT NULL,
  `adress` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `dateHireEmp` datetime DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

`people` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `first_phone` varchar(15) NOT NULL,
  `second_phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` longblob DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

`rent` (
  `id` int(11) NOT NULL,
  `id_auto` int(11) NOT NULL,
  `name` varchar(70) DEFAULT NULL,
  `periodRent` varchar(20) DEFAULT NULL,
  `money` double DEFAULT NULL,
  `date` datetime DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `sharegmail`
--

`sharegmail` (
  `id_sh` int(11) NOT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_statu` int(11) DEFAULT NULL,
  `nbr_box` varchar(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `statu_share` int(11) DEFAULT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

`skills` (
  `id` int(11) NOT NULL,
  `id_officer` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

`status` (
  `id` int(11) NOT NULL,
  `statu` varchar(50) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

`tasks` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `task` varchar(50) NOT NULL,
  `note` varchar(255) NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

`track` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `type_track` varchar(200) NOT NULL,
  `date` datetime NOT NULL
}

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

`users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `image` blob DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `UserAdd` int(11) NOT NULL DEFAULT 0,
  `UserList` int(11) NOT NULL DEFAULT 0,
  `UserTrack` int(11) NOT NULL DEFAULT 0,
  `EmployerAdd` int(11) NOT NULL DEFAULT 0,
  `EmployerList` int(11) NOT NULL DEFAULT 0,
  `EmployerFacture` int(11) NOT NULL DEFAULT 0,
  `ClientAdd` int(11) NOT NULL DEFAULT 0,
  `ClientList` int(11) NOT NULL DEFAULT 0,
  `ClientTrack` int(11) NOT NULL DEFAULT 0,
  `ClientFacture` int(11) NOT NULL DEFAULT 0,
  `ChauffeurAdd` int(11) NOT NULL DEFAULT 0,
  `ChauffeurList` int(11) NOT NULL DEFAULT 0,
  `ChauffeurTrack` int(11) NOT NULL DEFAULT 0,
  `ChauffeurFacture` int(11) NOT NULL DEFAULT 0,
  `LivraisonAdd` int(11) NOT NULL DEFAULT 0,
  `LivraisonList` int(11) NOT NULL DEFAULT 0,
  `ArgentImportationAdd` int(11) NOT NULL DEFAULT 0,
  `ArgentImportationList` int(11) NOT NULL DEFAULT 0,
  `ArgentExporteAdd` int(11) NOT NULL DEFAULT 0,
  `ArgentExporteList` int(11) NOT NULL DEFAULT 0,
  `SailairEmployerAdd` int(11) NOT NULL DEFAULT 0,
  `SailairEmployerList` int(11) NOT NULL DEFAULT 0,
  `SailairChauffeurAdd` int(11) NOT NULL DEFAULT 0,
  `SailairChauffeurList` int(11) NOT NULL DEFAULT 0,
  `Location` int(11) NOT NULL DEFAULT 0,
  `Email` int(11) NOT NULL DEFAULT 0,
  `Sauvegarde` int(11) NOT NULL DEFAULT 0,
  `RapportGeneral` int(11) NOT NULL DEFAULT 0,
  `RapportGanies` int(11) NOT NULL DEFAULT 0,
  `RapportImport` int(11) NOT NULL DEFAULT 0,
  `RapportExport` int(11) NOT NULL DEFAULT 0,
  `RapportClients` int(11) NOT NULL DEFAULT 0,
  `RapportChauffeurs` int(11) NOT NULL DEFAULT 0,
  `SendEmail` int(11) NOT NULL DEFAULT 0,
  `allpermission` int(11) NOT NULL DEFAULT 0,
  `informationCompany` int(11) NOT NULL DEFAULT 0
}

-- --------------------------------------------------------

--
-- Table structure for table `wilaya`
--

`wilaya` (
  `id` int(11) NOT NULL,
  `name_wilaya` varchar(50) DEFAULT NULL,
  `salary` double DEFAULT NULL
}
