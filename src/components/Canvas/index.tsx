/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-22 11:25:30
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-27 14:14:08
 * @ Description:
 */

import React, { useContext, useEffect, useId, memo } from "react";
import * as fabric from "fabric";
import { CanvasContext, useCanvas } from "@/context/CanvasContext";

const CanvansComponent: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const { canvas } = useCanvas();
  useEffect(() => {
    if (canvas) {
      canvas.setWidth(w);
      canvas.setHeight(h);
    }
    window?.addEventListener("keydown", handleKeyDown);
    // 监听点击事件

    return () => {
      // 移除事件监听器，以防止内存泄漏
      window?.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);

  const deleteSelected = () => {
    if (canvas) {
      // TODO 文本框删除需要优先控制删除文字。并且光标聚焦不能删除
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      deleteSelected();
    }
  };
  // 修改画板颜色控件
  const RenderColorPicker = () => {
    const colors = [
      "#000",
      "#f00",
      "#0f0",
      "#00f",
      "#0ff",
      "#f0f",
      "#ff0",
      "#fff",
    ];
    return (
      <div className="absolute top-5 left-5">
        {colors?.map((value) => (
          <div
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              console.log(value, "3");
              if (canvas) {
                canvas.backgroundColor = value;
                canvas.renderAll();
              }
            }}
            key={value}
            style={{
              backgroundColor: value,
            }}
          ></div>
        ))}
      </div>
    );
  };
  return (
    <div className="relative">
      <canvas id="canvas" width={w} height={h} className="" />
      <RenderColorPicker />
    </div>
  );
};

export default CanvansComponent;
