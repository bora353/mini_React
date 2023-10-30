import React from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import FTP from "../components/FTP";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SummaryPage() {
  //const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const LotId = searchParams.get("LotId");
  const WaferId = searchParams.get("WaferId");

  console.log(LotId);
  console.log(WaferId);

  return (
    <div>
      <Bar /> <Title /> <FTP LotId={LotId} WaferId={WaferId} />
    </div>
  );
}
