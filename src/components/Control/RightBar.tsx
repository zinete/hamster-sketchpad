/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-22 15:36:44
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-28 11:09:48
 * @ Description:
 */

import { useCanvas } from "@/context/CanvasContext";

import * as fabric from "fabric";
import { useEffect, useMemo, useState } from "react";

//枚举
enum ElementType {
  "RECT" = "RECT",
  "CIRCLE" = "CIRCLE",
  "LINE" = "LINE",
  "TEXT" = "TEXT",
  "IMAGE" = "IMAGE",
}
const RightBar = () => {
  const { canvas } = useCanvas();
  const [color, setColor] = useState("#000");
  const [currentElType, setcurrentElType] = useState(ElementType.RECT);
  const size = 100;

  const createElementByType = (
    type: ElementType,
    color: "#000",
    top: number,
    left: number
  ) => {
    switch (type) {
      case ElementType.RECT:
        canvas?.add(
          new fabric.Rect({
            top,
            left,
            fill: color,
          })
        );
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    if (canvas) {
      const dataJson = canvas.toJSON();
      localStorage.setItem("canvas", JSON.stringify(dataJson));
      // 保存成图片并且下载
      alert("保存成功");
    }
  };

  // 清空重置画板
  const handleClear = () => {
    if (canvas) {
      canvas.clearContext(canvas.contextContainer);
      localStorage.removeItem("canvas");
    }
  };
  const { canvasData } = useMemo(() => {
    return {
      canvasData: localStorage.getItem("canvas"),
    };
  }, []);

  useEffect(() => {
    if (canvasData) {
      canvas
        ?.loadFromJSON(canvasData)
        .then((canvas) => canvas.requestRenderAll());
    }
  }, [canvas, canvasData]);

  useEffect(() => {
    if (canvas) {
      canvas.on("drag", (e) => {
        // 画布元素距离浏览器左侧和顶部的距离
        let offset = {
          left: canvas.getSelectionElement().getBoundingClientRect().left,
          top: canvas.getSelectionElement().getBoundingClientRect().top,
        };

        console.log(offset, "offset");
      });
    }
  }, [canvas]);

  const handleDrag = (e: { clientX: number; clientY: number }) => {
    if (canvas) {
      const img = new Image();
      img.src = "https://www.baidu.com/img/flexible/logo/pc/result@2.png";
      img.onload = () => {
        const image = new fabric.FabricImage(img, {
          left: e.clientX,
          top: e.clientY,
          width: img.width,
          height: img.height,
        });
        if (image) {
          const offsetX =
            e.clientX - canvas.upperCanvasEl.getBoundingClientRect().left;
          const offsetY =
            e.clientY - canvas.upperCanvasEl.getBoundingClientRect().top;
          image.set({
            left: offsetX - image.width / 2,
            top: offsetY - image.height / 2,
          });
          canvas.add(image);
          canvas.renderAll();
        }
      };
    }
  };

  return (
    <div className="w-60 flex flex-col items-center p-4 bg-slate-900 text-sm">
      <button
        draggable
        className="btn btn-link btn-sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={handleDrag}
      >
        添加图片
      </button>

      <span>元素类型：{currentElType}</span>
      <div className="my-10 flex flex-col items-center">
        {Object.entries(ElementType).map(([key, value]) => {
          return (
            <button
              key={key}
              onClick={() => {
                setcurrentElType(value);
                createElementByType(value, "#000", size, size);
              }}
            >
              {value}
            </button>
          );
        })}
      </div>
      <input
        type="color"
        onChange={(v) => {
          setColor(v?.target?.value);
          if (canvas) {
            // canvas.backgroundColor = v?.target?.value;
            canvas.renderAndReset();
          }
        }}
      ></input>

      <button onClick={handleSave}>保存到本地</button>
      <button onClick={handleClear}>重置</button>
    </div>
  );
};

export default RightBar;
