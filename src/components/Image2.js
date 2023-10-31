import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Image2() {
  const [imageDataList, setImageDataList] = useState([]);

  useEffect(() => {
    axios
      .get("/parsing/image")
      .then((response) => {
        const imagesWithInfo = response.data;
        console.log(response.data);
        setImageDataList(imagesWithInfo);
      })
      .catch((error) => {
        console.error("이미지 가져오기에 실패했습니다.", error);
      });
  }, []);

  return (
    <div>
      <h2>이미지 목록</h2>
      <div className="image-container">
        {imageDataList.map((imageInfo, index) => (
          <div key={index} className="image-item">
            <div>
              ImgNo: {imageInfo.imgNo}, TiffFileName: {imageInfo.tiffFileName}
            </div>
            <img
              src={`data:image/jpeg;base64,${imageInfo.imageBytes}`}
              alt={`Image ${index}`}
              style={{ width: "200px", height: "150px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
