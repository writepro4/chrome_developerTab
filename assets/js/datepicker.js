$("#datepicker").datepicker({
    onSelect: function (dateText, inst) {
        console.log("dateText" + dateText)
        console.log("inst" + inst)

        localStorage.setItem('datePicker', dateText);

        //사용자가 다시 차트를 닫을때
        localStorage.setItem("dateCheck", true);
        $("#dateDiv").css("display", "none");


        //TODO 리로드가 아니라 그냥 생성해야됨 css 에러 남 .

        var today = new Date();

        const words = dateText.split('/');

        var inYear = words[2];
        var inMonth = words[0];
        var inDate = words[1];

        console.log(inYear, inMonth, inDate)

        var stdDate = new Date(inYear, (inMonth - 1), inDate);
        var gapDate = stdDate.getTime() - today.getTime();

        var gapDay = Math.ceil(gapDate / (60 * 1000 * 60 * 24));

        if (gapDay < 0) {
            gapDay = -gapDay;
            // console.log(gapDay + "일 지났습니다.")
            $('#dday').text("D-day " + -gapDay);
        } else if (gapDay > 0) {
            // console.log(gapDay + "일 남았습니다.");
            $('#dday').text("D-day " + gapDay);
        } else if (gapDay == 0) {
            // console.log("당일 입니다.");
            $('#dday').text("D-day ");
        }

    }
});

$(document).ready(function () {

    console.log("데이트피피커")

    var today = new Date();
    let date = localStorage.getItem('datePicker');

    const words = date.split('/');
    var inYear = words[2];
    var inMonth = words[0];
    var inDate = words[1];

    var stdDate = new Date(inYear, (inMonth - 1), inDate);
    var gapDate = stdDate.getTime() - today.getTime();

    var gapDay = Math.ceil(gapDate / (60 * 1000 * 60 * 24));

    if (gapDay < 0) {
        gapDay = -gapDay;
        // console.log(gapDay + "일 지났습니다.")
        $('#dday').text("D-day " + -gapDay);
    } else if (gapDay > 0) {
        // console.log(gapDay + "일 남았습니다.");
        $('#dday').text("D-day " + gapDay);
    } else if (gapDay == 0) {
        // console.log("당일 입니다.");
        $('#dday').text("D-day ");
    }

});
