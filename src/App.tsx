import Stepper from "./components/adnStepper";
import "./index.css";
import { ReactNode, useCallback, useState } from "react";

const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-[300px] min-h-[200px] bg-blue-800 p-10 flex justify-center items-center">
      <div
        className="absolute right-2 top-2 border rounded-full w-2 h-2 flex justify-center items-center cursor-pointer hover:scale-110 p-4"
        onClick={onClose}
      >
        ❌
      </div>
      {children}
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = useCallback(() => setIsOpen(false), []);
  const handleOpenModal = useCallback(() => setIsOpen(true), []);
  return (
    <>
      <div className="border-4 border-red-500 h-screen">
        {isOpen && (
          <Modal onClose={handleCloseModal}>
            {/* <Stepper /> */}
            <div className="w-[900px]">
              <Stepper />
            </div>
          </Modal>
        )}
        <button onClick={handleOpenModal}>open modal</button>
      </div>
    </>
  );
}

export default App;
