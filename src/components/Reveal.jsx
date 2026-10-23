import useReveal from "../hooks/useReveal.js";

// Wrapper that fades/slides its child in on scroll. `as` picks the tag.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`${className} rv`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
