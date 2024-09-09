// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Card,
//   Divider,
//   Select,
//   Switch,
//   Checkbox,
//   Upload,
//   InputNumber,
//   notification,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import UploadImage from "./Upload";
// const { Option } = Select;

// function AddProperty({ handleButtonClick }) {
//   const [size, setSize] = useState(0);
//   const [pricePerAcre, setPricePerAcre] = useState(0);
//   const [checkboxHeadings, setCheckboxHeadings] = useState([]);
//   const [hasPincode, setHasPincode] = useState("no");
//   const [selectedLandType, setSelectedLandType] = useState("");
//   const [headingLabel, setHeadingLabel] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedMandal, setSelectedMandal] = useState("");
//   const [mandals, setMandals] = useState([]);
//   const [villages, setVillages] = useState([]);
//   const [pincode, setPincode] = useState("");
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [tokenData, setTokenData] = useState(localStorage.getItem("token"));

//   // Sample data for districts, mandals, and villages
//   const districtData = {
//     Visakhapatnam: {
//       mandals: {
//         Anakapalle: [
//           "Anakapalle",
//           "Cheedikada",
//           "Devarapalle",
//           "Kondakarla",
//           "Munagapaka",
//           "Nakkapalle",
//           "Pendurthi",
//           "Payakaraopeta",
//           "Rambilli",
//           "Sabbavaram",
//           "Sarpavaram",
//           "Thummapala",
//           "Thummapala",
//           "Chodavaram",
//           "Pudimadaka",
//           "Anandapuram",
//         ],
//         Atchutapuram: [
//           "Akkireddipalem",
//           "Dopperla",
//           "Duvvada",
//           "Gajuwaka",
//           "Koruprolu",
//           "Paravada",
//           "Payakaraopeta",
//           "Ravada",
//           "Ravikamatham",
//           "Thallavalasa",
//           "Vennelapalem",
//           "Visakhapatnam City",
//           "Atchutapuram",
//           "Gidijala",
//           "Dopperla",
//           "Pudimadaka",
//         ],
//         Bheemunipatnam: [
//           "Bakkannapalem",
//           "Bheemunipatnam",
//           "Bheemili",
//           "Gollapudi",
//           "Jodugullapalem",
//           "Kapuluppada",
//           "Kondakarla",
//           "Madhurawada",
//           "Nidigattu",
//           "Rushikonda",
//           "Tagarapuvalasa",
//           "Yendada",
//         ],
//         Butchayyapeta: [
//           "Butchayyapeta",
//           "Chodavaram",
//           "Devarapalle",
//           "Gudem Kotha Veedhi",
//           "Kasimkota",
//           "Kotapadu",
//           "Madugula",
//           "Makavarapalem",
//           "Narsipatnam",
//           "Ravipalem",
//           "Saripalle",
//           "Tummapala",
//           "Vaddadi",
//         ],
//         Cheedikada: [
//           "Anakapalle",
//           "Cheedikada",
//           "Devarapalle",
//           "Gopalapatnam",
//           "Kasimkota",
//           "Madugula",
//           "Nakkapalle",
//           "Pendurthi",
//           "Sabbavaram",
//           "Yelamanchili",
//           "Visakhapatnam Rural",
//           "Gottipalle",
//           "Paderu",
//           "Anthakapalli",
//         ],
//         Chodavaram: [
//           "Anandapuram",
//           "Chodavaram",
//           "Devarapalle",
//           "Gopalapatnam",
//           "Kotapadu",
//           "Madugula",
//           "Pendurthi",
//           "Sabbavaram",
//           "Visakhapatnam City",
//           "Kothakota",
//           "Kattamuru",
//           "Paravada",
//           "Chodavaram",
//           "Pendurthi",
//         ],
//         Devarapalle: [
//           "Ayyannapeta",
//           "Butchayyapeta",
//           "Chodavaram",
//           "Devarapalle",
//           "Kasimkota",
//           "Makavarapalem",
//           "Nathavaram",
//           "Pedapalle",
//           "Pendurthi",
//           "Sabbavaram",
//           "Vommavaram",
//           "Visakhapatnam Rural",
//         ],
//         Gajuwaka: [
//           "Auto Nagar",
//           "Chinna Gantyada",
//           "Gajuwaka",
//           "Gajuwaka Rural",
//           "Kanithi",
//           "Marripalem",
//           "Mindi",
//           "Pedagantyada",
//           "Pedawaltair",
//           "Paravada",
//           "Visakhapatnam City",
//           "Vepagunta",
//         ],
//         Hukumpeta: [
//           "Ananthagiri",
//           "Araku",
//           "Bheemavaram",
//           "Chintapalle",
//           "Dumbriguda",
//           "Gollaprolu",
//           "Gudem Kotha Veedhi",
//           "Hukumpeta",
//           "Koduru",
//           "Makavarapalem",
//           "Paderu",
//           "Sitanagaram",
//           "Butchayyapeta",
//         ],
//         "K. Kotapadu": [
//           "Anandapuram",
//           "Chodavaram",
//           "Gajuwaka",
//           "Koppaka",
//           "Kotapadu",
//           "Nathavaram",
//           "Pendurthi",
//           "Sabbavaram",
//           "Visakhapatnam City",
//           "Bheemili",
//           "Gopalapatnam",
//           "Kasimkota",
//           "Nakkapalle",
//           "Anakapalle",
//         ],
//         Kasimkota: [
//           "Anakapalle",
//           "Bangarammapalem",
//           "Cheedikada",
//           "Devarapalle",
//           "Gajuwaka",
//           "Kasimkota",
//           "Koyyuru",
//           "Lankelapalem",
//           "Makavarapalem",
//           "Mettapalem",
//           "Nakkapalle",
//           "Pendurthi",
//           "Sabbavaram",
//         ],
//         Koyyuru: [
//           "Ananthagiri",
//           "Araku",
//           "Chintapalle",
//           "Gudem Kotha Veedhi",
//           "Koyyuru",
//           "Lakkavaram",
//           "Madugula",
//           "Makavarapalem",
//           "Nakkapalle",
//           "Payakaraopeta",
//           "Rachakonda",
//           "Yelamanchili",
//         ],
//         Madugula: [
//           "Butchayyapeta",
//           "Chintapalle",
//           "Devarapalle",
//           "Gudem Kotha Veedhi",
//           "Kasimkota",
//           "Koyyuru",
//           "Madugula",
//           "Makavarapalem",
//           "Narsipatnam",
//           "Pedakota",
//           "Rambilli",
//           "Sabbavaram",
//         ],
//         Makavarapalem: [
//           "Anakapalle",
//           "Cheedikada",
//           "Devarapalle",
//           "Gudem Kotha Veedhi",
//           "Kasimkota",
//           "Koyyuru",
//           "Madugula",
//           "Makavarapalem",
//           "Nakkapalle",
//           "Rambilli",
//           "Sabbavaram",
//           "Vemulapudi",
//           "Narsipatnam",
//         ],
//         Munagapaka: [
//           "Anakapalle",
//           "Cheedikada",
//           "Duvvada",
//           "Gajuwaka",
//           "Gopalapatnam",
//           "Kasimkota",
//           "Mindi",
//           "Munagapaka",
//           "Parawada",
//           "Pendurthi",
//           "Ravada",
//           "Sabbavaram",
//           "Sitanagaram",
//         ],
//         Nakkapalli: [
//           "Anakapalle",
//           "Cheedikada",
//           "Devarapalle",
//           "Gajuwaka",
//           "Kasimkota",
//           "Koyyuru",
//           "Makavarapalem",
//           "Nakkapalli",
//           "Payakaraopeta",
//           "Pendurthi",
//           "Ravikamatham",
//           "Sabbavaram",
//           "Visakhapatnam Rural",
//         ],
//         Narsipatnam: [
//           "Anakapalle",
//           "Araku",
//           "Chintapalle",
//           "Gudem Kotha Veedhi",
//           "Hukumpeta",
//           "Koyyuru",
//           "Makavarapalem",
//           "Narsipatnam",
//           "Narsipatnam Rural",
//           "Payakaraopeta",
//           "Venkatapuram",
//         ],
//         Paravada: [
//           "Anakapalle",
//           "Cheedikada",
//           "Duvvada",
//           "Edulapaka Bonangi",
//           "Gajuwaka",
//           "Gopalapatnam",
//           "Munagapaka",
//           "Paravada",
//           "Pedagantyada",
//           "Pendurthi",
//           "Sabbavaram",
//           "Thunglam",
//           "Vennelapalem",
//         ],
//         Pendurthi: [
//           "Anakapalle",
//           "Andandapuram",
//           "Auto Nagar",
//           "Gajuwaka",
//           "Gopalapatnam",
//           "Marripalem",
//           "Mindi",
//           "Paravada",
//           "Pendurthi",
//           "Sabbavaram",
//           "Visakhapatnam City",
//           "Vepagunta",
//           "Pedagantyada",
//         ],
//         Ravikamatham: [
//           "Anakapalle",
//           "Cheedikada",
//           "Devarapalle",
//           "Gajuwaka",
//           "Kasimkota",
//           "Kotauratla",
//           "Makavarapalem",
//           "Nakkapalle",
//           "Payakaraopeta",
//           "Pendurthi",
//           "Ravikamatham",
//           "Sabbavaram",
//           "Visakhapatnam Rural",
//         ],
//         Sabbavaram: [
//           "Anakapalle",
//           "Chodavaram",
//           "Devarapalle",
//           "Gajuwaka",
//           "Gopalapatnam",
//           "Kotapadu",
//           "Marripalem",
//           "Mindi",
//           "Pendurthi",
//           "Sabbavaram",
//           "Visakhapatnam Rural",
//           "Parawada",
//           "Duvvada",
//         ],
//         Yelamanchili: [
//           "Anakapalle",
//           "Cheedikada",
//           "Devarapalle",
//           "Gajuwaka",
//           "Koyyuru",
//           "Makavarapalem",
//           "Nakkapalle",
//           "Payakaraopeta",
//           "Pendurthi",
//           "Sabbavaram",
//           "Visakhapatnam City",
//           "Yelamanchili",
//         ],
//       },
//     },
//     Vizianagaram: {
//       mandals: {
//         Badangi: [
//           "Badangi",
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gurla",
//           "Jagannadhapuram",
//           "Kona",
//           "Kothavalasa",
//           "Palligumpu",
//           "Yelamanchili",
//         ],
//         Bhogapuram: [
//           "Bhogapuram",
//           "Jami",
//           "Munjeru",
//           "Kancheru",
//           "Korukonda",
//           "Lakkavarapu Kota",
//           "Makkavarapalem",
//           "Padmanabham",
//           "Pusapatirega",
//           "Ravikamatham",
//           "Srungavarapukota",
//           "Vepada",
//         ],
//         Cheepurupalli: [
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gummalakshmipuram",
//           "Gurla",
//           "Jami",
//           "Nellimarla",
//           "Parvathipuram",
//           "Rajam",
//           "S.Kota",
//           "Srungavarapukota",
//         ],
//         Dattirajeru: [
//           "Bobbili",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gurla",
//           "Jami",
//           "Nellimarla",
//           "Ramabhadrapuram",
//           "Srungavarapukota",
//           "Gummalakshmipuram",
//         ],
//         Gajapathinagaram: [
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Jami",
//           "Kurupam",
//           "Parvathipuram",
//           "Ramabhadrapuram",
//           "S.Kota",
//           "Srungavarapukota",
//           "Gurla",
//         ],
//         Garividi: [
//           "Bobbili",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gummalakshmipuram",
//           "Jami",
//           "S.Kota",
//           "Srungavarapukota",
//           "Gurla",
//           "Bondapalli",
//         ],
//         Gurla: [
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Gajapathinagaram",
//           "Garividi",
//           "Gurla",
//           "Jami",
//           "Kurupam",
//           "Parvathipuram",
//           "S.Kota",
//           "Bobbili",
//           "Srungavarapukota",
//         ],
//         Jami: [
//           "Bobbili",
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gurla",
//           "Jami",
//           "Kurupam",
//           "Parvathipuram",
//           "Ramabhadrapuram",
//           "S.Kota",
//         ],
//         Kothavalasa: [
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gurla",
//           "Jami",
//           "Kothavalasa",
//           "Pusapatirega",
//           "S.Kota",
//           "Srungavarapukota",
//           "Vepada",
//         ],
//         Merakamudidam: [
//           "Bobbili",
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gurla",
//           "Jami",
//           "Kurupam",
//           "Merakamudidam",
//           "Ramabhadrapuram",
//           "Srungavarapukota",
//         ],
//         Pusapatirega: [
//           "Bondapalli",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Gajapathinagaram",
//           "Garividi",
//           "Gurla",
//           "Jami",
//           "Kothavalasa",
//           "Pusapatirega",
//           "S.Kota",
//           "Srungavarapukota",
//           "Vepada",
//         ],
//         Ramabhadrapuram: [
//           "Bobbili",
//           "Cheepurupalli",
//           "Dattirajeru",
//           "Garividi",
//           "Gajapathinagaram",
//           "Gurla",
//           "Jami",
//           "Kurupam",
//           "Ramabhadrapuram",
//           "S.Kota",
//           "Srungavarapukota",
//         ],
//         Srungavarapukota: [
//           "Bondapalli",
//           "Cheepurupalli",
//           "Gajapathinagaram",
//           "Garividi",
//           "Jami",
//           "Kothavalasa",
//           "Pusapatirega",
//           "Ramabhadrapuram",
//           "S.Kota",
//           "Srungavarapukota",
//           "Gurla",
//           "Kurupam",
//         ],
//       },
//     },
//     Srikakulam: {
//       mandals: {
//         Amadalavalasa: [
//           "Amadalavalasa",
//           "Budumuru",
//           "Chinthapalli",
//           "Kallepalli",
//           "Paravada",
//           "Singupuram",
//           "Uddavolu",
//           "Vangara",
//         ],
//         Burja: [
//           "Allena",
//           "Baviri",
//           "Burja",
//           "Gujarathipeta",
//           "Mamidivalasa",
//           "Peddakota",
//           "Peddavalasa",
//           "Sangili",
//           "Seethampeta",
//           "Tirumala",
//           "Yerramukkam",
//         ],
//         Etcherla: [
//           "Etcherla",
//           "Garam",
//           "Gogulapadu",
//           "Kallepalli",
//           "Kusumapuram",
//           "Narsapuram",
//           "Naruva",
//           "Ramachandrapuram",
//           "Singupuram",
//           "Srikurmam",
//           "Thogiri",
//         ],
//         Ganguvarisigadam: [
//           "Chinnabadam",
//           "Datti",
//           "Ganguvarisigadam",
//           "Kotabommali",
//           "Narasannapeta",
//           "Nidamarru",
//           "Rajam",
//           "Seethampeta",
//           "Sundarapalli",
//           "Velpur",
//         ],
//         Gara: [
//           "Budumuru",
//           "Gara",
//           "Geddalapadu",
//           "Gopalapalli",
//           "Jalumuru",
//           "Kallepalli",
//           "Kaviti",
//           "Laveru",
//           "Narayanapuram",
//           "Ponduru",
//           "Gollavalasa",
//         ],
//         Hiramandalam: [
//           "Arapadu",
//           "Hiramandalam",
//           "Kothuru",
//           "Nadagam",
//           "Palakonda",
//           "Peda Gandada",
//           "Rajam",
//           "Singaravalli",
//           "Vallabhadrapuram",
//           "Vangara",
//         ],
//         Ichchapuram: [
//           "Burja",
//           "Ichchapuram",
//           "Kanchili",
//           "Kaviti",
//           "Kotturu",
//           "Meliaputti",
//           "Palasa",
//           "Sompeta",
//           "Seethampeta",
//         ],
//         Jalumuru: [
//           "Amadalavalasa",
//           "Etcherla",
//           "Jalumuru",
//           "Meliaputti",
//           "Narasannapeta",
//           "Polaki",
//           "Ponduru",
//           "Sompeta",
//           "Tekkali",
//         ],
//         Kanchili: [
//           "Hiramandalam",
//           "Ichchapuram",
//           "Jalumuru",
//           "Kanchili",
//           "Kotti",
//           "Meliaputti",
//           "Pathapatnam",
//           "Polaki",
//           "Sompeta",
//           "Vajrapukothuru",
//         ],
//         Kaviti: [
//           "Chinthapalli",
//           "Ichchapuram",
//           "Jalumuru",
//           "Kanchili",
//           "Kotti",
//           "Meliaputti",
//           "Kothuru",
//           "Narasannapeta",
//           "Pathapatnam",
//           "Polaki",
//           "Sompeta",
//         ],
//         Kotabommali: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Gara",
//           "Hiramandalam",
//           "Jalumuru",
//           "Kanchili",
//           "Kotabommali",
//           "Laveru",
//           "Palasa",
//           "Polaki",
//         ],
//         Kothuru: [
//           "Burja",
//           "Hiramandalam",
//           "Kothuru",
//           "Narasannapeta",
//           "Pathapatnam",
//           "Peda Gandada",
//           "Rajam",
//           "Seethampeta",
//           "Singaravalli",
//         ],
//         Laveru: [
//           "Amadalavalasa",
//           "Etcherla",
//           "Gara",
//           "Kotturu",
//           "Kotabommali",
//           "Laveru",
//           "Narasannapeta",
//           "Palasa",
//           "Sompeta",
//           "Srikurmam",
//         ],
//         Meliaputti: [
//           "Hiramandalam",
//           "Kanchili",
//           "Jalumuru",
//           "Meliaputti",
//           "Narasannapeta",
//           "Pathapatnam",
//           "Polaki",
//           "Sompeta",
//           "Tekkali",
//         ],
//         Nandigam: [
//           "Amadalavalasa",
//           "Etcherla",
//           "Jalumuru",
//           "Kotabommali",
//           "Laveru",
//           "Meliaputti",
//           "Nandigam",
//           "Narasannapeta",
//           "Palasa",
//           "Tekkali",
//         ],
//         Narasannapeta: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Ganguvarisigadam",
//           "Kotti",
//           "Kotabommali",
//           "Laveru",
//           "Narasannapeta",
//           "Pathapatnam",
//           "Polaki",
//           "Sompeta",
//         ],
//         Palasa: [
//           "Amadalavalasa",
//           "Ichchapuram",
//           "Kanchili",
//           "Jalumuru",
//           "Meliaputti",
//           "Nandigam",
//           "Palasa",
//           "Pathapatnam",
//           "Sompeta",
//           "Tekkali",
//         ],
//         Palakonda: [
//           "Burja",
//           "Hiramandalam",
//           "Kotturu",
//           "Palakonda",
//           "Regidi Amadalavalasa",
//           "Saravakota",
//           "Seethampeta",
//           "Singaravalli",
//           "Veeraghattam",
//         ],
//         Pathapatnam: [
//           "Hiramandalam",
//           "Kanchili",
//           "Kotturu",
//           "Palakonda",
//           "Pathapatnam",
//           "Polaki",
//           "Singaravalli",
//           "Meliaputti",
//           "Sompeta",
//         ],
//         Polaki: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Kanchili",
//           "Kotabommali",
//           "Laveru",
//           "Nandigam",
//           "Narasannapeta",
//           "Palasa",
//           "Sompeta",
//         ],
//         Ponduru: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Gara",
//           "Ganguvarisigadam",
//           "Kotabommali",
//           "Laveru",
//           "Ponduru",
//           "Polaki",
//           "Rajam",
//           "Sompeta",
//         ],
//         Rajam: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Ganguvarisigadam",
//           "Gara",
//           "Kotabommali",
//           "Laveru",
//           "Nandigam",
//           "Palasa",
//           "Ponduru",
//           "Sompeta",
//         ],
//         Ranastalam: [
//           "Etcherla",
//           "Gara",
//           "Kotabommali",
//           "Laveru",
//           "Narasannapeta",
//           "Palasa",
//           "Ponduru",
//           "Rajam",
//           "Sompeta",
//         ],
//         Santhakaviti: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Ganguvarisigadam",
//           "Kavati",
//           "Kotabommali",
//           "Narasannapeta",
//           "Palasa",
//           "Ponduru",
//         ],
//         Saravakota: [
//           "Burja",
//           "Hiramandalam",
//           "Kotturu",
//           "Palakonda",
//           "Regidi Amadalavalasa",
//           "Saravakota",
//           "Seethampeta",
//           "Singaravalli",
//           "Veeraghattam",
//         ],
//         Sarubujjili: [
//           "Amadalavalasa",
//           "Burja",
//           "Etcherla",
//           "Ganguvarisigadam",
//           "Kaviti",
//           "Kotabommali",
//           "Narasannapeta",
//           "Palasa",
//           "Polaki",
//           "Sompeta",
//         ],
//         Seethampeta: [
//           "Hiramandalam",
//           "Kasibugga",
//           "Kothuru",
//           "Mandasa",
//           "Palasa",
//           "Polaki",
//           "Seethampeta",
//         ],
//         Sompeta: [
//           "Kanchili",
//           "Kasibugga",
//           "Kaviti",
//           "Mandasa",
//           "Pathapatnam",
//           "Polaki",
//           "Sompeta",
//         ],
//         Srikakulam: [
//           "Amadalavalasa",
//           "Gara",
//           "Palasa",
//           "Pathapatnam",
//           "Polaki",
//           "Rajam",
//         ],
//         Tekkali: [
//           "Amadalavalasa",
//           "Chilakapalem",
//           "Gara",
//           "Polaki",
//           "Rajam",
//           "Srikurmam",
//           "Tekkali",
//           "Vajrapukothuru",
//         ],
//         Vajrapukothuru: [
//           "Amadalavalasa",
//           "Chilakapalem",
//           "Gara",
//           "Polaki",
//           "Rajam",
//           "Srikurmam",
//           "Tekkali",
//           "Vajrapukothuru",
//         ],
//         Vangara: [
//           "Etcherla",
//           "Kotabommali",
//           "Laveru",
//           "Pathapatnam",
//           "Polaki",
//           "Santhabommali",
//           "Vangara",
//         ],
//         Veeraghattam: [
//           "Amadalavalasa",
//           "Gara",
//           "Kotabommali",
//           "Pathapatnam",
//           "Polaki",
//           "Rajam",
//           "Srikakulam",
//           "Veeraghattam",
//         ],
//       },
//     },
//   };

