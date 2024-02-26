"use client";

import Image from "next/image";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Home() {
  const sigCanvas = useRef({} as SignatureCanvas);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = () => {
    const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.download = "signature.png";
    link.click();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex content-center flex-col">
        <h1 className="content-center w-full text-center mb-5 text-[30px]">
          Sign and Download
        </h1>
        {/* Container for main signature component */}
        <div className="flex flex-col items-center justify-center">
          <SignatureCanvas
            penColor="black"
            backgroundColor="white"
            canvasProps={{
              className: "sigCanvas",
              width: 500,
              height: 500,
              style: {
                border: "1px solid #000000",
                borderRadius: "5px",
                backgroundColor: "white",
              },
            }}
            minWidth={1}
            ref={sigCanvas}
          />

          <div className="flex flex-row justify-center items-center mt-5 gap-5 w-full">
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={clear}
            >
              Clear
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={save}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
