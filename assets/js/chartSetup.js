$(document).ready(function () {

//wakatime 시간 데이터 받아오는 ajax 함수.
    $.ajax({
        type: 'get'
        , url: `https://wakatime.com/api/v1/users/current/summaries?start=2021-01-12&end=2021-01-19`
        , success: function (data) {
            console.log(data);


            try {

            } catch (e) {

            }


        }
        //에러 종류 조건문으로 걸러내기
        , error: function (jqXHR, exception) {

            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status === 400) {
                alert('Server understood the request, but request content was invalid. [400]');
            } else if (jqXHR.status === 401) {
                $.toast('<h4>If you want the goal setting function, please log in to WakaTime!</h4>', {type: 'danger', duration: 1500});


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

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // 만들려는 차트 유형
        type: 'bar',

        // 데이터 세트의 데이터
        data: {
            labels: ['7일 전', '6일 전', '5일 전', '4일 전', '3일 전', '2일 전', '1일 전'],
            datasets: [{
                label: 'WakaTime 일주일간 기록',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [5, 10, 5, 2, 20, 30, 45]
            }],
            borderWidth: 1
        },

        // 구성 옵션은 여기로 이동
        options: {}
    });
});