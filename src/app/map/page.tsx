/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-12-01 14:07:15
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-12-01 14:54:16
 * @ Description:
 */
"use client";

import MapContainer from "@/components/MapContainer";
import { useEffect } from "react";

const MapPage = () => {
  // 骑行路径规划

  const ridePathPlanning = async () => {
    const parameters = new URLSearchParams({
      key: "d27a33090d382a1993955a6014f81a74",
      origin: "116.397428,39.90923",
      destination: "116.397428,39.90923",
    });
    const res = await fetch(
      `https://restapi.amap.com/v4/direction/bicycling?${parameters}`,
      {
        method: "GET",
      }
    );
    console.log(res, "res");
  };

  useEffect(() => {}, []);
  return (
    <div className="h-screen w-screen">
      <MapContainer />
    </div>
  );
};

export default MapPage;
