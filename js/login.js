/* // 페이지 로딩 시 실행
document.addEventListener('DOMContentLoaded', async function () {
  const jsonData = await fetchJsonFile();

  if (!jsonData) {
    console.error('Failed to load JSON data.');
    return;
  }

  // 로컬 스토리지에 JSON 데이터 저장
  localStorage.setItem('userList', JSON.stringify(jsonData));
}); */
// 페이지 로딩 시 실행
document.addEventListener('DOMContentLoaded', async function () {
  // 기존 데이터 가져오기 또는 초기화. 이 부분 살리면 로그인 페이지로 가면 회원가입 한 정보가 로컬에서 사라짐
  const jsonData = await fetchJsonFile();
  localStorage.setItem('userList', JSON.stringify(jsonData));

  let userList = [];
  const storedData = localStorage.getItem('userList');
  if (storedData) {
    userList = JSON.parse(storedData);
  }

  // 로컬 스토리지에 JSON 데이터 저장
  localStorage.setItem('userList', JSON.stringify(userList));
});

function validateId() {
  const idInput = document.getElementById('id');
  const idError = document.getElementById('idError');
  const idPattern = /^[a-zA-Z0-9]{6,}$/;

  if (!idPattern.test(idInput.value)) {
    idError.textContent = '* ID는 영문/숫자만 사용, 최소 6글자 이상만 입력하세요';
  } else {
    idError.textContent = '';
  }
}

function validatePassword() {
  const pwInput = document.getElementById('pw');
  const pwError = document.getElementById('pwError');
  // 비밀번호는 최소 8글자 이상이며, 영문 대문자, 소문자, 숫자, 특수문자 중 하나 이상을 포함해야 합니다.
  const pwPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!pwPattern.test(pwInput.value)) {
    pwError.textContent = '* 비밀번호는 최소 8글자 이상이며, 영문 대문자, 소문자, 숫자, 특수문자를 하나 이상 포함해야 합니다.';
  } else {
    pwError.textContent = '';
  }
}


// JSON 데이터를 가져와서 저장
async function fetchJsonFile() {
  try {
    const response = await fetch('./member.json');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON file:', error);
    return null;
  }
}
/* 
// 로그인 함수
async function login() {
  const jsonData = await fetchJsonFile();

  if (!jsonData) {
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
    return;
  }

  const enteredId = document.getElementById('id').value;
  const enteredPw = document.getElementById('pw').value;

  // JSON 데이터에서 ID와 비밀번호 확인
  const user = jsonData.find(u => u.id === enteredId && u.password === enteredPw);

  if (user) {
    alert('로그인에 성공했습니다!');
    // 로컬 스토리지에 사용자 정보 저장
    // localStorage.setItem('currentUser', JSON.stringify(user));
    // 기존 데이터 가져오기 또는 초기화
    let userList = [];
    const storedData = localStorage.getItem('userList');
    if (storedData) {
      userList = JSON.parse(storedData);
    }

    // 새로운 데이터 추가
    userList.push(user);

    // 로컬 스토리지에 저장
    localStorage.setItem('userList', JSON.stringify(userList));
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.');
  }
 */
// 로그인 함수
async function login() {

  const enteredId = document.getElementById('id').value;
  const enteredPw = document.getElementById('pw').value;

  //로컬 스토리지에 json 파일 저장
/*   const jsonData = await fetchJsonFile();
  localStorage.setItem('userList', JSON.stringify(jsonData)); */

  // 로컬 스토리지에서 회원 정보 가져오기
  const storedData = localStorage.getItem('userList');
  // const userList = storedData ? JSON.parse(storedData) : [];
  let userList = JSON.parse(storedData);
  localStorage.setItem('userList', JSON.stringify(userList)); //새롭게 로컬스토리지 세팅

  // JSON 데이터에서 ID와 비밀번호 확인
  const user = userList.find(u => u.id === enteredId && u.password === enteredPw);


  if (user) {
    alert('로그인에 성공했습니다!');
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.');
  }
}