//   const handleCheckboxChange = (values) => {
//     setSelectedValues(values);
//   };

//   const handleDistrictChange = (value) => {
//     setSelectedDistrict(value);
//     setMandals(Object.keys(districtData[value]?.mandals || {}));
//     setSelectedMandal("");
//     setVillages([]);
//   };

//   const handleMandalChange = (value) => {
//     setSelectedMandal(value);
//     setVillages(districtData[selectedDistrict]?.mandals[value] || []);
//   };

//   // const landTypeHeadings = {
//   //   dryland: ["Millets", "Grains", "Black Gram", "Red Gram"],
//   //   wetland: ["Rice", "Wheat", "Paddy", "SugarCane", "Tobacco"],
//   //   converted: ["Yes", "No"],
//   // };

//   // const handleLandTypeChange = (value) => {
//   //   setSelectedLandType(value);
//   //   setCheckboxHeadings(landTypeHeadings[value] || []);

//   // Update the heading based on the selected land type
//   //   if (value === "converted") {
//   //     setHeadingLabel("Is this Land converted from any other Form?");
//   //   } else {
//   //     setHeadingLabel("Crops that can be cultivated:");
//   //   }
//   // };
//   const [addressDetails, setAddressDetails] = useState({
//     country: "",
//     state: "",
//     district: "",
//     mandal: "",
//     village: "",
//   });
//   const handlePincodeChange1 = (checked) => {
//     const value = checked ? "yes" : "no";
//     setHasPincode(value); // Update the state with the "yes" or "no" value
//   };

