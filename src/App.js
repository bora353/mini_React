import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("/parsing")
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.dataMapList[0].DEFECTID);
        //console.log(response.data.dataMapList[0]);
        //console.log(response.data.waferID);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      <h2>React 화면~</h2>
      {<p>lotID : {data.lotID}</p>}
      {<p>deviceID : {data.deviceID}</p>}
      {<p>stepID : {data.stepID}</p>}
      {<p>equipID : {data.equipID}</p>}
      {<p>ppID : {data.ppID}</p>}
      {<p>resultTimestamp : {data.resultTimestamp}</p>}
      {<p>slotNo : {data.slotNo}</p>}
      {<p>waferID : {data.waferID}</p>}
    </div>
  );
}

export default App;
