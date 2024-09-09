import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Card } from "antd";

function MapComponent(props) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Card title="Location" style={{ height: "500px" }}>
        <Map
          google={props.google}
          style={{ width: "95%", height: "80%" }}
          zoom={10}
          initialCenter={{
            lat: 18.030655,
            lng: 83.49369,
          }}
        />
      </Card>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapComponent);
