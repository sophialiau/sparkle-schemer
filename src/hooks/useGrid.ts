import { useCallback, useEffect, useMemo, useState } from "react";
import { Cell } from "../types/cell";
import { GridConfig, PaintMap } from "../types/grid";
import { buildSquareGrid } from "../utils/buildSquareGrid";
import { buildHoneycombGrid } from "../utils/buildHoneycombGrid";

type UseGridReturn = {
  config: GridConfig;
  setConfig: (updater: GridConfig | ((c: GridConfig) => GridConfig)) => void;
  cells: Cell[];
  paintMap: PaintMap;
  paintCell: (cellId: string, color: string | null) => void;
  clear: () => void;
};

const defaultConfig: GridConfig = {
  type: "square",
  rows: 8,
  cols: 8,
  radius: 10,
  gap: 2,
};

export function useGrid(initialConfig?: GridConfig): UseGridReturn {
  const [config, setConfigState] = useState<GridConfig>(
    initialConfig ?? defaultConfig
  );

  const [paintMap, setPaintMap] = useState<PaintMap>({});

  const builder = useCallback((c: GridConfig) => {
    return c.type === "honeycomb"
      ? buildHoneycombGrid(c)
      : buildSquareGrid(c);
  }, []);

  const cells = useMemo(() => builder(config), [builder, config]);

  // wipe paint map whenever grid config changes
  useEffect(() => {
    setPaintMap({});
  }, [config]);

  const setConfig = useCallback(
    (updater: GridConfig | ((c: GridConfig) => GridConfig)) => {
      setConfigState((prev) =>
        typeof updater === "function" ? (updater as any)(prev) : updater
      );
      // paintMap will be wiped by the effect triggered from config change
    },
    []
  );

  const paintCell = useCallback((cellId: string, color: string | null) => {
    setPaintMap((prev) => ({ ...prev, [cellId]: color }));
  }, []);

  const clear = useCallback(() => setPaintMap({}), []);

  return {
    config,
    setConfig,
    cells,
    paintMap,
    paintCell,
    clear,
  };
}

export default useGrid;
