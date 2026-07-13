import { useEffect, useState } from "react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-bootstrap-icons";
import { useMediaQuery } from "@mui/material";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  breakpoint?: number;
};

export function Carousel<T>({
  items,
  renderItem,
  breakpoint = 900,
}: CarouselProps<T>) {
  const isMobile = useMediaQuery(`(max-width:${breakpoint}px)`);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= items.length) {
      setIndex(0);
    }
  }, [items.length, index]);

  if (!isMobile) {
    return (
      <div className="flex justify-between w-full">
        {items.map((item, index) => renderItem(item, index))}
      </div>
    );
  }

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  return (
    <>
      {items[index] && renderItem(items[index], index)}

      {items.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setIndex((i) => i - 1)}
            className="bg-transparent border-0 px-1"
          >
            <ArrowLeftSquare size={24} color={canPrev ? "black" : "gray"} />
          </button>

          <span>
            {index + 1} / {items.length}
          </span>

          <button
            type="button"
            disabled={!canNext}
            onClick={() => setIndex((i) => i + 1)}
            className="bg-transparent border-0 px-1"
          >
            <ArrowRightSquare size={24} color={canNext ? "black" : "gray"} />
          </button>
        </div>
      )}
    </>
  );
}
