import { useMemo, useState } from "react";
import GridCanvas from "../components/grid/GridCanvas";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Palette, { type PaletteColor } from "../components/palette/Palette";
import GridControls from "../components/toolbar/GridControls";
import Toolbar from "../components/toolbar/Toolbar";
import useGrid from "../hooks/useGrid";
import countColors from "../utils/countColors";
import { downloadGridSVG } from "../utils/exportSVG";

const palette: PaletteColor[] = [
  { name: "Crystal AB", value: "#dce8e3" },
  { name: "Emerald AB", value: "#1f5649" },
  { name: "Sapphire", value: "#3156b8" },
  { name: "Amethyst", value: "#7541a6" },
  { name: "Siam red", value: "#c52f3a" },
  { name: "Hyacinth", value: "#f47b32" },
  { name: "Amber AB", value: "#8d5a39" },
  { name: "Jet hematite", value: "#343538" },
  { name: "Silver", value: "#aeb7bd" },
  { name: "Emerald", value: "#2f9b60" },
  { name: "Aquamarine", value: "#76bfe6" },
  { name: "Violet", value: "#b38cdb" },
  { name: "Light Siam", value: "#e33a35" },
  { name: "Peach", value: "#f2a66f" },
  { name: "Smoked topaz", value: "#674239" },
  { name: "Jet", value: "#171719" },
  { name: "Pearl", value: "#f3f0e9" },
  { name: "Peridot", value: "#75c94b" },
  { name: "Capri blue", value: "#23a6dc" },
  { name: "Fuchsia", value: "#e8328b" },
  { name: "Rose", value: "#f281a5" },
  { name: "Citrine", value: "#e7c846" },
  { name: "Golden shadow", value: "#aa783d" },
  { name: "Montana", value: "#273c68" },
  { name: "Clear crystal", value: "#ffffff" },
  { name: "Chrysolite", value: "#b5e59a" },
  { name: "Blue zircon", value: "#48c8cf" },
  { name: "Ruby", value: "#b92458" },
  { name: "Light rose", value: "#f4b6c8" },
  { name: "Neon yellow", value: "#d9ef3d" },
  { name: "Copper", value: "#9b573c" },
  { name: "Black diamond", value: "#303139" },
  { name: "Opal", value: "#e9e8dc" },
  { name: "Green AB", value: "#3f7f65" },
  { name: "Turquoise", value: "#3abec4" },
  { name: "Pink AB", value: "#f25aa1" },
  { name: "Magenta", value: "#d41f73" },
  { name: "Neon lime", value: "#9ee536" },
  { name: "Champagne", value: "#dbc58f" },
  { name: "Midnight AB", value: "#1f343c" },
];

const defaultColor = "#e33a35";

export function Editor() {
  const { config, setConfig, cells, paintMap, paintCell, clear } = useGrid();
  const [selectedColor, setSelectedColor] = useState<string | null>(defaultColor);
  const colorCounts = useMemo(() => countColors(paintMap), [paintMap]);
  const placedCount = Object.values(colorCounts).reduce(
    (total, count) => total + count,
    0,
  );

  return (
    <div className="app-shell">
      <Header />
      <main className="workspace">
        <Sidebar>
          <div className="sidebar-intro">
            <img className="intro-flourish" src="/logo.png" alt="" />
            <div className="intro-copy">
              <p className="eyebrow">The bedazzling atelier</p>
              <h1>Make a little <em>magic.</em></h1>
              <p>
                Choose a grid, pick your stones, then sketch the sparkle before
                you set it.
              </p>
            </div>
          </div>
          <GridControls config={config} onChange={setConfig} />
          <Palette
            colors={palette}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        </Sidebar>

        <section className="editor-panel" aria-labelledby="canvas-title">
          <div className="canvas-heading">
            <div>
              <p className="eyebrow">The workroom</p>
              <h2 id="canvas-title">Your sparkle scheme</h2>
            </div>
            <div className="design-stats" aria-label="Design statistics">
              <span>
                <strong>{placedCount}</strong> placed
              </span>
              <span>
                <strong>{cells.length}</strong> total
              </span>
            </div>
          </div>

          <Toolbar
            selectedColor={selectedColor}
            fallbackColor={defaultColor}
            hasPaint={placedCount > 0}
            onSelectColor={setSelectedColor}
            onClear={clear}
            onExport={() => downloadGridSVG(cells, paintMap, config)}
          />

          <GridCanvas
            cells={cells}
            config={config}
            paintMap={paintMap}
            onPaint={(cellId) => paintCell(cellId, selectedColor)}
          />

          <footer className="canvas-footer">
            <div className="legend">
              {Object.entries(colorCounts).length === 0 ? (
                <span className="empty-legend">Your color count will appear here.</span>
              ) : (
                Object.entries(colorCounts).map(([color, count]) => (
                  <span className="legend-item" key={color}>
                    <i style={{ backgroundColor: color }} />
                    {count}
                  </span>
                ))
              )}
            </div>
            <span className="tip">Tip: drag across stones to paint faster.</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Editor;
