/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-22 11:23:39
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-27 14:22:27
 * @ Description:
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import * as fabric from "fabric";

export interface CanvasContextProps {
  canvas?: fabric.Canvas;
  setCanvas: React.Dispatch<React.SetStateAction<fabric.Canvas | undefined>>;
}

export const CanvasContext = createContext<CanvasContextProps | undefined>({
  canvas: undefined,
  setCanvas: () => {},
});

interface ICanvasProviderProps {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<ICanvasProviderProps> = ({
  children,
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      freeDrawingCursor: "crosshair",
      // fireRightClick: true, // 启用右键
      // stopContextMenu: true, // 禁止默认右键菜单
      // controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    });
    setCanvas(c);
    return () => {
      c.dispose();
    };
  }, [setCanvas]);
  return (
    <CanvasContext.Provider value={{ canvas, setCanvas }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
