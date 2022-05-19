export default function Alert(props) {
  const classes = props.classes
    ? props.classes
    : "bg-green-400 p-2 text-center";
  return <div className={classes}>{props.children}</div>;
}
