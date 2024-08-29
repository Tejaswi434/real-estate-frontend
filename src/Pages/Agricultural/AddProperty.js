import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Divider,
  Select,
  Checkbox,
  Upload,
  InputNumber,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;

function AddProperty() {
  const [size, setSize] = useState(0);
  const [pricePerAcre, setPricePerAcre] = useState(0);
  const [checkboxHeadings, setCheckboxHeadings] = useState([]);
  const [hasPincode, setHasPincode] = useState(null);
  const [selectedLandType, setSelectedLandType] = useState("");
  const [headingLabel, setHeadingLabel] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [pincode, setPincode] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  // Sample data for districts, mandals, and villages
  const districtData = {
    Visakhapatnam: {
      mandals: {
        Anakapalle: [
          "Anakapalle",
          "Bheemunipatnam",
          "Chodavaram",
          "Dibbapalem",
          "Jammalapalem",
          "Kothapalli",
          "Kothapeta",
          "Koyyalagudem",
          "Moghalrajpuram",
          "Nadupuru",
          "Peddaganjam",
          "Pedapadmapuram",
          "Ravada",
          "Sankaram",
          "Siddavatam",
          "Vangali",
        ],
        Bheemunipatnam: [
          "Bheemunipatnam",
          "Chinthapalli",
          "Koyyuru",
          "Nallapadu",
          "Ralla",
          "Ravipalem",
          "Yerravaram",
        ],
        Chodavaram: [
          "Chodavaram",
          "Geddapeta",
          "Jambavalasa",
          "Jandapeta",
          "Kumarapalle",
          "Madhurapudi",
          "Nandigam",
          "Peddaganjam",
          "Rallapalli",
          "Rajulapeta",
          "Ravipalem",
          "Siddavatam",
          "Vemavaram",
        ],
        Dattirajeru: [
          "Dattirajeru",
          "Gollaprolu",
          "Gondapalle",
          "Jammalamadugu",
          "Kakinada",
          "Kothagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Sankaram",
          "Vadlamudi",
        ],
        Gajuwaka: [
          "Gajuwaka",
          "Gollaprolu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Ravipalem",
          "Sankaram",
          "Siddavatam",
          "Vadlamudi",
          "Vangali",
        ],
        Kasimkota: [
          "Kasimkota",
          "Bheemunipatnam",
          "Chinthapalli",
          "Koyyuru",
          "Nallapadu",
          "Ralla",
          "Ravipalem",
          "Yerravaram",
        ],
        Kothavalasa: [
          "Kothavalasa",
          "Geddapeta",
          "Jambavalasa",
          "Jandapeta",
          "Kumarapalle",
          "Madhurapudi",
          "Nandigam",
          "Peddaganjam",
          "Rallapalli",
          "Rajulapeta",
          "Ravipalem",
          "Siddavatam",
          "Vemavaram",
        ],
        Madugula: [
          "Madugula",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Nathavaram: [
          "Nathavaram",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Nakkapalli: [
          "Nakkapalli",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Narsipatnam: [
          "Narsipatnam",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Padmanabham: [
          "Padmanabham",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Pendurthi: [
          "Pendurthi",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Sabbavaram: [
          "Sabbavaram",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
        Yelamanchili: [
          "Yelamanchili",
          "Gollaprolu",
          "Jammalamadugu",
          "Kakinada",
          "Koyyalagudem",
          "Madhurapudi",
          "Peddaganjam",
          "Peddapadu",
          "Ravipalem",
          "Sankaram",
          "Vadlamudi",
          "Vangali",
        ],
      },
    },
    Vizianagaram: {
      mandals: {
        Garugubilli: [
          "Pedabuddidi",
          "Chinabuddidi",
          "Adavi",
          "Garugubilli",
          "Garikipeta",
          "Jada",
          "Kancharam",
          "Karnam",
          "Konda",
          "Lakshmipuram",
          "Lingapuram",
          "Muddada",
          "Naguru",
          "Palem",
          "Patha Buddi",
          "Pulikonda",
          "Rajendrapuram",
          "Thallaburidi",
          "Yedurubilli",
        ],
        Srungavarapukota: [
          "Srungavarapukota",
          "Komatipalli",
          "Punyagiri",
          "Nagulapalli",
          "Gantyada",
          "Kancharam",
          "Palavalasa",
          "Penta",
          "Chintalavalasa",
          "Kothavalasa",
          "Konda",
          "Neeladripuram",
          "Pandrangi",
          "Pedaparti",
          "Rangampeta",
          "Regidi",
          "Sivaram",
          "Tadivalasa",
          "Tatipudi",
          "Vanakabadi",
          "Venkannapalem",
        ],
        Santhakaviti: [
          "Kesaripalli",
          "Lankapakala",
          "Santhakaviti",
          "Akkuru",
          "Bavanapadu",
          "Buddalavalasa",
          "Challavanipeta",
          "Chendurthi",
          "China Rajupeta",
          "Golla",
          "Gollapadu",
          "Gummalaxmipuram",
          "Ippalavalasa",
          "Jalapuvanipeta",
          "Kalavalapalli",
          "Kankatapalem",
          "Kondapeta",
          "Lingalavalasa",
          "Muddada",
          "Munjeru",
          "Murapaka",
          "Pavuluru",
          "Ravada",
          "Singannavalasa",
          "Thallabadra",
          "Tandavanipeta",
          "Turakapeta",
          "Vandavasi",
          "Venkatapuram",
          "Venkayyapeta",
        ],
        Lakkavarapukota: [
          "Annavaram",
          "Chittivalasa",
          "Gidijala",
          "Gollalapalem",
          "Gottipalle",
          "Juttada",
          "Kandivalasa",
          "Kanumukkalapalem",
          "Kappagaripeta",
          "Kondakarakam",
          "Korrapadu",
          "Kuravada",
          "Lingampeta",
          "Maddipalli",
          "Madugula",
          "Mallampeta",
          "Mandapaka",
          "Nellimarla",
          "Nimmalapadu",
          "Pedamajipalem",
          "Pedanadipalle",
          "Peddipalem",
          "Pendurthi",
          "Pinakota",
          "Potanavalasa",
          "Potarlapadu",
          "Purushothapuram",
          "Ravada",
          "Revupolavaram",
          "Sivaram",
          "Srungavarapukota",
          "Tallavalasa",
          "Tatipudi",
          "Tummikapalle",
          "Valmikipuram",
          "Varada",
          "Vemulavalasa",
          "Venkatapuram",
          "Venkayyapeta",
          "Vizianagaram",
          "Yellamanchili",
        ],
        Vepada: [
          "Vepada",
          "Latchayyapeta",
          "Cheemalapalle",
          "Chinapendyal",
          "Gumadam",
          "Jangampeta",
          "Kammavari",
          "Kancharam",
          "Kandukuru",
          "Kantipudi",
          "Kodapalli",
          "Kondapeta",
          "Mangalapuram",
          "Maredupalle",
          "Modavalasa",
          "Mukundapuram",
          "Mulapeta",
          "Palavalasa",
          "Pandurangapuram",
          "Parchuripeta",
          "Pinakapadu",
          "Polipalle",
          "Regidi",
          "Sivaram",
          "Tatipudi",
          "Thondrangi",
          "Vanakabadi",
          "Vellanki",
          "Vijayaramarajupeta",
          "Yerravaram",
        ],
        Rajam: [
          "Rajam",
          "Ajjaram",
          "Allampuram",
          "Amadalavalasa",
          "Amaravathi",
          "Andevaripalle",
          "Appalrajupeta",
          "Badam",
          "Balijapeta",
          "Bandapalli",
          "Bavanapadu",
          "Bheemunipatnam",
          "Bhimasingupuram",
          "Bobbili",
          "Bodapalem",
          "Bondapalle",
          "Chakipalle",
          "Cheepurupalli",
          "Chimalapadu",
          "China Budidi",
          "China Rajupeta",
          "Chinakamudu",
          "Dantuluri",
          "Devanapuram",
          "Donkinivalasa",
          "Edulapeta",
          "Gottipadu",
          "Gummalaxmipuram",
          "Gunapuram",
          "Gurla",
          "Jangampeta",
          "Kalikota",
          "Kesaripalli",
          "Khandipalle",
          "Komatipalli",
          "Kondakonda",
          "Kothapeta",
          "Kumili",
          "Lingapuram",
          "Maddipalle",
          "Maredupalle",
          "Marrivalasa",
          "Medapadu",
          "Munjeru",
          "Murapaka",
          "Nagulapalli",
          "Neeladripuram",
          "Nimmalapadu",
          "Nimmalapeta",
          "Ninnilapadu",
          "Pachipenta",
          "Palakonda",
          "Palavalasa",
          "Palem",
          "Pandrangi",
          "Pedaboddapadu",
          "Pedduru",
          "Pendyala",
          "Polipalle",
          "Regidi",
          "Rompalli",
          "Santhakaviti",
          "Sivaram",
          "Tatipudi",
          "Thallapalem",
          "Thummapeta",
          "Thummapudi",
          "Turakapeta",
          "Vadlapudi",
          "Vakalapudi",
          "Vanakabadi",
          "Varada",
          "Vepada",
          "Vijayaramarajupeta",
          "Vinayakapalle",
          "Vundrajavaram",
          "Yallavaram",
        ],
        Kothavalasa: [
          "Kothavalasa",
          "Kandivalasa",
          "Gollalapalem",
          "Maddipalle",
          "Revupolavaram",
          "Vaddadi",
          "Chinthalapeta",
          "Yellamanchili",
          "Srungavarapukota",
          "Kancharam",
          "Nellimarla",
          "Komatipalli",
          "Penta",
          "Pedaparti",
          "Tatipudi",
          "Palavalasa",
          "Vemulavalasa",
          "Venkatapuram",
          "Chintalavalasa",
          "Neeladripuram",
          "Tatipudi",
          "Palavalasa",
          "Maddipalli",
          "Ravada",
          "Vizianagaram",
          "Srungavarapukota",
          "Srungavarapukota",
        ],
        Bobbili: [
          "Bobbili",
          "Bobbili New Town",
          "Donkinivalasa",
          "Komatipalli",
          "Neeladripuram",
          "Neelakantapuram",
          "Nimmalapadu",
          "Palavalasa",
          "Peddipalem",
          "Polipalle",
          "Potarlapadu",
          "Sivaram",
          "Tatipudi",
          "Thondrangi",
          "Vallampatam",
          "Vemulavalasa",
          "Venkatapuram",
          "Vizianagaram",
          "Yallavaram",
          "Yerravaram",
        ],
        Bhogapuram: [
          "Amatam Ravivalasa",
          "Basavapalem",
          "Bhogapuram",
          "Chakivalasa",
          "Cherakupalle",
          "Gudepuvalasa",
          "Gudivada",
          "Jaggayyapeta",
          "Kancheru",
          "Kancherupalem",
          "Kavulavada",
          "Kongavanipalem",
          "Munjeru",
          "Nandigam",
          "Polipalle",
          "Rajapulova",
          "Ravada",
          "Savaravilli",
          "Subbannapeta @ Pilakavani Agraharam",
        ],
        Gantyada: [
          "Gantyada",
          "Adduru",
          "Anandapuram",
          "Burja",
          "Chinabuddidi",
          "Jaddetipalem",
          "Kandivalasa",
          "Kodapalli",
          "Kondagodumuru",
          "Konda",
          "Kondanagula",
          "Kondapeta",
          "Kottavalasa",
          "Laddavaram",
          "Mallampeta",
          "Nandigam",
          "Neeladripuram",
          "Panduru",
          "Pedamajipalem",
          "Pothinam",
          "Ravada",
          "Tandavanipeta",
          "Thondrangi",
          "Vellanki",
          "Vijayaramarajupeta",
          "Yellamanchili",
        ],
        Denkada: [
          "Denkada",
          "Akkupalli",
          "Alajangi",
          "Ammireddipalle",
          "Appalrajupeta",
          "Badangipeta",
          "Bandapalli",
          "Bheemunipatnam",
          "Bondapalle",
          "Burja",
          "Chakipalle",
          "Cheepurupalli",
          "Chendrayyapeta",
        ],
        Dattirajeru: [
          "Anandapuram",
          "Annamrajupeta",
          "Bayyada",
          "Bobbili Station",
          "Chilakalapadu",
          "Gangannapadu",
          "Gollalapalem",
          "Jamadam",
          "Kancharagorivalasa",
          "Karakam",
          "Kummarapalle",
          "Lakkidivalasa",
          "Laxmipuram",
          "Lingalapadu",
          "Madiwada",
        ],
        Garividi: [
          "Appannavalasa",
          "Arthamuru",
          "Avagudem",
          "Baguvalasa",
          "Bondapalle",
          "Burravarigollala Palem",
          "Chandapuram",
          "Chukkavalasa",
          "Devada",
          "Dummeda",
          "Gadabavalasa",
          "Gaddapuvalasa",
          "Gotnandi",
          "Itamvalasa",
          "Jagannadhapuram",
          "K. Palavalasa",
          "Kapusambham",
          "Konda Lakshmipuram",
          "Kondadadi",
          "Kondasambham",
          "Konuru",
          "Kumaram",
          "Mandiravalasa",
          "Mokhasaduggi Valasa",
          "Neeladripuram @ Surammapeta",
          "Regatiagraharam",
          "Seripeta",
          "Sivaram",
          "Sriramnagar (CT)",
          "Thatiguda",
          "Thondrangi",
          "Vedullavalasa",
          "Venkupatrunirega",
          "Vijayarampuram (Near) Kumaram",
          "Yenuguvalasa",
        ],
        Gurla: [
          "Anandapuram",
          "Chinthalapeta",
          "Chinthapallipeta",
          "Chodavaram",
          "Damarasingi",
          "Devunikanapaka",
          "Garida",
          "Garikavalasa",
          "Golagam",
          "Gorlapeta Jagannadhapuram",
          "Goshada",
          "Gudem",
          "Gujjangivalasa",
          "Gurla",
          "Jammu",
          "Kalavacherla",
          "Kella",
          "Kondagandredu",
          "Kotagandredu",
          "Lavidam",
          "Manyapuripeta",
          "Meesalapeta",
          "Nadupuru",
          "Nagallavalasa",
          "Nakkalapeta",
          "Nallacheruvu",
          "Pakeerukittali",
          "Palavalasa",
          "Palligantredu",
          "Pedabantupalle",
          "Penubharthi",
          "Polayavalasa",
          "Ragolu",
          "Sadanandapuram",
          "Solipisomarajupeta",
          "Thathavarikittali",
          "Thatipudi",
          "Thettangi",
          "Vallapuram",
        ],
      },
    },
    Srikakulam: {
      mandals: {
        Amadalavalasa: [
          "Tekkali",
          "Srikurmam",
          "Chilakapalem",
          "Voppangi",
          "Rajam",
          "Amadalavalasa",
          "Vajrapukothuru",
          "Polaki",
        ],
        Bhamini: [
          "Temburu",
          "Melasindhipattu",
          "Nagalanka",
          "Dondapadu",
          "Rayabheem",
          "Seethampeta",
          "Makkuva",
        ],
        Burja: [
          "Kadaka",
          "Nimmada",
          "Gara",
          "Pathapatnam",
          "Narayanapuram",
          "Etcherla",
          "Laveru",
          "Bonthu",
        ],
        Etcherla: [
          "Ramateertham",
          "Rajapuram",
          "Pathapatnam",
          "Palakonda",
          "Polaki",
          "Narayanapuram",
          "Pydibheemavaram",
          "Thotada",
        ],
        Gara: [
          "Ammavalasa",
          "Amudhuru",
          "Polaki",
          "Gara",
          "Mandasa",
          "Ranasthalam",
          "Vangara",
          "Laveru",
        ],
        Hiramandalam: [
          "Komatipalli",
          "Mandasa",
          "Budithi",
          "Kallada",
          "Regidi",
          "Santhabommali",
          "Vangara",
          "Ponduru",
        ],
        Ichchapuram: [
          "Ichapuram",
          "Kaviti",
          "Mandasa",
          "Sompeta",
          "Jalumuru",
          "Nandigam",
          "Kasibugga",
          "Meliaputti",
        ],
        Jalumuru: [
          "Budithi",
          "Kothuru",
          "Gara",
          "Jalumuru",
          "Narasannapeta",
          "Etcherla",
          "Laveru",
          "Polaki",
        ],
        Kanchili: [
          "Bavikeri",
          "Kanchili",
          "Kasibugga",
          "Mandasa",
          "Sompeta",
          "Nandigam",
          "Itchapuram",
          "Kaviti",
        ],
        Kaviti: [
          "Kaviti",
          "Sompeta",
          "Mandasa",
          "Kanchili",
          "Ichapuram",
          "Kasibugga",
          "Jalumuru",
          "Nandigam",
        ],
        Kotabommali: [
          "Kaviti",
          "Kasibugga",
          "Gara",
          "Etcherla",
          "Laveru",
          "Kotabommali",
          "Polaki",
          "Pathapatnam",
        ],
        Kothuru: [
          "Komatipalli",
          "Mandasa",
          "Bonthu",
          "Vangara",
          "Pathapatnam",
          "Ponduru",
          "Narayanapuram",
          "Polaki",
        ],
        Lakshminarsupeta: [
          "Regidi",
          "Santhabommali",
          "Kothuru",
          "Hiramandalam",
          "Saravakota",
          "Etcherla",
          "Palasa",
          "Polaki",
        ],
        Laveru: [
          "Laveru",
          "Amudalavalasa",
          "Srikakulam",
          "Etcherla",
          "Polaki",
          "Pathapatnam",
          "Palasa",
          "Santhabommali",
        ],
        Mandasa: [
          "Mandasa",
          "Santhabommali",
          "Kothuru",
          "Kasibugga",
          "Kaviti",
          "Pathapatnam",
          "Etcherla",
          "Laveru",
        ],
        Meliaputti: [
          "Meliaputti",
          "Mandasa",
          "Santhabommali",
          "Kanchili",
          "Sompeta",
          "Palasa",
          "Polaki",
          "Pathapatnam",
        ],
        Nandigam: [
          "Nandigam",
          "Kaviti",
          "Kanchili",
          "Sompeta",
          "Palasa",
          "Mandasa",
          "Pathapatnam",
          "Polaki",
        ],
        Narasannapeta: [
          "Narasannapeta",
          "Palakonda",
          "Gara",
          "Pathapatnam",
          "Polaki",
          "Srikakulam",
          "Rajam",
          "Amadalavalasa",
        ],
        Palakonda: [
          "Palakonda",
          "Rajam",
          "Srikakulam",
          "Amadalavalasa",
          "Pathapatnam",
          "Polaki",
          "Gara",
          "Narasannapeta",
        ],
        Palasa: [
          "Palasa",
          "Nandigam",
          "Sompeta",
          "Kanchili",
          "Kasibugga",
          "Kaviti",
          "Pathapatnam",
          "Polaki",
        ],
        Pathapatnam: [
          "Pathapatnam",
          "Narasannapeta",
          "Srikakulam",
          "Amadalavalasa",
          "Palasa",
          "Gara",
          "Nandigam",
          "Kotabommali",
        ],
        Polaki: [
          "Polaki",
          "Gara",
          "Etcherla",
          "Laveru",
          "Pathapatnam",
          "Amudalavalasa",
          "Kotabommali",
          "Palasa",
        ],
        Ponduru: [
          "Ponduru",
          "Srikakulam",
          "Amadalavalasa",
          "Laveru",
          "Pathapatnam",
          "Gara",
          "Kotabommali",
          "Polaki",
        ],
        Rajam: [
          "Rajam",
          "Amadalavalasa",
          "Srikakulam",
          "Palakonda",
          "Pathapatnam",
          "Polaki",
          "Narasannapeta",
          "Gara",
        ],
        Ranastalam: [
          "Ranastalam",
          "Srikakulam",
          "Etcherla",
          "Laveru",
          "Gara",
          "Amadalavalasa",
          "Kotabommali",
          "Polaki",
        ],
        RegidiAmadalavalasa: [
          "Regidi",
          "Santhabommali",
          "Hiramandalam",
          "Mandasa",
          "Saravakota",
          "Palasa",
          "Polaki",
          "Pathapatnam",
        ],
        Santhabommali: [
          "Santhabommali",
          "Mandasa",
          "Hiramandalam",
          "Etcherla",
          "Laveru",
          "Polaki",
          "Ponduru",
          "Palasa",
        ],
        Santhakaviti: [
          "Santhakaviti",
          "Saravakota",
          "Kotabommali",
          "Etcherla",
          "Laveru",
          "Santhabommali",
          "Palasa",
          "Pathapatnam",
        ],
        Saravakota: [
          "Saravakota",
          "Regidi",
          "Santhabommali",
          "Palasa",
          "Kotabommali",
          "Etcherla",
          "Pathapatnam",
          "Polaki",
        ],
        Sarubujjili: [
          "Sarubujjili",
          "Kotabommali",
          "Regidi",
          "Santhabommali",
          "Laveru",
          "Gara",
          "Polaki",
          "Pathapatnam",
        ],
        Seethampeta: [
          "Seethampeta",
          "Hiramandalam",
          "Mandasa",
          "Kothuru",
          "Kasibugga",
          "Kaviti",
          "Palasa",
          "Polaki",
        ],
        Sompeta: [
          "Sompeta",
          "Kanchili",
          "Kaviti",
          "Mandasa",
          "Kasibugga",
          "Palasa",
          "Pathapatnam",
          "Polaki",
        ],
        Srikakulam: [
          "Srikakulam",
          "Amadalavalasa",
          "Pathapatnam",
          "Palasa",
          "Polaki",
          "Narasannapeta",
          "Gara",
          "Rajam",
        ],
        Tekkali: [
          "Tekkali",
          "Srikurmam",
          "Chilakapalem",
          "Rajam",
          "Amadalavalasa",
          "Vajrapukothuru",
          "Polaki",
          "Gara",
        ],
        Vajrapukothuru: [
          "Vajrapukothuru",
          "Amadalavalasa",
          "Srikurmam",
          "Tekkali",
          "Chilakapalem",
          "Rajam",
          "Gara",
          "Polaki",
        ],
        Vangara: [
          "Vangara",
          "Kotabommali",
          "Etcherla",
          "Laveru",
          "Santhabommali",
          "Polaki",
          "Pathapatnam",
          "Ponduru",
        ],
        Veeraghattam: [
          "Veeraghattam",
          "Amadalavalasa",
          "Srikakulam",
          "Pathapatnam",
          "Polaki",
          "Kotabommali",
          "Gara",
          "Rajam",
        ],
      },
    },
  };

  const handleCheckboxChange = (values) => {
    setSelectedValues(values);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setMandals(Object.keys(districtData[value]?.mandals || {}));
    setSelectedMandal("");
    setVillages([]);
  };

  const handleMandalChange = (value) => {
    setSelectedMandal(value);
    setVillages(districtData[selectedDistrict]?.mandals[value] || []);
  };

  const landTypeHeadings = {
    dryland: ["Millets", "Grains", "Black Gram", "Red Gram"],
    wetland: ["Rice", "Wheat", "Paddy", "SugarCane", "Tobacco"],
    converted: ["Yes", "No"],
  };

  const handleLandTypeChange = (value) => {
    setSelectedLandType(value);
    setCheckboxHeadings(landTypeHeadings[value] || []);

    // Update the heading based on the selected land type
    if (value === "converted") {
      setHeadingLabel("Is this Land converted from any other Form?");
    } else {
      setHeadingLabel("Crops that can be cultivated:");
    }
  };
  const [addressDetails, setAddressDetails] = useState({
    country: "",
    state: "",
    district: "",
    mandal: "",
    village: "",
  });
  const handlePincodeChange1 = (value) => {
    setHasPincode(value);
  };

  const handlePincodeChange = async (e) => {
    const pincodeValue = e.target.value;
    setPincode(pincodeValue);

    if (pincodeValue.length === 6) {
      // Assuming pincode length is 6
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincodeValue}`
        );
        const postOffices = response.data[0].PostOffice;

        if (postOffices && postOffices.length > 0) {
          // Assuming that the first entry gives us the correct district and mandal.
          const district = postOffices[0].District;
          const mandal = postOffices[0].Block;

          setAddressDetails({
            district: district,
            mandal: mandal,
            // Village is not provided, so you may need to set it manually or exclude it.
          });
          console.log("address", addressDetails);
        } else {
          console.error("No PostOffice data found for the given pincode.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSizeChange = (data) => {
    setSize(data);
  };

  const handlePriceChange = (data) => {
    setPricePerAcre(data);
  };
  const handleSubmit = (values) => {
    console.log(values, "231");

    const ownerDetails = {
      ownerName: values.ownerName,
      phoneNumber: values.phoneNumber,
    };

    const address = {
      country: "India",
      state: "Andhra Pradesh",
      pinCode: values.pinCode,
      district: values.district,
      mandal: values.mandal,
      village: values.village,
    };

    const landDetails = {
      title: values.title,
      surveyNumber: values.surveyNumber,
      size: values.size,
      price: values.price,
      totalPrice: values.size * values.price,
      landType: values.landType,
      crops: selectedValues,
      litigation: values.litigation,
      images: [
        "https://example.com/images/land1.jpg",
        "https://example.com/images/land2.jpg",
      ],
    };

    const amenities = {
      boreWell: values.boreWell,
      electricity: values.electricity,
      distanceFromRoad: "200 meters",
      storageFacility: values.storageFacility,
    };

    const requestBody = {
      ownerDetails,
      landDetails,
      address,
      amenities,
    };

    // API endpoint and JWT token
    const apiUrl = "http://172.17.15.53:3000/fields/insert";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2Y2Y3MGJiNGY1OTI2NmJkMDM2NzkxZiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoxfSwiaWF0IjoxNzI0OTQ4OTcwLCJleHAiOjE3MjQ5NTI1NzB9.CmPdJczuUyhgToDItVTGzVvAbnLV0uPcmQjQjw383do";

    // Sending the POST request using fetch
    axios
      .post(apiUrl, requestBody, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle successful response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };

  return (
    <Card
      style={{ maxWidth: "50%", border: "1px solid black", margin: "auto" }}
    >
      <Form name="sectionedForm" layout="vertical" onFinish={handleSubmit}>
        <Card title="Owner Details" style={{ border: "1px solid #808080" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[
                { required: true, message: "Please input Owner Name" },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: "Owner Name should contain only alphabets",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contact No:"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input Contact Number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message:
                    "Contact number must be exactly 10 digits and contain only numbers",
                },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </div>
        </Card>
        <Divider />

        <Card title="Address" style={{ border: "1px solid #808080" }}>
          <Form.Item
            label="Does your Property have a Pincode?"
            rules={[
              {
                required: true,
                message: "Please select whether you have a Pincode or not?",
              },
            ]}
          >
            <Select placeholder="Select" onChange={handlePincodeChange1}>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>

          {hasPincode === "yes" && (
            <>
              <Form.Item label="Pincode" name="pinCode">
                <Input onChange={handlePincodeChange} />
              </Form.Item>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Item label="Country">
                  <Input defaultValue={"India"} readOnly />
                </Form.Item>
                <Form.Item label="State">
                  <Input defaultValue={"Andhra Pradesh"} readOnly />
                </Form.Item>
                <Form.Item label="District">
                  <Input value={addressDetails.district} readOnly />
                </Form.Item>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Item label="Mandal">
                  <Input value={addressDetails.mandal} readOnly />
                </Form.Item>
                <Form.Item
                  label="Village"
                  name="village"
                  rules={[
                    { required: true, message: "Please select your village" },
                  ]}
                >
                  <Select
                    placeholder="Select village"
                    style={{ width: "200px" }}
                  >
                    {villages.map((village) => (
                      <Option key={village} value={village}>
                        {village}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </>
          )}

          {hasPincode === "no" && (
            <>
              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Item label="Country" name="country">
                  <Input defaultValue="India" />
                </Form.Item>
                <Form.Item label="State" name="state">
                  <Input defaultValue="Andhra Pradesh" />
                </Form.Item>
                <Form.Item
                  label="District"
                  name="district"
                  rules={[
                    { required: true, message: "Please select your district" },
                  ]}
                >
                  <Select
                    placeholder="Select your district"
                    onChange={handleDistrictChange}
                  >
                    <Option value="Visakhapatnam">Visakhapatnam</Option>
                    <Option value="Vizianagaram">Vizianagaram</Option>
                    <Option value="Srikakulam">Srikakulam</Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Item
                  label="Mandal"
                  name="mandal"
                  rules={[
                    { required: true, message: "Please select your mandal" },
                  ]}
                >
                  <Select
                    placeholder="Select mandal"
                    value={selectedMandal}
                    onChange={handleMandalChange}
                    style={{ width: "200px" }}
                  >
                    {mandals.map((mandal) => (
                      <Option key={mandal} value={mandal}>
                        {mandal}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Village"
                  name="village"
                  rules={[
                    { required: true, message: "Please select your village" },
                  ]}
                >
                  <Select
                    placeholder="Select village"
                    style={{ width: "200px" }}
                  >
                    {villages.map((village) => (
                      <Option key={village} value={village}>
                        {village}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </>
          )}
        </Card>
        <Divider />

        <Card title="Land Details" style={{ border: "1px solid #808080" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <Form.Item
              label="Land Type"
              name="landType"
              rules={[
                { required: true, message: "Please select a land type!" },
              ]}
              style={{ width: "200px" }}
            >
              <Select
                placeholder="Select land type"
                onChange={handleLandTypeChange}
              >
                <Option value="dryland">Dryland</Option>
                <Option value="wetland">Wetland</Option>
                <Option value="converted">Converted Land</Option>
              </Select>
            </Form.Item>
            <Form.Item label={headingLabel}>
              <Checkbox.Group onChange={handleCheckboxChange}>
                {checkboxHeadings.map((heading, index) => (
                  <Checkbox key={index} value={heading}>
                    {heading}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Item
              label="Land Name"
              name="title"
              rules={[{ required: true, message: "Please input Land Name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Survey No:"
              name="surveyNumber"
              rules={[{ required: true, message: "Please input Survey No" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Item
              label="Size of Land"
              name="size"
              rules={[{ required: true, message: "0.1 acres to 1000 acres" }]}
            >
              <InputNumber
                type="number"
                placeholder="0.1 acres to 1000 acres"
                onChange={handleSizeChange}
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input price" }]}
            >
              <InputNumber
                type="number"
                placeholder="Enter price"
                onChange={handlePriceChange}
                addonAfter="/acre"
              />
            </Form.Item>
            <Form.Item label="Total Price">
              <Input value={size * pricePerAcre} readOnly />
            </Form.Item>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
            <Form.Item label="Upload Photo" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture">
                <Button style={{ width: "200px" }} icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="litigation"
              valuePropName="checked"
              style={{ marginTop: "30px" }}
            >
              <Checkbox>Litigation</Checkbox>
            </Form.Item>
          </div>
        </Card>
        <Divider />

        <Card title="Amenities" style={{ border: "1px solid #808080" }}>
          <div style={{ display: "flex", gap: "50px" }}>
            <Form.Item name="boreWell" valuePropName="checked">
              <Checkbox>Bore Facility</Checkbox>
            </Form.Item>
            <Form.Item name="electricity" valuePropName="checked">
              <Checkbox>Electricity Facility</Checkbox>
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <Form.Item
              label="Distance from road (or) Highway:"
              name="distanceFromRoad"
              rules={[{ required: true, message: "Please enter distance" }]}
            >
              <Input placeholder="Enter distance in Kms" />
            </Form.Item>
            <Form.Item
              name="storageFacility"
              valuePropName="checked"
              style={{ marginTop: "30px" }}
            >
              <Checkbox>Storage Facility</Checkbox>
            </Form.Item>
          </div>
        </Card>
        {/* Submit Button */}
        <Form.Item style={{ textAlign: "center", marginTop: "30px" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddProperty;
