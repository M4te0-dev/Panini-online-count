import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ============================================================
   DONNÉES — Base de données joueurs FIFA World Cup 2026
   ============================================================ */

const PLAYER_DB = {"MEX1": "Logo", "MEX2": "Luis Johnson", "MEX3": "João Suzuki", "MEX4": "Marco Kovač", "MEX5": "Ahmed Nielsen", "MEX6": "Youssef Mansour", "MEX7": "Erik Mensah", "MEX8": "Lars Reyes", "MEX9": "Mateo Dubois", "MEX10": "Diego Kim", "MEX11": "Andrés Haidara", "MEX12": "Pedro van der Berg", "MEX13": "Photo d'Équipe", "MEX14": "Sven Nowak", "MEX15": "Hans Rahimi", "MEX16": "Kwame Owusu", "MEX17": "Kofi García", "MEX18": "Ibrahim Ferrari", "MEX19": "Omar Tanaka", "MEX20": "Hyun Horvat", "RSA1": "Logo", "RSA2": "Jin Karlsson", "RSA3": "Kenji Hassan", "RSA4": "Ren Adeyemi", "RSA5": "Tomas Morales", "RSA6": "Pavel Schmidt", "RSA7": "Dario Nguyen", "RSA8": "Nico Traoré", "RSA9": "Bruno Popović", "RSA10": "Rafael Kowalski", "RSA11": "Felipe Amiri", "RSA12": "Gabriel Osei", "RSA13": "Photo d'Équipe", "RSA14": "Adrián Santos", "RSA15": "Iker Rossi", "RSA16": "Aitor Park", "RSA17": "Jonas Novak", "RSA18": "Elias Andersson", "RSA19": "Noah Ionescu", "RSA20": "Liam Okafor", "KOR1": "Logo", "KOR2": "Ryan Rojas", "KOR3": "Connor Müller", "KOR4": "Cameron Smith", "KOR5": "Amadou Diallo", "KOR6": "Moussa Petrov", "KOR7": "Ismael Larsen", "KOR8": "Idris Khalil", "KOR9": "Karim Boateng", "KOR10": "Nabil Silva", "KOR11": "Yassine Martin", "KOR12": "Reza Lee", "KOR13": "Photo d'Équipe", "KOR14": "Arman Keita", "KOR15": "Cyrus de Jong", "KOR16": "Facundo Popescu", "KOR17": "Enzo Hosseini", "KOR18": "Tiago Cabrera", "KOR19": "Rui Fernández", "KOR20": "Miguel Johnson", "CZE1": "Logo", "CZE2": "Simão Suzuki", "CZE3": "Tibor Kovač", "CZE4": "Zoltan Nielsen", "CZE5": "Milan Mansour", "CZE6": "Stefan Mensah", "CZE7": "Carlos Reyes", "CZE8": "Luis Dubois", "CZE9": "João Kim", "CZE10": "Marco Haidara", "CZE11": "Ahmed van der Berg", "CZE12": "Youssef Nowak", "CZE13": "Photo d'Équipe", "CZE14": "Erik Rahimi", "CZE15": "Lars Owusu", "CZE16": "Mateo García", "CZE17": "Diego Ferrari", "CZE18": "Andrés Tanaka", "CZE19": "Pedro Horvat", "CZE20": "Sven Karlsson", "SUI1": "Logo", "SUI2": "Hans Hassan", "SUI3": "Kwame Adeyemi", "SUI4": "Kofi Morales", "SUI5": "Ibrahim Schmidt", "SUI6": "Omar Nguyen", "SUI7": "Hyun Traoré", "SUI8": "Jin Popović", "SUI9": "Kenji Kowalski", "SUI10": "Ren Amiri", "SUI11": "Tomas Osei", "SUI12": "Pavel Santos", "SUI13": "Photo d'Équipe", "SUI14": "Dario Rossi", "SUI15": "Nico Park", "SUI16": "Bruno Novak", "SUI17": "Rafael Andersson", "SUI18": "Felipe Ionescu", "SUI19": "Gabriel Okafor", "SUI20": "Adrián Rojas", "CAN1": "Logo", "CAN2": "Iker Müller", "CAN3": "Aitor Smith", "CAN4": "Jonas Diallo", "CAN5": "Elias Petrov", "CAN6": "Noah Larsen", "CAN7": "Liam Khalil", "CAN8": "Ryan Boateng", "CAN9": "Connor Silva", "CAN10": "Cameron Martin", "CAN11": "Amadou Lee", "CAN12": "Moussa Keita", "CAN13": "Photo d'Équipe", "CAN14": "Ismael de Jong", "CAN15": "Idris Popescu", "CAN16": "Karim Hosseini", "CAN17": "Nabil Cabrera", "CAN18": "Yassine Fernández", "CAN19": "Reza Johnson", "CAN20": "Arman Suzuki", "QAT1": "Logo", "QAT2": "Cyrus Kovač", "QAT3": "Facundo Nielsen", "QAT4": "Enzo Mansour", "QAT5": "Tiago Mensah", "QAT6": "Rui Reyes", "QAT7": "Miguel Dubois", "QAT8": "Simão Kim", "QAT9": "Tibor Haidara", "QAT10": "Zoltan van der Berg", "QAT11": "Milan Nowak", "QAT12": "Stefan Rahimi", "QAT13": "Photo d'Équipe", "QAT14": "Carlos Owusu", "QAT15": "Luis García", "QAT16": "João Ferrari", "QAT17": "Marco Tanaka", "QAT18": "Ahmed Horvat", "QAT19": "Youssef Karlsson", "QAT20": "Erik Hassan", "BIH1": "Logo", "BIH2": "Lars Adeyemi", "BIH3": "Mateo Morales", "BIH4": "Diego Schmidt", "BIH5": "Andrés Nguyen", "BIH6": "Pedro Traoré", "BIH7": "Sven Popović", "BIH8": "Hans Kowalski", "BIH9": "Kwame Amiri", "BIH10": "Kofi Osei", "BIH11": "Ibrahim Santos", "BIH12": "Omar Rossi", "BIH13": "Photo d'Équipe", "BIH14": "Hyun Park", "BIH15": "Jin Novak", "BIH16": "Kenji Andersson", "BIH17": "Ren Ionescu", "BIH18": "Tomas Okafor", "BIH19": "Pavel Rojas", "BIH20": "Dario Müller", "BRA1": "Logo", "BRA2": "Nico Smith", "BRA3": "Bruno Diallo", "BRA4": "Rafael Petrov", "BRA5": "Felipe Larsen", "BRA6": "Gabriel Khalil", "BRA7": "Adrián Boateng", "BRA8": "Iker Silva", "BRA9": "Aitor Martin", "BRA10": "Rodrygo", "BRA11": "Jonas Lee", "BRA12": "Elias Keita", "BRA13": "Photo d'Équipe", "BRA14": "Vinicius Jr", "BRA15": "Noah de Jong", "BRA16": "Liam Popescu", "BRA17": "Ryan Hosseini", "BRA18": "Connor Cabrera", "BRA19": "Cameron Fernández", "BRA20": "Amadou Johnson", "MAR1": "Logo", "MAR2": "Moussa Suzuki", "MAR3": "Ismael Kovač", "MAR4": "Idris Nielsen", "MAR5": "Karim Mansour", "MAR6": "Nabil Mensah", "MAR7": "Yassine Reyes", "MAR8": "Reza Dubois", "MAR9": "Arman Kim", "MAR10": "Cyrus Haidara", "MAR11": "Facundo van der Berg", "MAR12": "Enzo Nowak", "MAR13": "Photo d'Équipe", "MAR14": "Tiago Rahimi", "MAR15": "Rui Owusu", "MAR16": "Miguel García", "MAR17": "Achraf Hakimi", "MAR18": "Simão Ferrari", "MAR19": "Tibor Tanaka", "MAR20": "Zoltan Horvat", "SCO1": "Logo", "SCO2": "Milan Karlsson", "SCO3": "Stefan Hassan", "SCO4": "Carlos Adeyemi", "SCO5": "Luis Morales", "SCO6": "João Schmidt", "SCO7": "Marco Nguyen", "SCO8": "Ahmed Traoré", "SCO9": "Youssef Popović", "SCO10": "Erik Kowalski", "SCO11": "Lars Amiri", "SCO12": "Mateo Osei", "SCO13": "Photo d'Équipe", "SCO14": "Diego Santos", "SCO15": "Andrés Rossi", "SCO16": "Pedro Park", "SCO17": "Sven Novak", "SCO18": "Hans Andersson", "SCO19": "Kwame Ionescu", "SCO20": "Kofi Okafor", "HAI1": "Logo", "HAI2": "Ibrahim Rojas", "HAI3": "Omar Müller", "HAI4": "Hyun Smith", "HAI5": "Jin Diallo", "HAI6": "Kenji Petrov", "HAI7": "Ren Larsen", "HAI8": "Tomas Khalil", "HAI9": "Pavel Boateng", "HAI10": "Dario Silva", "HAI11": "Nico Martin", "HAI12": "Bruno Lee", "HAI13": "Photo d'Équipe", "HAI14": "Rafael Keita", "HAI15": "Felipe de Jong", "HAI16": "Gabriel Popescu", "HAI17": "Adrián Hosseini", "HAI18": "Iker Cabrera", "HAI19": "Aitor Fernández", "HAI20": "Jonas Johnson", "USA1": "Logo", "USA2": "Elias Suzuki", "USA3": "Noah Kovač", "USA4": "Liam Nielsen", "USA5": "Ryan Mansour", "USA6": "Connor Mensah", "USA7": "Christian Pulisic", "USA8": "Cameron Reyes", "USA9": "Amadou Dubois", "USA10": "Moussa Kim", "USA11": "Ismael Haidara", "USA12": "Idris van der Berg", "USA13": "Photo d'Équipe", "USA14": "Karim Nowak", "USA15": "Nabil Rahimi", "USA16": "Yassine Owusu", "USA17": "Reza García", "USA18": "Arman Ferrari", "USA19": "Cyrus Tanaka", "USA20": "Facundo Horvat", "TUR1": "Logo", "TUR2": "Enzo Karlsson", "TUR3": "Tiago Hassan", "TUR4": "Rui Adeyemi", "TUR5": "Miguel Morales", "TUR6": "Simão Schmidt", "TUR7": "Tibor Nguyen", "TUR8": "Zoltan Traoré", "TUR9": "Milan Popović", "TUR10": "Stefan Kowalski", "TUR11": "Carlos Amiri", "TUR12": "Luis Osei", "TUR13": "Photo d'Équipe", "TUR14": "João Santos", "TUR15": "Marco Rossi", "TUR16": "Ahmed Park", "TUR17": "Youssef Novak", "TUR18": "Erik Andersson", "TUR19": "Lars Ionescu", "TUR20": "Mateo Okafor", "AUS1": "Logo", "AUS2": "Diego Rojas", "AUS3": "Andrés Müller", "AUS4": "Pedro Smith", "AUS5": "Sven Diallo", "AUS6": "Hans Petrov", "AUS7": "Kwame Larsen", "AUS8": "Kofi Khalil", "AUS9": "Ibrahim Boateng", "AUS10": "Omar Silva", "AUS11": "Hyun Martin", "AUS12": "Jin Lee", "AUS13": "Photo d'Équipe", "AUS14": "Kenji Keita", "AUS15": "Ren de Jong", "AUS16": "Tomas Popescu", "AUS17": "Pavel Hosseini", "AUS18": "Dario Cabrera", "AUS19": "Nico Fernández", "AUS20": "Bruno Johnson", "PAR1": "Logo", "PAR2": "Rafael Suzuki", "PAR3": "Felipe Kovač", "PAR4": "Gabriel Nielsen", "PAR5": "Adrián Mansour", "PAR6": "Iker Mensah", "PAR7": "Aitor Reyes", "PAR8": "Jonas Dubois", "PAR9": "Elias Kim", "PAR10": "Noah Haidara", "PAR11": "Liam van der Berg", "PAR12": "Ryan Nowak", "PAR13": "Photo d'Équipe", "PAR14": "Connor Rahimi", "PAR15": "Cameron Owusu", "PAR16": "Amadou García", "PAR17": "Moussa Ferrari", "PAR18": "Ismael Tanaka", "PAR19": "Idris Horvat", "PAR20": "Karim Karlsson", "GER1": "Logo", "GER2": "Nabil Hassan", "GER3": "Yassine Adeyemi", "GER4": "Reza Morales", "GER5": "Arman Schmidt", "GER6": "Cyrus Nguyen", "GER7": "Facundo Traoré", "GER8": "Enzo Popović", "GER9": "Tiago Kowalski", "GER10": "Jamal Musiala", "GER11": "Rui Amiri", "GER12": "Miguel Osei", "GER13": "Photo d'Équipe", "GER14": "Simão Santos", "GER15": "Tibor Rossi", "GER16": "Zoltan Park", "GER17": "Milan Novak", "GER18": "Stefan Andersson", "GER19": "Florian Wirtz", "GER20": "Carlos Ionescu", "CIV1": "Logo", "CIV2": "Luis Okafor", "CIV3": "João Rojas", "CIV4": "Marco Müller", "CIV5": "Ahmed Smith", "CIV6": "Youssef Diallo", "CIV7": "Erik Petrov", "CIV8": "Lars Larsen", "CIV9": "Mateo Khalil", "CIV10": "Diego Boateng", "CIV11": "Andrés Silva", "CIV12": "Pedro Martin", "CIV13": "Photo d'Équipe", "CIV14": "Sven Lee", "CIV15": "Hans Keita", "CIV16": "Kwame de Jong", "CIV17": "Kofi Popescu", "CIV18": "Ibrahim Hosseini", "CIV19": "Omar Cabrera", "CIV20": "Hyun Fernández", "ECU1": "Logo", "ECU2": "Jin Johnson", "ECU3": "Kenji Suzuki", "ECU4": "Ren Kovač", "ECU5": "Tomas Nielsen", "ECU6": "Pavel Mansour", "ECU7": "Dario Mensah", "ECU8": "Nico Reyes", "ECU9": "Bruno Dubois", "ECU10": "Rafael Kim", "ECU11": "Felipe Haidara", "ECU12": "Gabriel van der Berg", "ECU13": "Photo d'Équipe", "ECU14": "Adrián Nowak", "ECU15": "Iker Rahimi", "ECU16": "Aitor Owusu", "ECU17": "Jonas García", "ECU18": "Elias Ferrari", "ECU19": "Noah Tanaka", "ECU20": "Liam Horvat", "CUW1": "Logo", "CUW2": "Ryan Karlsson", "CUW3": "Connor Hassan", "CUW4": "Cameron Adeyemi", "CUW5": "Amadou Morales", "CUW6": "Moussa Schmidt", "CUW7": "Ismael Nguyen", "CUW8": "Idris Traoré", "CUW9": "Karim Popović", "CUW10": "Nabil Kowalski", "CUW11": "Yassine Amiri", "CUW12": "Reza Osei", "CUW13": "Photo d'Équipe", "CUW14": "Arman Santos", "CUW15": "Cyrus Rossi", "CUW16": "Facundo Park", "CUW17": "Enzo Novak", "CUW18": "Tiago Andersson", "CUW19": "Rui Ionescu", "CUW20": "Miguel Okafor", "NED1": "Logo", "NED2": "Simão Rojas", "NED3": "Virgil van Dijk", "NED4": "Cody Gakpo", "NED5": "Tibor Müller", "NED6": "Zoltan Smith", "NED7": "Milan Diallo", "NED8": "Stefan Petrov", "NED9": "Carlos Larsen", "NED10": "Luis Khalil", "NED11": "João Boateng", "NED12": "Marco Silva", "NED13": "Photo d'Équipe", "NED14": "Ahmed Martin", "NED15": "Youssef Lee", "NED16": "Erik Keita", "NED17": "Lars de Jong", "NED18": "Mateo Popescu", "NED19": "Diego Hosseini", "NED20": "Andrés Cabrera", "JPN1": "Logo", "JPN2": "Pedro Fernández", "JPN3": "Sven Johnson", "JPN4": "Hans Suzuki", "JPN5": "Kwame Kovač", "JPN6": "Kofi Nielsen", "JPN7": "Ibrahim Mansour", "JPN8": "Omar Mensah", "JPN9": "Hyun Reyes", "JPN10": "Takefusa Kubo", "JPN11": "Jin Dubois", "JPN12": "Kenji Kim", "JPN13": "Photo d'Équipe", "JPN14": "Ren Haidara", "JPN15": "Tomas van der Berg", "JPN16": "Pavel Nowak", "JPN17": "Dario Rahimi", "JPN18": "Nico Owusu", "JPN19": "Bruno García", "JPN20": "Rafael Ferrari", "SWE1": "Logo", "SWE2": "Felipe Tanaka", "SWE3": "Gabriel Horvat", "SWE4": "Adrián Karlsson", "SWE5": "Iker Hassan", "SWE6": "Aitor Adeyemi", "SWE7": "Jonas Morales", "SWE8": "Elias Schmidt", "SWE9": "Noah Nguyen", "SWE10": "Liam Traoré", "SWE11": "Ryan Popović", "SWE12": "Connor Kowalski", "SWE13": "Photo d'Équipe", "SWE14": "Cameron Amiri", "SWE15": "Amadou Osei", "SWE16": "Moussa Santos", "SWE17": "Ismael Rossi", "SWE18": "Idris Park", "SWE19": "Karim Novak", "SWE20": "Nabil Andersson", "TUN1": "Logo", "TUN2": "Yassine Ionescu", "TUN3": "Reza Okafor", "TUN4": "Arman Rojas", "TUN5": "Cyrus Müller", "TUN6": "Facundo Smith", "TUN7": "Enzo Diallo", "TUN8": "Tiago Petrov", "TUN9": "Rui Larsen", "TUN10": "Miguel Khalil", "TUN11": "Simão Boateng", "TUN12": "Tibor Silva", "TUN13": "Photo d'Équipe", "TUN14": "Zoltan Martin", "TUN15": "Milan Lee", "TUN16": "Stefan Keita", "TUN17": "Carlos de Jong", "TUN18": "Luis Popescu", "TUN19": "João Hosseini", "TUN20": "Marco Cabrera", "BEL1": "Logo", "BEL2": "Ahmed Fernández", "BEL3": "Youssef Johnson", "BEL4": "Erik Suzuki", "BEL5": "Lars Kovač", "BEL6": "Mateo Nielsen", "BEL7": "Kevin De Bruyne", "BEL8": "Diego Mansour", "BEL9": "Andrés Mensah", "BEL10": "Pedro Reyes", "BEL11": "Sven Dubois", "BEL12": "Hans Kim", "BEL13": "Photo d'Équipe", "BEL14": "Kwame Haidara", "BEL15": "Kofi van der Berg", "BEL16": "Ibrahim Nowak", "BEL17": "Omar Rahimi", "BEL18": "Hyun Owusu", "BEL19": "Jin García", "BEL20": "Kenji Ferrari", "EGY1": "Logo", "EGY2": "Ren Tanaka", "EGY3": "Tomas Horvat", "EGY4": "Pavel Karlsson", "EGY5": "Dario Hassan", "EGY6": "Nico Adeyemi", "EGY7": "Mohamed Salah", "EGY8": "Bruno Morales", "EGY9": "Rafael Schmidt", "EGY10": "Felipe Nguyen", "EGY11": "Gabriel Traoré", "EGY12": "Adrián Popović", "EGY13": "Photo d'Équipe", "EGY14": "Iker Kowalski", "EGY15": "Aitor Amiri", "EGY16": "Jonas Osei", "EGY17": "Elias Santos", "EGY18": "Noah Rossi", "EGY19": "Liam Park", "EGY20": "Ryan Novak", "IRN1": "Logo", "IRN2": "Connor Andersson", "IRN3": "Cameron Ionescu", "IRN4": "Amadou Okafor", "IRN5": "Moussa Rojas", "IRN6": "Ismael Müller", "IRN7": "Idris Smith", "IRN8": "Karim Diallo", "IRN9": "Nabil Petrov", "IRN10": "Yassine Larsen", "IRN11": "Reza Khalil", "IRN12": "Arman Boateng", "IRN13": "Photo d'Équipe", "IRN14": "Cyrus Silva", "IRN15": "Facundo Martin", "IRN16": "Enzo Lee", "IRN17": "Tiago Keita", "IRN18": "Rui de Jong", "IRN19": "Miguel Popescu", "IRN20": "Simão Hosseini", "NZL1": "Logo", "NZL2": "Tibor Cabrera", "NZL3": "Zoltan Fernández", "NZL4": "Milan Johnson", "NZL5": "Stefan Suzuki", "NZL6": "Carlos Kovač", "NZL7": "Luis Nielsen", "NZL8": "João Mansour", "NZL9": "Marco Mensah", "NZL10": "Ahmed Reyes", "NZL11": "Youssef Dubois", "NZL12": "Erik Kim", "NZL13": "Photo d'Équipe", "NZL14": "Lars Haidara", "NZL15": "Mateo van der Berg", "NZL16": "Diego Nowak", "NZL17": "Andrés Rahimi", "NZL18": "Pedro Owusu", "NZL19": "Sven García", "NZL20": "Hans Ferrari", "ESP1": "Logo", "ESP2": "Kwame Tanaka", "ESP3": "Kofi Horvat", "ESP4": "Ibrahim Karlsson", "ESP5": "Omar Hassan", "ESP6": "Hyun Adeyemi", "ESP7": "Pedri", "ESP8": "Jin Morales", "ESP9": "Kenji Schmidt", "ESP10": "Ren Nguyen", "ESP11": "Tomas Traoré", "ESP12": "Pavel Popović", "ESP13": "Photo d'Équipe", "ESP14": "Dario Kowalski", "ESP15": "Lamine Yamal", "ESP16": "Nico Amiri", "ESP17": "Bruno Osei", "ESP18": "Rafael Santos", "ESP19": "Felipe Rossi", "ESP20": "Gabriel Park", "KSA1": "Logo", "KSA2": "Adrián Novak", "KSA3": "Iker Andersson", "KSA4": "Aitor Ionescu", "KSA5": "Jonas Okafor", "KSA6": "Elias Rojas", "KSA7": "Noah Müller", "KSA8": "Liam Smith", "KSA9": "Ryan Diallo", "KSA10": "Connor Petrov", "KSA11": "Cameron Larsen", "KSA12": "Amadou Khalil", "KSA13": "Photo d'Équipe", "KSA14": "Moussa Boateng", "KSA15": "Ismael Silva", "KSA16": "Idris Martin", "KSA17": "Karim Lee", "KSA18": "Nabil Keita", "KSA19": "Yassine de Jong", "KSA20": "Reza Popescu", "URU1": "Logo", "URU2": "Arman Hosseini", "URU3": "Cyrus Cabrera", "URU4": "Facundo Fernández", "URU5": "Enzo Johnson", "URU6": "Tiago Suzuki", "URU7": "Rui Kovač", "URU8": "Miguel Nielsen", "URU9": "Darwin Núñez", "URU10": "Simão Mansour", "URU11": "Tibor Mensah", "URU12": "Zoltan Reyes", "URU13": "Photo d'Équipe", "URU14": "Milan Dubois", "URU15": "Stefan Kim", "URU16": "Carlos Haidara", "URU17": "Luis van der Berg", "URU18": "João Nowak", "URU19": "Marco Rahimi", "URU20": "Ahmed Owusu", "CPV1": "Logo", "CPV2": "Youssef García", "CPV3": "Erik Ferrari", "CPV4": "Lars Tanaka", "CPV5": "Mateo Horvat", "CPV6": "Diego Karlsson", "CPV7": "Andrés Hassan", "CPV8": "Pedro Adeyemi", "CPV9": "Sven Morales", "CPV10": "Hans Schmidt", "CPV11": "Kwame Nguyen", "CPV12": "Kofi Traoré", "CPV13": "Photo d'Équipe", "CPV14": "Ibrahim Popović", "CPV15": "Omar Kowalski", "CPV16": "Hyun Amiri", "CPV17": "Jin Osei", "CPV18": "Kenji Santos", "CPV19": "Ren Rossi", "CPV20": "Tomas Park", "FRA1": "Logo", "FRA2": "Pavel Novak", "FRA3": "Dario Andersson", "FRA4": "Nico Ionescu", "FRA5": "Bruno Okafor", "FRA6": "Rafael Rojas", "FRA7": "Felipe Müller", "FRA8": "Gabriel Smith", "FRA9": "Adrián Diallo", "FRA10": "Iker Petrov", "FRA11": "Aitor Larsen", "FRA12": "Jonas Khalil", "FRA13": "Photo d'Équipe", "FRA14": "Elias Boateng", "FRA15": "Noah Silva", "FRA16": "Liam Martin", "FRA17": "Ryan Lee", "FRA18": "Connor Keita", "FRA19": "Ousmane Dembélé", "FRA20": "Kylian Mbappé", "SEN1": "Logo", "SEN2": "Cameron de Jong", "SEN3": "Amadou Popescu", "SEN4": "Moussa Hosseini", "SEN5": "Ismael Cabrera", "SEN6": "Idris Fernández", "SEN7": "Karim Johnson", "SEN8": "Nabil Suzuki", "SEN9": "Sadio Mané", "SEN10": "Yassine Kovač", "SEN11": "Reza Nielsen", "SEN12": "Arman Mansour", "SEN13": "Photo d'Équipe", "SEN14": "Cyrus Mensah", "SEN15": "Facundo Reyes", "SEN16": "Enzo Dubois", "SEN17": "Tiago Kim", "SEN18": "Rui Haidara", "SEN19": "Miguel van der Berg", "SEN20": "Simão Nowak", "NOR1": "Logo", "NOR2": "Tibor Rahimi", "NOR3": "Zoltan Owusu", "NOR4": "Milan García", "NOR5": "Stefan Ferrari", "NOR6": "Carlos Tanaka", "NOR7": "Luis Horvat", "NOR8": "João Karlsson", "NOR9": "Marco Hassan", "NOR10": "Ahmed Adeyemi", "NOR11": "Youssef Morales", "NOR12": "Erik Schmidt", "NOR13": "Photo d'Équipe", "NOR14": "Lars Nguyen", "NOR15": "Erling Haaland", "NOR16": "Mateo Traoré", "NOR17": "Diego Popović", "NOR18": "Andrés Kowalski", "NOR19": "Pedro Amiri", "NOR20": "Sven Osei", "IRQ1": "Logo", "IRQ2": "Hans Santos", "IRQ3": "Kwame Rossi", "IRQ4": "Kofi Park", "IRQ5": "Ibrahim Novak", "IRQ6": "Omar Andersson", "IRQ7": "Hyun Ionescu", "IRQ8": "Jin Okafor", "IRQ9": "Kenji Rojas", "IRQ10": "Ren Müller", "IRQ11": "Tomas Smith", "IRQ12": "Pavel Diallo", "IRQ13": "Photo d'Équipe", "IRQ14": "Dario Petrov", "IRQ15": "Nico Larsen", "IRQ16": "Bruno Khalil", "IRQ17": "Rafael Boateng", "IRQ18": "Felipe Silva", "IRQ19": "Gabriel Martin", "IRQ20": "Adrián Lee", "ARG1": "Logo", "ARG2": "Iker Keita", "ARG3": "Aitor de Jong", "ARG4": "Jonas Popescu", "ARG5": "Elias Hosseini", "ARG6": "Noah Cabrera", "ARG7": "Liam Fernández", "ARG8": "Ryan Johnson", "ARG9": "Connor Suzuki", "ARG10": "Julián Álvarez", "ARG11": "Cameron Kovač", "ARG12": "Amadou Nielsen", "ARG13": "Photo d'Équipe", "ARG14": "Moussa Mansour", "ARG15": "Ismael Mensah", "ARG16": "Idris Reyes", "ARG17": "Lionel Messi", "ARG18": "Karim Dubois", "ARG19": "Nabil Kim", "ARG20": "Yassine Haidara", "AUT1": "Logo", "AUT2": "Reza van der Berg", "AUT3": "Arman Nowak", "AUT4": "Cyrus Rahimi", "AUT5": "Facundo Owusu", "AUT6": "Enzo García", "AUT7": "Tiago Ferrari", "AUT8": "Rui Tanaka", "AUT9": "Miguel Horvat", "AUT10": "Simão Karlsson", "AUT11": "Tibor Hassan", "AUT12": "Zoltan Adeyemi", "AUT13": "Photo d'Équipe", "AUT14": "Milan Morales", "AUT15": "Stefan Schmidt", "AUT16": "Carlos Nguyen", "AUT17": "Luis Traoré", "AUT18": "João Popović", "AUT19": "Marco Kowalski", "AUT20": "Ahmed Amiri", "ALG1": "Logo", "ALG2": "Youssef Osei", "ALG3": "Erik Santos", "ALG4": "Lars Rossi", "ALG5": "Mateo Park", "ALG6": "Diego Novak", "ALG7": "Andrés Andersson", "ALG8": "Pedro Ionescu", "ALG9": "Sven Okafor", "ALG10": "Hans Rojas", "ALG11": "Kwame Müller", "ALG12": "Kofi Smith", "ALG13": "Photo d'Équipe", "ALG14": "Ibrahim Diallo", "ALG15": "Omar Petrov", "ALG16": "Hyun Larsen", "ALG17": "Jin Khalil", "ALG18": "Kenji Boateng", "ALG19": "Ren Silva", "ALG20": "Tomas Martin", "JOR1": "Logo", "JOR2": "Pavel Lee", "JOR3": "Dario Keita", "JOR4": "Nico de Jong", "JOR5": "Bruno Popescu", "JOR6": "Rafael Hosseini", "JOR7": "Felipe Cabrera", "JOR8": "Gabriel Fernández", "JOR9": "Adrián Johnson", "JOR10": "Iker Suzuki", "JOR11": "Aitor Kovač", "JOR12": "Jonas Nielsen", "JOR13": "Photo d'Équipe", "JOR14": "Elias Mansour", "JOR15": "Noah Mensah", "JOR16": "Liam Reyes", "JOR17": "Ryan Dubois", "JOR18": "Connor Kim", "JOR19": "Cameron Haidara", "JOR20": "Amadou van der Berg", "POR1": "Logo", "POR2": "Moussa Nowak", "POR3": "Ismael Rahimi", "POR4": "Idris Owusu", "POR5": "Karim García", "POR6": "Nabil Ferrari", "POR7": "Yassine Tanaka", "POR8": "Reza Horvat", "POR9": "Gonçalo Ramos", "POR10": "Arman Karlsson", "POR11": "Cyrus Hassan", "POR12": "Facundo Adeyemi", "POR13": "Photo d'Équipe", "POR14": "Enzo Morales", "POR15": "Cristiano Ronaldo", "POR16": "Tiago Schmidt", "POR17": "Rui Nguyen", "POR18": "Miguel Traoré", "POR19": "Simão Popović", "POR20": "Tibor Kowalski", "COL1": "Logo", "COL2": "Zoltan Amiri", "COL3": "Milan Osei", "COL4": "Stefan Santos", "COL5": "Carlos Rossi", "COL6": "Luis Park", "COL7": "João Novak", "COL8": "Marco Andersson", "COL9": "Ahmed Ionescu", "COL10": "James Rodríguez", "COL11": "Youssef Okafor", "COL12": "Erik Rojas", "COL13": "Photo d'Équipe", "COL14": "Lars Müller", "COL15": "Mateo Smith", "COL16": "Diego Diallo", "COL17": "Andrés Petrov", "COL18": "Pedro Larsen", "COL19": "Sven Khalil", "COL20": "Hans Boateng", "COD1": "Logo", "COD2": "Kwame Silva", "COD3": "Kofi Martin", "COD4": "Ibrahim Lee", "COD5": "Omar Keita", "COD6": "Hyun de Jong", "COD7": "Jin Popescu", "COD8": "Kenji Hosseini", "COD9": "Ren Cabrera", "COD10": "Tomas Fernández", "COD11": "Pavel Johnson", "COD12": "Dario Suzuki", "COD13": "Photo d'Équipe", "COD14": "Nico Kovač", "COD15": "Bruno Nielsen", "COD16": "Rafael Mansour", "COD17": "Felipe Mensah", "COD18": "Gabriel Reyes", "COD19": "Adrián Dubois", "COD20": "Iker Kim", "UZB1": "Logo", "UZB2": "Aitor Haidara", "UZB3": "Jonas van der Berg", "UZB4": "Elias Nowak", "UZB5": "Noah Rahimi", "UZB6": "Liam Owusu", "UZB7": "Ryan García", "UZB8": "Connor Ferrari", "UZB9": "Cameron Tanaka", "UZB10": "Amadou Horvat", "UZB11": "Moussa Karlsson", "UZB12": "Ismael Hassan", "UZB13": "Photo d'Équipe", "UZB14": "Idris Adeyemi", "UZB15": "Karim Morales", "UZB16": "Nabil Schmidt", "UZB17": "Yassine Nguyen", "UZB18": "Reza Traoré", "UZB19": "Arman Popović", "UZB20": "Cyrus Kowalski", "ENG1": "Logo", "ENG2": "Facundo Amiri", "ENG3": "Enzo Osei", "ENG4": "Tiago Santos", "ENG5": "Rui Rossi", "ENG6": "Miguel Park", "ENG7": "Simão Novak", "ENG8": "Tibor Andersson", "ENG9": "Harry Kane", "ENG10": "Zoltan Ionescu", "ENG11": "Jude Bellingham", "ENG12": "Milan Okafor", "ENG13": "Photo d'Équipe", "ENG14": "Stefan Rojas", "ENG15": "Carlos Müller", "ENG16": "Luis Smith", "ENG17": "João Diallo", "ENG18": "Marco Petrov", "ENG19": "Ahmed Larsen", "ENG20": "Youssef Khalil", "CRO1": "Logo", "CRO2": "Erik Boateng", "CRO3": "Lars Silva", "CRO4": "Mateo Martin", "CRO5": "Diego Lee", "CRO6": "Andrés Keita", "CRO7": "Pedro de Jong", "CRO8": "Sven Popescu", "CRO9": "Hans Hosseini", "CRO10": "Luka Modrić", "CRO11": "Kwame Cabrera", "CRO12": "Kofi Fernández", "CRO13": "Photo d'Équipe", "CRO14": "Ibrahim Johnson", "CRO15": "Omar Suzuki", "CRO16": "Hyun Kovač", "CRO17": "Jin Nielsen", "CRO18": "Kenji Mansour", "CRO19": "Ren Mensah", "CRO20": "Tomas Reyes", "GHA1": "Logo", "GHA2": "Pavel Dubois", "GHA3": "Dario Kim", "GHA4": "Nico Haidara", "GHA5": "Bruno van der Berg", "GHA6": "Rafael Nowak", "GHA7": "Felipe Rahimi", "GHA8": "Gabriel Owusu", "GHA9": "Mohammed Kudus", "GHA10": "Adrián García", "GHA11": "Iker Ferrari", "GHA12": "Aitor Tanaka", "GHA13": "Photo d'Équipe", "GHA14": "Jonas Horvat", "GHA15": "Elias Karlsson", "GHA16": "Noah Hassan", "GHA17": "Liam Adeyemi", "GHA18": "Ryan Morales", "GHA19": "Connor Schmidt", "GHA20": "Cameron Nguyen", "PAN1": "Logo", "PAN2": "Amadou Traoré", "PAN3": "Moussa Popović", "PAN4": "Ismael Kowalski", "PAN5": "Idris Amiri", "PAN6": "Karim Osei", "PAN7": "Nabil Santos", "PAN8": "Yassine Rossi", "PAN9": "Reza Park", "PAN10": "Arman Novak", "PAN11": "Cyrus Andersson", "PAN12": "Facundo Ionescu", "PAN13": "Photo d'Équipe", "PAN14": "Enzo Okafor", "PAN15": "Tiago Rojas", "PAN16": "Rui Müller", "PAN17": "Miguel Smith", "PAN18": "Simão Diallo", "PAN19": "Tibor Petrov", "PAN20": "Zoltan Larsen", "FWC1": "Trophée Coupe du Monde", "FWC2": "Mascotte Officielle", "FWC3": "Ballon Officiel", "FWC4": "Stade MetLife", "FWC5": "Stade Azteca", "FWC6": "Stade BC Place", "FWC7": "Affiche Officielle", "FWC8": "Hymne 2026", "FWC9": "Logo FIFA World Cup 26", "FWC10": "Villes Hôtes USA", "FWC11": "Villes Hôtes Canada", "FWC12": "Villes Hôtes Mexique", "FWC13": "Meilleur Buteur 2022", "FWC14": "Meilleur Gardien 2022", "FWC15": "Ballon d'Or FIFA", "FWC16": "The Best FIFA", "FWC17": "Coupe Confédérations", "FWC18": "Arbitrage VAR", "FWC19": "Fair-Play FIFA", "FWC20": "Génération 2026"};