//   const handlePincodeChange = async (e) => {
//     const pincodeValue = e.target.value;
//     setPincode(pincodeValue);

//     if (pincodeValue.length === 6) {
//       // Assuming pincode length is 6
//       try {
//         const response = await axios.get(
//           `https://api.postalpincode.in/pincode/${pincodeValue}`
//         );
//         const postOffices = response.data[0].PostOffice;

//         if (postOffices && postOffices.length > 0) {
//           // Assuming that the first entry gives us the correct district and mandal.
//           const district = postOffices[0].District;
//           const mandal = postOffices[0].Block;
//           const village = postOffices[0].Block;
//           setAddressDetails({
//             district: district,
//             mandal: mandal,
//             village: village,
//             // Village is not provided, so you may need to set it manually or exclude it.
//           });
//           console.log("address", addressDetails);
//         } else {
//           console.error("No PostOffice data found for the given pincode.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   const [imageUrl, setImageUrl] = useState("");

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     const url = await UploadImage(file);
//     setImageUrl(url);
//   };

//   const handleSizeChange = (data) => {
//     setSize(data);
//   };
//   const openNotification = (type, message, description) => {
//     notification[type]({
//       message: message,
//       description: description,
//       placement: "topRight",
//       duration: 3,
//     });
//   };

//   const handlePriceChange = (data) => {
//     setPricePerAcre(data);
//   };
//   const onFinish = (values) => {
//     console.log("hi");
//     console.log(values, "231");

