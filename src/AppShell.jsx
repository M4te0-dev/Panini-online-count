import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ============================================================
   DONNÉES — Base de données joueurs FIFA World Cup 2026
   ============================================================ */

const PLAYER_DB = {"FWC1": "Official Emblem", "FWC2": "Official Emblem", "FWC3": "Official Mascots", "FWC4": "Official Slogan", "FWC5": "Official Ball", "FWC6": "Canada (Host Countries & Cities)", "FWC7": "Mexico (Host Countries & Cities)", "FWC8": "USA (Host Countries & Cities)", "MEX1": "Logo", "MEX2": "Luis Malagón", "MEX3": "Johan Vasquez", "MEX4": "Jorge Sánchez", "MEX5": "Cesar Montes", "MEX6": "Jesus Gallardo", "MEX7": "Israel Reyes", "MEX8": "Diego Lainez", "MEX9": "Carlos Rodriguez", "MEX10": "Edson Alvarez", "MEX11": "Orbelin Pineda", "MEX12": "Marcel Ruiz", "MEX13": "Photo d'Équipe", "MEX14": "Érick Sánchez", "MEX15": "Hirving Lozano", "MEX16": "Santiago Giménez", "MEX17": "Raúl Jiménez", "MEX18": "Alexis Vega", "MEX19": "Roberto Alvarado", "MEX20": "Cesar Huerta", "RSA1": "Logo", "RSA2": "Ronwen Williams", "RSA3": "Sipho Chaine", "RSA4": "Aubrey Modiba", "RSA5": "Samukele Kabini", "RSA6": "Mbekezeli Mbokazi", "RSA7": "Khulumani Ndamane", "RSA8": "Siyabonga Ngezana", "RSA9": "Khuliso Mudau", "RSA10": "Nkosinathi Sibisi", "RSA11": "Teboho Mokoena", "RSA12": "Thalente Mbatha", "RSA13": "Photo d'Équipe", "RSA14": "Bathasi Aubaas", "RSA15": "Yaya Sithole", "RSA16": "Sipho Mbule", "RSA17": "Lyle Foster", "RSA18": "Iqraam Rayners", "RSA19": "Mohau Nkota", "RSA20": "Oswin Appollis", "KOR1": "Logo", "KOR2": "Hyeon-woo Jo", "KOR3": "Seung-Gyu Kim", "KOR4": "Min-jae Kim", "KOR5": "Yu-min Cho", "KOR6": "Young-woo Seol", "KOR7": "Han-beom Lee", "KOR8": "Tae-seok Lee", "KOR9": "Myung-jae Lee", "KOR10": "Jae-sung Lee", "KOR11": "In-beom Hwang", "KOR12": "Kang-in Lee", "KOR13": "Photo d'Équipe", "KOR14": "Seung-ho Paik", "KOR15": "Jens Castrop", "KOR16": "Dongg-yeong Lee", "KOR17": "Gue-sung Cho", "KOR18": "Heung-min Son", "KOR19": "Hee-chan Hwang", "KOR20": "Hyeon-Gyu Oh", "CZE1": "Logo", "CZE2": "Matej Kovar", "CZE3": "Jindrich Stanek", "CZE4": "Ladislav Krejci", "CZE5": "Vladimir Coufal", "CZE6": "Jaroslav Zeleny", "CZE7": "Tomas Holes", "CZE8": "David Zima", "CZE9": "Michal Sadilek", "CZE10": "Lukas Provod", "CZE11": "Lukas Cerv", "CZE12": "Tomas Soucek", "CZE13": "Photo d'Équipe", "CZE14": "Pavel Sulc", "CZE15": "Matej Vydra", "CZE16": "Vasil Kusej", "CZE17": "Tomas Chory", "CZE18": "Vaclav Cerny", "CZE19": "Adam Hlozek", "CZE20": "Patrik Schick", "CAN1": "Logo", "CAN2": "Dayne St.Clair", "CAN3": "Alphonso Davies", "CAN4": "Alistair Johnston", "CAN5": "Samuel Adekugbe", "CAN6": "Riche Larvea", "CAN7": "Derek Cornelius", "CAN8": "Moïse Bombito", "CAN9": "Kamal Miller", "CAN10": "Stephen Eustáquio", "CAN11": "Ismaël Koné", "CAN12": "Jonathan Osorio", "CAN13": "Photo d'Équipe", "CAN14": "Jacob Shaffelburg", "CAN15": "Mathieu Choinière", "CAN16": "Niko Sigur", "CAN17": "Tajon Buchanan", "CAN18": "Liam Millar", "CAN19": "Cyle Larin", "CAN20": "Jonathan David", "BIH1": "Logo", "BIH2": "Nikola Vasilj", "BIH3": "Amer Dedic", "BIH4": "Sead Kolasinac", "BIH5": "Tarik Muharemovic", "BIH6": "Nihad Mujakic", "BIH7": "Nikola Katic", "BIH8": "Amir Hadziahmetovic", "BIH9": "Benjamin Tahirovic", "BIH10": "Armin Gigovic", "BIH11": "Ivan Sunjic", "BIH12": "Ivan Basic", "BIH13": "Photo d'Équipe", "BIH14": "Dzenis Burnic", "BIH15": "Esmir Bajraktarevic", "BIH16": "Amar Memic", "BIH17": "Ermedin Demirovic", "BIH18": "Edin Dzeko", "BIH19": "Samed Bazdar", "BIH20": "Haris Tabakovic", "QAT1": "Logo", "QAT2": "Meshaal Barsham", "QAT3": "Sultan Albrake", "QAT4": "Lucas Mendes", "QAT5": "Homam Ahmed", "QAT6": "Boualem Khoukhi", "QAT7": "Pedro Miguel", "QAT8": "Tarek Salman", "QAT9": "Mohamed Al-Mannai", "QAT10": "Karim Boudiaf", "QAT11": "Assim Madibo", "QAT12": "Ahmed Fatehi", "QAT13": "Photo d'Équipe", "QAT14": "Mohammed Waad", "QAT15": "Abdulaziz Hatem", "QAT16": "Hassan Al-Haydos", "QAT17": "Edmilson Junior", "QAT18": "Akram Hassan Afif", "QAT19": "Ahmed Al Ganehi", "QAT20": "Almoez Ali", "SUI1": "Logo", "SUI2": "Gregor Kobel", "SUI3": "Yvon Mvogo", "SUI4": "Manuel Akanji", "SUI5": "Ricardo Rodriguez", "SUI6": "Nico Elvedi", "SUI7": "Aurèle Amenda", "SUI8": "Silvan Widmer", "SUI9": "Granit Xhaka", "SUI10": "Denis Zakaria", "SUI11": "Remo Freuler", "SUI12": "Fabian Rieder", "SUI13": "Photo d'Équipe", "SUI14": "Ardon Jashari", "SUI15": "Johan Manzambi", "SUI16": "Michel Aebischer", "SUI17": "Breel Embolo", "SUI18": "Ruben Vargas", "SUI19": "Dan Ndoye", "SUI20": "Zeki Amdouni", "BRA1": "Logo", "BRA2": "Alisson", "BRA3": "Bento", "BRA4": "Marquinhos", "BRA5": "Éder Militão", "BRA6": "Gabriel Magalhães", "BRA7": "Danilo", "BRA8": "Wesley", "BRA9": "Lucas Paquetá", "BRA10": "Casemiro", "BRA11": "Bruno Guimarães", "BRA12": "Luiz Henrique", "BRA13": "Photo d'Équipe", "BRA14": "Vinicius Júnior", "BRA15": "Rodrygo", "BRA16": "João Pedro", "BRA17": "Matheus Cunha", "BRA18": "Gabriel Martinelli", "BRA19": "Raphinha", "BRA20": "Estévão", "MAR1": "Logo", "MAR2": "Yassine Bounou", "MAR3": "Munir El Kajoui", "MAR4": "Achraf Hakimi", "MAR5": "Noussair Mazraoui", "MAR6": "Nayef Aguerd", "MAR7": "Roman Saiss", "MAR8": "Jawad El Yamio", "MAR9": "Adam Masina", "MAR10": "Sofyan Amrabat", "MAR11": "Azzedine Ounahi", "MAR12": "Eliesse Ben Seghir", "MAR13": "Photo d'Équipe", "MAR14": "Bilal El Khannouss", "MAR15": "Ismael Saibari", "MAR16": "Youssef En-Nesyri", "MAR17": "Abde Ezzalzouli", "MAR18": "Soufiane Rahimi", "MAR19": "Brahim Diaz", "MAR20": "Ayoub El Kaabi", "HAI1": "Logo", "HAI2": "Johny Placide", "HAI3": "Carlens Arcus", "HAI4": "Martin Expérience", "HAI5": "Jean-Kevin Duverne", "HAI6": "Ricardo Adé", "HAI7": "Duke Lacroix", "HAI8": "Garven Metusala", "HAI9": "Hannes Delcroix", "HAI10": "Leverton Pierre", "HAI11": "Danley Jean Jacques", "HAI12": "Jean-Ricner Bellegarde", "HAI13": "Photo d'Équipe", "HAI14": "Christopher Attys", "HAI15": "Derrick Etienne Jr", "HAI16": "Josue Casimir", "HAI17": "Ruben Providence", "HAI18": "Duckens Nazon", "HAI19": "Louicius Deedson", "HAI20": "Frantzdy Pierrot", "SCO1": "Logo", "SCO2": "Angus Gunn", "SCO3": "Jack Hendry", "SCO4": "Kieran Tierney", "SCO5": "Aaron Hickey", "SCO6": "Andrew Robertson", "SCO7": "Scott McKenna", "SCO8": "John Souttar", "SCO9": "Anthony Ralston", "SCO10": "Grant Hanley", "SCO11": "Scott McTominay", "SCO12": "Billy Gilmour", "SCO13": "Photo d'Équipe", "SCO14": "Lewis Ferguson", "SCO15": "Ryan Christie", "SCO16": "Kenny McLean", "SCO17": "John McGinn", "SCO18": "Lyndon Dykes", "SCO19": "Che Adams", "SCO20": "Ben Gannon-Doak", "USA1": "Logo", "USA2": "Math Freese", "USA3": "Chris Richards", "USA4": "Tim Ream", "USA5": "Mark McKenzie", "USA6": "Alex Freeman", "USA7": "Antonee Robinson", "USA8": "Tyler Adams", "USA9": "Tanner Tessmann", "USA10": "Weston McKennie", "USA11": "Christian Roldan", "USA12": "Timothy Weah", "USA13": "Photo d'Équipe", "USA14": "Diego Luna", "USA15": "Malik Tillman", "USA16": "Christian Pulisic", "USA17": "Brenden Aaronson", "USA18": "Ricardo Pepi", "USA19": "Haji Wright", "USA20": "Folarin Balogun", "PAR1": "Logo", "PAR2": "Roberto Fernandez", "PAR3": "Orlando Gill", "PAR4": "Gustavo Gomez", "PAR5": "Fabián Balbuena", "PAR6": "Juan José Cáceres", "PAR7": "Omar Alderete", "PAR8": "Junior Alonso", "PAR9": "Mathías Villasanti", "PAR10": "Diego Gomez", "PAR11": "Damián Bobadilla", "PAR12": "Andres Cubas", "PAR13": "Photo d'Équipe", "PAR14": "Matias Galarza Fonda", "PAR15": "Julio Enciso", "PAR16": "Alejandro Romero Gamarra", "PAR17": "Miguel Almirón", "PAR18": "Ramon Sosa", "PAR19": "Angel Romero", "PAR20": "Antonio Sanabria", "AUS1": "Logo", "AUS2": "Mathew Ryan", "AUS3": "Joe Gauci", "AUS4": "Harry Souttar", "AUS5": "Alessandro Circati", "AUS6": "Jordan Bos", "AUS7": "Aziz Behich", "AUS8": "Cameron Burgess", "AUS9": "Lewis Miller", "AUS10": "Milos Degenek", "AUS11": "Jackson Irvine", "AUS12": "Riley McGree", "AUS13": "Photo d'Équipe", "AUS14": "Aiden O'Neill", "AUS15": "Connor Metcalfe", "AUS16": "Patrick Yazbek", "AUS17": "Craig Goodwin", "AUS18": "Kusini Vengi", "AUS19": "Nestory Irankunda", "AUS20": "Mohamed Touré", "TUR1": "Logo", "TUR2": "Ugurcan Cakir", "TUR3": "Mert Muldur", "TUR4": "Zeki Celik", "TUR5": "Abdulkerim Bardakci", "TUR6": "Caglar Soyuncu", "TUR7": "Merih Demiral", "TUR8": "Ferdi Kadioglu", "TUR9": "Kaan Ayhan", "TUR10": "Ismail Yuksek", "TUR11": "Hakan Calhanoglu", "TUR12": "Orkun Kokcu", "TUR13": "Photo d'Équipe", "TUR14": "Arda Guler", "TUR15": "Irfan Can Kahveci", "TUR16": "Yunus Akgun", "TUR17": "Can Uzun", "TUR18": "Baris Alper Yilmaz", "TUR19": "Kerem Akturkoglu", "TUR20": "Kenan Yildiz", "GER1": "Logo", "GER2": "Marc-André ter Stegen", "GER3": "Jonathan Tah", "GER4": "David Raum", "GER5": "Nico Schlotterbeck", "GER6": "Antonio Rüdiger", "GER7": "Waldemar Anton", "GER8": "Ridle Baku", "GER9": "Maximilian Mittelstadt", "GER10": "Joshua Kimmich", "GER11": "Florian Wirtz", "GER12": "Felix Nmecha", "GER13": "Photo d'Équipe", "GER14": "Leon Goretzka", "GER15": "Jamal Musiala", "GER16": "Serge Gnabry", "GER17": "Kai Havertz", "GER18": "Leroy Sane", "GER19": "Karim Adeyemi", "GER20": "Nick Woltemade", "CUW1": "Logo", "CUW2": "Eloy Room", "CUW3": "Armando Obispo", "CUW4": "Sherel Floranus", "CUW5": "Jurien Gaari", "CUW6": "Joshua Brenet", "CUW7": "Roshon Van Eijma", "CUW8": "Shurandy Sambo", "CUW9": "Livano Comenencia", "CUW10": "Godfried Roemeratoe", "CUW11": "Juninho Bacuna", "CUW12": "Leandro Bacuna", "CUW13": "Photo d'Équipe", "CUW14": "Tahith Chong", "CUW15": "Kenji Gorre", "CUW16": "Jearl Margaritha", "CUW17": "Jurgen Locadia", "CUW18": "Jeremy Antonisse", "CUW19": "Gervane Kastaneer", "CUW20": "Sontje Hansen", "CIV1": "Logo", "CIV2": "Yahia Fofana", "CIV3": "Ghislain Konan", "CIV4": "Wilfried Singo", "CIV5": "Odilon Kossounou", "CIV6": "Evan Ndicka", "CIV7": "Willy Boly", "CIV8": "Emmanuel Agbadou", "CIV9": "Ousmane Diomande", "CIV10": "Franck Kessie", "CIV11": "Seko Fofana", "CIV12": "Ibrahim Sangare", "CIV13": "Photo d'Équipe", "CIV14": "Jean-Philippe Gbamin", "CIV15": "Amad Diallo", "CIV16": "Sébastien Haller", "CIV17": "Simon Adingra", "CIV18": "Yan Diomande", "CIV19": "Evann Guessand", "CIV20": "Oumar Diakite", "ECU1": "Logo", "ECU2": "Hernán Galíndez", "ECU3": "Gonzalo Valle", "ECU4": "Piero Hincapié", "ECU5": "Pervis Estupiñán", "ECU6": "Willian Pacho", "ECU7": "Ángelo Preciado", "ECU8": "Joel Ordóñez", "ECU9": "Moises Caicedo", "ECU10": "Alan Franco", "ECU11": "Kendry Paez", "ECU12": "Pedro Vite", "ECU13": "Photo d'Équipe", "ECU14": "John Veboah", "ECU15": "Leonardo Campana", "ECU16": "Gonzalo Plata", "ECU17": "Nilson Angulo", "ECU18": "Alan Minda", "ECU19": "Kevin Rodriguez", "ECU20": "Enner Valencia", "NED1": "Logo", "NED2": "Bart Verbruggen", "NED3": "Virgil van Dijk", "NED4": "Micky van de Ven", "NED5": "Jurrien Timber", "NED6": "Denzel Dumfries", "NED7": "Nathan Aké", "NED8": "Jeremie Frimpong", "NED9": "Jan Paul van Hecke", "NED10": "Tijjani Reijnders", "NED11": "Ryan Gravenberch", "NED12": "Teun Koopmeiners", "NED13": "Photo d'Équipe", "NED14": "Frenkie de Jong", "NED15": "Xavi Simons", "NED16": "Justin Kluivert", "NED17": "Memphis Depay", "NED18": "Donyell Malen", "NED19": "Wout Weghorst", "NED20": "Cody Gakpo", "JPN1": "Logo", "JPN2": "Zion Suzuki", "JPN3": "Henry Heroki Mochizuki", "JPN4": "Ayumu Seko", "JPN5": "Junnosuke Suzuki", "JPN6": "Shogo Taniguchi", "JPN7": "Tsuyoshi Watanabe", "JPN8": "Kaishu Sano", "JPN9": "Yuki Soma", "JPN10": "Ao Tanaka", "JPN11": "Daichi Kamada", "JPN12": "Takefusa Kubo", "JPN13": "Photo d'Équipe", "JPN14": "Ritsu Doan", "JPN15": "Keito Nakamura", "JPN16": "Takumi Minamino", "JPN17": "Shuto Machino", "JPN18": "Junya Ito", "JPN19": "Koki Ogawa", "JPN20": "Ayase Ueda", "SWE1": "Logo", "SWE2": "Victor Johansson", "SWE3": "Isak Hien", "SWE4": "Gabriel Gudmundsson", "SWE5": "Emil Holm", "SWE6": "Victor Nilsson Lindelöf", "SWE7": "Gustaf Lagerbielke", "SWE8": "Lucas Bergvall", "SWE9": "Hugo Larsson", "SWE10": "Jesper Karlström", "SWE11": "Yasin Ayari", "SWE12": "Mattias Svanberg", "SWE13": "Photo d'Équipe", "SWE14": "Daniel Svensson", "SWE15": "Ken Sema", "SWE16": "Roony Bardghji", "SWE17": "Dejan Kulusevski", "SWE18": "Anthony Elanga", "SWE19": "Alexander Isak", "SWE20": "Viktor Gyökeres", "TUN1": "Logo", "TUN2": "Bechir Ben Said", "TUN3": "Aymen Dahmen", "TUN4": "Yan Valery", "TUN5": "Montassar Talbi", "TUN6": "Yassine Meriah", "TUN7": "Ali Abdi", "TUN8": "Dylan Bronn", "TUN9": "Ellyes Skhiri", "TUN10": "Aissa Laidouni", "TUN11": "Ferjani Sassi", "TUN12": "Mohamed Ali Ben Romdhane", "TUN13": "Photo d'Équipe", "TUN14": "Hannibal Mejbri", "TUN15": "Elias Achouri", "TUN16": "Elias Saad", "TUN17": "Hazem Mastouri", "TUN18": "Ismael Gharbi", "TUN19": "Sayfallah Ltaief", "TUN20": "Naim Sliti", "BEL1": "Logo", "BEL2": "Thibaut Courtois", "BEL3": "Arthur Theate", "BEL4": "Timothy Castagne", "BEL5": "Zeno Debast", "BEL6": "Brandon Mechele", "BEL7": "Maxim De Cuyper", "BEL8": "Thomas Meunier", "BEL9": "Youri Tielemans", "BEL10": "Amadou Onana", "BEL11": "Nicolas Raskin", "BEL12": "Alexis Saelemaekers", "BEL13": "Photo d'Équipe", "BEL14": "Hans Vanaken", "BEL15": "Kevin De Bruyne", "BEL16": "Jérémy Doku", "BEL17": "Charles De Ketelaere", "BEL18": "Leandro Trossard", "BEL19": "Loïs Openda", "BEL20": "Romelu Lukaku", "EGY1": "Logo", "EGY2": "Mohamed El Shenawy", "EGY3": "Mohamed Hany", "EGY4": "Mohamed Hamdy", "EGY5": "Yasser Ibrahim", "EGY6": "Khaled Sobhi", "EGY7": "Ramy Rabia", "EGY8": "Hossam Abdelmaguid", "EGY9": "Ahmed Fatouh", "EGY10": "Marwan Attia", "EGY11": "Zizo", "EGY12": "Hamdy Fathy", "EGY13": "Photo d'Équipe", "EGY14": "Mohamed Lasheen", "EGY15": "Emam Ashour", "EGY16": "Osama Faisal", "EGY17": "Mohamed Salah", "EGY18": "Mostafa Mohamed", "EGY19": "Trezeguet", "EGY20": "Omar Marmoush", "IRN1": "Logo", "IRN2": "Alireza Beiranvand", "IRN3": "Morteza Pouraliganji", "IRN4": "Ehsan Hajsafi", "IRN5": "Milad Mohammadi", "IRN6": "Shojae Khalilzadeh", "IRN7": "Ramin Rezaeian", "IRN8": "Hossein Kanaani", "IRN9": "Sadegh Moharrami", "IRN10": "Saleh Hardani", "IRN11": "Saeed Ezatolahi", "IRN12": "Saman Ghoddos", "IRN13": "Photo d'Équipe", "IRN14": "Omid Noorafkan", "IRN15": "Roozbeh Cheshmi", "IRN16": "Mohammad Mohebi", "IRN17": "Sardar Azmoun", "IRN18": "Mehdi Taremi", "IRN19": "Alireza Jahanbakhsh", "IRN20": "Ali Gholizadeh", "NZL1": "Logo", "NZL2": "Max Crocombe Payne", "NZL3": "Alex Paulsen", "NZL4": "Michael Boxall", "NZL5": "Liberato Cacace", "NZL6": "Tim Payne", "NZL7": "Tyler Bindon", "NZL8": "Francis de Vries", "NZL9": "Finn Surman", "NZL10": "Joe Bell", "NZL11": "Sarpreet Singh", "NZL12": "Ryan Thomas", "NZL13": "Photo d'Équipe", "NZL14": "Matthew Garbett", "NZL15": "Marko Stamenić", "NZL16": "Ben Old", "NZL17": "Chris Wood", "NZL18": "Elijah Just", "NZL19": "Callum McCowatt", "NZL20": "Kosta Barbarouses", "ESP1": "Logo", "ESP2": "Unai Simon", "ESP3": "Robin Le Normand", "ESP4": "Aymeric Laporte", "ESP5": "Dean Huijsen", "ESP6": "Pedro Porro", "ESP7": "Dani Carvajal", "ESP8": "Marc Cucurella", "ESP9": "Martín Zubimendi", "ESP10": "Rodri", "ESP11": "Pedri", "ESP12": "Fabian Ruiz", "ESP13": "Photo d'Équipe", "ESP14": "Mikel Merino", "ESP15": "Lamine Yamal", "ESP16": "Dani Olmo", "ESP17": "Nico Williams", "ESP18": "Ferran Torres", "ESP19": "Álvaro Morata", "ESP20": "Mikel Oyarzabal", "CPV1": "Logo", "CPV2": "Vozinha", "CPV3": "Logan Costa", "CPV4": "Pico", "CPV5": "Diney", "CPV6": "Steven Moreira", "CPV7": "Wagner Pina", "CPV8": "Joao Paulo", "CPV9": "Yannick Semedo", "CPV10": "Kevin Pina", "CPV11": "Patrick Andrade", "CPV12": "Jamiro Monteiro", "CPV13": "Photo d'Équipe", "CPV14": "Deroy Duarte", "CPV15": "Garry Rodrigues", "CPV16": "Jovane Cabral", "CPV17": "Ryan Mendes", "CPV18": "Dailon Livramento", "CPV19": "Willy Semedo", "CPV20": "Bebe", "KSA1": "Logo", "KSA2": "Nawaf Alaqidi", "KSA3": "Abdulrahman Al-Sanbi", "KSA4": "Saud Abdulhamid", "KSA5": "Nawaf Bouwashl", "KSA6": "Jihad Thakri", "KSA7": "Moteb Al-Harbi", "KSA8": "Hassan Altambakti", "KSA9": "Musab Aljuwayr", "KSA10": "Ziyad Aljohani", "KSA11": "Abdullah Alkhaibari", "KSA12": "Nasser Aldawsari", "KSA13": "Photo d'Équipe", "KSA14": "Saleh Abu Alshamat", "KSA15": "Marwan Alsahafi", "KSA16": "Salem Aldawsari", "KSA17": "Abdulrahman Al-Aboud", "KSA18": "Feras Akbrikan", "KSA19": "Saleh Alshehri", "KSA20": "Abdullah Al-Hamdan", "URU1": "Logo", "URU2": "Sergio Rochet", "URU3": "Santiago Mele", "URU4": "Ronald Araujo", "URU5": "José María Giménez", "URU6": "Sebastian Caceres", "URU7": "Mathias Olivera", "URU8": "Guillermo Varela", "URU9": "Nahitan Nandez", "URU10": "Federico Valverde", "URU11": "Giorgian De Arrascaeta", "URU12": "Rodrigo Bentancur", "URU13": "Photo d'Équipe", "URU14": "Manuel Ugarte", "URU15": "Nicolás de la Cruz", "URU16": "Maxi Araujo", "URU17": "Darwin Núñez", "URU18": "Federico Viñas", "URU19": "Rodrigo Aguirre", "URU20": "Facundo Pellistri", "FRA1": "Logo", "FRA2": "Mike Maignan", "FRA3": "Theo Hernandez", "FRA4": "William Saliba", "FRA5": "Jules Kounde", "FRA6": "Ibrahima Konate", "FRA7": "Dayot Upamecano", "FRA8": "Lucas Digne", "FRA9": "Aurélien Tchouaméni", "FRA10": "Eduardo Camavinga", "FRA11": "Manu Kone", "FRA12": "Adrien Rabiot", "FRA13": "Photo d'Équipe", "FRA14": "Michael Olise", "FRA15": "Ousmane Dembele", "FRA16": "Bradley Barcola", "FRA17": "Désiré Doué", "FRA18": "Kingsley Coman", "FRA19": "Hugo Ekitike", "FRA20": "Kylian Mbappe", "SEN1": "Logo", "SEN2": "Edouard Mendy", "SEN3": "Yehvann Diouf", "SEN4": "Moussa Niakhaté", "SEN5": "Abdoulaye Seck", "SEN6": "Ismail Jakobs", "SEN7": "El Hadji Malick Diouf", "SEN8": "Kalidou Koulibaly", "SEN9": "Idrissa Gana Gueye", "SEN10": "Pape Matar Sarr", "SEN11": "Pape Gueye", "SEN12": "Habib Diarra", "SEN13": "Photo d'Équipe", "SEN14": "Lamine Camara", "SEN15": "Sadio Mane", "SEN16": "Ismaïla Sarr", "SEN17": "Boulaye Dia", "SEN18": "Iliman Ndiaye", "SEN19": "Nicolas Jackson", "SEN20": "Krepin Diatta", "IRQ1": "Logo", "IRQ2": "Jalal Hassan", "IRQ3": "Rebin Sulaka", "IRQ4": "Hussein Ali", "IRQ5": "Akam Hashem", "IRQ6": "Merchas Doski", "IRQ7": "Zaid Tahseen", "IRQ8": "Manaf Younis", "IRQ9": "Zidane Iqbal", "IRQ10": "Amir Al-Ammari", "IRQ11": "Ibrahim Bavesh", "IRQ12": "Ali Jasim", "IRQ13": "Photo d'Équipe", "IRQ14": "Youssef Amyn", "IRQ15": "Aimar Sher", "IRQ16": "Marko Farji", "IRQ17": "Osama Rashid", "IRQ18": "Ali Al-Hamadi", "IRQ19": "Aymen Hussein", "IRQ20": "Mohanad Ali", "NOR1": "Logo", "NOR2": "Orjan Nyland", "NOR3": "Julian Ryerson", "NOR4": "Leo Ostigård", "NOR5": "Kristoffer Vassbakk Ajer", "NOR6": "Marcus Holmgren Pedersen", "NOR7": "David Møller Wolfe", "NOR8": "Torbjørn Heggem", "NOR9": "Morten Thorsby", "NOR10": "Martin Ødegaard", "NOR11": "Sander Berge", "NOR12": "Andreas Schjelderup", "NOR13": "Photo d'Équipe", "NOR14": "Patrick Berg", "NOR15": "Erling Haaland", "NOR16": "Alexander Sørloth", "NOR17": "Aron Dønnum", "NOR18": "Jorgen Strand Larsen", "NOR19": "Antonio Nusa", "NOR20": "Oscar Bobb", "ARG1": "Logo", "ARG2": "Emiliano Martinez", "ARG3": "Nahuel Molina", "ARG4": "Cristian Romero", "ARG5": "Nicolas Otamendi", "ARG6": "Nicolas Tagliafico", "ARG7": "Leonardo Balerdi", "ARG8": "Enzo Fernandez", "ARG9": "Alexis Mac Allister", "ARG10": "Rodrigo De Paul", "ARG11": "Exequiel Palacios", "ARG12": "Leandro Paredes", "ARG13": "Photo d'Équipe", "ARG14": "Nico Paz", "ARG15": "Franco Mastantuono", "ARG16": "Nico Gonzalez", "ARG17": "Lionel Messi", "ARG18": "Lautaro Martinez", "ARG19": "Julian Alvarez", "ARG20": "Giuliano Simeone", "ALG1": "Logo", "ALG2": "Alexis Guendouz", "ALG3": "Ramy Bensebaini", "ALG4": "Youcef Atal", "ALG5": "Rayan Aït-Nouri", "ALG6": "Mohamed Amine Tougai", "ALG7": "Aïssa Mandi", "ALG8": "Ismael Bennacer", "ALG9": "Houssem Aquar", "ALG10": "Hicham Boudaoui", "ALG11": "Ramiz Zerrouki", "ALG12": "Nabil Bentalab", "ALG13": "Photo d'Équipe", "ALG14": "Farés Chaibi", "ALG15": "Riyad Mahrez", "ALG16": "Said Benrahma", "ALG17": "Anis Hadj Moussa", "ALG18": "Amine Gouiri", "ALG19": "Baghdad Bounedjah", "ALG20": "Mohammed Amoura", "AUT1": "Logo", "AUT2": "Alexander Schlager", "AUT3": "Patrick Pentz", "AUT4": "David Alaba", "AUT5": "Kevin Danso", "AUT6": "Philipp Lienhart", "AUT7": "Stefan Posch", "AUT8": "Phillipp Mwene", "AUT9": "Alexander Prass", "AUT10": "Xaver Schlager", "AUT11": "Marcel Sabitzer", "AUT12": "Konrad Laimer", "AUT13": "Photo d'Équipe", "AUT14": "Florian Grillitsch", "AUT15": "Nicolas Seiwald", "AUT16": "Romano Schmid", "AUT17": "Patrick Wimmer", "AUT18": "Christoph Baumgartner", "AUT19": "Michael Gregoritsch", "AUT20": "Marko Arnautović", "JOR1": "Logo", "JOR2": "Yazeed Abulaila", "JOR3": "Ihsan Haddad", "JOR4": "Mohammad Abu Hashish", "JOR5": "Yazan Al-Arab", "JOR6": "Abdallah Nasib", "JOR7": "Saleem Obaid", "JOR8": "Mohammad Abualnadi", "JOR9": "Ibrahim Saadeh", "JOR10": "Nizar Al-Rashdan", "JOR11": "Noor Al-Rawabdeh", "JOR12": "Mohannad Abu Taha", "JOR13": "Photo d'Équipe", "JOR14": "Amer Jamous", "JOR15": "Musa Al-Taamari", "JOR16": "Yazan Al-Naimat", "JOR17": "Mahmoud Al-Mardi", "JOR18": "Ali Olwan", "JOR19": "Mohammad Abu Zrayq", "JOR20": "Ibrahim Sabra", "POR1": "Logo", "POR2": "Diogo Costa", "POR3": "Jose Sa", "POR4": "Ruben Dias", "POR5": "João Cancelo", "POR6": "Diogo Dalot", "POR7": "Nuno Mendes", "POR8": "Gonçalo Inácio", "POR9": "Bernardo Silva", "POR10": "Bruno Fernandes", "POR11": "Ruben Neves", "POR12": "Vitinha", "POR13": "Photo d'Équipe", "POR14": "João Neves", "POR15": "Cristiano Ronaldo", "POR16": "Francisco Trincao", "POR17": "João Felix", "POR18": "Gonçalo Ramos", "POR19": "Pedro Neto", "POR20": "Rafael Leão", "COD1": "Logo", "COD2": "Lionel Mpasi", "COD3": "Aaron Wan-Bissaka", "COD4": "Axel Tuanzebe", "COD5": "Arthur Masuaku", "COD6": "Chancel Mbemba", "COD7": "Joris Kayembe", "COD8": "Charles Pickel", "COD9": "Ngal'ayel Mukau", "COD10": "Edo Kayembe", "COD11": "Samuel Moutoussamy", "COD12": "Noah Sadiki", "COD13": "Photo d'Équipe", "COD14": "Théo Bongonda", "COD15": "Meschak Elia", "COD16": "Yoane Wissa", "COD17": "Brian Cipenga", "COD18": "Fiston Mayele", "COD19": "Cédric Bakambu", "COD20": "Nathanaël Mbuku", "UZB1": "Logo", "UZB2": "Utkir Yusupov", "UZB3": "Farrukh Savfiev", "UZB4": "Sherzod Nasrullaev", "UZB5": "Umar Eshmurodov", "UZB6": "Husniddin Aliqulov", "UZB7": "Rustamjon Ashurmatov", "UZB8": "Khojiakbar Alijonov", "UZB9": "Abdukodir Khusanov", "UZB10": "Odiljon Hamrobekov", "UZB11": "Otabek Shukurov", "UZB12": "Jamshid Iskanderov", "UZB13": "Photo d'Équipe", "UZB14": "Azizbek Turgunboev", "UZB15": "Khojimat Erkinov", "UZB16": "Eldor Shomurodov", "UZB17": "Oston Urunov", "UZB18": "Jaloliddin Masharipov", "UZB19": "Igor Sergeev", "UZB20": "Abbosbek Fayzullaev", "COL1": "Logo", "COL2": "Camilo Vargas", "COL3": "David Ospina", "COL4": "Dávinson Sánchez", "COL5": "Yerry Mina", "COL6": "Daniel Munoz", "COL7": "Johan Mojica", "COL8": "Jhon Lucumí", "COL9": "Santiago Arias", "COL10": "Jefferson Lerma", "COL11": "Kevin Castaño", "COL12": "Richard Rios", "COL13": "Photo d'Équipe", "COL14": "James Rodriguez", "COL15": "Juan Fernando Quintero", "COL16": "Jorge Carrascal", "COL17": "Jon Arias", "COL18": "Jhon Cordova", "COL19": "Luis Suarez", "COL20": "Luis Diaz", "ENG1": "Logo", "ENG2": "Jordan Pickford", "ENG3": "John Stones", "ENG4": "Marc Guéhi", "ENG5": "Ezri Konsa", "ENG6": "Trent Alexander-Arnold", "ENG7": "Reece James", "ENG8": "Dan Burn", "ENG9": "Jordan Henderson", "ENG10": "Declan Rice", "ENG11": "Jude Bellingham", "ENG12": "Cole Palmer", "ENG13": "Photo d'Équipe", "ENG14": "Morgan Rogers", "ENG15": "Anthony Gordon", "ENG16": "Phil Foden", "ENG17": "Bukayo Saka", "ENG18": "Harry Kane", "ENG19": "Marcus Rashford", "ENG20": "Ollie Watkins", "CRO1": "Logo", "CRO2": "Dominik Livaković", "CRO3": "Duje Caleta-Car", "CRO4": "Josko Gvardiol", "CRO5": "Josip Stanišić", "CRO6": "Luka Vušković", "CRO7": "Josip Sutalo", "CRO8": "Kristijan Jakic", "CRO9": "Luka Modrić", "CRO10": "Mateo Kovacic", "CRO11": "Martin Baturina", "CRO12": "Lovro Majer", "CRO13": "Photo d'Équipe", "CRO14": "Mario Pasalic", "CRO15": "Petar Sucic", "CRO16": "Ivan Perišić", "CRO17": "Marco Pasalic", "CRO18": "Ante Budimir", "CRO19": "Andrej Kramarić", "CRO20": "Franjo Ivanovic", "GHA1": "Logo", "GHA2": "Lawrence Ati Zigi", "GHA3": "Tariq Lamptey", "GHA4": "Mohammed Salisu", "GHA5": "Alidu Seidu", "GHA6": "Alexander Djiku", "GHA7": "Gideon Mensah", "GHA8": "Caleb Yirenkyi", "GHA9": "Abdul Issahaku Fatawu", "GHA10": "Thomas Partey", "GHA11": "Salis Abdul Samed", "GHA12": "Kamaldeen Sulemana", "GHA13": "Photo d'Équipe", "GHA14": "Mohammed Kudus", "GHA15": "Inaki Williams", "GHA16": "Jordan Ayew", "GHA17": "Andrew Ayew", "GHA18": "Joseph Paintsil", "GHA19": "Osman Bukari", "GHA20": "Antoine Semenyo", "PAN1": "Logo", "PAN2": "Orlando Mosquera", "PAN3": "Luis Mejia", "PAN4": "Fidel Escobar", "PAN5": "Andres Andrade", "PAN6": "Michael Amir Murillo", "PAN7": "Eric Davis", "PAN8": "Jose Cordoba", "PAN9": "Cesar Blackman", "PAN10": "Cristian Martinez", "PAN11": "Aníbal Godoy", "PAN12": "Adalberto Carrasquilla", "PAN13": "Photo d'Équipe", "PAN14": "Édgar Bárcenas", "PAN15": "Carlos Harvey", "PAN16": "Ismael Díaz", "PAN17": "Jose Fajardo", "PAN18": "Cecilio Waterman", "PAN19": "Jose Luiz Rodriguez", "PAN20": "Alberto Quintero", "FWC9": "Italy 1934", "FWC10": "Uruguay 1950", "FWC11": "West Germany 1954", "FWC12": "Brazil 1962", "FWC13": "West Germany 1974", "FWC14": "Argentina 1986", "FWC15": "Brazil 1994", "FWC16": "Brazil 2002", "FWC17": "Italy 2006", "FWC18": "Germany 2014", "FWC19": "Argentina 2022", "FWC0": "Logo Panini — We Are Panini"};

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
