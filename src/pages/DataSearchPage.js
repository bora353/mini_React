import React from "react";
import Bar from "../components/Bar";
import Select from "../components/Select";
import Title from "../components/Title";
import Lot_Wafer from "../components/Lot_Wafer";

export default function DataSearchPage() {
  return (
    <div>
      <Bar />
      <Title />
      <Select />
      <Lot_Wafer />
    </div>
  );
}
