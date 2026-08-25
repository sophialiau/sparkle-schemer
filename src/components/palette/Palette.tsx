import ColorSwatch from "./ColorSwatch";

export type PaletteColor = {
  name: string;
  value: string;
};

type PaletteProps = {
  colors: PaletteColor[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
};

export function Palette({ colors, selectedColor, onSelect }: PaletteProps) {
  return (
    <section className="control-section" aria-labelledby="palette-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 2</p>
          <h2 id="palette-title">Pick a stone</h2>
        </div>
        <span className="color-count">{colors.length} colors</span>
      </div>
      <div className="palette-grid">
        {colors.map((color) => (
          <ColorSwatch
            key={color.value}
            color={color.value}
            label={color.name}
            selected={selectedColor === color.value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default Palette;
