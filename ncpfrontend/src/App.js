
// import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from './component/main' 
import SignUp from './component/main/SignUp';
import Login from './component/main/Login';
import Home from './component/main/Home';
import ResetPassword from './component/main/ResetPassword';
import Admin from './component/admin';
import DashBoard from './component/admin/DashBoard';
import ManageUser from './component/admin/ManageUser';
import ManageProfile from './component/admin/ManageProfile'
import PlatformDetails from './component/main/PlatformDetails';
import ListPlatform from './component/main/ListPlatform';
import ComparePlatform from './component/main/ComparePlatform';
import AddPlatform from './component/admin/AddPlatform';
import ManagePlatform from './component/admin/ManagePlatform';
import UpdatePlatform from './component/admin/UpdatePlatform';
import User from './component/user' 
import ManageProfileUser from './component/user/ManageProfileUser';
import ManageReview from './component/user/ManageReview';
import ViewPlatform from './component/main/ViewPlatform';
import NotFound from './component/main/NotFound';
import ContactUs from './component/main/ContactUs';
import ManageContactUs from './component/admin/ManageContactUs';
import Authorisor from './component/main/Authorisor';


function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
       <Route element={<Main/>} path="main">
        <Route path="home" element={<Home/>} />
        <Route path="signup" element={<SignUp/>} ></Route>
        <Route path="login" element={<Login/>} ></Route>
        <Route path="reset" element={<ResetPassword/>}></Route>
        <Route path="platformdetails" element={<PlatformDetails/>}></Route>
        <Route path="viewplatform/:id" element={<ViewPlatform/>}></Route>
        <Route path="listplatform" element={<ListPlatform/>}></Route>
        <Route path="compareplatform" element={<ComparePlatform/>}></Route>
        <Route path="contactus" element={<ContactUs/>}></Route>
       </Route>
       <Route element={<Authorisor><Admin/></Authorisor>} path="admin">
        <Route path='dashboard'element={<DashBoard/>} />
        <Route path='manageuser'element={<ManageUser/>} />
        <Route path='manageprofile'element={<ManageProfile/>} />
        <Route path='addplatform'element={<AddPlatform/>} />
        <Route path='manageplatform'element={<ManagePlatform/>} />
        <Route path='updateplatform/:id'element={<UpdatePlatform/>} />
        <Route path='managecontactus'element={<ManageContactUs/>} />
       </Route>
       <Route element={<User/>} path="user">
        <Route path="manageprofileuser" element={<Authorisor><ManageProfileUser/></Authorisor>}/>
        <Route path="managereview" element={<Authorisor><ManageReview/></Authorisor>}/>
       </Route>
      <Route path="*" element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
      
    </div>
  );
}

export default App;
