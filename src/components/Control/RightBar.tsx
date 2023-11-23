/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-22 15:36:44
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-23 17:27:08
 * @ Description:
 */

import { useCanvas } from "@/context/CanvasContext";

import * as fabric from "fabric";
import { useEffect, useMemo, useState } from "react";

const size = 100;
// 圆形控件
const circleControl = new fabric.Circle({
  radius: 50,
  width: size,
});
// 文字控件
const TextControl = new fabric.Textbox("Hello World", {
  fontFamily: "Arial",
  fontSize: 18,
});

// 矩形控件
const rectControl = new fabric.Rect({
  width: size,
  height: size,
});
// 三角形
const triangleControl = new fabric.Triangle({
  width: size,
  height: size,
});

const RightBar = () => {
  const { canvas } = useCanvas();
  const [color, setColor] = useState("#000");

  const addRect = (e: { clientX: number; clientY: number }) => {
    if (canvas) {
      const offsetX =
        e.clientX - canvas.upperCanvasEl.getBoundingClientRect().left;
      const offsetY =
        e.clientY - canvas.upperCanvasEl.getBoundingClientRect().top;
      rectControl.set({
        left: offsetX - rectControl.width / 2,
        top: offsetY - rectControl.height / 2,
      });
      rectControl.fill = color;
      canvas?.add(rectControl);
    }
  };

  const addTriangle = (e: { clientX: number; clientY: number }) => {
    if (canvas) {
      const offsetX =
        e.clientX - canvas.upperCanvasEl.getBoundingClientRect().left;
      const offsetY =
        e.clientY - canvas.upperCanvasEl.getBoundingClientRect().top;
      triangleControl.set({
        left: offsetX - triangleControl.width / 2,
        top: offsetY - triangleControl.height / 2,
      });
      triangleControl.fill = color;
      canvas?.add(triangleControl);
    }
  };

  const addCircle = (e: { clientX: number; clientY: number }) => {
    if (canvas) {
      const offsetX =
        e.clientX - canvas.upperCanvasEl.getBoundingClientRect().left;
      const offsetY =
        e.clientY - canvas.upperCanvasEl.getBoundingClientRect().top;
      circleControl.set({
        left: offsetX - circleControl.width / 2,
        top: offsetY - circleControl.height / 2,
      });
      circleControl.fill = color;
      canvas?.add(circleControl);
    }
  };

  const addText = (e: { clientX: number; clientY: number }) => {
    if (canvas) {
      const offsetX =
        e.clientX - canvas.upperCanvasEl.getBoundingClientRect().left;
      const offsetY =
        e.clientY - canvas.upperCanvasEl.getBoundingClientRect().top;
      TextControl.set({
        left: offsetX - TextControl.width / 2,
        top: offsetY - TextControl.height / 2,
      });
      canvas?.add(TextControl);
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
    <div className="w-60 flex flex-col items-center p-4 bg-slate-900">
      <button
        draggable
        className="btn btn-link btn-sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={handleDrag}
      >
        添加图片
      </button>
      <button
        draggable
        className="btn btn-link btn-sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={addRect}
      >
        矩形
      </button>
      <button
        draggable
        className="btn btn-link btn-sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={addCircle}
      >
        圆形
      </button>
      <button
        draggable
        className="btn btn-link btn-sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={addTriangle}
      >
        三角形
      </button>
      <button
        draggable
        className="btn btn-link btn-sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={addText}
      >
        文本框
      </button>
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
