import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Statistics from "../components/Statistics";
import AddItem from "../inventory/AddItem";
import ListItem from "../inventory/ListItem";
import RemoveItem from "../inventory/RemoveItem";
import AddBox from "../inventory/AddBox";
import PickBox from "../inventory/PickBox";
import RemoveBox from "../inventory/RemoveBox";
import OptimalCalculation from "../calculation/OptimalCalculation";
import BufferingCalculation from "../calculation/BufferingCalculation";

const Dashboard = () => {
  const { id } = useParams();

  const renderContent = () => {
    if (id === "additem") {
      return <AddItem />;
    } else if (id === "listitems") {
      return <ListItem />;
    } else if (id === "removeitem") {
      return <RemoveItem />;
    } else if (id === "addbox") {
      return <AddBox />;
    } else if (id === "pickbox") {
      return <PickBox />;
    } else if (id === "removebox") {
      return <RemoveBox />;
    } else if (id === "optimalcalculation") {
      return <OptimalCalculation />;
    } else if (id === "bufferingcalculation") {
      return <BufferingCalculation />;
    } else {
      return <Statistics />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800">
      <Sidebar />
      <div className="flex-1 bg-gray-800 text-white p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