//     const address = {
//       country: "India",
//       state: "Andhra Pradesh",
//       pinCode: values.pinCode,
//       district: values.district,
//       mandal: values.mandal,
//       village: values.village,
//     };

//     const requestBody = {
//       address,
//     };
//     console.log(requestBody);

//     // API endpoint and JWT token
//     const apiUrl = "http://172.17.15.53:3000/fields/insert";
//     // const token =
//     //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2Y2Y3MGJiNGY1OTI2NmJkMDM2NzkxZiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoxfSwiaWF0IjoxNzI1MDEyNDAwLCJleHAiOjE3MjUwMTYwMDB9.E4ZElY3VUaVv8daIXgiKpt_9x1WMUaY5qJwiHHc4yaQ";

//     // Sending the POST request using fetch
//     try {
//       axios.post(apiUrl, requestBody, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenData}`,
//         },
//       });
//       openNotification(
//         "success",
//         "Form submitted successfully!",
//         "Property added successfully"
//       );
//       handleButtonClick();
//       // Handle successful response
//     } catch (error) {
//       console.error("Error:", error);
//       openNotification("error", "error occured!");
//       // Handle errors
//     }
//   };

//   return (
//     <Card title="Address">
//       <Form.Item label="Does your Property have a Pincode?" name="pincode">
//         <Switch
//           checkedChildren="Yes"
//           unCheckedChildren="No"
//           onChange={handlePincodeChange1}
//         />
//       </Form.Item>

