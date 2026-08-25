// deals with painting and erasing stuffs
type ToolToggleProps = {
  selectedColor: string | null;
  onBrush: () => void;
  onErase: () => void;
};

export function ToolToggle({ selectedColor, onBrush, onErase }: ToolToggleProps) {
  const erasing = selectedColor === null;

  return (
    <div className="tool-toggle" aria-label="Drawing tool">
      <button
        type="button"
        className={!erasing ? "active" : ""}
        aria-pressed={!erasing}
        onClick={onBrush}
      >
        <span aria-hidden="true">✦</span> Place
      </button>
      <button
        type="button"
        className={erasing ? "active" : ""}
        aria-pressed={erasing}
        onClick={onErase}
      >
        <span aria-hidden="true">◇</span> Erase
      </button>
    </div>
  );
}

export default ToolToggle;
