import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Divider,
  Select,
  Switch,
  Checkbox,
  Row,
  Col,
  Upload,
  InputNumber,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import UploadImage from "./UploadImage";
const { Option } = Select;

function AddProperty({ setShowFormType }) {
  const [size, setSize] = useState(0);
  const [pricePerAcre, setPricePerAcre] = useState(0);
  const [checkboxHeadings, setCheckboxHeadings] = useState([]);
  const [hasPincode, setHasPincode] = useState("no");
  const [selectedLandType, setSelectedLandType] = useState("");
  const [headingLabel, setHeadingLabel] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [pincode, setPincode] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const [isLitigation, setIsLitigation] = useState(false);
  // Sample data for districts, mandals, and villages
  const districtData = {
    Visakhapatnam: {
      mandals: {
        Anakapalle: [
          "Anakapalle",
          "Cheedikada",
          "Devarapalle",
          "Kondakarla",
          "Munagapaka",
          "Nakkapalle",
          "Pendurthi",
          "Payakaraopeta",
          "Rambilli",
          "Sabbavaram",
          "Sarpavaram",
          "Thummapala",
          "Thummapala",
          "Chodavaram",
          "Pudimadaka",
          "Anandapuram",
        ],
        Atchutapuram: [
          "Akkireddipalem",
          "Dopperla",
          "Duvvada",
          "Gajuwaka",
          "Koruprolu",
          "Paravada",
          "Payakaraopeta",
          "Ravada",
          "Ravikamatham",
          "Thallavalasa",
          "Vennelapalem",
          "Visakhapatnam City",
          "Atchutapuram",
          "Gidijala",
          "Dopperla",
          "Pudimadaka",
        ],
        Bheemunipatnam: [
          "Bakkannapalem",
          "Bheemunipatnam",
          "Bheemili",
          "Gollapudi",
          "Jodugullapalem",
          "Kapuluppada",
          "Kondakarla",
          "Madhurawada",
          "Nidigattu",
          "Rushikonda",
          "Tagarapuvalasa",
          "Yendada",
        ],
        Butchayyapeta: [
          "Butchayyapeta",
          "Chodavaram",
          "Devarapalle",
          "Gudem Kotha Veedhi",
          "Kasimkota",
          "Kotapadu",
          "Madugula",
          "Makavarapalem",
          "Narsipatnam",
          "Ravipalem",
          "Saripalle",
          "Tummapala",
          "Vaddadi",
        ],
        Cheedikada: [
          "Anakapalle",
          "Cheedikada",
          "Devarapalle",
          "Gopalapatnam",
          "Kasimkota",
          "Madugula",
          "Nakkapalle",
          "Pendurthi",
          "Sabbavaram",
          "Yelamanchili",
          "Visakhapatnam Rural",
          "Gottipalle",
          "Paderu",
          "Anthakapalli",
        ],
        Chodavaram: [
          "Anandapuram",
          "Chodavaram",
          "Devarapalle",
          "Gopalapatnam",
          "Kotapadu",
          "Madugula",
          "Pendurthi",
          "Sabbavaram",
          "Visakhapatnam City",
          "Kothakota",
          "Kattamuru",
          "Paravada",
          "Chodavaram",
          "Pendurthi",
        ],
        Devarapalle: [
          "Ayyannapeta",
          "Butchayyapeta",
          "Chodavaram",
          "Devarapalle",
          "Kasimkota",
          "Makavarapalem",
          "Nathavaram",
          "Pedapalle",
          "Pendurthi",
          "Sabbavaram",
          "Vommavaram",
          "Visakhapatnam Rural",
        ],
        Gajuwaka: [
          "Auto Nagar",
          "Chinna Gantyada",
          "Gajuwaka",
          "Gajuwaka Rural",
          "Kanithi",
          "Marripalem",
          "Mindi",
          "Pedagantyada",
          "Pedawaltair",
          "Paravada",
          "Visakhapatnam City",
          "Vepagunta",
        ],
        Hukumpeta: [
          "Ananthagiri",
          "Araku",
          "Bheemavaram",
          "Chintapalle",
          "Dumbriguda",
          "Gollaprolu",
          "Gudem Kotha Veedhi",
          "Hukumpeta",
          "Koduru",
          "Makavarapalem",
          "Paderu",
          "Sitanagaram",
          "Butchayyapeta",
        ],
        "K. Kotapadu": [
          "Anandapuram",
          "Chodavaram",
          "Gajuwaka",
          "Koppaka",
          "Kotapadu",
          "Nathavaram",
          "Pendurthi",
          "Sabbavaram",
          "Visakhapatnam City",
          "Bheemili",
          "Gopalapatnam",
          "Kasimkota",
          "Nakkapalle",
          "Anakapalle",
        ],
        Kasimkota: [
          "Anakapalle",
          "Bangarammapalem",
          "Cheedikada",
          "Devarapalle",
          "Gajuwaka",
          "Kasimkota",
          "Koyyuru",
          "Lankelapalem",
          "Makavarapalem",
          "Mettapalem",
          "Nakkapalle",
          "Pendurthi",
          "Sabbavaram",
        ],
        Koyyuru: [
          "Ananthagiri",
          "Araku",
          "Chintapalle",
          "Gudem Kotha Veedhi",
          "Koyyuru",
          "Lakkavaram",
          "Madugula",
          "Makavarapalem",
          "Nakkapalle",
          "Payakaraopeta",
          "Rachakonda",
          "Yelamanchili",
        ],
        Madugula: [
          "Butchayyapeta",
          "Chintapalle",
          "Devarapalle",
          "Gudem Kotha Veedhi",
          "Kasimkota",
          "Koyyuru",
          "Madugula",
          "Makavarapalem",
          "Narsipatnam",
          "Pedakota",
          "Rambilli",
          "Sabbavaram",
        ],
        Makavarapalem: [
          "Anakapalle",
          "Cheedikada",
          "Devarapalle",
          "Gudem Kotha Veedhi",
          "Kasimkota",
          "Koyyuru",
          "Madugula",
          "Makavarapalem",
          "Nakkapalle",
          "Rambilli",
          "Sabbavaram",
          "Vemulapudi",
          "Narsipatnam",
        ],
        Munagapaka: [
          "Anakapalle",
          "Cheedikada",
          "Duvvada",
          "Gajuwaka",
          "Gopalapatnam",
          "Kasimkota",
          "Mindi",
          "Munagapaka",
          "Parawada",
          "Pendurthi",
          "Ravada",
          "Sabbavaram",
          "Sitanagaram",
        ],
        Nakkapalli: [
          "Anakapalle",
          "Cheedikada",
          "Devarapalle",
          "Gajuwaka",
          "Kasimkota",
          "Koyyuru",
          "Makavarapalem",
          "Nakkapalli",
          "Payakaraopeta",
          "Pendurthi",
          "Ravikamatham",
          "Sabbavaram",
          "Visakhapatnam Rural",
        ],
        Narsipatnam: [
          "Anakapalle",
          "Araku",
          "Chintapalle",
          "Gudem Kotha Veedhi",
          "Hukumpeta",
          "Koyyuru",
          "Makavarapalem",
          "Narsipatnam",
          "Narsipatnam Rural",
          "Payakaraopeta",
          "Venkatapuram",
        ],
        Paravada: [
          "Anakapalle",
          "Cheedikada",
          "Duvvada",
          "Edulapaka Bonangi",
          "Gajuwaka",
          "Gopalapatnam",
          "Munagapaka",
          "Paravada",
          "Pedagantyada",
          "Pendurthi",
          "Sabbavaram",
          "Thunglam",
          "Vennelapalem",
        ],
        Pendurthi: [
          "Anakapalle",
          "Andandapuram",
          "Auto Nagar",
          "Gajuwaka",
          "Gopalapatnam",
          "Marripalem",
          "Mindi",
          "Paravada",
          "Pendurthi",
          "Sabbavaram",
          "Visakhapatnam City",
          "Vepagunta",
          "Pedagantyada",
        ],
        Ravikamatham: [
          "Anakapalle",
          "Cheedikada",
          "Devarapalle",
          "Gajuwaka",
          "Kasimkota",
          "Kotauratla",
          "Makavarapalem",
          "Nakkapalle",
          "Payakaraopeta",
          "Pendurthi",
          "Ravikamatham",
          "Sabbavaram",
          "Visakhapatnam Rural",
        ],
        Sabbavaram: [
          "Anakapalle",
          "Chodavaram",
          "Devarapalle",
          "Gajuwaka",
          "Gopalapatnam",
          "Kotapadu",
          "Marripalem",
          "Mindi",
          "Pendurthi",
          "Sabbavaram",
          "Visakhapatnam Rural",
          "Parawada",
          "Duvvada",
        ],
        Yelamanchili: [
          "Anakapalle",
          "Cheedikada",
          "Devarapalle",
          "Gajuwaka",
          "Koyyuru",
          "Makavarapalem",
          "Nakkapalle",
          "Payakaraopeta",
          "Pendurthi",
          "Sabbavaram",
          "Visakhapatnam City",
          "Yelamanchili",
        ],
      },
    },
    Vizianagaram: {
      mandals: {
        Badangi: [
          "Badangi",
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gurla",
          "Jagannadhapuram",
          "Kona",
          "Kothavalasa",
          "Palligumpu",
          "Yelamanchili",
        ],
        Bhogapuram: [
          "Bhogapuram",
          "Jami",
          "Munjeru",
          "Kancheru",
          "Korukonda",
          "Lakkavarapu Kota",
          "Makkavarapalem",
          "Padmanabham",
          "Pusapatirega",
          "Ravikamatham",
          "Srungavarapukota",
          "Vepada",
        ],
        Cheepurupalli: [
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gummalakshmipuram",
          "Gurla",
          "Jami",
          "Nellimarla",
          "Parvathipuram",
          "Rajam",
          "S.Kota",
          "Srungavarapukota",
        ],
        Dattirajeru: [
          "Bobbili",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gurla",
          "Jami",
          "Nellimarla",
          "Ramabhadrapuram",
          "Srungavarapukota",
          "Gummalakshmipuram",
        ],
        Gajapathinagaram: [
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Jami",
          "Kurupam",
          "Parvathipuram",
          "Ramabhadrapuram",
          "S.Kota",
          "Srungavarapukota",
          "Gurla",
        ],
        Garividi: [
          "Bobbili",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gummalakshmipuram",
          "Jami",
          "S.Kota",
          "Srungavarapukota",
          "Gurla",
          "Bondapalli",
        ],
        Gurla: [
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Gajapathinagaram",
          "Garividi",
          "Gurla",
          "Jami",
          "Kurupam",
          "Parvathipuram",
          "S.Kota",
          "Bobbili",
          "Srungavarapukota",
        ],
        Jami: [
          "Bobbili",
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gurla",
          "Jami",
          "Kurupam",
          "Parvathipuram",
          "Ramabhadrapuram",
          "S.Kota",
        ],
        Kothavalasa: [
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gurla",
          "Jami",
          "Kothavalasa",
          "Pusapatirega",
          "S.Kota",
          "Srungavarapukota",
          "Vepada",
        ],
        Merakamudidam: [
          "Bobbili",
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gurla",
          "Jami",
          "Kurupam",
          "Merakamudidam",
          "Ramabhadrapuram",
          "Srungavarapukota",
        ],
        Pusapatirega: [
          "Bondapalli",
          "Cheepurupalli",
          "Dattirajeru",
          "Gajapathinagaram",
          "Garividi",
          "Gurla",
          "Jami",
          "Kothavalasa",
          "Pusapatirega",
          "S.Kota",
          "Srungavarapukota",
          "Vepada",
        ],
        Ramabhadrapuram: [
          "Bobbili",
          "Cheepurupalli",
          "Dattirajeru",
          "Garividi",
          "Gajapathinagaram",
          "Gurla",
          "Jami",
          "Kurupam",
          "Ramabhadrapuram",
          "S.Kota",
          "Srungavarapukota",
        ],
        Srungavarapukota: [
          "Bondapalli",
          "Cheepurupalli",
          "Gajapathinagaram",
          "Garividi",
          "Jami",
          "Kothavalasa",
          "Pusapatirega",
          "Ramabhadrapuram",
          "S.Kota",
          "Srungavarapukota",
          "Gurla",
          "Kurupam",
        ],
      },
    },
    Srikakulam: {
      mandals: {
        Amadalavalasa: [
          "Amadalavalasa",
          "Budumuru",
          "Chinthapalli",
          "Kallepalli",
          "Paravada",
          "Singupuram",
          "Uddavolu",
          "Vangara",
        ],
        Burja: [
          "Allena",
          "Baviri",
          "Burja",
          "Gujarathipeta",
          "Mamidivalasa",
          "Peddakota",
          "Peddavalasa",
          "Sangili",
          "Seethampeta",
          "Tirumala",
          "Yerramukkam",
        ],
        Etcherla: [
          "Etcherla",
          "Garam",
          "Gogulapadu",
          "Kallepalli",
          "Kusumapuram",
          "Narsapuram",
          "Naruva",
          "Ramachandrapuram",
          "Singupuram",
          "Srikurmam",
          "Thogiri",
        ],
        Ganguvarisigadam: [
          "Chinnabadam",
          "Datti",
          "Ganguvarisigadam",
          "Kotabommali",
          "Narasannapeta",
          "Nidamarru",
          "Rajam",
          "Seethampeta",
          "Sundarapalli",
          "Velpur",
        ],
        Gara: [
          "Budumuru",
          "Gara",
          "Geddalapadu",
          "Gopalapalli",
          "Jalumuru",
          "Kallepalli",
          "Kaviti",
          "Laveru",
          "Narayanapuram",
          "Ponduru",
          "Gollavalasa",
        ],
        Hiramandalam: [
          "Arapadu",
          "Hiramandalam",
          "Kothuru",
          "Nadagam",
          "Palakonda",
          "Peda Gandada",
          "Rajam",
          "Singaravalli",
          "Vallabhadrapuram",
          "Vangara",
        ],
        Ichchapuram: [
          "Burja",
          "Ichchapuram",
          "Kanchili",
          "Kaviti",
          "Kotturu",
          "Meliaputti",
          "Palasa",
          "Sompeta",
          "Seethampeta",
        ],
        Jalumuru: [
          "Amadalavalasa",
          "Etcherla",
          "Jalumuru",
          "Meliaputti",
          "Narasannapeta",
          "Polaki",
          "Ponduru",
          "Sompeta",
          "Tekkali",
        ],
        Kanchili: [
          "Hiramandalam",
          "Ichchapuram",
          "Jalumuru",
          "Kanchili",
          "Kotti",
          "Meliaputti",
          "Pathapatnam",
          "Polaki",
          "Sompeta",
          "Vajrapukothuru",
        ],
        Kaviti: [
          "Chinthapalli",
          "Ichchapuram",
          "Jalumuru",
          "Kanchili",
          "Kotti",
          "Meliaputti",
          "Kothuru",
          "Narasannapeta",
          "Pathapatnam",
          "Polaki",
          "Sompeta",
        ],
        Kotabommali: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Gara",
          "Hiramandalam",
          "Jalumuru",
          "Kanchili",
          "Kotabommali",
          "Laveru",
          "Palasa",
          "Polaki",
        ],
        Kothuru: [
          "Burja",
          "Hiramandalam",
          "Kothuru",
          "Narasannapeta",
          "Pathapatnam",
          "Peda Gandada",
          "Rajam",
          "Seethampeta",
          "Singaravalli",
        ],
        Laveru: [
          "Amadalavalasa",
          "Etcherla",
          "Gara",
          "Kotturu",
          "Kotabommali",
          "Laveru",
          "Narasannapeta",
          "Palasa",
          "Sompeta",
          "Srikurmam",
        ],
        Meliaputti: [
          "Hiramandalam",
          "Kanchili",
          "Jalumuru",
          "Meliaputti",
          "Narasannapeta",
          "Pathapatnam",
          "Polaki",
          "Sompeta",
          "Tekkali",
        ],
        Nandigam: [
          "Amadalavalasa",
          "Etcherla",
          "Jalumuru",
          "Kotabommali",
          "Laveru",
          "Meliaputti",
          "Nandigam",
          "Narasannapeta",
          "Palasa",
          "Tekkali",
        ],
        Narasannapeta: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Ganguvarisigadam",
          "Kotti",
          "Kotabommali",
          "Laveru",
          "Narasannapeta",
          "Pathapatnam",
          "Polaki",
          "Sompeta",
        ],
        Palasa: [
          "Amadalavalasa",
          "Ichchapuram",
          "Kanchili",
          "Jalumuru",
          "Meliaputti",
          "Nandigam",
          "Palasa",
          "Pathapatnam",
          "Sompeta",
          "Tekkali",
        ],
        Palakonda: [
          "Burja",
          "Hiramandalam",
          "Kotturu",
          "Palakonda",
          "Regidi Amadalavalasa",
          "Saravakota",
          "Seethampeta",
          "Singaravalli",
          "Veeraghattam",
        ],
        Pathapatnam: [
          "Hiramandalam",
          "Kanchili",
          "Kotturu",
          "Palakonda",
          "Pathapatnam",
          "Polaki",
          "Singaravalli",
          "Meliaputti",
          "Sompeta",
        ],
        Polaki: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Kanchili",
          "Kotabommali",
          "Laveru",
          "Nandigam",
          "Narasannapeta",
          "Palasa",
          "Sompeta",
        ],
        Ponduru: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Gara",
          "Ganguvarisigadam",
          "Kotabommali",
          "Laveru",
          "Ponduru",
          "Polaki",
          "Rajam",
          "Sompeta",
        ],
        Rajam: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Ganguvarisigadam",
          "Gara",
          "Kotabommali",
          "Laveru",
          "Nandigam",
          "Palasa",
          "Ponduru",
          "Sompeta",
        ],
        Ranastalam: [
          "Etcherla",
          "Gara",
          "Kotabommali",
          "Laveru",
          "Narasannapeta",
          "Palasa",
          "Ponduru",
          "Rajam",
          "Sompeta",
        ],
        Santhakaviti: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Ganguvarisigadam",
          "Kavati",
          "Kotabommali",
          "Narasannapeta",
          "Palasa",
          "Ponduru",
        ],
        Saravakota: [
          "Burja",
          "Hiramandalam",
          "Kotturu",
          "Palakonda",
          "Regidi Amadalavalasa",
          "Saravakota",
          "Seethampeta",
          "Singaravalli",
          "Veeraghattam",
        ],
        Sarubujjili: [
          "Amadalavalasa",
          "Burja",
          "Etcherla",
          "Ganguvarisigadam",
          "Kaviti",
          "Kotabommali",
          "Narasannapeta",
          "Palasa",
          "Polaki",
          "Sompeta",
        ],
        Seethampeta: [
          "Hiramandalam",
          "Kasibugga",
          "Kothuru",
          "Mandasa",
          "Palasa",
          "Polaki",
          "Seethampeta",
        ],
        Sompeta: [
          "Kanchili",
          "Kasibugga",
          "Kaviti",
          "Mandasa",
          "Pathapatnam",
          "Polaki",
          "Sompeta",
        ],
        Srikakulam: [
          "Amadalavalasa",
          "Gara",
          "Palasa",
          "Pathapatnam",
          "Polaki",
          "Rajam",
        ],
        Tekkali: [
          "Amadalavalasa",
          "Chilakapalem",
          "Gara",
          "Polaki",
          "Rajam",
          "Srikurmam",
          "Tekkali",
          "Vajrapukothuru",
        ],
        Vajrapukothuru: [
          "Amadalavalasa",
          "Chilakapalem",
          "Gara",
          "Polaki",
          "Rajam",
          "Srikurmam",
          "Tekkali",
          "Vajrapukothuru",
        ],
        Vangara: [
          "Etcherla",
          "Kotabommali",
          "Laveru",
          "Pathapatnam",
          "Polaki",
          "Santhabommali",
          "Vangara",
        ],
        Veeraghattam: [
          "Amadalavalasa",
          "Gara",
          "Kotabommali",
          "Pathapatnam",
          "Polaki",
          "Rajam",
          "Srikakulam",
          "Veeraghattam",
        ],
      },
    },
  };

  const handleCheckboxChange = (values) => {
    setSelectedValues(values);
  };
  const handleLitigation = (checked) => {
    setIsLitigation(checked);
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
  const handlePincodeChange1 = (checked) => {
    const value = checked ? "yes" : "no";
    setHasPincode(value); // Update the state with the "yes" or "no" value
  };
  const [imageUrls, setImageUrls] = useState([]);

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
          const village = postOffices[0].Block;
          setAddressDetails({
            district: district,
            mandal: mandal,
            village: village,
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

  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const url = await UploadImage(file);
    setImageUrls((prevUrls) => [...prevUrls, url]);
    console.log(imageUrls);
  };

  const handleSizeChange = (data) => {
    setSize(data);
  };
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
  };

  const handlePriceChange = (data) => {
    setPricePerAcre(data);
  };
  const uploadPics = [];
  imageUrls.forEach((imageUrl) => {
    uploadPics.push(imageUrl);
  });
  const onFinish = async (values) => {
    const ownerDetails = {
      ownerName: values.ownerName,
      phoneNumber: values.phoneNumber,
    };

    const address = {
      country: "India",
      state: "Andhra Pradesh",
      pinCode: values.pinCode,
      district: hasPincode ? addressDetails.district : values.district,
      mandal: hasPincode ? addressDetails.mandal : values.mandal,
      village: hasPincode ? addressDetails.village : values.village,
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
      litigationDesc: values.litigationDesc,
      images: uploadPics,
      propertyDesc: values.propertyDesc,
    };
    console.log(imageUrl);
    const amenities = {
      boreWell: values.boreWell,
      electricity: values.electricity,
      distanceFromRoad: values.distanceFromRoad,
      storageFacility: values.storageFacility,
    };

    const requestBody = {
      ownerDetails,
      landDetails,
      address,
      amenities,
    };
    const apiUrl = "http://172.17.15.53:3000/fields/insert";
    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        openNotification(
          "success",
          "Form submitted successfully!",
          "Property added successfully"
        );
        setShowFormType(null); // Perform the redirect or other actions
      } else {
        // Handle non-successful status codes
        openNotification(
          "error",
          `Submission failed: ${response.status}`,
          `Error: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error:", error);

      // Check if error response exists
      if (error.response) {
        // Server responded with a status code outside of the range of 2xx
        openNotification(
          "error",
          `Submission failed: ${error.response.status}`,
          `Error: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        openNotification(
          "error",
          "Network Error",
          "No response received from server. Please try again."
        );
      } else {
        // Something happened in setting up the request
        openNotification("error", "Error", error.message);
      }
    }
  };

  return (
    <Card
      style={{
        padding: "20px",
        maxWidth: "60%",
        border: "1px solid black",
        margin: "auto",
      }}
    >
      <Form name="sectionedForm" layout="vertical" onFinish={onFinish}>
        <Card
          title="Owner Details"
          style={{
            border: "1px solid #808080",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
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
          <div>
            <Row>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>Any Disputes?</span>
                <Form.Item
                  name="litigation"
                  valuePropName="checked"
                  style={{ margin: 0 }}
                >
                  <Switch
                    onChange={handleLitigation}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </Form.Item>
              </div>
            </Row>
            {isLitigation && (
              <Form.Item
                label="Please provide Details about Dispute?"
                name="litigationDesc"
              >
                <Input placeholder="please provide details about dispute" />
              </Form.Item>
            )}
          </div>
        </Card>

        <Card
          title="Address"
          style={{
            border: "1px solid #808080",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <Form.Item>
            <Row align="middle">
              <Col>
                <span>Does your Property have a Pincode?</span>
              </Col>
              <Col>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  onChange={handlePincodeChange1}
                  style={{ marginLeft: "10px" }} // Adjust margin as needed
                />
              </Col>
            </Row>
          </Form.Item>

          {hasPincode === "yes" && (
            <>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Item label="Pincode" name="pinCode">
                  <Input onChange={handlePincodeChange} />
                </Form.Item>
                <Form.Item label="Country" name="country">
                  <Input defaultValue={"India"} readOnly />
                </Form.Item>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Item label="State" name="state">
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
                <Form.Item label="Village">
                  <Input value={addressDetails.village} readOnly />
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
              <div style={{ display: "flex", gap: "10px" }}>
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

        <Card
          title="Land Details"
          style={{
            border: "1px solid #808080",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
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
                <Option value="dryland">Dry land</Option>
                <Option value="wetland">Wet land</Option>
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
          <Form.Item
            label="Land Description:"
            name="propertyDesc"
            rules={[{ required: true, message: "Please input Land Name" }]}
          >
            <Input placeholder="give detail description about land" />
          </Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Item
              label="Land Name"
              name="title"
              rules={[
                { required: true, message: "Please input Land Name" },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: " Name should contain only alphabets",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Survey No:"
              name="surveyNumber"
              rules={[
                {
                  required: true,
                  message: "Please input Survey No",
                },
                {
                  pattern: /^\d{3}-\d[a-zA-Z]\d$/,
                  message: "Survey No must be in the format 123-4g6",
                },
              ]}
            >
              <Input maxLength={7} />
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
                style={{ width: "150px" }}
                min={1} // Minimum value allowed
                max={1000} // Optional: Maximum value allowed
                step={1} // Optional: Increment by 0.1
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
                style={{ width: "150px" }}
                min={1} // Minimum value allowed
                max={1000} // Optional: Maximum value allowed
                step={1}
                addonAfter="/acre"
              />
            </Form.Item>
            <Form.Item label="Total Price">
              <Input value={size * pricePerAcre} addonAfter="₹" readOnly />
            </Form.Item>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
            <div>
              {/* <input type="file" onChange={handleImageUpload} />
    {imageUrl && (
    <div>
    <p>Image uploaded successfully!</p>
    <img
    src={imageUrl}
    alt="Uploaded"
    style={{ maxWidth: "300px" }}
    />
    </div>
    )} */}
              <Row gutter={16} style={{ marginBottom: "-18px" }}>
                {imageUrls.map((url, index) => (
                  <Col span={8} key={index} style={{ marginBottom: "16px" }}>
                    <img
                      src={url}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                ))}
                <Col span={8}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="upload-input"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="upload-input">
                    <input type="file" onChange={handleImageUpload} />
                    {imageUrls.length > 0 && (
                      <div>
                        <p>Image uploaded successfully!</p>
                      </div>
                    )}
                  </label>
                </Col>
              </Row>
            </div>
          </div>
        </Card>

        <Card
          title="Amenities"
          style={{ border: "1px solid #808080", padding: "20px" }}
        >
          <Row gutter={16} style={{ marginBottom: "18px" }}>
            <Col span={8}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "5px" }}>Electricity Facility</span>
                <Form.Item
                  name="electricity"
                  valuePropName="checked"
                  style={{ margin: 0 }}
                >
                  <Switch defaultChecked={false} size="small" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>Bore Facility</span>
                <Form.Item
                  name="boreWell"
                  valuePropName="checked"
                  style={{ margin: 0 }}
                >
                  <Switch defaultChecked={false} size="small" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>Storage Facility</span>
                <Form.Item
                  name="storageFacility"
                  valuePropName="checked"
                  style={{ margin: 0 }}
                >
                  <Switch defaultChecked={false} size="small" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <div style={{ display: "flex", gap: "30px" }}>
            <Form.Item
              label="Distance from road (or) Highway:"
              name="distanceFromRoad"
              rules={[
                { required: true, message: "Please enter distance" },
                {
                  pattern: /^\d+$/,
                  message: "Kilometers should be in digits",
                },
              ]}
            >
              <Input placeholder="Enter distance in Kms" addonAfter="/kms" />
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
