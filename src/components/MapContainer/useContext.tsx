/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-12-01 15:33:32
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-12-01 15:52:47
 * @ Description:
 */

import { createContext, useState } from "react";

export interface MapContextProps {}

export const MapContext = createContext<MapContextProps | undefined>({
  map: undefined,
  setMap: () => {},
});

const MapContextContainer = () => {};

interface IMapProviderProps {
  children: React.ReactNode;
}
export const MapProvider: React.FC<IMapProviderProps> = ({ children }) => {
  const [map, setMap] = useState();
  // useEffect(() => {
  //   const c = new fabric.Canvas("canvas", {
  //     freeDrawingCursor: "crosshair",
  //     // fireRightClick: true, // 启用右键
  //     // stopContextMenu: true, // 禁止默认右键菜单
  //     // controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
  //   });
  //   setMap(c);
  //   return () => {
  //     c.dispose();
  //   };
  // }, [setMap]);
  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
export default MapContextContainer;
