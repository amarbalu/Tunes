import React from "react";
import { Layout, Button, Row, Col, Icon } from "antd";
import {withRouter} from "react-router-dom"
import AppBar from "../components/AppBar";

const Homepage = (props) => {
  const {  Footer, Content } = Layout;
  return (
    <React.Fragment>
      <Content className="homepageContent">
        <Row
          type="flex"
          style={{ height: "calc(100% - 64px)", alignItems: "Center" }}
        >
          <Col
            xs={{ span: 21, offset: 3 }}
            md={{ span: 16, offset: 8 }}
            lg={{ span: 15, offset: 9 }}
            xl={{ span: 12, offset: 4 }}
          >
            <h1 style={{ color: "#fafafa", fontFamily: "sans-serif" }}>
              STAY TUNED...
            </h1>
            <Button
              style={{
                width: "270px",
                fontWeight: "bold",
                height: "60px",
                fontSize: "larger",
                borderRadius: "20px",
              }}
              onClick={() => {
                props.history.push("/loginpage");
              }}
            >
              Try it for free
            </Button>
          </Col>
        </Row>
      </Content>
      <Footer style={{ backgroundColor: "#090909" }}>
        <div
          style={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          <div>
            <Icon
              type="copyright"
              style={{ position: "relative", bottom: "3px" }}
            />
            <span>2020 Tunes</span>
          </div>
        </div>
      </Footer>
    </React.Fragment>
  );
};

export default AppBar({ title: "Homepage" })(withRouter(Homepage));
