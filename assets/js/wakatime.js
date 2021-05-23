//7일전 날짜 구하는 방식
var nowDate = new Date();
var weekDate = nowDate.getTime() - (7 * 24 * 60 * 60 * 1000);
nowDate.setTime(weekDate);

var weekYear = nowDate.getFullYear();
var weekMonth = nowDate.getMonth() + 1;
var weekDay = nowDate.getDate();

if (weekMonth < 10) {
    weekMonth = "0" + weekMonth;
}
if (weekDay < 10) {
    weekDay = "0" + weekDay;
}

var resultDate = weekYear + "-" + weekMonth + "-" + weekDay;
// console.log("resultDate" + resultDate)

$(document).ready(function () {

    //오늘 날짜 구하는 함수
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let toDayDate = today.getDate();  // 날짜

    const totalToday = year + "-" + month + "-" + toDayDate;


    let hour;
    let minute;


    //wakatime 시간 데이터 받아오는 ajax 함수.
    $.ajax({
        type: 'get'
        , url: `https://wakatime.com/api/v1/users/current/summaries?start=${resultDate}&end=${totalToday}`
        , success: function (data) {

            // console.log(data)

            try {
                hour = parseInt(data.data[7].grand_total.hours);
                minute = parseInt(data.data[7].grand_total.minutes);


                distributionHeat = [];

                for (let i = 0; i < 8; i++) {
                    number = data.data[i].grand_total.minutes;
                    numberto = number.toString();
                    numberlength = numberto.length;
                    // console.log(numberlength)

                    if (numberlength == 1) {
                        number = "0" + number
                        // console.log(number);
                        distributionHeat.push(number);

                    } else {
                        distributionHeat.push(number);
                    }

                    // console.log(distributionHeat)

                }

                const _7DaysAgo = data.data[0].grand_total.hours + "." + distributionHeat[0]
                const _5DaysAgo = data.data[2].grand_total.hours + "." + distributionHeat[2]
                const _6DaysAgo = data.data[1].grand_total.hours + "." + distributionHeat[1]
                const _4DaysAgo = data.data[3].grand_total.hours + "." + distributionHeat[3]
                const _3DaysAgo = data.data[4].grand_total.hours + "." + distributionHeat[4]
                const _2DaysAgo = data.data[5].grand_total.hours + "." + distributionHeat[5]
                const _1DaysAgo = data.data[6].grand_total.hours + "." + distributionHeat[6]
                const today = data.data[7].grand_total.hours + "." + distributionHeat[7]


                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    // 만들려는 차트 유형
                    type: 'bar',

                    // 데이터 세트의 데이터
                    data: {
                        labels: ['7일 전', '6일 전', '5일 전', '4일 전', '3일 전', '2일 전', '1일 전', '오늘'],
                        datasets: [{
                            label: 'WakaTime',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.4)',
                                'rgba(200, 162, 235, 0.4)',
                                'rgba(255, 206, 86, 0.4)',
                                'rgba(75, 192, 192, 0.4)',
                                'rgba(153, 102, 255, 0.4)',
                                'rgba(255, 159, 64, 0.4)',
                                'rgba(255, 19, 84, 0.4)',
                                'rgba(54, 162, 235, 0.4)'

                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(200, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 19, 84, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],

                            borderWidth: 0.5,
                            data: [_7DaysAgo, _6DaysAgo, _5DaysAgo, _4DaysAgo, _3DaysAgo, _2DaysAgo, _1DaysAgo, today]
                        }],
                    },

                    // 구성 옵션은 여기로 이동
                    options: {

                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }

                    }
                });


            } catch (e) {
                hour = 0;
                minute = 0;
                console.log("에러 발생")


            }


            let wakahourtime = 0;


            //최대 10시간
            switch (hour) {

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


            let targetTime = 0;

            //저장된 목표 시간 가져오기
            if (localStorage.getItem("targetTime") == null) {
                //기본 1시간
                targetTime = 60;
            } else {
                targetTime = localStorage.getItem("targetTime");
                // console.log("저장된 시간 불러오기 " + targetTime);
            }


            //wakatime 하루 총 코딩 시간 변수
            const wakaTimeProgressRate = wakahourtime + minute;
            // console.log("오늘 코딩시간" + wakaTimeProgressRate)


            let percentAmount = wakaTimeProgressRate / targetTime * 100;
            // console.log(percentAmount);

            if (percentAmount >= 100) {
                console.log("값 변환")
                // $.toast('<h3 class="microscopic-font">오늘 하루도 견디느라 수고혔어~ <br> 내일도 버티고, 모레도 견디고, 계속계속 살아 남더라고~😘</h3>', {
                //     type: 'info',
                //     duration: 2500
                // });
                $('#rain').remove();

                percentAmount = 100;
            }

            //progress 바 작동 코드
            $('.progress').progress({percent: percentAmount});


            const targetTimeConversion = targetTime / 60;

            $('.targetTime').append(" " + targetTimeConversion + "time!");


        }
        //에러 종류 조건문으로 걸러내기
        , error: function (jqXHR, exception) {

            if (jqXHR.status === 0) {
                // alert('Not connect.\n Verify Network.');
                $.toast('<h4>인터넷 연결을 확인해주세요!</h4>', {type: 'danger', duration: 1500});
            } else if (jqXHR.status === 400) {
                alert('Server understood the request, but request content was invalid. [400]');
            } else if (jqXHR.status === 401) {
                $.toast('<h4>If you want the goal setting function, please log in to WakaTime!</h4>', {type: 'danger', duration: 1500});
                $('#myChart').remove();


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

    //저장된 값 확인해서 차트 보여줄지 말지 결정
    let check = localStorage.getItem("chartButton");
    console.log('값 확인 :' + check);
    if (check === null) {
        console.log("널 값 ")

    } else if (check === 'true') {
        console.log("실행")
        $('#toggleChartIn').remove();
    } else if (check === 'false') {
        console.log("펄스 값")

    }

    let check2 = localStorage.getItem("goalSettingButton");
    console.log('값 확인 :' + check2);
    if (check2 === null) {
        console.log("널 값 ")
    } else if (check2 === 'true') {
        console.log("실행")
        $('#goalSetting').remove();
    } else if (check2 === 'false') {
        console.log("펄스 값")

    }

    let datepickerCheck = localStorage.getItem('dateCheck');
    console.log('값 확인 :' + datepickerCheck);
    if (datepickerCheck === null) {
        console.log("널 값 ")
    } else if (datepickerCheck === 'true') {
        console.log("실행")
        $('#dateDiv').remove();
    } else if (datepickerCheck === 'false') {
        console.log("펄스 값")

    }






});

document.getElementById("toggleButton").addEventListener("click", deleteChart);
document.getElementById("github").addEventListener("click", githubOpen);
document.getElementById("date").addEventListener("click", dateCheck);

function githubOpen() {
    location.href = 'https://github.com/writepro4/chrome_developerTab';
}


function deleteChart() {
    console.log("차트 삭제 ")
    let check = localStorage.getItem("chartButton");
    console.log("차트 값 확인 : " + check);

    if (check === null) {
        console.log("널");
        //사용자가 버튼을 처음 눌렀을때
        localStorage.setItem("chartButton", true);
        $('#toggleChartIn').remove();
    } else if (check === 'true') {
        console.log("트루");
        localStorage.setItem("chartButton", false);
        //사용자가 다시 차트를 열려 할때
        location.reload();
    } else if (check === 'false') {
        console.log("펄스");
        //사용자가 다시 차트를 닫을때
        localStorage.setItem("chartButton", true);
        $('#toggleChartIn').remove();
    } else {
        console.log("띠용");
    }
    console.log("??")


}
//
function dateCheck() {

    let check = localStorage.getItem("dateCheck");

    if (check === null) {
        console.log("널");
        //사용자가 버튼을 처음 눌렀을때
        localStorage.setItem("dateCheck", true);
        $('#dateDiv').remove();
    } else if (check === 'true') {
        console.log("트루");
        localStorage.setItem("dateCheck", false);
        //사용자가 다시 차트를 열려 할때
        location.reload();
    } else if (check === 'false') {
        console.log("펄스");
        //사용자가 다시 차트를 닫을때
        localStorage.setItem("dateCheck", true);
        $('#dateDiv').remove();
    } else {
        console.log("띠용");
    }
    console.log("??")


}


