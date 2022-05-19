export default function Button(props) {
  const classes = props.classes
    ? props.classes
    : "px-4 py-1 shadow shadow-zinc-400 rounded-sm transition hover:bg-sky-200";

  return (
    <>
      <button
        disabled={props.toDisable}
        onClick={props.passedEvent}
        className={`${classes} ${props.toDisable ? "transslucent" : ""}`}
      >
        {props.children}
      </button>
    </>
  );
}
