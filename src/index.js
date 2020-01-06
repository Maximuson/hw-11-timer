import './styles.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.time = new Date() - this.targetDate;
    this.formatTime = this._getTime(this.time);
    this.refs = {
      timer: document.querySelector(this.selector),
    };
    this._renderTimer();
    this.start();
  }
  _getTime(time) {
    const days = Math.abs(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = Math.abs(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = Math.abs(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = Math.abs(Math.floor((time % (1000 * 60)) / 1000));

    return {
      days,
      hours,
      mins,
      secs,
    };
  }
  _updateTime() {
    this.time = new Date() - this.targetDate;
    this.formatTime = this._getTime(this.time);
  }
  _getTimerHTML() {
    return `
    <div class="field">
        <span class="value" data-value="days">${this.formatTime.days}</span>
        <span class="label">Days</span>
      </div>

      <div class="field">
        <span class="value" data-value="hours">${this.formatTime.hours}</span>
        <span class="label">Hours</span>
      </div>

      <div class="field">
        <span class="value" data-value="mins">${this.formatTime.mins}</span>
        <span class="label">Minutes</span>
      </div>

      <div class="field">
        <span class="value" data-value="secs">${this.formatTime.secs}</span>
        <span class="label">Seconds</span>
      </div>
      `;
  }
  _renderTimer() {
    this.refs.timer.insertAdjacentHTML('beforeend', this._getTimerHTML());
    this.refs.days = document.querySelector(
      `${this.selector} [data-value="days"]`,
    );
    this.refs.hours = document.querySelector(
      `${this.selector} [data-value="hours"]`,
    );
    this.refs.mins = document.querySelector(
      `${this.selector} [data-value="mins"]`,
    );
    this.refs.secs = document.querySelector(
      `${this.selector} [data-value="secs"]`,
    );
    console.log(this.refs);
  }
  tick() {
    this._updateTime();
    this.refs.days.innerText = this.formatTime.days;
    this.refs.hours.innerText = this.formatTime.hours;
    this.refs.mins.innerText = this.formatTime.mins;
    this.refs.secs.innerText = this.formatTime.secs;
  }
  start() {
    setInterval(this.tick.bind(this), 1000);
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2020'),
});
