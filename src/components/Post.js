import React, { useState } from "react";
import axios from "axios";

export default function Post() {
  const [id, setId] = useState(0);

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7289//csv/generateCsv",
        { id: "abc5" }
      );
      console.log(response.data); // 서버에서 반환한 응답 데이터를 콘솔에 출력
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="ID 입력"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleRequest}>CSV 파일 생성 요청</button>
    </div>
  );
}
