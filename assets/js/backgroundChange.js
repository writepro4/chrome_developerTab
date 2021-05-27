document.getElementById("backgroundSetting").addEventListener("click", backgroundSetting);
document.getElementById("randomBackground").addEventListener("click", backgroundRandom);

function backgroundRandom(){
    var backgroundRandomCheck = localStorage.getItem('backroundRandom');
    console.log("가지고있는 값 : " + backgroundRandomCheck)


    if(backgroundRandomCheck == 'true'){
        $.toast('<h4>The image is frozen!</h4>', {type: 'info', duration: 1500});
        console.log("트루입니다.")
        localStorage.setItem('backroundRandom',false);
    }else if(backgroundRandomCheck == 'false'){
        $.toast('<h4>Images are randomly output!</h4>', {type: 'danger', duration: 1500});
        console.log('false');
        localStorage.setItem('backroundRandom',true);
    }else{
        $.toast('<h4>Images are randomly output!</h4>', {type: 'danger', duration: 1500});
        console.log("else");
        localStorage.setItem('backroundRandom',true);
    }
};




    let backgroundImageNumber = 0;
//로컬스토리지에 값이 있다면 값 가져오기
if (localStorage.getItem('backgroundImage') != null) {
    backgroundImageNumber = localStorage.getItem('backgroundImage');

    var backgroundRandomCheck = localStorage.getItem('backroundRandom');


    if(backgroundRandomCheck == 'true'){
        console.log("랜덤출력")
        backgroundImageNumber = Math.floor(Math.random() * 12);
        localStorage.setItem('backgroundImage',backgroundImageNumber);

    }else if(backgroundRandomCheck == 'false'){
        console.log("랜덤출력안함")
    }else{
        console.log("랜덤출력안함")
    }

    if (backgroundImageNumber == 0) {
        document.body.style.backgroundImage = 'url("/assets/images/forest.jpg")';
    } else if (backgroundImageNumber == 1) {
        document.body.style.backgroundImage = 'url("/assets/images/cat.jpg")';
    } else if (backgroundImageNumber == 2) {
        document.body.style.backgroundImage = 'url("/assets/images/mountine.jpg")';
    } else if (backgroundImageNumber == 3) {
        document.body.style.backgroundImage = 'url("/assets/images/woodRoad.jpg")';
    }else if (backgroundImageNumber == 4) {
        document.body.style.backgroundImage = 'url("/assets/images/pinkLake.jpg")';
    }
    else if (backgroundImageNumber == 5) {
        document.body.style.backgroundImage = 'url("/assets/images/lake2.jpg")';
    }
    else if (backgroundImageNumber == 6) {
        document.body.style.backgroundImage = 'url("/assets/images/sakura4.jpg")';
    }
    else if (backgroundImageNumber == 7) {
        document.body.style.backgroundImage = 'url("/assets/images/only (1).jpg")';
    }
    else if (backgroundImageNumber == 8) {
        document.body.style.backgroundImage = 'url("/assets/images/only (2).jpg")';
    }
    else if (backgroundImageNumber == 9) {
        document.body.style.backgroundImage = 'url("/assets/images/only (3).jpg")';
    }
    else if (backgroundImageNumber == 10) {
        document.body.style.backgroundImage = 'url("/assets/images/only (4).jpg")';
    }
    else if (backgroundImageNumber == 11) {
        document.body.style.backgroundImage = 'url("/assets/images/only (5).jpg")';
    }


}else{
    backgroundImageNumber = 0;
    localStorage.setItem('backgroundImage',0);
}
// console.log("너의 숫자는"+backgroundImageNumber);




function backgroundSetting() {
    backgroundImageNumber += 1;
    if (backgroundImageNumber >= 12) {
        console.log("넘버 초기화 ")
        backgroundImageNumber = 0;
    }


    localStorage.setItem('backgroundImage', backgroundImageNumber);

    if (backgroundImageNumber == 0) {
        document.body.style.backgroundImage = 'url("/assets/images/forest.jpg")';
    } else if (backgroundImageNumber == 1) {
        document.body.style.backgroundImage = 'url("/assets/images/cat.jpg")';
    } else if (backgroundImageNumber == 2) {
        document.body.style.backgroundImage = 'url("/assets/images/mountine.jpg")';
    } else if (backgroundImageNumber == 3) {
        document.body.style.backgroundImage = 'url("/assets/images/woodRoad.jpg")';
    }else if (backgroundImageNumber == 4) {
        document.body.style.backgroundImage = 'url("/assets/images/pinkLake.jpg")';
    }else if (backgroundImageNumber == 5) {
        document.body.style.backgroundImage = 'url("/assets/images/lake2.jpg")';
    }
    else if (backgroundImageNumber == 6) {
        document.body.style.backgroundImage = 'url("/assets/images/sakura4.jpg")';
    }
    else if (backgroundImageNumber == 7) {
        document.body.style.backgroundImage = 'url("/assets/images/only (1).jpg")';
    }
    else if (backgroundImageNumber == 8) {
        document.body.style.backgroundImage = 'url("/assets/images/only (2).jpg")';
    }
    else if (backgroundImageNumber == 9) {
        document.body.style.backgroundImage = 'url("/assets/images/only (3).jpg")';
    }
    else if (backgroundImageNumber == 10) {
        document.body.style.backgroundImage = 'url("/assets/images/only (4).jpg")';
    }
    else if (backgroundImageNumber == 11) {
        document.body.style.backgroundImage = 'url("/assets/images/only (5).jpg")';
    }
}

