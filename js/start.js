const main = document.querySelector("#main");       //html의 id=main이 담김
const qna = document.querySelector("#qna");         //html의 id=qna이 담김
const result = document.querySelector("#result");   //html의 id=result이 담김
const endPoint = 16;                                //16단계로 구성되어있음(진행바 생성을 위한 변수)
const select = [1,3,0,0,1];           //선택지 저장
let qIdx = 0;


// imgList를 출력한다.
function setImgList(){
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#imgList');
    var imgURL = 'img/imageList.jpg';
    resultImg.src = imgURL;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  }

// qna에서 응답자의 응답을 계산한다.
function calResult(){
    const avg = (select.reduce((a, b) => a + b, 0)) / (select.length);
    var result = 0;
    console.log(select);
    console.log(avg);
    if (avg >= 7.5){
        result = 0; //총장님
    } else if(avg >= 6.5){
        result = 1; // 교인물
    } else if(avg >= 4.5){
        result = 2; // 학부생
    } else if(avg > 2.5){
        result = 3; // 교린이
    } else{
        result = 4; // 부설유치원생
    }
    return result;
}

// result 값으로 나온 그림을 출력한다.
function setResult(){
    let point = calResult(); // 결과값
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.jpg';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
  }

// qna에서 result 호출. qna -> result
function goResult(){
    qna.style.WebkitAnimation = "fadeout 0.75s";
    qna.style.animation = "fadeout 0.75s";
    setTimeout(() => {
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 100)
    }, 500)
    setResult();
    setImgList();
}

// qna에서의 button을 생성하게 한다.
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-2');
    answer.classList.add('py-2');
    answer.classList.add('mx-auto');
    answer.classList.add('fadein');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll(".answerList");
        for(let i=0 ; i<children.length ; i++){
            children[i].disabled=true;
            children[i].style.WebkitAnimation = "fadeout 0.5s";
            children[i].style.animation = "fadeout 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }
            for(let i = 0 ; i < children.length ; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450);
    }, false);
}

// qna에서의 img을 삭제한다.
function removeImg(){
    var img = document.getElementById('qnaImg');
    img.removeChild(img.childNodes[0]);
}

// qna에서의 img을 생성하게 한다.
function addImg(qIdx){
    qIdx = qIdx+1
    var qnaImg = document.createElement('img');
    const imgDiv = document.querySelector('#qnaImg');
    var imgURL = 'img/' + qIdx + '.jpg';
    qnaImg.src = imgURL;
    qnaImg.alt = qIdx;
    qnaImg.classList.add('img-fluid');
    imgDiv.appendChild(qnaImg);
}

// qna에서 button을 생성하는 함수인 addAnswer을 호출하고, 상태바를 갱신한다.
function goNext(qIdx){
    if(qIdx === endPoint){
        goResult()
        return;
    }
    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;

    if(qIdx >= 0){
        removeImg()
    }
    addImg(qIdx)
    
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1) + '%';
}

// main에서 qna 호출. main -> qna
function begin(){
    console.log(select);
    main.style.WebkitAnimation = "fadeout 0.75s";
    main.style.animation = "fadeout 0.75s";
    setTimeout(() => {
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 100)
        goNext(qIdx);
    }, 500)
}