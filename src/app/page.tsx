/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-11-17 16:28:11
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-11-23 16:24:22
 * @ Description:
 */

"use client";

import CanvansComponent from "@/components/Canvas";
import RightBar from "@/components/Control/RightBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import History from "@/components/Control/History";
import { CanvasProvider } from "@/context/CanvasContext";

import React, { useEffect, useMemo, useRef, useState } from "react";

const Home = () => {
  const canvasBox = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>();

  useEffect(() => {
    if (canvasBox.current) {
      const { offsetWidth, offsetHeight } = canvasBox.current;
      setSize({ w: offsetWidth, h: offsetHeight });
    }
  }, [canvasBox.current]);
  const { w, h } = useMemo(() => {
    return {
      w: size?.w!,
      h: size?.h!,
    };
  }, [size]);
  return (
    <CanvasProvider>
      <main className="flex flex-col h-screen w-screen min-w-[1200px]">
        <Header />
        <section className="flex flex-1 w-full">
          {/* left bar */}
          <div className="w-60 bg-[#ecf0f1]">
            <History />
          </div>
          {/* work space */}
          <div
            className="w-full h-full bg-white flex justify-center items-center"
            ref={canvasBox}
          >
            <CanvansComponent w={w} h={h} />
          </div>
          {/* 右侧 */}
          <RightBar />
        </section>
        <Footer />
      </main>
    </CanvasProvider>
  );
};

export default Home;