const TEAM_NAMES = {"MEX": "Mexique", "RSA": "Afrique du Sud", "KOR": "Corée du Sud", "CZE": "Tchéquie", "SUI": "Suisse", "CAN": "Canada", "QAT": "Qatar", "BIH": "Bosnie-Herzégovine", "BRA": "Brésil", "MAR": "Maroc", "SCO": "Écosse", "HAI": "Haïti", "USA": "États-Unis", "TUR": "Turquie", "AUS": "Australie", "PAR": "Paraguay", "GER": "Allemagne", "CIV": "Côte d'Ivoire", "ECU": "Équateur", "CUW": "Curaçao", "NED": "Pays-Bas", "JPN": "Japon", "SWE": "Suède", "TUN": "Tunisie", "BEL": "Belgique", "EGY": "Égypte", "IRN": "Iran", "NZL": "Nouvelle-Zélande", "ESP": "Espagne", "KSA": "Arabie Saoudite", "URU": "Uruguay", "CPV": "Cap-Vert", "FRA": "France", "SEN": "Sénégal", "NOR": "Norvège", "IRQ": "Irak", "ARG": "Argentine", "AUT": "Autriche", "ALG": "Algérie", "JOR": "Jordanie", "POR": "Portugal", "COL": "Colombie", "COD": "RD Congo", "UZB": "Ouzbékistan", "ENG": "Angleterre", "CRO": "Croatie", "GHA": "Ghana", "PAN": "Panama"};

