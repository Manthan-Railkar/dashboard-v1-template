import { Fragment, cloneElement, isValidElement, type ReactNode } from "react";

/** Wraps every character in a span (kept inside nowrap word spans) so GSAP can type it in. */
function walk(n: ReactNode): ReactNode {
  if (typeof n === "string")
    return n.split(/(\s+)/).map((tok, i) =>
      /^\s+$/.test(tok) || tok === "" ? tok : (
        <span key={i} className="inline-block whitespace-nowrap">
          {[...tok].map((c, j) => <span key={j} data-char className="inline-block">{c}</span>)}
        </span>
      ),
    );
  if (Array.isArray(n)) return n.map((c, i) => <Fragment key={i}>{walk(c)}</Fragment>);
  if (isValidElement<{ children?: ReactNode }>(n)) return cloneElement(n, undefined, walk(n.props.children));
  return n;
}

export default function Split({ children, label }: { children: ReactNode; label?: string }) {
  return <span data-split aria-label={label}>{walk(children)}</span>;
}
