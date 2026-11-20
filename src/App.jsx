import { Routes, Route } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import ConfirmAccount from "./components/auth/ConfirmAccount";
import ForgetPassword from "./components/auth/ForgetPassword";
import ChangePassword from "./components/auth/ChangePassword";
import { AuthProvider } from "./context/AuthProvider";
import AdminPatients from "./components/admin/AdminPatients";
import EditProfile from "./components/admin/profile/EditProfile";
import ProfileChangePassword from "./components/admin/profile/ProfileChangePassword";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="new_account" element={<NewAccount />}></Route>
          <Route path="confirm_account/:token" element={<ConfirmAccount />}></Route>
          <Route path="forget_password" element={<ForgetPassword />}></Route>
          <Route path="change_password/:token" element={<ChangePassword />}></Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPatients />}></Route>
          <Route path="profile" element={<EditProfile />}></Route>
          <Route path="change_password" element={<ProfileChangePassword />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
