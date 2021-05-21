document.getElementById("backgroundSetting").addEventListener("click", backgroundSetting);




    let backgroundImageNumber = 0;
//로컬스토리지에 값이 있다면 값 가져오기
if (localStorage.getItem('backgroundImage') != null) {
    backgroundImageNumber = localStorage.getItem('backgroundImage');

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
        document.body.style.backgroundImage = 'url("/assets/images/aurora.jpg")';
    }


}else{
    backgroundImageNumber = 0;
}
// console.log("너의 숫자는"+backgroundImageNumber);




function backgroundSetting() {
    backgroundImageNumber += 1;
    if (backgroundImageNumber >= 7) {
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
        document.body.style.backgroundImage = 'url("/assets/images/aurora.jpg")';
    }
}

