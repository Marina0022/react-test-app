import React from "react";
import { Routes, Route } from "react-router-dom";
import EditUser from "./pages/EditUser";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route
        path="/edit-users"
        element={
          <MainLayout>
            <EditUser />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
