import './popup.scss'

export default function ImportBuildFailAlert({state}) {

    return (
      <>
        {state.status ? (
          <div
            className="alert importbuildfail"
            style={{
              animationDuration: `${state.mili / 1000}s`,
            }}
          >
            <div className="checkmark-wrapper">Failed to load build</div>
          </div>
        ) : null}
      </>
    );
  }