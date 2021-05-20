document.getElementById("60").addEventListener("click", targetTimeSetting);
document.getElementById("120").addEventListener("click", targetTimeSetting);
document.getElementById("180").addEventListener("click", targetTimeSetting);
document.getElementById("240").addEventListener("click", targetTimeSetting);
document.getElementById("300").addEventListener("click", targetTimeSetting);
document.getElementById("360").addEventListener("click", targetTimeSetting);
document.getElementById("420").addEventListener("click", targetTimeSetting);
document.getElementById("480").addEventListener("click", targetTimeSetting);
document.getElementById("goalSettingButton").addEventListener("click", hideGoalSettingButton);

//목표 시간 설정을 누르면 ajax로 wakatime 시간 progress바에 업데이트
function targetTimeSetting(value) {
    console.log("아예 실행안됨");
    //목표 시간 가져와서 로컬에 저장
    const targetTime = parseInt(value.target.id);


    localStorage.setItem("targetTime", targetTime)


    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    const totalToday = year + "-" + month + "-" + date;

    let hour;
    let minute;

    //저장 후 wakatime 데이터 다시 받아옴
    $.ajax({
        type: 'get'
        , url: `https://wakatime.com/api/v1/users/current/summaries?start=${totalToday}&end=${totalToday}`
        , success: function (data) {


            try {
                hour = parseInt(data.data[0].operating_systems[0].hours);
                minute = parseInt(data.data[0].operating_systems[0].minutes);


            } catch (e) {
                hour = 0;
                minute = 0;

            }


            let wakahourtime = 0;


            //최대 10시간
            switch (hour) {

                case 0 :

                    wakahourtime = 6;
                    break;

                case 1 :

                    wakahourtime = 60;
                    break;

                case 2 :

                    wakahourtime = 120;
                    break;
                case 3 :

                    wakahourtime = 180;
                    break;
                case 4 :

                    wakahourtime = 240;
                    break;
                case 5 :

                    wakahourtime = 300;
                    break;
                case 6 :

                    wakahourtime = 360;
                    break;
                case 7 :

                    wakahourtime = 420;
                    break;
                case 8 :

                    wakahourtime = 480;
                    break;
                case 9 :

                    wakahourtime = 540;
                    break;
                case 10 :

                    wakahourtime = 600;
                    break;
            }


            //목표 시간
            let targetTime;

            //저장된 목표 시간 가져오기
            if (localStorage.getItem("targetTime") == null) {
                //기본 1시간
                targetTime = 60;
            } else {
                targetTime = localStorage.getItem("targetTime");
                console.log("저장된 시간 불러오기 " + targetTime);
            }


            //wakatime 하루 총 코딩 시간 변수
            const wakaTimeProgressRate = wakahourtime + minute;
            console.log("오늘 코딩시간" + wakaTimeProgressRate)


            let percentAmount = wakaTimeProgressRate / targetTime * 100;
            if (percentAmount > 100) {
                console.log("값 변환")
                percentAmount = 100;
            }
            console.log("progress" + percentAmount);


            //progress 바 작동 코드
            $('.progress').progress({percent: percentAmount});

            const targetTimeConversion = targetTime / 60;

            $('.targetTime').text("Okay~ " + targetTimeConversion + "Time!");


        }
        //에러 종류 조건문으로 걸러내기
        , error: function (jqXHR, exception) {

            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status === 400) {
                alert('Server understood the request, but request content was invalid. [400]');
            } else if (jqXHR.status === 401) {
                $.toast('<h4>If you would like to set goals, please log in to WakaTime.!</h4>', {type: 'danger', duration: 1500});
            } else if (jqXHR.status === 403) {
                alert('Forbidden resource can not be accessed. [403]');
            } else if (jqXHR.status === 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status === 500) {
                alert('Internal server error. [500]');
            } else if (jqXHR.status === 503) {
                alert('Service unavailable. [503]');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed. [Failed]');
            } else if (exception === 'timeout') {
                alert('Time out error. [Timeout]');
            } else if (exception === 'abort') {
                alert('Ajax request aborted. [Aborted]');
            } else {
                alert('Uncaught Error.n');
            }

        }
    });



}

function hideGoalSettingButton() {
    console.log("목표설정버튼  삭제 ")
    let check = localStorage.getItem("goalSettingButton");
    console.log("차트 값 확인 : " + check);

    if (check === null) {
        console.log("널");
        //사용자가 버튼을 처음 눌렀을때
        localStorage.setItem("goalSettingButton", true);
        $('#goalSetting').remove();
    } else if (check === 'true') {
        console.log("트루");
        localStorage.setItem("goalSettingButton", false);
        //사용자가 다시 차트를 열려 할때
        location.reload();
    } else if (check === 'false') {
        console.log("펄스");
        //사용자가 다시 차트를 닫을때
        localStorage.setItem("goalSettingButton", true);
        $('#goalSetting').remove();
    } else {
        console.log("띠용");
    }
    console.log("??")

}
