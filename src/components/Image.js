import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";

export default function Image({ selectedSlotNo }) {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios
      .get("/parsing")
      .then((response) => {
        const images = response.data.Images;
        const filteredImages = images.filter(
          (item) => item.SlotNo === selectedSlotNo
        );
        setImageData(filteredImages);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, [selectedSlotNo]);

  return (
    <div style={{ marginTop: "60px" }}>
      <h3 style={{ margin: "10px 200px" }}>Image</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageList
          sx={{
            width: 1500,
            height: 500,
            border: "1px solid #D3D3D3",
            marginTop: 0,
            borderRadius: "7px",
          }}
          cols={5}
          rowHeight={250}
        >
          {imageData.map((item) => (
            <ImageListItem key={item.img} sx={{ margin: "0 0 45px 0" }}>
              <img
                srcSet={`\\img\\${item.TiffFileName}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`\\img\\${item.TiffFileName}?w=164&h=164&fit=crop&auto=format`}
                alt={item.ImgNo}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}
