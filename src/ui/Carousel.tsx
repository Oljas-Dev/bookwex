import { useEffect, useState } from "react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-bootstrap-icons";
import { useMediaQuery } from "@mui/material";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
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
    return <div className="flex justify-between">{items.map(renderItem)}</div>;
  }

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  return (
    <>
      {items[index] && renderItem(items[index])}

      {items.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
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
