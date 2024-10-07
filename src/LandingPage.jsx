import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Logo from "./assets/logo.png";

function LandingPage() {
  const MAX_TIME = 60;
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(MAX_TIME);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleStop();
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(new Date().toLocaleTimeString());
    setEndTime('');
  };

  const handleStop = () => {
    setIsRunning(false);
    setEndTime(new Date().toLocaleTimeString());
    setSeconds(MAX_TIME);
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-3">
          Firma
          <img src={Logo} alt="Firma" className="img-fluid ms-2 logo"/>
        </div>
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-rectangle-list me-2"></i>
            <label className="me-2">Gerätenummer</label>
            <select className="form-control input-box">
              <option value="123562">123562</option>
              <option value="344334">344334</option>
              <option value="547549">547549</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-user me-2"></i>
            <label className="me-2">Bediener</label>
            <select className="form-control input-box">
              <option value="Kanthan Kavin">Kanthan Kavin</option>
              <option value="Jacky">Jacky</option>
              <option value="Arnold">Arnold</option>
            </select>
          </div>
        </div>
        <div className="col-md-3 mt-1 text-end">
          <button
            className={`btn btn-sm w-25 btn-${isRunning ? 'light' : 'success'} btn-lg`}
            onClick={handleStart}
            disabled={isRunning ? true : false}>
            <b>START</b>
          </button>
        </div>
      </div>

      <div className='row bg-body-secondary'>
        <div className="col-md-4 mt-3">
          <div className='d-flex align-items-center'>
            <i className="fas fa-calendar-alt me-2"></i>
            <label className='me-2'>Datum: </label>
            <div className="form-group">
              <input
                type="date"
                className="form-control input-box"
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3 mb-3 ms-5 progress-par">
          <CircularProgressbar
            value={MAX_TIME - seconds}
            maxValue={MAX_TIME}
            text={`00:${seconds < 10 ? `0${seconds}` : seconds}`}
            styles={buildStyles({
              pathColor: `gray`,
              textColor: '#00dc3a',
              trailColor: '#00dc3a',
              textSize: '20',
            })}
          />
          <div className='control-btn'
            onClick={handlePlayPause}>
            {isRunning ? <i className="fa-regular fa-circle-pause"></i> 
                       : <i className="fa-regular fa-circle-play"></i>}
          </div>
        </div>
        <div className="col-md-4 mt-4 ms-auto">
          <div className="d-flex align-items-center mb-4 ms-4">
            <i className="fa-regular fa-clock me-2"></i>
            <label className='me-2'>Anfangzeit:</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-box"
                value={startTime || '--:--:--'}
                readOnly
              />
            </div>
          </div>
          <div className="d-flex align-items-center mb-4 ms-5">
            <i className="fa-regular fa-clock me-2"></i>
            <label className='me-2'>Endzeit:</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-box"
                value={endTime || '--:--:--'}
                readOnly
              />
            </div>
          </div>
          {isRunning && (
            <div className="text-end me-3">
              <button
                className={`btn btn-sm btn-danger btn-lg w-25`}
                onClick={handleStop}
              >
                <b>STOP</b>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
