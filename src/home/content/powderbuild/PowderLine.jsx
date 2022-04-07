import "./PowderApplyDashBoard.scss";

const elementEmoji = {
  fire: "✹",
  earth: "✤",
  water: "❉",
  air: "❋",
  thunder: "✦",
};

const elementColor = {
  neutral: "RGB(252, 165, 14)",
  fire: "RGB(255, 85, 83)",
  earth: "RGB(4, 155, 5)",
  water: "RGB(70, 223, 223)",
  air: "RGB(228, 226, 227)",
  thunder: "RGB(255, 255, 85)",
};

export default function PowderLine({ type }) {
  const _E = elementEmoji[type];

  return (
    <div
      className="powderline"
      style={{
        color: `${elementColor[type]}`,
      }}
    >
      <EmojiDiv content={'I'} emoji={_E} />
      <EmojiDiv content={'II'} emoji={_E} />
      <EmojiDiv content={'III'} emoji={_E} />
      <EmojiDiv content={'IV'} emoji={_E} />
      <EmojiDiv content={'V'} emoji={_E} />
      <EmojiDiv content={'VI'} emoji={_E} />
    </div>
  );
}

function EmojiDiv({ emoji, content }) {
  return (
    <span 
    style={{
        width: '50px',
        margin: '5px 10px',
    }} 
    className='emojidiv'
    >
      <div>{emoji}</div>
      <span style={{
          position: 'relative',
          top: '-75px',
          left: '36px',
          fontSize: '1.5rem',
          fontWeight: '700',
      }}>{content}</span>
    </span>
  );
}
