import { useState } from "react";
import "./App.css";
import IconPicker from "./IconPicker";

function App() {
  const [rowsInOnePage, setRowsInOnePage] = useState(5);
  const [columnsInOnePage, setColumnsInOnePage] = useState(5);
  const [iconHeight, setIconHeight] = useState(60);
  const [iconWidth, setIconWidth] = useState(60);
  const [pickerHeight, setPickerHeight] = useState(500);
  const [pickerWidth, setPickerWidth] = useState(500);
  const [svgString, setSvgString] = useState("");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-8 overflow-auto">
      <h1 className="text-4xl font-bold mb-20">iKons</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm m-2 justify-items-center">
        <label>
          Rows in One Page:
          <input
            type="number"
            name="rowsInOnePage"
            className="border p-2 ml-2 rounded-md"
            value={rowsInOnePage}
            onChange={(e) => setRowsInOnePage(Number(e.target.value))}
          />
        </label>
        <label>
          Columns in One Page:
          <input
            type="number"
            name="columnsInOnePage"
            className="border p-2 ml-2 rounded-md"
            value={columnsInOnePage}
            onChange={(e) => setColumnsInOnePage(Number(e.target.value))}
          />
        </label>
        <label>
          Icon Height:
          <input
            type="number"
            name="iconHeight"
            className="border p-2 ml-2 rounded-md"
            value={iconHeight}
            onChange={(e) => setIconHeight(Number(e.target.value))}
          />
        </label>
        <label>
          Icon Width:
          <input
            type="number"
            name="iconWidth"
            className="border p-2 ml-2 rounded-md"
            value={iconWidth}
            onChange={(e) => setIconWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Picker Height:
          <input
            type="number"
            name="pickerHeight"
            className="border p-2 ml-2 rounded-md"
            value={pickerHeight}
            onChange={(e) => setPickerHeight(Number(e.target.value))}
          />
        </label>
        <label>
          Picker Width:
          <input
            type="number"
            name="pickerWidth"
            className="border p-2 ml-2 rounded-md"
            value={pickerWidth}
            onChange={(e) => setPickerWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <IconPicker
        rowsInOnePage={rowsInOnePage}
        columnsInOnePage={columnsInOnePage}
        iconHeight={iconHeight}
        iconWidth={iconWidth}
        pickerHeight={pickerHeight}
        pickerWidth={pickerWidth}
        setSvgString={setSvgString}
      />
      <div className="grid">
        <p className="mx-auto text-center text-xs text-gray-500 max-w-[80%] sm:max-w-[40%]">
          {svgString}
        </p>
        <button
          className="mx-auto text-center mt-2 p-2 bg-blue-500 text-white rounded-md text-xs"
          onClick={() => navigator.clipboard.writeText(svgString)}
        >
          Copy SVG
        </button>
      </div>
    </div>
  );
}

export default App;
