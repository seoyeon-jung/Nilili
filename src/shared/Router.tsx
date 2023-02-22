import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Main, Post, User, Course, Search, NotFound } from "../pages";
import EditCourse from "../pages/EditCourse";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post" element={<Post />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/edit/:id" element={<EditCourse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
