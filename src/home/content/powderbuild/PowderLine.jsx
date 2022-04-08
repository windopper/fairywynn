import "./PowderApplyDashBoard.scss";
import { useDispatch } from 'react-redux'
import { useCallback } from "react";
import { addpowder } from "../../reducer/itembuild";

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

export default function PowderLine({ type, equipType }) {
  
  const _E = elementEmoji[type];

  const WHITELINE = () => <span style={{
    marginLeft: '7px',
    color: 'white',
    opacity: '0.4'
  }}>|</span>

  return (
    <div
      className="powderline"
      style={{
        color: `${elementColor[type]}`,
      }}
    >
      <EmojiDiv content={'I'} emoji={_E}/><WHITELINE />
      <EmojiDiv content={'II'} emoji={_E} /><WHITELINE />
      <EmojiDiv content={'III'} emoji={_E} /><WHITELINE />
      <EmojiDiv content={'IV'} emoji={_E} /><WHITELINE />
      <EmojiDiv content={'V'} emoji={_E} /><WHITELINE />
      <EmojiDiv content={'VI'} emoji={_E} />
    </div>
  );


  function EmojiDiv({ emoji, content }) {

    const dispatch = useDispatch()
    
    const callback = (powder) => dispatch(addpowder(equipType, powder))
  
    return (
      <span 
      style={{
          width: '50px',
          margin: '5px 10px',
          transitionDuration: '0.2s',
      }} 
      className='emojidiv'
      onClick={() => callback(emoji+content)}
      onMouseEnter={(e) => e.currentTarget.style.textShadow = 
        `0 0 42px ${elementColor[type]}
      , 0 0 82px ${elementColor[type]}
      , 0 0 92px ${elementColor[type]}
      , 0 0 102px ${elementColor[type]}
      , 0 0 151px ${elementColor[type]}`}
      onMouseLeave={(e) => e.currentTarget.style.textShadow = ''}
      >
        <div>{emoji}</div>
        <span style={{
            position: 'relative',
            top: '-75px',
            left: '36px',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'rgb(217, 217, 217)',
        }}>{content}</span>
      </span>
    );
  }
}


