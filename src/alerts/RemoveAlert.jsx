export default function RemoveAlert({ state }) {
  return (
    <>
      {state.status ? (
        <div
          className="alert removing"
          style={{
            animationDuration: `${state.mili / 1000}s`,
          }}
        >
          <div className="checkmark-wrapper">
            <i className="fa-solid fa-check"></i>
          </div>
          <div
            style={{
              marginRight: "20px",
            }}
          >
            Remove{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {state.content}
            </span>{" "}
            from your build
          </div>
        </div>
      ) : null}
    </>
  );
}
