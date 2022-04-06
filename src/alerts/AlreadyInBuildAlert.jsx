export default function AlreadyBuildAlert({state}) {
    return (
        <>
          {state.status ? <div className="alert alreadyinbuild" style={{
              animationDuration: `${state.mili / 1000}s`
          }}>
            <div className="checkmark-wrapper"><i className="fa-solid fa-triangle-exclamation"></i></div>
            <div style={{
              marginRight: '20px'
            }}><span style={{
              fontWeight: 'bold'
            }}>{state.content}</span> is already in your build</div>
            </div> : null}
        </>
      );
}