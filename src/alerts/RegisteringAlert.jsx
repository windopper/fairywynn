import "./popup.scss";

export default function RegisteringAlert({state}) {


  return (
    <>
      {state.status ? <div className="alert registering" style={{
          animationDuration: `${state.mili / 1000}s`
      }}>
        <div className="checkmark-wrapper"><i className="fa-solid fa-check"></i></div>
        <div style={{
          marginRight: '20px'
        }}>Add <span style={{
          fontWeight: 'bold'
        }}>{state.content}</span> to your build</div>
        </div> : null}
    </>
  );
}