//       {hasPincode === "yes" && (
//         <>
//           <Form.Item label="Pincode" name="pinCode">
//             <Input onChange={handlePincodeChange} />
//           </Form.Item>
//           <div style={{ display: "flex", gap: "20px" }}>
//             <Form.Item label="Country">
//               <Input defaultValue={"India"} readOnly />
//             </Form.Item>
//             <Form.Item label="State">
//               <Input defaultValue={"Andhra Pradesh"} readOnly />
//             </Form.Item>
//             <Form.Item label="District">
//               <Input value={addressDetails.district} readOnly />
//             </Form.Item>
//           </div>
//           <div style={{ display: "flex", gap: "20px" }}>
//             <Form.Item label="Mandal">
//               <Input value={addressDetails.mandal} readOnly />
//             </Form.Item>
//             <Form.Item label="Village">
//               <Input value={addressDetails.village} readOnly />
//             </Form.Item>
//           </div>
//         </>
//       )}

//       {hasPincode === "no" && (
//         <>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <Form.Item label="Country" name="country">
//               <Input defaultValue="India" />
//             </Form.Item>
//             <Form.Item label="State" name="state">
//               <Input defaultValue="Andhra Pradesh" />
//             </Form.Item>
//             <Form.Item
//               label="District"
//               name="district"
//               rules={[
//                 { required: true, message: "Please select your district" },
//               ]}
//             >
//               <Select
//                 placeholder="Select your district"
//                 onChange={handleDistrictChange}
//               >
//                 <Option value="Visakhapatnam">Visakhapatnam</Option>
//                 <Option value="Vizianagaram">Vizianagaram</Option>
//                 <Option value="Srikakulam">Srikakulam</Option>
//               </Select>
//             </Form.Item>
//           </div>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <Form.Item
//               label="Mandal"
//               name="mandal"
//               rules={[{ required: true, message: "Please select your mandal" }]}
//             >
//               <Select
//                 placeholder="Select mandal"
//                 value={selectedMandal}
//                 onChange={handleMandalChange}
//                 style={{ width: "200px" }}
//               >
//                 {mandals.map((mandal) => (
//                   <Option key={mandal} value={mandal}>
//                     {mandal}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item
//               label="Village"
//               name="village"
//               rules={[
//                 { required: true, message: "Please select your village" },
//               ]}
//             >
//               <Select placeholder="Select village" style={{ width: "200px" }}>
//                 {villages.map((village) => (
//                   <Option key={village} value={village}>
//                     {village}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </div>
//         </>
//       )}
//     </Card>
//   );
// }