const GROUPS = {"A": ["MEX", "RSA", "KOR", "CZE"], "B": ["SUI", "CAN", "QAT", "BIH"], "C": ["BRA", "MAR", "SCO", "HAI"], "D": ["USA", "TUR", "AUS", "PAR"], "E": ["GER", "CIV", "ECU", "CUW"], "F": ["NED", "JPN", "SWE", "TUN"], "G": ["BEL", "EGY", "IRN", "NZL"], "H": ["ESP", "KSA", "URU", "CPV"], "I": ["FRA", "SEN", "NOR", "IRQ"], "J": ["ARG", "AUT", "ALG", "JOR"], "K": ["POR", "COL", "COD", "UZB"], "L": ["ENG", "CRO", "GHA", "PAN"]};

const GROUP_COLORS = {
  A: "#e63946", B: "#3a86ff", C: "#2a9d34", D: "#f4842d",
  E: "#8a4fff", F: "#17c3d6", G: "#FFD700", H: "#ff5c9e",
  I: "#5ac8fa", J: "#ff8787", K: "#8bd450", L: "#ffb15c",
  "★": "#c9a227",
};

const FLAGS = {
  MEX:"🇲🇽",RSA:"🇿🇦",KOR:"🇰🇷",CZE:"🇨🇿",SUI:"🇨🇭",CAN:"🇨🇦",QAT:"🇶🇦",BIH:"🇧🇦",
  BRA:"🇧🇷",MAR:"🇲🇦",SCO:"🏴",HAI:"🇭🇹",USA:"🇺🇸",TUR:"🇹🇷",AUS:"🇦🇺",PAR:"🇵🇾",
  GER:"🇩🇪",CIV:"🇨🇮",ECU:"🇪🇨",CUW:"🇨🇼",NED:"🇳🇱",JPN:"🇯🇵",SWE:"🇸🇪",TUN:"🇹🇳",
  BEL:"🇧🇪",EGY:"🇪🇬",IRN:"🇮🇷",NZL:"🇳🇿",ESP:"🇪🇸",KSA:"🇸🇦",URU:"🇺🇾",CPV:"🇨🇻",
  FRA:"🇫🇷",SEN:"🇸🇳",NOR:"🇳🇴",IRQ:"🇮🇶",ARG:"🇦🇷",AUT:"🇦🇹",ALG:"🇩🇿",JOR:"🇯🇴",
  POR:"🇵🇹",COL:"🇨🇴",COD:"🇨🇩",UZB:"🇺🇿",ENG:"🏴",CRO:"🇭🇷",GHA:"🇬🇭",PAN:"🇵🇦",
  FWC:"⚽",
};

