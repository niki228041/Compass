// Import router
import { Routes, Route } from "react-router-dom";
// Import components
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgotPassword";
import NotFound from "./pages/notFound";
import Dashboard from "./pages/dashboard"
import { useTypedSelector } from "./hooks/useTypedSelector";
import {Users} from "./pages/dashboard/listItem/users"
import {Profile} from "./pages/dashboard/listItem/profile"
import {CreateUser} from "./pages/dashboard/listItem/create-user"
import {Reports} from "./pages/dashboard/listItem/reports"

//Get property from user reducer

const App:React.FC = () => {
  const {isAuth,user} = useTypedSelector(store=>store.UserReducer);
  
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
        {isAuth ? (
          <>
            <Route path="/" element={<Dashboard />} >
              <Route path="reports" element={<Reports/>} ></Route>
              <Route path="users" element={<Users/>} ></Route>
              <Route path="create-user" element={<CreateUser/>}></Route>
              <Route path="profile" element={<Profile />}></Route>

            </Route>
          </>
        ):""}
        
        {!isAuth ? (
          <>
            <Route path="/" element={<Login />} >
              <Route path="reports" element={<Login />} ></Route>
              <Route path="users" element={<Login />} ></Route>
              <Route path="create-user" element={<Login />}></Route>
              <Route path="profile" element={<Login />}></Route>
            </Route>
          </>
        ):""}
        
        <Route path="/" element={<Login />} />
      
      </Routes>

  );
}

export default App;
