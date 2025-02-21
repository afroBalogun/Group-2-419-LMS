
const ProgressBar = ({ progress }) => {




  return (
    <div className="progress-bar">
      <div className="progress-text">{progress}%</div>
      <div className="progress-filler" style={{ '--progress': `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
