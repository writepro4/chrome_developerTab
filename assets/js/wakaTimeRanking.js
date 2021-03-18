$(document).ready(function () {

//wakatime 시간 데이터 받아오는 ajax 함수.
    $.ajax({
        type: 'get'
        , url: `https://wakatime.com/api/v1/leaders`
        , success: function (data) {


            const overallRanking = data.current_user.rank;

            $('#wakaTimeRanking').text("WakaTime 전체 이용가 중 " + overallRanking + "위");


        }
        //에러 종류 조건문으로 걸러내기
        , error: function (jqXHR, exception) {

            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status === 400) {
                alert('Server understood the request, but request content was invalid. [400]');
            } else if (jqXHR.status === 401) {
                $.toast('<h4>목표 설정 기능을 원하신다면 WakaTime에 로그인해주세요!</h4>', {type: 'danger', duration: 1500});


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

});