"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { NextUIProvider } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import jsPDF from "jspdf";

export default function Home() {
  const sigCanvas = useRef({} as SignatureCanvas);
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = (format) => {
    // const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    // const link = document.createElement("a");
    // link.href = data;
    // link.download = "signature.png";
    // link.click();

    if (format === "png") {
      const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "signature.png";
      link.click();
    } else if (format === "jpeg") {
      const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = data;
      link.download = "signature.jpeg";
      link.click();
    } else if (format === "pdf") {
      const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(data, "PNG", 0, 0);
      pdf.save("signature.pdf");
    }
  };

  const OptionsModal = () => {
    // Options to download in different formats
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <h1 className="content-center w-full text-center mb-5 text-[20px] text-black mt-10">
                    Download Options
                  </h1>
                  <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center w-full"
                    onClick={() => save("png")}
                  >
                    Download as PNG
                  </button>
                  <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center w-full"
                    onClick={() => save("jpeg")}
                  >
                    Download as JPEG
                  </button>
                  <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center w-full"
                    onClick={() => save("pdf")}
                  >
                    Download as PDF
                  </button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-slate-800 to-zinc-900">
        <div className="flex content-center flex-col">
          <OptionsModal />
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
              {/* clear button with glass effect */}
              <button
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center w-full"
                onClick={clear}
              >
                Clear
              </button>
              {/* save button with glass effect */}
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center w-full"
                onClick={onOpen}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </main>
    </NextUIProvider>
  );
}
