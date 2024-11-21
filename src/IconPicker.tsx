import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as FeatherIcons from "feather-icons";

interface IconPickerProps {
  rowsInOnePage: number;
  columnsInOnePage: number;
  iconHeight: number;
  iconWidth: number;
  pickerHeight?: number;
  pickerWidth?: number;
  setSvgString: React.Dispatch<React.SetStateAction<string>>;
}

const IconPicker: React.FC<IconPickerProps> = ({
  rowsInOnePage = 5,
  columnsInOnePage = 5,
  iconHeight = 50,
  iconWidth = 50,
  pickerHeight = 500,
  pickerWidth = 500,
  setSvgString,
}) => {
  const allIcons = Object.entries(FeatherIcons.icons) as [
    string,
    FeatherIcons.FeatherIcon
  ][];
  const iconsPerPage = rowsInOnePage * columnsInOnePage;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedIcon, setSelectedIcon] = useState<
    [string, FeatherIcons.FeatherIcon] | null
  >(null);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  const totalPages = Math.ceil(allIcons.length / iconsPerPage);

  const handleIconClick = (icon: [string, FeatherIcons.FeatherIcon]) => {
    setSvgString(icon[1].toSvg({ width: iconWidth, height: iconHeight }));
    setSelectedIcon(icon);
    setIsPickerOpen(false); // Close picker
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const pickerContent = (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg overflow-auto max-h-screen m-2 border `}
      style={{
        width: pickerWidth,
        height: pickerHeight,
      }}
    >
      <div
        onClick={() => setIsPickerOpen(false)}
        className="flex w-full justify-end"
      >
        <p className="text-gray-500 hover:text-gray-700 size-6 text-xl cursor-pointer">
          &times;
        </p>
      </div>
      {/* Grid */}
      <div
        className={`grid gap-2 p-4 justify-items-center`}
        style={{
          gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)`,
        }}
      >
        {allIcons
          .slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage)
          .map(([name, icon]) => (
            <div
              key={name}
              className={`flex justify-center items-center w-full h-full border hover:border-blue-500 rounded-md cursor-pointer p-1`}
              onClick={() => handleIconClick([name, icon])}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: icon.toSvg({ width: iconWidth, height: iconHeight }),
                }}
              />
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 border-t">
        <button
          disabled={currentPage === 0}
          onClick={handlePrevPage}
          className={`px-4 py-2 text-white rounded-md ${
            currentPage === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages - 1}
          onClick={handleNextPage}
          className={`px-4 py-2 text-white rounded-md ${
            currentPage === totalPages - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Trigger Button */}
      <div
        className="w-[100px] h-[100px] border border-black flex justify-center items-center cursor-pointer"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        {selectedIcon ? (
          <div
            dangerouslySetInnerHTML={{
              __html: selectedIcon[1].toSvg({ width: 48, height: 48 }),
            }}
          />
        ) : (
          "Select Icon"
        )}
      </div>

      {/* Render Picker in React Portal */}
      {isPickerOpen &&
        ReactDOM.createPortal(
          pickerContent,
          document.getElementById("icon-picker-portal") as HTMLElement
        )}
    </div>
  );
};

export default IconPicker;
