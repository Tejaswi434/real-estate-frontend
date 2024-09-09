// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Layout, Card, Input } from "antd";
// import { UserOutlined, LogoutOutlined,SearchOutlined } from "@ant-design/icons";
// import LoginPage from "./LoginPage";
// import NewFooter from "./NewFooter";
// import defaultImages from "./defaultImages";
// import NewHeader from "./NewHeader";
// import "./Styles/LandingPage.css";
// import "./Styles/FooterStyle.css";
// const { Search } = Input;
// const { Meta } = Card;
// const { Content } = Layout;

// const LandingPage = () => {
//  const navigate = useNavigate();
//  const [isLoginVisible, setIsLoginVisible] = useState(false);
//  const [isSign,setIssign] = useState(true);
//  const [searchQuery, setSearchQuery] = useState("");
//  const [filteredImages, setFilteredImages] = useState(defaultImages);
//  const [getUrl, setGetUrl] = useState("");

//  const handleSearch = (value) => {
//  setSearchQuery(value);
//  filterImages(value);
//  };

//  const filterImages = (query) => {
//  const filtered = defaultImages.filter((item) =>
//  item.city.toLowerCase().includes(query.toLowerCase())
//  );
//  setFilteredImages(filtered);
//  };
//  const handleLoginClose = () => {
//  setIsLoginVisible(false);
//  };

//  return (
//  <>
//  <NewHeader setIsLoginVisible={setIsLoginVisible}/>
//  <Layout>
//  <LoginPage visible={isLoginVisible} handleLoginClose={handleLoginClose} />
//  <Content
//  style={{
//  marginTop: "64px",
//  }}
//  >
//  <div className="background">
//  <Search
//  style={{ marginTop: "160px", width: "25%", float: "right",marginRight:"40px" }}
//  placeholder="Search with cities"
//  allowClear
//  icon={SearchOutlined }
//  size="large"
//  className="landingSearch"
//  value={searchQuery}
//  onSearch={handleSearch}
//  onChange={(e) => handleSearch(e.target.value)}
//  />
//  </div>
//  <div className="cards-container">
//  {filteredImages.length > 0 ? (
//  filteredImages.map((item) => (
//  <Card
//  key={item.id}
//  hoverable
//  className="card-item"
//  cover={<img alt={item.city} src={item.url}
//  onClick={()=>{setIsLoginVisible(true)}}
//  />
//  }
//  >
//  <Meta
//  title={item.city}
//  description={
//  <div>
//  <p>
//  <strong></strong> {item.area}
//  </p>
//  <p>
//  <strong></strong> {item.price}
//  </p>
//  </div>
//  }
//  />
//  </Card>
//  ))
//  ) : (
//  <p>No results found</p>
//  )}
//  </div>
//  </Content>
//  </Layout>
//  <NewFooter/>
//  </>
//  );
// };

// export default LandingPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Card, Input } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import LoginPage from "./LoginPage";
import NewFooter from "./NewFooter";
import defaultImages from "./defaultImages";
import NewHeader from "./NewHeader";
import "./Styles/LandingPage.css";
import "./Styles/FooterStyle.css";
const { Search } = Input;
const { Meta } = Card;
const { Content } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSign, setIssign] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(defaultImages);
  const [getUrl, setGetUrl] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
    filterImages(value);
  };

  const filterImages = (query) => {
    const filtered = defaultImages.filter((item) =>
      item.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredImages(filtered);
  };
  const handleLoginClose = () => {
    setIsLoginVisible(false);
  };

  return (
    <>
      <NewHeader setIsLoginVisible={setIsLoginVisible} />
      <Layout>
        <LoginPage
          visible={isLoginVisible}
          handleLoginClose={handleLoginClose}
        />
        <Content
          style={{
            marginTop: "64px",
          }}
        >
           
          <div className="background">
          {/* <h1 style={{color:"white", font:"sans-sarif", fontWeight:'20px', textAlign:'center'}}>A better way to find your perfect place</h1> */}
            <Search
              style={{
                marginTop: "100px",
                width: "25%",
                marginLeft:"500px"
              }}
              placeholder="Search with cities"
              allowClear
              icon={SearchOutlined}
              size="large"
              className="landingSearch"
              value={searchQuery}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="cards-container">
            {filteredImages.length > 0 ? (
              filteredImages.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  className="card-item"
                  cover={
                    <img
                      alt={item.city}
                      src={item.url}
                      onClick={() => {
                        setIsLoginVisible(true);
                      }}
                    />
                  }
                >
                  <Meta
                    title={item.city}
                    description={
                      <div>
                        <p>
                          <strong></strong> {item.area}
                        </p>
                        <p>
                          <strong></strong> {item.price}
                        </p>
                      </div>
                    }
                  />
                </Card>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </Content>
      </Layout>
      <NewFooter />
    </>
  );
};

export default LandingPage;
