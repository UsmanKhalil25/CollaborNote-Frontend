import React from "react";
import Router from "@/router";
import MainLayout from "@/components/MainLayout";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
};

export default App;