// export default AddProperty;



import React, { useState, useEffect } from 'react';
import { districtData } from './Data';
import { Card, Col, Form, Input, Row, Select, Switch } from 'antd';
import axios from 'axios';

const { Option } = Select;

function Address({ onAddressChange }) {
  const [hasPincode, setHasPincode] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [pincode, setPincode] = useState("");
  const [addressDetails, setAddressDetails] = useState({
    country: "India",
    state: "Andhra Pradesh",
    district: "",
    mandal: "",
    village: "",
  });

  useEffect(() => {
    if (areAllFieldsFilled()) {
      onAddressChange(addressDetails);
    }
  }, [addressDetails]);

  const handleDistrictChange = (value) => {
    console.log("District", value);
    setSelectedDistrict(value);
    setMandals(Object.keys(districtData[value]?.mandals || {}));
    setSelectedMandal("");
    setVillages([]);
    setAddressDetails((prev) => ({
      ...prev,
      district: value,
      mandal: "",
      village: "",
    }));
  };

  const handleMandalChange = (value) => {
    setSelectedMandal(value);
    setVillages(districtData[selectedDistrict]?.mandals[value] || []);
    setAddressDetails((prev) => ({
      ...prev,
      mandal: value,
      village: "",
    }));
  };

  const handlePincodeChange1 = (checked) => {
    setHasPincode(!checked);
    if (!checked) {
      setPincode("");
      setAddressDetails((prev) => ({
        ...prev,
        district: "",
        mandal: "",
        village: "",
      }));
    }
  };

  const handlePincodeChange = async (e) => {
    const pincodeValue = e.target.value;
    setPincode(pincodeValue);

    if (pincodeValue.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincodeValue}`
        );
        const postOffices = response.data[0].PostOffice;

        if (postOffices && postOffices.length > 0) {
          const district = postOffices[0].District;
          const mandal = postOffices[0].Block;
          const village = postOffices[0].Block; // Adjust as needed
          setAddressDetails((prev) => ({
            ...prev,
            district,
            mandal,
            village,
          }));
        } else {
          console.error("No PostOffice data found for the given pincode.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleVillageChange = (value) => {
    setAddressDetails((prev) => ({
      ...prev,
      village: value,
    }));
  };

  const areAllFieldsFilled = () => {
    const { district, mandal, village } = addressDetails;
    return district && mandal && village;
  };

  return (
    <Card
      title="Address"
      style={{
        marginBottom: "20px",
        marginBottom: "20px",
        border: "1px solid #808080",
        paddingLeft: "20px",
       
        
      }}
    >
      <Row gutter={16} style={{ marginBottom: "-18px" }}>
        <Col span={24}>
          <Form.Item
            label="Do you have a Pincode?"
            name="pincode"
            valuePropName="checked"
            labelCol={{ span: 6.5 }}
            wrapperCol={{ span: 24 }} 
           
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={true}
              onChange={handlePincodeChange1}
            />
          </Form.Item>
        </Col>
      </Row>
      {!hasPincode ? (
        <>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Form.Item label="Pincode" name="pinCode" rules={[
        {
          required: true,
          message: "Pincode is required",
        },
        {
          pattern: /^\d{6}$/,
          message: "Pincode must be exactly 6 digits",
        },
      ]} >
              <Input  
                value={pincode}
                onChange={handlePincodeChange}
                style={{
                  width: "70%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
                maxLength={6}/>
            </Form.Item>
          </Row>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Col span={12}>
              <Form.Item label="Country" name="country">
                <Input defaultValue="India" readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="State" name="state">
                <Input defaultValue="Andhra Pradesh" readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Col span={12}>
              <Form.Item label="District">
                <Input value={addressDetails.district} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mandal">
                <Input value={addressDetails.mandal} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Col span={12}>
              <Form.Item label="Village">
                <Input value={addressDetails.village} readOnly />
              </Form.Item>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Col span={12}>
              <Form.Item label="Country" name="country">
                <Input defaultValue="India" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="State" name="state">
                <Input defaultValue="Andhra Pradesh" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
                >
                  {mandals.map((mandal) => (
                    <Option key={mandal} value={mandal}>
                      {mandal}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "-18px" }}>
            <Col span={12}>
              <Form.Item
                label="Village"
                name="village"
                rules={[
                  { required: true, message: "Please select your village" },
                ]}
              >
                <Select
                  placeholder="Select village"
                  onChange={handleVillageChange}
                >
                  {villages.map((village) => (
                    <Option key={village} value={village}>
                      {village}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
}

export default Address;