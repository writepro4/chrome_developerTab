$(document).ready(function () {
        FlipClock.Lang.Custom = { days:' ', hours:' ', minutes:' ', seconds:' ' };
        var opts = {
            clockFace: 'DailyCounter',
            countdown: true,
            language: 'Custom',
            size:"sm"
        };
        var countdown = 1616135700 - ((new Date().getTime())/1000); // from: 03/19/2021 03:35 pm +0900
        countdown = Math.max(1, countdown);
        $('.clock-builder-output').FlipClock(countdown, opts);
});
