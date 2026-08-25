import ToolToggle from "./ToolToggle";

type ToolbarProps = {
  selectedColor: string | null;
  fallbackColor: string;
  hasPaint: boolean;
  onSelectColor: (color: string | null) => void;
  onClear: () => void;
  onExport: () => void;
};

export function Toolbar({
  selectedColor,
  fallbackColor,
  hasPaint,
  onSelectColor,
  onClear,
  onExport,
}: ToolbarProps) {
  return (
    <div className="canvas-toolbar">
      <ToolToggle
        selectedColor={selectedColor}
        onBrush={() => onSelectColor(selectedColor ?? fallbackColor)}
        onErase={() => onSelectColor(null)}
      />
      <div className="toolbar-actions">
        <button type="button" className="text-button" onClick={onExport}>
          Export SVG
        </button>
        <button
          type="button"
          className="text-button danger"
          onClick={onClear}
          disabled={!hasPaint}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
