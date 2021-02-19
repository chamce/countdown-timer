const meeting = document.querySelector('.meeting');
const countdown = document.querySelector('.countdown');

function getCountdown() {
    // am I in a meeting or when is my next meeting
    let now = new Date();
    let hour = now.getHours();
    let day = now.getDay();
    if (hour >= 8 && hour < 17 && day >= 1 && day <= 5) {
        meeting.textContent = 'Your Awesome Inc meeting ends in:'
        calculate(now, -1);
    } else if (hour < 8 && day >= 1 && day <= 5) {
        meeting.textContent = 'You have an Awesome Inc meeting today in:'
        calculate(now, 0);
    } else if (hour >= 17 && day === 5) {
        meeting.textContent = 'You have an Awesome Inc meeting Monday in:'
        calculate(now, 3);
    } else if (day === 6) {
        meeting.textContent = 'You have an Awesome Inc meeting Monday in:'
        calculate(now, 2);
    } else {
        meeting.textContent = 'You have an Awesome Inc meeting tomorrow in:'
        calculate(now, 1);
    }
}

function calculate(now, days) {
    if (days === -1) {
        // get date of 17 o'clock today
        let then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0);
        // get day, hour, minute, and second
        let x = dhms(now, then);
        // display timer
        displayTimer(x[0], x[1], x[2], x[3]);
    } else {
        // get date of 8 o'clock in 3 days, in 2 days, tomorrow, or today
        let then = new Date(now);
        then.setDate(then.getDate() + days);
        then = new Date(then.getFullYear(), then.getMonth(), then.getDate(), 8, 0, 0);
        // get day, hour, minute, and second
        let x = dhms(now, then);
        // display timer
        displayTimer(x[0], x[1], x[2], x[3]);
    }
}

function dhms(now, then) {
    // change dates to time in milliseconds since 1/1/1970
    now = now.getTime();
    then = then.getTime();
    // get countdown time in milliseconds
    let time = then - now;
    // converts ms to d, h, m, and s
    // floor in case fraction of d, h, m, or s
    // d = ms / ((s/ms) (m/s) (h/m) (d/h))
    let d = Math.floor(time / (1000 * 60 * 60 * 24));
    // h = (fraction of d) / ((s/ms) (m/s) (h/m))
    let h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // m = (fraction of h) / ((s/ms) (m/s))
    let m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    // s = (fraction of m) / (s/ms)
    let s = Math.floor((time % (1000 * 60)) / 1000);
    return [d, h, m, s];
}

function displayTimer(d, h, m, s) {
    // if day, hour, minute, or second < 10
    if (d < 10 || h < 10 || m < 10 || s < 10) {
        // add a 0 in front of them
        if (d < 10) {
            d = '0' + d;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
    }
    // display time
    countdown.textContent = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
    /* // if timer reaches end
    if (countdown.textContent === '00d 00h 00m 00s') {
        // play bell
        let audio = new Audio('../css/bell.wav');
        audio.play();
    }*/
}

// get countdown when page loads
getCountdown();
// get countdown every second
setInterval(getCountdown, 1000);