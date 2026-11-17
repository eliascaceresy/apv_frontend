import { Routes, Route } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import ConfirmAccount from "./components/auth/ConfirmAccount";
import ForgetPassword from "./components/auth/ForgetPassword";
import ChangePassword from "./components/auth/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />}></Route>
        <Route path="new_account" element={<NewAccount />}></Route>
        <Route path="confirm_account/:token" element={<ConfirmAccount />}></Route>
        <Route path="forget_password" element={<ForgetPassword />}></Route>
        <Route path="change_password/:token" element={<ChangePassword />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
