



interface IBubbletext {
    text: string;
}
const BubbleText:React.FC<IBubbletext> = ({text}) => {
  return (
    <p className="text-5xl md:text-6xl font-bold ">
      {text.split("").map((child, idx) => (
        <span className="BubbleText" key={idx}>
          {child}
        </span>
      ))}
    </p>
  );
};

export default BubbleText;