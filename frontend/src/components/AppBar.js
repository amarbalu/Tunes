import React from "react";
import { Layout, Row, Col } from "antd";
import Navbarmenu from "./Navbarmenu";

const { Header } = Layout;
const AppBar =  (props)  => (WrappedComponent)=> {

      return class HOC extends React.Component{
        render(){
       
  return (
    <React.Fragment>
      <Header
        style={{
          position: "fixed",
          backgroundColor: props.title==="Homepage"?"#090909":"",
          width: "100%",
          top: "0",
          padding: "0 25px",
          height: "65px",
          zIndex: "1000",
        }}
      >
        <Row type="flex">
          <Col xs={19} md={17} lg={19} xl={21}>
            <div className="logo" style={{ display: "flex" }}>
              <img
                alt="music-logo"
                style={{ width: "40px", height: "40px", margin: "13px" }}
                src={`${process.env.PUBLIC_URL}/music_logo.png`}
              />
              <h3
                style={{
                  position: "relative",
                  color: "white",
                  fontFamily: "sans-serif",
                  margin: "15px 0",
                }}
              >
                Tunes
              </h3>
            </div>
          </Col>
          <Col xs={5} md={7} lg={5} xl={3}>
           <Navbarmenu title={props.title}/>
           
          </Col>
        </Row>
      </Header>
      <Row
        style={{
          height: "calc(100% - 70px)",
          top: "65px",
          position: "relative",
        }}
      >
        <WrappedComponent />
      </Row>
    </React.Fragment>
  );
      }
    }
  }
export default AppBar;
