type ColorSwatchProps = {
  color: string;
  label: string;
  selected: boolean;
  onSelect: (color: string) => void;
};

export function ColorSwatch({
  color,
  label,
  selected,
  onSelect,
}: ColorSwatchProps) {
  return (
    <button
      className="color-swatch"
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={() => onSelect(color)}
      title={label}
    >
      <span style={{ backgroundColor: color }} />
    </button>
  );
}

export default ColorSwatch;
