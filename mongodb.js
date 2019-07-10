const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    dbConfig.url
    , {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


module.exports=mongoose;
// function App() {

//   return (
//     <div style={{height:"100%"}}>
//       <Header style={{  padding: 0,position: "fixed",
//     top:"0",
//     width: "100%",
//     zIndex: "1000" }} >
//     <Row type="flex" >
//       <Col xs={19} md={16} lg={18} xl={19} >
//       <div style={{width:"120px",height:"30px", background: "rgba(255, 255, 255, 0.2)", margin: "16px 28px 16px 28px"}} />
//       </Col>
//       <Col xs={5} md={8} lg={6} xl={5}>
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         defaultSelectedKeys={['2']}
//         style={{ lineHeight: '64px' }}
//       >
//         <Menu.Item key="1">nav 1</Menu.Item>
//         <Menu.Item key="2">nav 2</Menu.Item>
//         <Menu.Item key="3">nav 3</Menu.Item>
//       </Menu>
//       </Col>
//     </Row>
//     </Header>
//     <div style={{    height: "calc(100% - 64px)",
//     display: "flex",position:"relative",top:"64px"

// }}>
//       <div>
//     <Sider
//       breakpoint="xs"
//       collapsedWidth="0"
//       onBreakpoint={broken => {
//         console.log(broken);
//       }}
//       onCollapse={(collapsed, type) => {
//         console.log(collapsed, type);
//       }}
//       style={{height:"100%"
//       ,position:"fixed"
//       ,left:"0"
//     }}
//     >
//       <div className="logo" />
//       <Menu 
//       theme="dark"
//        mode="inline" defaultSelectedKeys={['4']}>
//         <Menu.Item key="1">
//           <Icon type="user" />
//           <span className="nav-text">nav 1</span>
//         </Menu.Item>
//         <Menu.Item key="2">
//           <Icon type="video-camera" />
//           <span className="nav-text">nav 2</span>
//         </Menu.Item>
//         <Menu.Item key="3">
//           <Icon type="upload" />
//           <span className="nav-text">nav 3</span>
//         </Menu.Item>
//         <Menu.Item key="4">
//           <Icon type="user" />
//           <span className="nav-text">nav 4</span>
//         </Menu.Item>
//       </Menu>
//     </Sider>
//     </div>
//     <div className="sidebar">
//       <Content style={{ margin: '24px 16px 0' }}>
//         <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
//         <div style={{height:"500px"}}>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>

//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>
//         <div>content</div>

//         </div>
//       </Content>
//       </div>
//     </div>
//       <Footer style={{ textAlign: 'center',position: "fixed",
//     width: "100%",
//     bottom: "0"}}>Ant Design ©2018 Created by Ant UED</Footer>
//   </div>
//   );
// }
// #root{
//   height:100%;
// }
// .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{
//   background-color: #4d688a !important;
// }
// .ant-menu-dark.ant-menu-inline .ant-menu-item::after, .ant-menu-dark.ant-menu-vertical .ant-menu-item::after, .ant-menu-dark.ant-menu-vertical-left .ant-menu-item::after, .ant-menu-dark.ant-menu-vertical-right .ant-menu-item::after{
//   background-color: #1890ff;
//     width: 5px
// }
// @media only screen and (min-width: 500px) {
//   .sidebar{
//     width:calc(100% - 200px);
// position: relative;
// left:200px;
//   }
// }
