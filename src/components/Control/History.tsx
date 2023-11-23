/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-23 15:07:01
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-23 17:15:04
 * @ Description:
 */

import { useCanvas } from "@/context/CanvasContext";
import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState<any>([]);
  const { canvas } = useCanvas();

  const saveToHistory = () => {
    if (canvas) {
      // 将当前画布状态保存到历史记录
      setHistory((prevHistory: any) => [...prevHistory, canvas.toJSON()]);
    }
  };

  useEffect(() => {
    if (canvas) {
      // 监听对象被添加事件
      canvas.on("object:added", saveToHistory);

      // 监听对象被修改事件
      canvas.on("object:modified", saveToHistory);
    }
  }, [canvas]);

  const undo = () => {
    if (history.length > 1 && canvas) {
      // 还原到前一个历史记录
      const previousState = history[history.length - 2];
      canvas
        ?.loadFromJSON(previousState)
        .then((canvas) => canvas.requestRenderAll());

      // 更新历史记录
      setHistory((prevHistory: any) => prevHistory.slice(0, -1));
    }
  };

  const redo = () => {
    if (canvas) {
      // 还原到后一个历史记录
      const nextState = history[history.length - 1];
      canvas
        ?.loadFromJSON(nextState)
        .then((canvas) => canvas.requestRenderAll());
    }
  };

  return (
    <div>
      <span>todo history</span>
      {/* <button className="btn btn-link" onClick={undo}>
        undo
      </button>
      <button className="btn btn-link" onClick={redo}>
        redo
      </button> */}
    </div>
  );
};

export default History;