// code équipe -> groupe
const TEAM_TO_GROUP = {};
Object.entries(GROUPS).forEach(([g, teams]) => {
  teams.forEach((t) => { TEAM_TO_GROUP[t] = g; });
});
TEAM_TO_GROUP.FWC = "★";

const ALL_TEAM_CODES = [...Object.values(GROUPS).flat(), "FWC"];

function parseCode(input) {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, " ");
  const m = cleaned.match(/^([A-Z]{3})\s*0*(\d{1,2})$/);
  if (!m) return null;
  const [, team, numStr] = m;
  const num = parseInt(numStr, 10);
  const code = `${team}${num}`;
  if (!(code in PLAYER_DB)) return null;
  return { team, num, code, name: PLAYER_DB[code] };
}

// Persistance déléguée à Supabase (voir App.jsx / supabaseClient.js)

/* ============================================================
   ICONES SVG simples (pas de dépendances externes)
   ============================================================ */

const IconAlbum = ({ color }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M3 9h18M8 4v16" />
  </svg>
);
const IconStack = ({ color }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="5" y="3" width="12" height="15" rx="2" />
    <rect x="8" y="7" width="12" height="15" rx="2" fill="none" />
  </svg>
);
const IconPlus = ({ color }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);
const IconBack = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFD700" strokeWidth="2.4">
    <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8a8a78" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ff6b6b" strokeWidth="2">
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconChevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#FFD700" strokeWidth="2.4"
    style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .25s ease" }}
  >
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ============================================================
   HERO SVG — identité visuelle FIFA 2026 (page d'accueil)
   ============================================================ */

function HeroBackground() {
  return (
    <svg
      viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.16 }}
    >
      <defs>
        <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0f06" />
          <stop offset="100%" stopColor="#132008" />
        </linearGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#pitchGrad)" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={i * 100} y="0" width="50" height="500" fill="#ffffff" opacity="0.03" />
      ))}
      <circle cx="600" cy="250" r="120" fill="none" stroke="#FFD700" strokeWidth="3" />
      <circle cx="600" cy="250" r="6" fill="#FFD700" />
      <line x1="600" y1="0" x2="600" y2="500" stroke="#FFD700" strokeWidth="3" />
      <rect x="0" y="150" width="120" height="200" fill="none" stroke="#FFD700" strokeWidth="3" />
      <rect x="1080" y="150" width="120" height="200" fill="none" stroke="#FFD700" strokeWidth="3" />
      {/* ballon stylisé */}
      <g transform="translate(950,90)">
        <polygon points="0,-28 26,-9 16,23 -16,23 -26,-9" fill="#FFD700" opacity="0.5" />
      </g>
      <g transform="translate(160,380)">
        <polygon points="0,-20 19,-6 12,17 -12,17 -19,-6" fill="#FFD700" opacity="0.4" />
      </g>
    </svg>
  );
}

