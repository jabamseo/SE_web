const main = document.querySelector("#main");       //html의 id=main이 담김
const qna = document.querySelector("#qna");         //html의 id=qna이 담김
const result = document.querySelector("#result");   //html의 id=result이 담김
const endPoint = 12;                                //12단계로 구성되어있음(진행바 생성을 위한 변수)
const select = [0,0,0,0,0,0,0,0,0,0,0,0];           //선택지 저장
let qIdx = 0;


// qna에서 응답자의 응답을 계산한다.
function calResult(){
    var result = select.indexOf(Math.max(...select))
    return result;
}

// result 값으로 나온 그림을 출력한다.
function setResult(){
    let point = calResult(); // 결과값
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
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
        goNext(qIdx);
    }, 500)

    console.log(select);
    setResult();
}

// qna에서의 button을 생성하게 한다.
function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadein')
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
            for(let i=0;i<children.length;i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450);
    }, false);
}

// qna에서 button을 생성하는 함수인 addAnswer을 호출하고, 상태바를 갱신한다.
function goNext(qIdx){
    if(qIdx === endPoint){
        goResult()
        return;
    }
    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1) + '%';
}

// main에서 qna 호출. main -> qna
function begin(){
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