var domtimer, domtitle;
var Timer = (function () {
    function Timer(timerdatas, repeat) {
        if (repeat === void 0) { repeat = false; }
        this.timerdatas = timerdatas;
        this.repeat = repeat;
        this.timerId = false;
        this.reset();
    }
    Timer.prototype.start = function (status) {
        if (status === void 0) { status = this.status; }
        if (status >= this.timerdatas.length) {
            if (status == this.timerdatas.length && this.repeat)
                status = 0;
            else {
                if (this.timerId)
                    window.clearInterval(this.timerId);
                this.timerId = false;
                return;
            }
        }
        this.status = status;
        domtitle.innerHTML = this.timerdatas[this.status].title;
        domtitle.style.color = this.timerdatas[this.status].color;
        domtimer.style.color = this.timerdatas[this.status].color;
        this.count = this.timerdatas[this.status].start;
        this.display();
        if (!this.timerId)
            this.timerId = window.setInterval(function (ti) { return ti.tick(); }, 1000, this);
    };
    Timer.prototype.tick = function () {
        if (this.timerdatas[this.status].end == "INF" || this.count - this.timerdatas[this.status].end < 0)
            this.count++;
        else
            this.count--;
        this.display();
        if (this.count == this.timerdatas[this.status].end)
            this.start(this.status + 1);
    };
    Timer.prototype.reset = function () {
        if (this.timerId)
            window.clearInterval(this.timerId);
        this.timerId = false;
        this.status = 0;
        this.count = this.timerdatas[this.status].start;
        domtitle.innerHTML = "";
        this.display();
    };
    Timer.prototype.display = function () {
        domtimer.innerHTML = ((this.count / 60) | 0).toZeroString(2) + ":" + (this.count % 60).toZeroString(2);
    };
    return Timer;
})();
Number.prototype.toZeroString = function (digit) {
    if (this >= Math.pow(10, digit))
        return this;
    return ((Math.pow(10, digit)).toString() + this).slice(0 - digit);
};
window.onload = function () {
    domtimer = document.getElementById("timer");
    domtitle = document.getElementById("timer_title");
    var timer = new Timer([
        { start: 300, end: 60, title: "口演時間", color: "Green" },
        { start: 60, end: 0, title: "口演時間", color: "Green" },
        { start: 180, end: 0, title: "討論時間", color: "Yellow" },
        { start: 0, end: "INF", title: "時間超過", color: "Red" }
    ]);
    timer.start();
};
