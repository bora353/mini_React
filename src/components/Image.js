import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function Image({
  selectedSlotNo,
  selectedDefectNo,
  setSelectedSlotNo,
  setSelectedDefectNo,
}) {
  const [imageData, setImageData] = useState([]);
  const [defectIdMap, setDefectIdMap] = useState({});
  const [isModalOpen, setModalOpen] = useState(false); // 모달(이미지 팝업)
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 정보를 저장

  // 모달 열기 함수
  const openModal = (imageInfo) => {
    setSelectedImage(imageInfo); // 선택된 이미지 정보 설정
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setSelectedImage(null); // 모달이 닫힐 때 이미지 정보 초기화
    setModalOpen(false);
  };

  // Defect 데이터 가져오기
  useEffect(() => {
    axios
      .get("/api/parsing/defect")
      .then((response) => {
        const defectData = response.data.Defects;
        const defectIdMap = {};
        defectData.forEach((defect) => {
          defectIdMap[defect.DefectNo] = defect.DefectId;
        });
        setDefectIdMap(defectIdMap);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  // Image 데이터 가져오기
  useEffect(() => {
    axios
      .get("/api/parsing/image")

      .then((response) => {
        console.log("selectedSlotNo", selectedSlotNo);
        console.log("selectedDefectNo", selectedDefectNo);
        const images = response.data;
        console.log(images);
        let filteredImages = images;

        if (selectedSlotNo) {
          filteredImages = filteredImages.filter(
            (item) => item.slotNo === selectedSlotNo
          );
        }

        if (selectedDefectNo) {
          filteredImages = filteredImages.filter(
            (item) => item.defectNo === selectedDefectNo
          );
        }

        console.log(filteredImages);
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
            width: 1460,
            height: 500,
            border: "1px solid #D3D3D3",
            marginTop: 0,
            borderRadius: "7px",
          }}
          cols={5}
          rowHeight={250}
        >
          {imageData.map((item) => {
            const fileName = item.tiffFileName.split("\\").pop();
            const defectId = defectIdMap[item.defectNo] || "N/A";

            return (
              <ImageListItem key={item.img} sx={{ margin: "0 0 70px 0" }}>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  DefectId : {defectId}, [ {fileName} ]
                </div>
                <img
                  src={`data:image/jpeg;base64,${item.imageBytes}`}
                  alt={item.ImgNo}
                  loading="lazy"
                  onClick={() => {
                    openModal({
                      ...item,
                      defectId: defectIdMap[item.defectNo] || "N/A",
                      fileName: item.tiffFileName.split("\\").pop(),
                    });
                  }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogContent>
          {selectedImage && (
            <>
              <div>
                Defect ID: {selectedImage.defectId || "N/A"}, [
                {selectedImage.fileName}]
              </div>
              <img
                src={`data:image/jpeg;base64,${selectedImage.imageBytes}`}
                alt="Selected Image"
                onClick={closeModal}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
