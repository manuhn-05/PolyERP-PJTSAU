import React, { forwardRef, useImperativeHandle, useEffect, useState, ComponentType } from "react";

import { Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
// Ensure the correct import
const Modal = dynamic(() => import('@/components/modal'), { ssr: false });
export type ModalWindowRef = {
  closeModal: () => void;
};
type ModalWindowProps = {
  children: React.ReactNode;
  OpenComponent: ComponentType<{ onClick: () => void; className?: string; style?: React.CSSProperties }>;
  CloseComponent: ComponentType<{ onClick: () => void; className?: string; style?: React.CSSProperties }>;
  title?: string;
  openButtonClassName?: string;
  closeButtonClassName?: string;
  openButtonStyle?: React.CSSProperties;
  closeButtonStyle?: React.CSSProperties;
  modalWidth?: string;
  isOpen?: boolean;
  closeMapModal?: () => void
  isItButton?: boolean,
  buttonText?: string,
  buttonClasses?: string,
  modalClassName?: string,
  onOpen?: () => void;
  titleStyles?: string;
  btnColorScheme?: string;
  bothIconAndNameNeeded?: boolean;
  isOpenDisabled?: boolean
  isIconInsideButton?: boolean

};

const ModalWindow = forwardRef<ModalWindowRef, ModalWindowProps>(({
  children,
  OpenComponent,
  CloseComponent,
  title,
  openButtonClassName = "text-green-500 hover:text-green-800 bg-transparent rounded-md shadow-md cursor-pointer",
  closeButtonClassName = "text-red-500 hover:text-red-800 cursor-pointer hover:scale-105",
  openButtonStyle,
  closeButtonStyle,
  modalWidth,
  isOpen,
  closeMapModal,
  isItButton,
  buttonText,
  buttonClasses,
  modalClassName,
  onOpen,
  titleStyles, bothIconAndNameNeeded,
  btnColorScheme = "#6BBBE9",
  isOpenDisabled = false,
  isIconInsideButton = false
}, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen ?? false);

  useEffect(() => {
    setIsModalOpen(isOpen ?? false);
  }, [isOpen]);

  useImperativeHandle(ref, () => ({
    closeModal: () => {
      setIsModalOpen(false);
      closeMapModal?.();
    }
  }));
  return (
    <>
      {isItButton ? (
        <Button disabled={isOpenDisabled} onClick={() => {
          setIsModalOpen(true);
          onOpen?.();
        }}
          bg={`${btnColorScheme}`}
          textColor="white"
          className={`cursor-pointer text-white ${buttonClasses}`}>
          {buttonText}
          {
            bothIconAndNameNeeded && (<span>
              <OpenComponent
                onClick={() => {
                  setIsModalOpen(true);
                  onOpen?.();
                }}
                className={`cursor-pointer ${openButtonClassName}`}
                style={openButtonStyle}
              />
            </span>)
          }
        </Button>
      ) : (
        <>
          {
            isOpenDisabled ? (

              <OpenComponent
                onClick={() => {

                }}

                className={`cursor-pointer ${openButtonClassName} ${isOpenDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                style={openButtonStyle}
              />
            ) : (
              <>
                {isIconInsideButton ? (<Button bg={"transparent"}
                  onClick={() => {
                    setIsModalOpen(true);
                    onOpen?.();
                  }}
                  className={`bg-transparent hover:bg-[#6BBBE9] group p-0`}
                  _hover={{ backgroundColor: "#6BBBE9", color: "white" }}>

                  <OpenComponent
                    onClick={() => {

                    }}

                    className={`cursor-pointer ${openButtonClassName} text-black `}
                    style={openButtonStyle}
                  />
                </Button>) : (
                  <OpenComponent
                    onClick={() => {
                      setIsModalOpen(true);
                      onOpen?.();
                    }}

                    className={`cursor-pointer ${openButtonClassName}`}
                    style={openButtonStyle}
                  />
                )}

              </>


            )
          }


        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          closeMapModal?.();
        }}
        className={`${modalWidth ? modalWidth : "w-96"} ${modalClassName}`}
      >
        <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()} >
          {title && <h2 className={`text-2xl font-bold ${titleStyles}`}>{title}</h2>}
          <CloseComponent
            onClick={() => {
              setIsModalOpen(false);
              closeMapModal?.(); // ✅ Ensures parent is updated
            }}
            className={`cursor-pointer ${closeButtonClassName}`}
            style={closeButtonStyle}
          />
        </div>
        <div onClick={(e) => e.stopPropagation()} className="mt-2 w-full">
          {children}
        </div>
      </Modal>
    </>
  );
});

ModalWindow.displayName = 'Modal Window';
export default ModalWindow;
