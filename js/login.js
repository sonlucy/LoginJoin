// 페이지 로딩 시 실행
document.addEventListener('DOMContentLoaded', async function () {
  // 기존 데이터 가져오기 또는 초기화. 이 부분 살리면 로그인 페이지로 가면 회원가입 한 정보가 로컬에서 사라짐
/*   const jsonData = await fetchJsonFile();
  localStorage.setItem('userList', JSON.stringify(jsonData)); //로컬스토리지에 JSON 데이터 저장
   */
  let userList = [];
  const storedData = localStorage.getItem('userList');
  if (storedData) {
    userList = JSON.parse(storedData);
  }

  // 로컬 스토리지에 JSON 데이터 저장
  localStorage.setItem('userList', JSON.stringify(userList));
});

///////////////////////join.js의 함수와 형태가 같음////////////////////////////
function validId() {
  const idInput = document.getElementById('id');
  const idError = document.getElementById('idError');
  const idPattern = /^[a-zA-Z0-9]{6,}$/;

  if (!idPattern.test(idInput.value)) {
    idError.innerText = '* ID는 영문/숫자만 사용, 최소 6글자 이상만 입력하세요';
  } else {
    idError.innerText = '';
  }
}

function validPassword() {
  const pwInput = document.getElementById('pw');
  const pwError = document.getElementById('pwError');
  const pwPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!pwPattern.test(pwInput.value)) {
    pwError.innerText = '* 비밀번호는 최소 8글자 이상이며, 영문 대문자, 소문자, 숫자, 특수문자를 하나 이상 포함해야 합니다.';
  } else {
    pwError.innerText = '';
  }
}
///////////////////////////////////////////////////////////////////////

async function fetchJsonFile() {
  return fetch('/member.json')
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

// 로그인 함수
async function login() {

  const enteredId = document.getElementById('id').value;
  const enteredPw = document.getElementById('pw').value;

  // 로컬 스토리지에서 회원 정보 가져오기
  const storedData = localStorage.getItem('userList');
  let userList = JSON.parse(storedData);
  // JSON 데이터에서 ID와 비밀번호 확인
  const user = userList.find(u =>
    u.id === enteredId && u.password === enteredPw);
  if (user) {
    alert(`${user.name}님 반갑습니다.`); 
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.');
  }
}