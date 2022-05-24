import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import University from './University/University';
import College from './College/College';
import CollegeRequests from './College/CollegeRequests';
import Major from './Major/Major';
import MajorRequests from './Major/MajorRequests';
import Professor from './Professor/Professor';
import ProfessorRequests from './Professor/ProfessorRequests';
import ProfessorComment from './Professor/ProfessorComments/ProfessorComment';
import CommentRequests from './Professor/ProfessorComments/CommentRequests';
import Subject from './Subject/Subject';
import SubjectRequests from './Subject/SubjectRequests';
import SubjectDoument from './Subject/SubjectDocument/SubjectDocument';
import SubjectComment from './Subject/SubjectComments/SubjectComment';
import Books from './Books/Books';
import BookRequests from './Books/BookRequests';
import Services from './Services/Services';
import ServiceRequests from './Services/ServiceRequests';
import Class from './ClassRoom/Class';
import ClassRequests from './ClassRoom/ClassRequests';
import Chat from './UserChats/Chat';
import Notifications from './Notifications/Notifications';
import Block from './Block/Block';
import Spam from './Spam/Spam';
import Dashboard from './Dashboard';
import AppConfig from './AppConfig/AppConfig';
import logo from '../assests/logo.png'
import appData from '../assests/appData.svg';
import home from '../assests/home.svg';
import dashboard from '../assests/dashboard.svg';
import appConfig from '../assests/appConfig.svg';
import university from '../assests/university.svg';
import college from '../assests/college.svg';
import major from '../assests/major.svg';
import professor from '../assests/professor.svg';
import professorData from '../assests/professorData.svg';
import professorComments from '../assests/professorComments.svg';
import subject from '../assests/subject.svg';
import subjectDocument from '../assests/subjectDocument.svg';
import subjectComment from '../assests/subjectComment.svg';
import book from '../assests/book.svg';
import bookData from '../assests/bookData.svg';
import service from '../assests/service.svg';
import servicesData from '../assests/servicesData.svg';
import classroom from '../assests/classroom.svg';
import chat from '../assests/chat.svg';
import appStats from '../assests/appStats.svg';
import notification from '../assests/notification.svg';
import user from '../assests/user.svg';
import spam from '../assests/spam.svg';
import mobileNative from '../assests/mobileNative.svg';
import PopupAd from './NativeAds/PopupAd';
import SimpleAd from './NativeAds/SimpleAd';
import SliderAd from './NativeAds/SliderAd';
import Profile from './Profile/Profile';
import SubjectDocumentRequests from './Subject/SubjectDocument/SubjectDocumentRequests';
import SubjectCommentRequests from './Subject/SubjectComments/SubjectCommentRequests';
import BookPostPrice from './BookPostPrices/BookPostPrice';
import ServicePostPrice from './ServicePostPrices/ServicePostPrice';
import AllColleges from './College/AllColleges';
import AllMajors from './Major/AllMajors';
import AllProfessors from './Professor/AllProfessors';
import AllSubjects from './Subject/AllSubjects';
import AllUniversities from './University/AllUniversities';
import AllBooks from './Books/AllBooks';
const { Header, Sider } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onLogout = () => {
    localStorage.clear()
    this.setState({
      logout: true
    })

  }

  render() {
    return (
      // <React.Fragment>
      <Layout className="h-100 ">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={250}>

          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['dashboard']}
            style={{ height: '100%' }}
          >
            <div className="profile">
              <img src={logo} alt="" />
              <p className="text-center mb-0 font23 padding30px" style={{ fontWeight: "700" }} >Admin </p>
            </div>
            <SubMenu key="home" icon={<img src={home} alt="" className="icons"></img>} title="Home">
              <NavLink to="/dashboard" className="ant-menu-item ant-menu-item-only-child " >
                <Menu.Item icon={<img src={dashboard} alt="" className="icons"></img>} key="dashboard">
                  Dashboard
                </Menu.Item>
              </NavLink>
              <NavLink to="/config" className="ant-menu-item ant-menu-item-only-child " >
                <Menu.Item icon={<img src={appConfig} alt="" className="icons"></img>}>
                  App Configuration
                </Menu.Item>
              </NavLink>
            </SubMenu>

            <SubMenu key="sub1" icon={<img src={appData} alt="" className="icons"></img>} title="App Data Management">

              <SubMenu key="University" icon={<img src={college} alt="" className="icons"></img>} title="University">
                <NavLink to="/university" className="ant-menu-item ant-menu-item-only-child " >
                  <Menu.Item key="1" icon={<img src={university} alt="" className="icons"></img>}>
                    Add Univeristy
                  </Menu.Item>
                </NavLink>

                <NavLink to="/alluniversities" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="211" icon={<img src={college} alt="" className="icons"></img>}>
                    All Univeristies
                  </Menu.Item>
                </NavLink>
              </SubMenu>

              <SubMenu key="College" icon={<img src={college} alt="" className="icons"></img>} title="College">
                <NavLink to="/college" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="2" icon={<img src={college} alt="" className="icons"></img>}>
                    Add College
                  </Menu.Item>
                </NavLink>

                <NavLink to="/allcolleges" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="211" icon={<img src={college} alt="" className="icons"></img>}>
                    All Colleges
                  </Menu.Item>
                </NavLink>
              </SubMenu>

              <SubMenu key="Major" icon={<img src={college} alt="" className="icons"></img>} title="Major">
                <NavLink to="/major" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="3" icon={<img src={major} alt="" className="icons"></img>}>
                    Add Major
                  </Menu.Item>
                </NavLink>

                <NavLink to="/allmajors" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="2" icon={<img src={major} alt="" className="icons"></img>}>
                    All Majors
                  </Menu.Item>
                </NavLink>
              </SubMenu>
              <SubMenu key="Professor" icon={<img src={professor} alt="" className="icons"></img>} title="Professor">
                <NavLink to="/professor" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="4" icon={<img src={professorData} alt="" className="icons"></img>}>
                    Add Professor
                  </Menu.Item>
                </NavLink>
                <NavLink to="/allprofessors" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="41" icon={<img src={professorData} alt="" className="icons"></img>}>
                    All Professors
                  </Menu.Item>
                </NavLink>

                <NavLink to="/professorcomment" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="5" icon={<img src={professorComments} alt="" className="icons"></img>}>
                    Professor Comments Data
                  </Menu.Item>
                </NavLink>
              </SubMenu>

              <SubMenu key="Subject" icon={<img src={subject} alt="" className="icons"></img>} title="Subject">
                <NavLink to="/subject" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="6" icon={<img src={subject} alt="" className="icons"></img>}>
                    Add Subject
                  </Menu.Item>
                </NavLink>
                <NavLink to="/allsubjects" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="61" icon={<img src={subject} alt="" className="icons"></img>}>
                    All Subjects
                  </Menu.Item>
                </NavLink>
                <NavLink to="/subjectdocument" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="7" icon={<img src={subjectDocument} alt="" className="icons"></img>}>
                    Subject Document Data
                  </Menu.Item>
                </NavLink>

                <NavLink to="/Subjectcomments" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="8" icon={<img src={subjectComment} alt="" className="icons"></img>}>
                    Subject Comments Data
                  </Menu.Item>
                </NavLink>
              </SubMenu>

              {/* <SubMenu key="Book" icon={<img src={book} alt="" className="icons"></img>} title="Book">
                  <NavLink to="/books" className="ant-menu-item ant-menu-item-only-child ">
                    <Menu.Item key="9" icon={<img src={bookData} alt="" className="icons"></img>}>
                      Books Data
                    </Menu.Item>
                  </NavLink>
                </SubMenu> */}

              <SubMenu key="Book" icon={<img src={book} alt="" className="icons"></img>} title="Books">
                <NavLink to="/books" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="9" icon={<img src={bookData} alt="" className="icons"></img>}>
                    Add Book Post
                  </Menu.Item>
                </NavLink>

                <NavLink to="/allbooks" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="224" icon={<img src={college} alt="" className="icons"></img>}>
                    All Book Posts
                  </Menu.Item>
                </NavLink>

                <NavLink to="/bookrequests" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="224" icon={<img src={college} alt="" className="icons"></img>}>
                    Book Post Requets
                  </Menu.Item>
                </NavLink>
              </SubMenu>
              <SubMenu key="Services" icon={<img src={service} alt="" className="icons"></img>} title="Services">
                <NavLink to="/services" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="10" icon={<img src={servicesData} alt="" className="icons"></img>}>
                    Services Data
                  </Menu.Item>
                </NavLink>
              </SubMenu>

              <NavLink to="/classroom" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="11" icon={<img src={classroom} alt="" className="icons"></img>}>
                  Classroom Data
                </Menu.Item>
              </NavLink>
              <NavLink to="/chats" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="12" icon={<img src={chat} alt="" className="icons"></img>}>
                  User Chats Monitors
                </Menu.Item>
              </NavLink>
            </SubMenu>
            <SubMenu key="sub2" icon={<img src={appStats} alt="" className="icons"></img>} title="App Statistics and Operations">
              <NavLink to="/bookprice" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="13" icon={<img src={notification} alt="" className="icons"></img>}>
                  Book Post Price
                </Menu.Item>
              </NavLink>
              <NavLink to="/serviceprice" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="13" icon={<img src={notification} alt="" className="icons"></img>}>
                  Service Post Price
                </Menu.Item>
              </NavLink>
              <NavLink to="/notifications" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="13" icon={<img src={notification} alt="" className="icons"></img>}>
                  Push Notification
                </Menu.Item>
              </NavLink>
              <NavLink to="/block" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="14" icon={<img src={user} alt="" className="icons"></img>}>
                  User Block/Unblock
                </Menu.Item>
              </NavLink>
              <NavLink to="/reports" className="ant-menu-item ant-menu-item-only-child ">
                <Menu.Item key="15" icon={<img src={spam} alt="" className="icons"></img>}>
                  Report Spam List
                </Menu.Item>
              </NavLink>
              <SubMenu key="Native" icon={<img src={mobileNative} alt="" className="icons"></img>} title="Mobile Native Ads">
                <NavLink to="/simplead" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="30">
                    Simple Ad
                  </Menu.Item>
                </NavLink>
                <NavLink to="/sliderad" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="31">
                    Slider Ad
                  </Menu.Item>
                </NavLink>
                <NavLink to="/popupad" className="ant-menu-item ant-menu-item-only-child ">
                  <Menu.Item key="32">
                    Pop-up Ad
                  </Menu.Item>
                </NavLink>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" >
            <div className="row mx-auto">
              <div className="mr-auto  Trigger">
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
              </div>
              <div className="ml-auto dropdown">
                <NavLink to="/dashboard">
                  <LogoutOutlined className="icons" onClick={this.onLogout} />
                </NavLink>
              </div>
            </div>
          </Header>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/config" component={AppConfig}></Route>
            <Route exact path="/university" component={University}></Route>
            <Route exact path="/alluniversities" component={AllUniversities}></Route>
            <Route exact path="/college" component={College}></Route>
            <Route exact path="/allcolleges" component={AllColleges}></Route>
            <Route exact path="/collegerequests" component={CollegeRequests}></Route>
            <Route exact path="/major" component={Major}></Route>
            <Route exact path="/allmajors" component={AllMajors}></Route>
            <Route exact path="/majorrequests" component={MajorRequests}></Route>
            <Route exact path="/professor" component={Professor} />
            <Route exact path="/allprofessors" component={AllProfessors} />
            <Route exact path="/professorrequests" component={ProfessorRequests} />
            <Route exact path="/professorcomment" component={ProfessorComment}></Route>
            <Route exact path="/commentrequests" component={CommentRequests}></Route>
            <Route exact path="/Subject" component={Subject}></Route>
            <Route exact path="/allsubjects" component={AllSubjects}></Route>
            <Route exact path="/subjectrequests" component={SubjectRequests}></Route>
            <Route exact path="/subjectdocument" component={SubjectDoument}></Route>
            <Route exact path="/commentrequests" component={CommentRequests}></Route>
            <Route exact path="/documentrequests" component={SubjectDocumentRequests}></Route>
            <Route exact path="/Subjectcomments" component={SubjectComment}></Route>
            <Route exact path="/subjectcommentreq" component={SubjectCommentRequests}></Route>
            <Route exact path="/books" component={Books}></Route>
            <Route exact path="/bookrequests" component={BookRequests}></Route>
            <Route exact path="/allbooks" component={AllBooks}></Route>
            <Route exact path="/services" component={Services}></Route>
            <Route exact path="/servicesrequests" component={ServiceRequests}></Route>
            <Route exact path="/classroom" component={Class}></Route>
            <Route exact path="/classrequests" component={ClassRequests}></Route>
            <Route exact path="/chats" component={Chat}></Route>
            <Route exact path="/bookprice" component={BookPostPrice}></Route>
            <Route exact path="/serviceprice" component={ServicePostPrice}></Route>
            <Route exact path="/notifications" component={Notifications}></Route>
            <Route exact path="/block" component={Block}></Route>
            <Route exact path="/reports" component={Spam}></Route>
            <Route exact path="/popupad" component={PopupAd}></Route>
            <Route exact path="/simplead" component={SimpleAd}></Route>
            <Route exact path="/sliderad" component={SliderAd}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
      </Layout>
      // </React.Fragment>

    );
  }
}

export default Sidebar;