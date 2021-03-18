$(document).ready(function () {
    FlipClock.Lang.Custom = { days:'Days', hours:'Hours', minutes:'Minutes', seconds:'Seconds' };
    var opts = {
        clockFace: 'DailyCounter',
        countdown: true,
        language: 'Custom',

    };
    var countdown = 1616043960 - ((new Date().getTime())/1000); // from: 03/18/2021 02:06 pm +0900
    countdown = Math.max(1, countdown);
    $('.clock-builder-output').FlipClock(countdown, opts);
});

//하악 하어댜러ㅑㄷ러댜러댜