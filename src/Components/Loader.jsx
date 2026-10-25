
function Loader() {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <span className="loader" />
      <p>Loading photos...</p>
    </div>
  );
}

export default Loader;
