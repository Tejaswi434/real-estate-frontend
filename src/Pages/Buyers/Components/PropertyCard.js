import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Modal,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  TimePicker,
  notification,
  Slider,
  Dropdown,
  Checkbox,
  Menu,
  Space,
  AutoComplete,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import Dumydata from "./Dumydata";
import AnimatedCard from "./AnimatedCard";

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const PropertyCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState([0, 20]);
  const [selectedSqft, setSelectedSqft] = useState([500, 2000]);
  const [wishlist, setWishlist] = useState([]);
  const [interested, setInterested] = useState([]);
  const [buyersData, setBuyersData] = useState();
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = (type) => {
    navigate(`/details/${type}`); // Navigate to the property details page with the type as a parameter
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [selectedType, selectedBudget, selectedSqft, selectedProperty]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(
        "http://172.17.10.34:3002/buyers/getbuyerdetails"
      );
      console.log(response.data, "Fetched data");

      if (Array.isArray(response.data)) {
        setSelectedProperty(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setSelectedProperty(response.data.data);
      } else {
        console.error("Unexpected data structure", response.data);
        setSelectedProperty([]);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching property details:", error);
    }
  };

  const onSearch = (value) => {
    if (!value) {
      setFilteredProperties(selectedProperty);
    } else {
      const filtered = selectedProperty.filter((property) =>
        property.Location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProperties(filtered);
      const suggestionList = selectedProperty
        .filter((property) =>
          property.Location.toLowerCase().includes(value.toLowerCase())
        )
        .map((property) => property.Location);
      setSuggestions([...new Set(suggestionList)]);
    }
  };

  const onSuggestionSelect = (value) => {
    const filtered = selectedProperty.filter((property) =>
      property.Location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const onFilterChange = (type) => {
    const updatedSelectedType = selectedType.includes(type)
      ? selectedType.filter((t) => t !== type)
      : [...selectedType, type];
    setSelectedType(updatedSelectedType);
  };

  const handleBudgetChange = (value) => {
    setSelectedBudget(value);
  };

  const handleSqftChange = (value) => {
    setSelectedSqft(value);
  };

  const filterProperties = () => {
    let filtered = selectedProperty;

    if (selectedType.length > 0) {
      filtered = filtered.filter((property) =>
        selectedType.includes(property.type)
      );
    }

    // if (selectedBudget.length > 0) {
    //   const [minBudget, maxBudget] = selectedBudget;
    //   filtered = filtered.filter(
    //     (property) => property.price >= minBudget && property.price <= maxBudget
    //   );
    // }

    // if (selectedSqft.length > 0) {
    //   const [minSqft, maxSqft] = selectedSqft;
    //   filtered = filtered.filter(
    //     (property) => property.sqft >= minSqft && property.sqft <= maxSqft
    //   );
    // }

    setFilteredProperties(filtered);
  };

  const typeMenu = (
    <Menu>
      {["Commercial", "Residential", "Agricultural"].map((type) => (
        <Menu.Item key={type}>
          <Checkbox
            checked={selectedType.includes(type)}
            onChange={() => onFilterChange(type)}
          >
            {type}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const priceMenu = (
    <Menu>
      {["5lakhs<", "10lakhs<", "1cr"].map((type) => (
        <Menu.Item key={type}>
          <Checkbox
            checked={selectedType.includes(type)}
            onChange={() => onFilterChange(type)}
          >
            {type}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const sqftMenu = (
    <Menu>
      {["500<", "700", "1000", "2000", "4000"].map((type) => (
        <Menu.Item key={type}>
          <Checkbox
            checked={selectedType.includes(type)}
            onChange={() => onFilterChange(type)}
          >
            {type}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Header />

      {/* Search Bar with Background Image */}
      <div
        style={{
          background:
            "url('https://photos.zillowstatic.com/fp/3fc5f4b82007aebabeeb5956e53cf553-p_e.webp') no-repeat center center",
          backgroundSize: "cover",
          padding: "80px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            flexDirection: "column",
          }}
        >
          <AutoComplete
            style={{ width: "60%", maxWidth: "500px", marginBottom: "20px" }}
            options={suggestions.map((suggestion) => ({
              value: suggestion,
            }))}
            onSelect={onSuggestionSelect}
            onSearch={onSearch}
            placeholder="Search properties by location"
          >
            <Input.Search enterButton="Search" size="large" />
          </AutoComplete>
          {/* <Dropdown overlay={typeMenu} placement="bottomLeft">
            <Button
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "#d9d9d9",
                color: "#595959",
              }}
            >
              Property Type
            </Button>
          </Dropdown> */}
          {/* <Dropdown overlay={sqftMenu} placement="bottomLeft">
            <Button
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "#d9d9d9",
                color: "#595959",
              }}
            >
              Sq.ft
            </Button>
          </Dropdown> */}
          {/* <Dropdown overlay={priceMenu} placement="bottomLeft">
            <Button
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "#d9d9d9",
                color: "#595959",
              }}
            >
              Price
            </Button>
          </Dropdown> */}
        </div>
      </div>

      {/* Animated Cards */}
      {/* <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <AnimatedCard
          title="Agricultural"
          imageUrl=""
          description="Explore agricultural properties"
          onClick={() => handleCardClick('Agricultural')} // Handle click event
        />
        <AnimatedCard
          title="Residential"
          imageUrl=""
          description="Find your dream residential property"
          onClick={() => handleCardClick('Residential')} // Handle click event
        />
        <AnimatedCard
          title="Commercial"
          imageUrl=""
          description="Discover our commercial spaces"
          onClick={() => handleCardClick('Commercial')} // Handle click event
        />
      </div> */}

      {/* Animated Cards */}
      {/* <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <AnimatedCard
          title="Agricultural"
          imageUrl="https://static.99acres.com/universalhp/img/d_hp_furnish_1.webp"
          description="Explore agricultural properties"
          onClick={() => handleCardClick('Agricultural')}
          
        />
        <AnimatedCard
          title="Residential"
          imageUrl="https://static.99acres.com/universalhp/img/d_hp_furnish_1.webp"
          description="Find your dream residential property"
           onClick={() => handleCardClick('Residential')}
        />
        <AnimatedCard
          title="Commercial"
          imageUrl="https://static.99acres.com/universalhp/img/d_hp_furnish_1.webp"
          description="Discover our commercial spaces"
          onClick={() => handleCardClick('Commercial')} 
        />
      </div> */}
      {/* Animated Cards */}
      {/* <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <AnimatedCard
          title="Furnished"
          imageUrl="https://static.99acres.com/universalhp/img/d_hp_furnish_1.webp"
        // description="Furnished"
        />
        <AnimatedCard
          title="Semifurnished"
          imageUrl="https://static.99acres.com/universalhp/img/d_hp_furnish_4.webp"
        // description="Semifurnished"
        />
        <AnimatedCard
          title="Unfurnished"
          imageUrl="https://static.99acres.com/universalhp/img/d_hp_furnish_2.webp"
        // description="Unfurnished"
        />
      </div> */}
      {/* Attractive Headline */}
      {/* <div
        style={{
          margin: "40px 0",
          padding: "20px",
          backgroundColor: "#f0f2f5",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#333",
            margin: "0",
            justifyContent: "center",
          }}
        >
          Discover Your Perfect Property: Agricultural, Residential, or Commercial
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            marginTop: "10px",
            lineHeight: "1.5",
          }}
        >
          Explore a diverse range of properties tailored to your needs. Whether you're looking for agricultural land, a cozy residential home, or a lucrative commercial space, we have something for everyone.
        </p>
      </div> */}

      {/* Property List */}
      <Dumydata
        properties={
          filteredProperties.length > 0 ? filteredProperties : selectedProperty
        }
      />
    </div>
  );
};

export default PropertyCard;
