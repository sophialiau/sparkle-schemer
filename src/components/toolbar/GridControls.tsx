import type { GridConfig, GridType } from "../../types/grid";

type GridControlsProps = {
  config: GridConfig;
  onChange: (config: GridConfig) => void;
};

type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function NumberField({ label, value, min, max, onChange }: NumberFieldProps) {
  return (
    <label className="number-field">
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (Number.isFinite(next)) {
            onChange(Math.min(max, Math.max(min, next)));
          }
        }}
      />
    </label>
  );
}

export function GridControls({ config, onChange }: GridControlsProps) {
  const updateType = (type: GridType) => onChange({ ...config, type });
  const updateNumber = (key: "rows" | "cols" | "gap", value: number) =>
    onChange({ ...config, [key]: value });

  return (
    <section className="control-section" aria-labelledby="grid-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 1</p>
          <h2 id="grid-title">Shape your grid</h2>
        </div>
      </div>

      <div className="segmented-control" aria-label="Grid pattern">
        <button
          type="button"
          className={config.type === "square" ? "active" : ""}
          aria-pressed={config.type === "square"}
          onClick={() => updateType("square")}
        >
          <span className="grid-icon square-icon" aria-hidden="true" />
          Square
        </button>
        <button
          type="button"
          className={config.type === "honeycomb" ? "active" : ""}
          aria-pressed={config.type === "honeycomb"}
          onClick={() => updateType("honeycomb")}
        >
          <span className="grid-icon honeycomb-icon" aria-hidden="true" />
          Honeycomb
        </button>
      </div>

      <div className="number-grid">
        <NumberField
          label="Rows"
          value={config.rows}
          min={2}
          max={30}
          onChange={(value) => updateNumber("rows", value)}
        />
        <NumberField
          label="Columns"
          value={config.cols}
          min={2}
          max={30}
          onChange={(value) => updateNumber("cols", value)}
        />
        <NumberField
          label="Spacing"
          value={config.gap}
          min={0}
          max={12}
          onChange={(value) => updateNumber("gap", value)}
        />
      </div>
      <p className="control-hint">Changing the grid starts a fresh design.</p>
    </section>
  );
}

export default GridControls;
