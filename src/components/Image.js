import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";

export default function Image({
  selectedSlotNo,
  selectedDefectNo,
  setSelectedSlotNo,
  setSelectedDefectNo,
}) {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios
      .get("/parsing")

      .then((response) => {
        console.log(selectedSlotNo);
        console.log(selectedDefectNo);
        const images = response.data.Images;
        let filteredImages = images;

        if (selectedSlotNo) {
          filteredImages = filteredImages.filter(
            (item) => item.SlotNo === selectedSlotNo
          );
        }

        if (selectedDefectNo) {
          filteredImages = filteredImages.filter(
            (item) => item.DefectNo === selectedDefectNo
          );
        }

        setImageData(filteredImages);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, [selectedSlotNo, selectedDefectNo]);

  // SlotNo나 DefectNo가 변경되면 값을 초기화(여러번 선택시 문제 있어서)
  useEffect(() => {
    if (selectedSlotNo !== null) {
      setSelectedDefectNo(null);
    } else if (selectedDefectNo !== null) {
      setSelectedSlotNo(null);
    }
  }, [selectedSlotNo]);

  if (!selectedSlotNo && !selectedDefectNo) {
    return null;
  }

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