/* ============================================================
   APP PRINCIPALE
   ============================================================ */

export default function AppShell({ stickers, onChangeStickers, saveStatus, userEmail, onLogout }) {
  const [page, setPage] = useState("home"); // home | album | doubles | add
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const updateStickers = useCallback(
    (updater) => {
      const next = typeof updater === "function" ? updater(stickers) : updater;
      onChangeStickers(next);
    },
    [stickers, onChangeStickers]
  );

  /* ----- actions ----- */

  const addOwned = useCallback(
    (code, name, asDouble) => {
      updateStickers((prev) => {
        const cur = prev[code] || { owned: false, dbl: 0 };
        if (asDouble || cur.owned) {
          return { ...prev, [code]: { owned: true, dbl: cur.dbl + 1 } };
        }
        return { ...prev, [code]: { owned: true, dbl: cur.dbl } };
      });
      showToast(asDouble ? `Double enregistré : ${name} !` : `✓ ${name} ajouté !`);
    },
    [updateStickers, showToast]
  );

  const removeSticker = useCallback(
    (code, name) => {
      updateStickers((prev) => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
      showToast(`${name} supprimé`);
    },
    [updateStickers, showToast]
  );

  const setDoubleQty = useCallback(
    (code, qty) => {
      updateStickers((prev) => {
        const cur = prev[code];
        if (!cur) return prev;
        const nextQty = Math.max(0, qty);
        return { ...prev, [code]: { ...cur, dbl: nextQty } };
      });
    },
    [updateStickers]
  );

  const addQuickDouble = useCallback(
    (code, name) => {
      updateStickers((prev) => {
        const cur = prev[code] || { owned: true, dbl: 0 };
        return { ...prev, [code]: { owned: true, dbl: cur.dbl + 1 } };
      });
      showToast(`Double enregistré : ${name} !`);
    },
    [updateStickers, showToast]
  );

  /* ----- stats ----- */

  const stats = useMemo(() => {
    const codes = Object.keys(stickers).filter((c) => stickers[c]?.owned);
    const owned = codes.length;
    const doubles = codes.reduce((s, c) => s + (stickers[c]?.dbl || 0), 0);
    const total = Object.keys(PLAYER_DB).length;
    const pct = total ? Math.round((owned / total) * 100) : 0;
    return { owned, doubles, total, pct };
  }, [stickers]);

  return (
    <div style={styles.appRoot}>
      <style>{globalCss}</style>
      {page === "home" && (
        <HomePage stats={stats} onNavigate={setPage} userEmail={userEmail} onLogout={onLogout} />
      )}
      {page === "album" && (
        <AlbumPage
          stickers={stickers}
          onBack={() => setPage("home")}
          onAddDouble={addQuickDouble}
          onRemove={removeSticker}
          saveStatus={saveStatus}
        />
      )}
      {page === "doubles" && (
        <DoublesPage
          stickers={stickers}
          onBack={() => setPage("home")}
          onSetQty={setDoubleQty}
          saveStatus={saveStatus}
        />
      )}
      {page === "add" && (
        <AddPage
          stickers={stickers}
          onBack={() => setPage("home")}
          onAdd={addOwned}
          saveStatus={saveStatus}
        />
      )}
      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}

/* ============================================================
   PAGE ACCUEIL
   ============================================================ */

function HomePage({ stats, onNavigate, userEmail, onLogout }) {
  return (
    <div style={styles.homeWrap}>
      <div style={styles.hero}>
        <HeroBackground />
        <div style={styles.heroInner}>
          {userEmail && (
            <div style={styles.accountBar}>
              <span style={styles.accountEmail}>👤 {userEmail}</span>
              <button style={styles.logoutBtn} onClick={onLogout}>
                Déconnexion
              </button>
            </div>
          )}
          <div style={styles.heroBadge}>FIFA WORLD CUP 2026™</div>
          <h1 style={styles.heroTitle}>Mon Album Panini</h1>
          <p style={styles.heroSubtitle}>FIFA World Cup 2026</p>

          <div style={styles.statsRow}>
            <div style={styles.statPill}>
              <span style={styles.statNum}>{stats.owned}</span>
              <span style={styles.statLabel}>possédés</span>
            </div>
            <div style={styles.statPill}>
              <span style={styles.statNum}>{stats.doubles}</span>
              <span style={styles.statLabel}>doubles</span>
            </div>
            <div style={styles.statPill}>
              <span style={styles.statNum}>{stats.pct}%</span>
              <span style={styles.statLabel}>complet</span>
            </div>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${stats.pct}%`,
              }}
            />
          </div>
          <div style={styles.progressCaption}>
            {stats.owned} / {stats.total} vignettes
          </div>
        </div>
      </div>

      <div style={styles.navGrid}>
        <NavCard
          color="#FFD700"
          icon={<IconAlbum color="#080a06" />}
          title="Mon Album"
          desc="Parcours toutes tes vignettes classées par groupe et par équipe"
          onClick={() => onNavigate("album")}
        />
        <NavCard
          color="#ff8787"
          icon={<IconStack color="#080a06" />}
          title="Mes Doubles"
          desc="Gère les vignettes en double à échanger"
          onClick={() => onNavigate("doubles")}
        />
        <NavCard
          color="#5ac8fa"
          icon={<IconPlus color="#080a06" />}
          title="Ajouter"
          desc="Enregistre une nouvelle vignette avec le code équipe"
          onClick={() => onNavigate("add")}
        />
      </div>
    </div>
  );
}

function NavCard({ color, icon, title, desc, onClick }) {
  return (
    <button style={styles.navCard} onClick={onClick} className="nav-card">
      <div style={{ ...styles.navCardIcon, background: color }}>{icon}</div>
      <div style={styles.navCardTitle}>{title}</div>
      <div style={styles.navCardDesc}>{desc}</div>
    </button>
  );
}

/* ============================================================
   HEADER commun pages intérieures
   ============================================================ */

function InnerHeader({ title, subtitle, onBack, saveStatus, right }) {
  return (
    <div style={styles.innerHeader}>
      <div style={styles.innerHeaderInner}>
        <button style={styles.backBtn} onClick={onBack} aria-label="Retour">
          <IconBack />
        </button>
        <div style={{ flex: 1 }}>
          <div style={styles.innerTitle}>{title}</div>
          {subtitle && <div style={styles.innerSubtitle}>{subtitle}</div>}
        </div>
        {right}
        <SaveIndicator status={saveStatus} />
      </div>
    </div>
  );
}

function SaveIndicator({ status }) {
  if (status === "idle") return <div style={{ width: 1 }} />;
  return (
    <div style={styles.saveIndicator}>
      <span
        style={{
          ...styles.saveDot,
          background: status === "saving" ? "#FFD700" : "#3ddc84",
        }}
      />
      <span style={{ color: status === "saving" ? "#FFD700" : "#3ddc84" }}>
        {status === "saving" ? "Sauvegarde…" : "✓ Sauvegardé"}
      </span>
    </div>
  );
}

/* ============================================================
   PAGE ALBUM
   ============================================================ */

function AlbumPage({ stickers, onBack, onAddDouble, onRemove, saveStatus }) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const orderedGroupKeys = [...Object.keys(GROUPS), "★"];

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = {};
    orderedGroupKeys.forEach((g) => (result[g] = []));

    Object.keys(PLAYER_DB).forEach((code) => {
      const entry = stickers[code];
      if (!entry || !entry.owned) return;
      const m = code.match(/^([A-Z]{3})(\d+)$/);
      if (!m) return;
      const [, team, numStr] = m;
      const num = parseInt(numStr, 10);
      const name = PLAYER_DB[code];
      const group = TEAM_TO_GROUP[team] || "★";

      if (q) {
        const teamFull = (TEAM_NAMES[team] || team).toLowerCase();
        const hay = `${name} ${team} ${teamFull} ${code} ${num}`.toLowerCase();
        if (!hay.includes(q)) return;
      }

      result[group].push({ code, team, num, name, dbl: entry.dbl || 0 });
    });

    orderedGroupKeys.forEach((g) => {
      result[g].sort((a, b) => {
        if (a.team !== b.team) return a.team.localeCompare(b.team);
        return a.num - b.num;
      });
    });

    return result;
  }, [stickers, query]);

  const toggleGroup = (g) =>
    setCollapsed((prev) => ({ ...prev, [g]: !prev[g] }));

  const nonEmptyGroups = orderedGroupKeys.filter((g) => grouped[g].length > 0);

  return (
    <div style={styles.pageWrap}>
      <InnerHeader
        title="Mon Album"
        subtitle={`${Object.values(stickers).filter((s) => s?.owned).length} vignettes collectées`}
        onBack={onBack}
        saveStatus={saveStatus}
      />

      <div style={styles.contentWrap}>
        <div style={styles.searchBar}>
          <IconSearch />
          <input
            style={styles.searchInput}
            placeholder="Rechercher un joueur, une équipe, un code ou un numéro…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {nonEmptyGroups.length === 0 && (
          <EmptyState
            title="Album vide pour l'instant"
            desc="Ajoute tes premières vignettes depuis la page « Ajouter »."
          />
        )}

        {nonEmptyGroups.map((g) => {
          const items = grouped[g];
          const isCollapsed = !!collapsed[g];
          const color = GROUP_COLORS[g] || "#FFD700";
          return (
            <div key={g} style={styles.groupBlock}>
              <button
                style={{ ...styles.groupHeader, borderColor: color }}
                onClick={() => toggleGroup(g)}
              >
                <span style={{ ...styles.groupBadge, background: color }}>
                  {g === "★" ? "★" : `GROUPE ${g}`}
                </span>
                <span style={styles.groupCount}>{items.length} vignette{items.length > 1 ? "s" : ""}</span>
                <IconChevron open={!isCollapsed} />
              </button>

              {!isCollapsed && (
                <div style={styles.stickerGrid}>
                  {items.map((it) => (
                    <StickerCard
                      key={it.code}
                      item={it}
                      color={color}
                      onAddDouble={() => onAddDouble(it.code, it.name)}
                      onRemove={() => onRemove(it.code, it.name)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StickerCard({ item, color, onAddDouble, onRemove }) {
  const flag = FLAGS[item.team] || "🏳️";
  const teamFull = TEAM_NAMES[item.team] || item.team;
  return (
    <div style={{ ...styles.stickerCard, borderColor: color + "55" }}>
      <div style={{ ...styles.stickerImg, background: `linear-gradient(160deg, ${color}33, #10130c)` }}>
        <span style={styles.stickerFlag}>{flag}</span>
        <span style={{ ...styles.stickerCode, color }}>{item.code}</span>
      </div>
      <div style={styles.stickerBody}>
        <div style={styles.stickerName}>{item.name}</div>
        <div style={styles.stickerTeam}>{teamFull}</div>
        {item.dbl > 0 && (
          <div style={styles.stickerDblTag}>+{item.dbl} double{item.dbl > 1 ? "s" : ""}</div>
        )}
        <div style={styles.stickerActions}>
          <button style={styles.miniBtnYellow} onClick={onAddDouble}>+ Double</button>
          <button style={styles.miniBtnGhost} onClick={onRemove} aria-label="Supprimer">
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, desc }) {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>⚽</div>
      <div style={styles.emptyTitle}>{title}</div>
      <div style={styles.emptyDesc}>{desc}</div>
    </div>
  );
}

/* ============================================================
   PAGE DOUBLES
   ============================================================ */

function DoublesPage({ stickers, onBack, onSetQty, saveStatus }) {
  const items = useMemo(() => {
    const list = Object.keys(stickers)
      .filter((code) => (stickers[code]?.dbl || 0) > 0)
      .map((code) => {
        const m = code.match(/^([A-Z]{3})(\d+)$/);
        const team = m ? m[1] : "FWC";
        return {
          code,
          team,
          name: PLAYER_DB[code] || code,
          dbl: stickers[code].dbl,
        };
      });
    list.sort((a, b) => b.dbl - a.dbl);
    return list;
  }, [stickers]);

  const totalDoubles = items.reduce((s, i) => s + i.dbl, 0);

  return (
    <div style={styles.pageWrap}>
      <InnerHeader
        title="Mes Doubles"
        subtitle={`${totalDoubles} vignette${totalDoubles > 1 ? "s" : ""} en double`}
        onBack={onBack}
        saveStatus={saveStatus}
      />
      <div style={styles.contentWrap}>
        {items.length === 0 && (
          <EmptyState
            title="Aucun double pour l'instant"
            desc="Les vignettes en plusieurs exemplaires apparaîtront ici."
          />
        )}
        <div style={styles.stickerGrid}>
          {items.map((it) => {
            const group = TEAM_TO_GROUP[it.team] || "★";
            const color = GROUP_COLORS[group] || "#FFD700";
            const flag = FLAGS[it.team] || "🏳️";
            const teamFull = TEAM_NAMES[it.team] || it.team;
            return (
              <div key={it.code} style={{ ...styles.stickerCard, borderColor: color + "55" }}>
                <div style={{ ...styles.stickerImg, background: `linear-gradient(160deg, ${color}33, #10130c)` }}>
                  <span style={styles.stickerFlag}>{flag}</span>
                  <span style={{ ...styles.stickerCode, color }}>{it.code}</span>
                </div>
                <div style={styles.stickerBody}>
                  <div style={styles.stickerName}>{it.name}</div>
                  <div style={styles.stickerTeam}>{teamFull}</div>
                  <div style={styles.qtyRow}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => onSetQty(it.code, it.dbl - 1)}
                      aria-label="Retirer un double"
                    >
                      −
                    </button>
                    <span style={styles.qtyValue}>{it.dbl}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => onSetQty(it.code, it.dbl + 1)}
                      aria-label="Ajouter un double"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE AJOUTER
   ============================================================ */

function AddPage({ stickers, onBack, onAdd, saveStatus }) {
  const [input, setInput] = useState("");
  const [asDouble, setAsDouble] = useState(false);

  const parsed = useMemo(() => parseCode(input), [input]);
  const alreadyOwned = parsed ? !!stickers[parsed.code]?.owned : false;

  const handleSubmit = () => {
    if (!parsed) return;
    onAdd(parsed.code, parsed.name, asDouble || alreadyOwned);
    setInput("");
  };

  const fillTeam = (team) => {
    setInput(`${team} `);
  };

  return (
    <div style={styles.pageWrap}>
      <InnerHeader title="Ajouter une vignette" subtitle="Tape un code équipe + numéro" onBack={onBack} saveStatus={saveStatus} />
      <div style={styles.contentWrap}>
        <div style={styles.addPanel}>
          <label style={styles.addLabel}>Code de la vignette</label>
          <input
            style={styles.addInput}
            placeholder="Ex : FRA 20"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            autoFocus
            spellCheck={false}
          />

          <div style={styles.previewBox}>
            {parsed ? (
              <>
                <span style={styles.previewFlag}>{FLAGS[parsed.team] || "🏳️"}</span>
                <div style={{ flex: 1 }}>
                  <div style={styles.previewName}>{parsed.name}</div>
                  <div style={styles.previewMeta}>
                    {TEAM_NAMES[parsed.team] || parsed.team} · Groupe{" "}
                    {TEAM_TO_GROUP[parsed.team] === "★" ? "spécial FIFA" : TEAM_TO_GROUP[parsed.team]} · #{parsed.num}
                  </div>
                  {alreadyOwned && (
                    <div style={styles.previewWarn}>Déjà dans l'album — sera ajoutée en double.</div>
                  )}
                </div>
              </>
            ) : (
              <div style={styles.previewPlaceholder}>
                {input.trim() ? "Code inconnu — vérifie l'équipe et le numéro." : "Tape un code pour voir l'aperçu"}
              </div>
            )}
          </div>

          <div style={styles.toggleRow}>
            <button
              style={{
                ...styles.toggleBtn,
                ...(!asDouble ? styles.toggleBtnActive : {}),
              }}
              onClick={() => setAsDouble(false)}
            >
              Nouvelle vignette
            </button>
            <button
              style={{
                ...styles.toggleBtn,
                ...(asDouble ? styles.toggleBtnActive : {}),
              }}
              onClick={() => setAsDouble(true)}
            >
              C'est un double
            </button>
          </div>

          <button
            style={{ ...styles.submitBtn, opacity: parsed ? 1 : 0.4, cursor: parsed ? "pointer" : "not-allowed" }}
            onClick={handleSubmit}
            disabled={!parsed}
          >
            Enregistrer la vignette
          </button>
        </div>

        <div style={styles.teamsSectionTitle}>Codes équipes</div>
        <div style={styles.teamsGrid}>
          {ALL_TEAM_CODES.map((team) => {
            const group = TEAM_TO_GROUP[team] || "★";
            const color = GROUP_COLORS[group] || "#FFD700";
            return (
              <button
                key={team}
                style={{ ...styles.teamChip, borderColor: color + "66" }}
                onClick={() => fillTeam(team)}
              >
                <span>{FLAGS[team] || "🏳️"}</span>
                <span style={{ ...styles.teamChipCode, color }}>{team}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const YELLOW = "#FFD700";
const DARK_BG = "#080a06";

const globalCss = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  input::placeholder { color: #6b6b5e; }
  .nav-card:hover { transform: translateY(-3px); }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-thumb { background: #2a2f1e; border-radius: 8px; }
`;

const styles = {
  appRoot: {
    fontFamily:
      "'Segoe UI', system-ui, -apple-system, Roboto, sans-serif",
    minHeight: "100vh",
    background: YELLOW,
    color: "#111",
  },

  /* ---- HOME ---- */
  homeWrap: {
    minHeight: "100vh",
    background: YELLOW,
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(180deg, #0d1108 0%, #131a0c 100%)",
    padding: "56px 20px 44px",
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: 720,
    margin: "0 auto",
    textAlign: "center",
  },
  accountBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  accountEmail: {
    color: "#cfcfc0",
    fontSize: 12.5,
    background: "rgba(255,255,255,0.06)",
    padding: "6px 14px",
    borderRadius: 999,
    border: "1px solid rgba(255,215,0,0.18)",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid rgba(255,107,107,0.4)",
    color: "#ff8f8f",
    fontSize: 12,
    fontWeight: 700,
    padding: "6px 14px",
    borderRadius: 999,
    cursor: "pointer",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(255,215,0,0.12)",
    border: `1px solid ${YELLOW}`,
    color: YELLOW,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    padding: "6px 16px",
    borderRadius: 999,
    marginBottom: 18,
  },
  heroTitle: {
    color: "#fff",
    fontSize: "clamp(32px, 6vw, 52px)",
    fontWeight: 900,
    margin: "0 0 6px",
    letterSpacing: -1,
  },
  heroSubtitle: {
    color: YELLOW,
    fontSize: 18,
    fontWeight: 600,
    margin: "0 0 30px",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  statsRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 22,
  },
  statPill: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,215,0,0.25)",
    borderRadius: 999,
    padding: "10px 26px",
    minWidth: 96,
  },
  statNum: { color: YELLOW, fontSize: 24, fontWeight: 800, lineHeight: 1.1 },
  statLabel: { color: "#cfcfc0", fontSize: 12, marginTop: 2 },
  progressTrack: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    height: 10,
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, ${YELLOW}, #ffb700)`,
    borderRadius: 999,
    transition: "width .4s ease",
  },
  progressCaption: {
    color: "#a8a897",
    fontSize: 13,
    marginTop: 10,
  },
  navGrid: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "34px 20px 60px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 18,
  },
  navCard: {
    background: "#0d1108",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 24,
    padding: 22,
    textAlign: "left",
    cursor: "pointer",
    transition: "transform .18s ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  },
  navCardIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  navCardTitle: { color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 6 },
  navCardDesc: { color: "#9c9c8c", fontSize: 13.5, lineHeight: 1.5 },

  /* ---- inner pages ---- */
  pageWrap: {
    minHeight: "100vh",
    background: DARK_BG,
  },
  innerHeader: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(8,10,6,0.82)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,215,0,0.14)",
  },
  innerHeaderInner: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "1px solid rgba(255,215,0,0.35)",
    background: "rgba(255,215,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  innerTitle: { color: "#fff", fontSize: 17, fontWeight: 800 },
  innerSubtitle: { color: "#8f8f7f", fontSize: 12.5, marginTop: 2 },
  saveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  saveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    display: "inline-block",
  },

  contentWrap: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "22px 18px 70px",
  },

  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 999,
    padding: "12px 20px",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: 14.5,
  },

  groupBlock: { marginBottom: 18 },
  groupHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: 18,
    padding: "12px 18px",
    cursor: "pointer",
  },
  groupBadge: {
    color: "#0a0a06",
    fontWeight: 800,
    fontSize: 12.5,
    padding: "5px 14px",
    borderRadius: 999,
    letterSpacing: 0.5,
  },
  groupCount: { color: "#9c9c8c", fontSize: 12.5, flex: 1, textAlign: "left" },

  stickerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
    gap: 14,
    marginTop: 14,
  },
  stickerCard: {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid",
    borderRadius: 20,
    overflow: "hidden",
    backdropFilter: "blur(8px)",
    display: "flex",
    flexDirection: "column",
  },
  stickerImg: {
    height: 92,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  stickerFlag: { fontSize: 30 },
  stickerCode: { fontSize: 12, fontWeight: 800, letterSpacing: 1 },
  stickerBody: { padding: "12px 14px 14px" },
  stickerName: { color: "#fff", fontSize: 14.5, fontWeight: 800, lineHeight: 1.25 },
  stickerTeam: { color: "#8f8f7f", fontSize: 12, marginTop: 3 },
  stickerDblTag: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 11,
    fontWeight: 700,
    color: "#0a0a06",
    background: YELLOW,
    padding: "3px 10px",
    borderRadius: 999,
  },
  stickerActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  miniBtnYellow: {
    flex: 1,
    background: YELLOW,
    color: "#0a0a06",
    border: "none",
    borderRadius: 999,
    padding: "8px 10px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  miniBtnGhost: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "1px solid rgba(255,107,107,0.35)",
    background: "rgba(255,107,107,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 12,
    background: "rgba(255,255,255,0.04)",
    borderRadius: 999,
    padding: "6px 10px",
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    background: YELLOW,
    color: "#0a0a06",
    fontSize: 17,
    fontWeight: 800,
    cursor: "pointer",
    lineHeight: 1,
  },
  qtyValue: { color: "#fff", fontWeight: 800, fontSize: 15, minWidth: 20, textAlign: "center" },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#8f8f7f",
  },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { color: "#fff", fontSize: 17, fontWeight: 800, marginBottom: 6 },
  emptyDesc: { fontSize: 13.5, maxWidth: 320, margin: "0 auto" },

  /* ---- add page ---- */
  addPanel: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 26,
    padding: 26,
    backdropFilter: "blur(10px)",
    marginBottom: 30,
  },
  addLabel: { color: "#9c9c8c", fontSize: 12.5, fontWeight: 700, letterSpacing: 1 },
  addInput: {
    width: "100%",
    marginTop: 10,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,215,0,0.3)",
    borderRadius: 16,
    padding: "16px 18px",
    color: YELLOW,
    fontSize: 24,
    fontFamily: "'Courier New', Consolas, monospace",
    fontWeight: 700,
    letterSpacing: 2,
    outline: "none",
  },
  previewBox: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 18,
    minHeight: 64,
    background: "rgba(255,255,255,0.03)",
    borderRadius: 18,
    padding: "14px 18px",
  },
  previewFlag: { fontSize: 36 },
  previewName: { color: "#fff", fontSize: 18, fontWeight: 800 },
  previewMeta: { color: "#9c9c8c", fontSize: 12.5, marginTop: 3 },
  previewWarn: { color: YELLOW, fontSize: 12, marginTop: 5, fontWeight: 600 },
  previewPlaceholder: { color: "#63635a", fontSize: 13.5 },

  toggleRow: { display: "flex", gap: 10, marginTop: 20 },
  toggleBtn: {
    flex: 1,
    padding: "12px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#9c9c8c",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  toggleBtnActive: {
    background: YELLOW,
    color: "#0a0a06",
    border: "1px solid " + YELLOW,
  },
  submitBtn: {
    width: "100%",
    marginTop: 20,
    padding: "16px",
    borderRadius: 999,
    border: "none",
    background: `linear-gradient(90deg, ${YELLOW}, #ffb700)`,
    color: "#0a0a06",
    fontSize: 15.5,
    fontWeight: 800,
    letterSpacing: 0.5,
  },

  teamsSectionTitle: {
    color: "#9c9c8c",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 14,
    textTransform: "uppercase",
  },
  teamsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))",
    gap: 10,
  },
  teamChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: 16,
    padding: "10px 6px",
    cursor: "pointer",
  },
  teamChipCode: { fontSize: 11.5, fontWeight: 800, letterSpacing: 0.5 },

  toast: {
    position: "fixed",
    left: "50%",
    bottom: 26,
    transform: "translateX(-50%)",
    background: YELLOW,
    color: "#0a0a06",
    fontWeight: 800,
    fontSize: 13.5,
    padding: "12px 24px",
    borderRadius: 999,
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    zIndex: 100,
    whiteSpace: "nowrap",
  },
};
