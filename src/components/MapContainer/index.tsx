/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-12-01 14:45:52
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-12-01 15:36:41
 * @ Description:
 */

import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect } from "react";

const MapContainer = () => {
  let map: { destroy: () => void } | null = null;

  useEffect(() => {
    AMapLoader.load({
      key: "7e81bc0507c5ed7305c7c312b8cda8c7", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 11, // 初始化地图层级
          center: [116.397428, 39.90923], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      map?.destroy();
    };
  }, []);

  return <div id="container" className="w-full h-full"></div>;
};

export default MapContainer;
