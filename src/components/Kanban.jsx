import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";

const Kanban = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <Header
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />
      <Home
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />
    </div>
  );
};

export default Kanban;
