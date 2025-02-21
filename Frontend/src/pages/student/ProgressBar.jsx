
const ProgressBar = ({ progress }) => {




  return (
    <div className="progress-bar">
      <div className="progress-text">
        <div className="default-text">{progress}%</div>
        <div
          className="white-text"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      <div
        className="progress-filler"
        style={{ '--progress': `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
