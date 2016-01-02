var domtimer, domtitle;
var Timer = (function () {
    function Timer(timerdatas, repeat) {
        if (repeat === void 0) { repeat = false; }
        this.timerdatas = timerdatas;
        this.repeat = repeat;
        this.timerId = false;
        this.reset();
    }
    Timer.prototype.setTimer = function () {
        if (!this.timerId) {
            var self = this;
            this.timerId = window.setInterval(function () { self.tick(); }, 1000);
        }
    };
    Timer.prototype.clearTimer = function () {
        if (this.timerId)
            window.clearInterval(this.timerId);
        this.timerId = false;
    };
    Timer.prototype.start = function (status) {
        if (status === void 0) { status = this.status; }
        if (status >= this.timerdatas.length) {
            if (status == this.timerdatas.length && this.repeat)
                status = 0;
            else
                return this.clearTimer();
        }
        this.status = status;
        domtitle.innerHTML = this.timerdatas[this.status].title;
        domtitle.style.backgroundColor = this.timerdatas[this.status].color;
        domtimer.style.color = this.timerdatas[this.status].color;
        this.count = this.timerdatas[this.status].start;
        this.display();
        this.setTimer();
    };
    Timer.prototype.tick = function () {
        if (this.timerdatas[this.status].end == "INF" || this.count - this.timerdatas[this.status].end < 0)
            this.count++;
        else
            this.count--;
        this.display();
        if (this.count == this.timerdatas[this.status].end) {
            if (this.timerdatas[this.status].sound)
                this.timerdatas[this.status].sound.play();
            this.start(this.status + 1);
        }
    };
    Timer.prototype.reset = function () {
        this.clearTimer();
        this.status = 0;
        domtitle.innerHTML = this.timerdatas[this.status].title;
        domtitle.style.backgroundColor = this.timerdatas[this.status].color;
        domtimer.style.color = this.timerdatas[this.status].color;
        this.count = this.timerdatas[this.status].start;
        this.display();
    };
    Timer.prototype.display = function () {
        domtimer.innerHTML = "<span class='mono'>" + ((this.count / 60) | 0) + "</span>:<span class='mono'>" + (this.count % 60).to2digit() + "</span>";
    };
    return Timer;
})();
Number.prototype.to2digit = function () {
    if (this >= 100)
        return this;
    return ("00" + this).slice(-2);
};
window.onload = function () {
    domtimer = document.getElementById("timer");
    domtitle = document.getElementById("timer_title");
    var gong_played1 = new Audio("data:audio/mp3;base64,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");
    var gong_played2 = new Audio("data:audio/mp3;base64,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/BpgrxdMXJh91mQDsG5ompuj5ND2/xZtZYgq//ySSIX/1kInM0xLCElHKSp0//tIxFOADLXHd+W07cGcOO489qm4+LSf+ghS0j//xg/i/mCkwu3//7/uZ///T+eXm//1/RiLH1T//1qRSQyONFQkgB6HqaoxHILevWPhjzjtUG0UNEhKrpieAnS1MusGE3s49Cl/9x6jFHA2/pMoZwqg1dvOAhKvSVJJxUat/8Tj4Vm/9WkTeQth4Nijv////t////10///02lav/6v7x1/c2BwmgBzHItSwO5q/aoSVB846ajoTMo0zIpHeoyBkNVL4UJDWyhPjL/7j2kH/Xx4hSHslDwbh+SmsyMtFJ//qNHh63/rkLeQNQJxYit//+d+ev//83+2u///0//tIxGCADFnHb6a1TdGSPu001qm4Zczp///Jqv8//8sqE291TBBJ9f/MNXgqnlPVqQG0l3mC1azMLeFebuf1CSi+tFMQMzb/0BMRiDjPv+t5OC5pfWbGy/6kCx//UT8iP/7LczbyplmY4xssl//+360v//6v76Nb/+r9K7T7dv//onvgGdjNS5Q5e2JmVOnW622xo0Dd9wIa4mqxSx90f+Mzv3+HC/+8QIks+I7He2u1qTF7z0+rlzVqWfQGTadL41R9Q4uBoR73nZ/q88RBZiKZdRnh4EwdPK+NuWKmz2SkelP/4mv/3z6GXud+3MbJil7Yhvb9duBXw86v//tIxHAADNn3YzT2gALhwC5DGPABB/9P/////jWtxtzb15pNUkiYhV28d43BiS1pCiYiWzT//////f9/7/7xnX3i2b6t943J8Yp8T0krBGF7wauz1e//CBEIjH559K61KXpO00VjHPNMZYUZ3dHOnpqrbKKgckVX/kG60AkFxWLSzI7//qqiS0oJyO39GNZ6KwhNmhCLlYabU82iKzU7ajz1/+n06d3Tbr6I392zTT0nfTron3ZWPI9c3vM///+CsazDlZYn1VLaZpq3WqtSRQZvEczPJyD6ktqDMkXgp0mZnR+cMej5ECYvJEard//kT4zf/+j+aWWJBc13//tIxFOADMoBeLwzgAmWvq+kFqm4/87feftqVMX/9F3crvU6Q63Nr+m92/pzmsc+nRb3NLh14KQj0qqoKmpFVNryfSLMT/szprsyHlaObhk14zb2dVecxKI4LSpdrVNZA/db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");
    var timer = new Timer([
        { start: 300, end: 60, title: "口演時間", color: "lime", sound: gong_played1 },
        { start: 60, end: 0, title: "口演時間", color: "lime", sound: gong_played2 },
        { start: 180, end: 0, title: "討論時間", color: "Yellow", sound: gong_played1 },
        { start: 0, end: "INF", title: "時間超過", color: "Red" }
    ]);
    var dombutton = document.createElement("button");
    dombutton.innerHTML = "start";
    dombutton.addEventListener("click", function () {
        if (this.innerHTML == "start") {
            gong_played1.play();
            timer.start();
            this.innerHTML = "reset";
        }
        else {
            timer.reset();
            this.innerHTML = "start";
        }
    });
    document.getElementById("buttons").appendChild(dombutton);
};
