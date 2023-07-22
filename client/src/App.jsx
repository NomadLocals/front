import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  SignUp,
} from "@clerk/clerk-react";
// Importar componentes:
import Home from "./components/views/Home.jsx";
import CreateAccountForm from "./components/views/CreateAccountForm.jsx";
import CreateAccountPlace from "./components/views/CreateAccountPlace.jsx";
import ActivityForm from "./components/views/ActivityForm.jsx";
import Profile from "./components/views/Profile.jsx";
import Detail from "./components/views/Detail.jsx";
import FilterActivities from "./components/views/Filter.jsx";
import Landing from "./components/views/Landing.jsx";
import Chat from "./components/views/Chat.jsx";
import About from "./components/views/About.jsx";
import Settings from "./components/views/Settings.jsx";
import Loading from "./components/views/Loading.jsx";
import EventReview from "./components/views/ReviewEvents.jsx";
import UserReview from "./components/views/ReviewUser.jsx";
import OthersDetail from "./components/views/OthersDetail.jsx";
import Report from "./components/views/Report.jsx";
//Componentes administrador:
import AllUsers from "./components/AdminComponents/AllUsers.jsx";
import AdminHome from "./components/AdminComponents/AdminHome.jsx";
import AllReviews from "./components/AdminComponents/AllReviews.jsx";
import AllOrders from "./components/AdminComponents/AllOrders.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/reviewevent" element={<EventReview />} />
        <Route path="/reviewuser" element={<UserReview />} />
        <Route path="/report" element={<Report />} />
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-account1" element={<CreateAccountForm />} />
        <Route path="/create-account2" element={<CreateAccountPlace />} />
        <Route path="/home/detail/:id" element={<Detail />} />
        <Route path="/activities/detail/:id" element={<Detail />} />
        <Route path="/activities" element={<FilterActivities />} />
        <Route path="/activity-form" element={<ActivityForm />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/others/:id" element={<OthersDetail />} />
        <Route path="/activities/detail/:id/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/allOrders" element={<AllOrders />} />
        <Route path="/admin/allReviews" element={<AllReviews />} />
      </Routes>
    </div>
  );
}

export default App;
