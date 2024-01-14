function validateSignupId() {
  const signupIdInput = document.getElementById('id');
  const idError = document.getElementById('idNofi');
  const idPattern = /^[a-zA-Z0-9]{6,}$/;

  if (!idPattern.test(signupIdInput.value)) {
    idError.textContent = '* 영문과 숫자만 사용 가능, 최소 6글자 이상 입력하세요';
  } else {
    idError.textContent = '';
  }
}

function validateSignupPassword() {
  const signupPasswordInput = document.getElementById('pw');
  const passwordError = document.getElementById('pwNofi');
  // 비밀번호는 최소 8글자 이상이며, 영문 대문자, 소문자, 숫자, 특수문자 중 하나 이상을 포함해야 합니다.
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordPattern.test(signupPasswordInput.value)) {
    passwordError.textContent = '* 비밀번호는 최소 8글자 이상이며, 영문 대문자, 소문자, 숫자, 특수문자를 하나 이상 포함해야 합니다.';
  } else {
    passwordError.textContent = '';
  }
}

function validateConfirmPassword() {
  const signupPasswordInput = document.getElementById('pw');
  const confirmPasswordInput = document.getElementById('confirmPw');
  const confirmPasswordError = document.getElementById('confirmPwNofi');

  if (signupPasswordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = '* 입력한 비밀번호와 일치하지 않습니다.';
  } else {
    confirmPasswordError.textContent = '';
  }
}

function formatPhoneNumber() {
  const telInput = document.getElementById('tel');
  const telError = document.getElementById('telNofi')
  const telPattern = /^\d+$/; // 숫자로만 이루어진 패턴
  /*   telInput.value = telInput.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거 
    telInput.value = telInput.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 자동으로 '-' 추가 */
  /*   const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      telInput.value = `${match[1]}-${match[2]}-${match[3]}`;
    } */
  if (!telPattern.test(telInput.value)) {
    telError.textContent = '* 숫자만 입력하세요 ("-" 생략)';
  } else {
    telError.textContent = '';
  }
}

function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailNofi');
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  //  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = '* 올바른 이메일 형식이 아닙니다.';
  } else {
    emailError.textContent = '';
  }
}

async function signup() {
  // 유효성 검사
  validateSignupId();
  validateSignupPassword();
  validateConfirmPassword();

  const idError = document.getElementById('idNofi').textContent;
  const passwordError = document.getElementById('pwNofi').textContent;
  const confirmPasswordError = document.getElementById('confirmPwNofi').textContent;

  if (idError || passwordError || confirmPasswordError) {
    alert('입력값을 확인하세요.');
    return;
  }

  /*   // 회원가입 성공 시 로컬 스토리지에 저장
    const signupId = document.getElementById('signupId').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const name = document.getElementById('name').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const userData = {
      id: signupId,
      password: signupPassword,
      name: name,
      tel: tel,
      email: email,
      address: address
    };

    localStorage.setItem(signupId, JSON.stringify(userData)); */

  // 회원가입 성공 시 기존 JSON 파일 불러오기
  let jsonData = await fetchJsonFile();

  /////////////////////////////////////////////////////////////////
  // 입력된 아이디가 이미 존재하는지 확인


  // 회원가입 성공 시 JSON 파일 리스트에 추가
  const signupId = document.getElementById('id').value;
  const isDuplicateId = jsonData.some(user => user.id === signupId);

  if (isDuplicateId) {
    alert('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
    return;
  }
  const signupPassword = document.getElementById('pw').value;
  const name = document.getElementById('name').value;
  // const tel = document.getElementById('tel').value;
  /*   tel = tel.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    tel = tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 자동으로 '-' 추가 */
  const tel = document.getElementById('tel').value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
  signupTel = tel.replace(/(\d{2,3})(\d{3,4})(\d{4})/, `$1-$2-$3`); // 자동으로 '-' 추가
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  // 기존 데이터 가져오기
  //let jsonData = JSON.parse(localStorage.getItem('userData')) || [];
  jsonData = jsonData || []; ////jsonData가 값이 존재하면 그 값을 그대로 사용하고, 값이 존재하지 않으면 빈 배열 
  jsonData = jsonData.filter(user => user.id !== signupId); //중복 제거
  // 새로운 데이터 추가
  const userData = {
    id: signupId,
    password: signupPassword,
    name: name,
    tel: signupTel,
    email: email,
    address: address
  };
  jsonData.push(userData);
  localStorage.setItem('userList', JSON.stringify(jsonData));
  alert('회원가입에 성공했습니다!');
}

// 비동기적으로 JSON 파일을 가져오는 함수
/* async function fetchJsonFile() {
  try {
    const response = await fetch('/homework/member.json');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON file:', error);
    return null;
  }
} */
async function fetchJsonFile() {
  try {
    const response = await fetch('/member.json');
    const serverData = await response.json(); ///////////////////////

    // 로컬 스토리지에서 이전 데이터 가져오기
    const localData = JSON.parse(localStorage.getItem('userList')) || [];

    // 서버에서 가져온 데이터와 로컬 스토리지에 있는 데이터 병합
    // const mergedData = [...localData, ...serverData];
     // 서버에서 가져온 데이터와 로컬 스토리지에 있는 데이터 중복 제거 후 병합
    const mergedData = [
      ...localData.filter(user => !serverData.some(s => s.id === user.id)), 
      ...serverData];

    return mergedData;
  } catch (error) {
    console.error('Error fetching JSON file:', error);
    return null;
  }
}