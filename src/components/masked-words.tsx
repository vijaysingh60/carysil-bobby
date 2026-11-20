import { Fragment, type CSSProperties } from "react";

/**
 * Splits text into words that each rise out of their own mask when the page
 * loads (CSS only, timed after the intro curtain; see .mask / .mask-word).
 * `start` offsets the stagger so several lines can run as one sequence.
 * Real spaces sit between the masks so the heading reads correctly to screen readers.
 */
export function MaskedWords({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`block ${className}`}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {/* -mx cancels the mask's side padding so word spacing stays natural */}
          <span className="mask -mx-[0.06em]">
            <span className="mask-word" style={{ "--i": start + i } as CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
