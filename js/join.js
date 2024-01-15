function validSignupId() {
  const signupIdInput = document.getElementById('id');
  const idError = document.getElementById('idNofi');
  const idPattern = /^[a-zA-Z0-9]{6,}$/;

  if (!idPattern.test(signupIdInput.value)) {
    idError.innerText = '* 영문과 숫자만 사용 가능, 최소 6글자 이상 입력하세요';
  } else {
    idError.innerText = '';
  }
}

function validSignupPassword() {
  const signupPasswordInput = document.getElementById('pw');
  const passwordError = document.getElementById('pwNofi');
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordPattern.test(signupPasswordInput.value)) {
    passwordError.innerText = '* 비밀번호는 최소 8글자 이상이며, 영문 대문자, 소문자, 숫자, 특수문자를 하나 이상 포함해야 합니다.';
  } else {
    passwordError.innerText = '';
  }
}

function validConfirmPassword() {
  const signupPasswordInput = document.getElementById('pw');
  const confirmPasswordInput = document.getElementById('confirmPw');
  const confirmPasswordError = document.getElementById('confirmPwNofi');

  if (signupPasswordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.innerText = '* 입력한 비밀번호와 일치하지 않습니다.';
  } else {
    confirmPasswordError.innerText = '';
  }
}

function validformatTel() {
  const telInput = document.getElementById('tel');
  const telError = document.getElementById('telNofi')
  const telPattern = /^\d+$/;
  if (!telPattern.test(telInput.value)) {
    telError.innerText = '* 숫자만 입력하세요 ("-" 생략)';
  } else {
    telError.innerText = '';
  }
}

function validEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailNofi');
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  if (!emailPattern.test(emailInput.value)) {
    emailError.innerText = '* 올바른 이메일 형식이 아닙니다.';
  } else {
    emailError.innerText = '';
  }
}

async function signup() {
  validSignupId();
  validSignupPassword();
  validConfirmPassword();

  const idError = document.getElementById('idNofi').innerText;
  const passwordError = document.getElementById('pwNofi').innerText;
  const confirmPasswordError = document.getElementById('confirmPwNofi').innerText;

  if (idError || passwordError || confirmPasswordError) {
    alert('입력값을 확인하세요.');
    return;
  }

  /////////////////////////////////////////////////////////////////
  let Datas = await storageData();
  // 입력된 아이디가 이미 존재하는지 확인
  // 회원가입 성공 시 JSON 파일 리스트에 추가
  const newid = document.getElementById('id').value;
  const isDuplicateId = Datas.some(user => user.id === newid);
  if (isDuplicateId) {
    alert('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
    return;
  }
  const newpw = document.getElementById('pw').value;
  const newname = document.getElementById('name').value;
  const tel = document.getElementById('tel').value.replace(/[^0-9]/g, ''); // value.replace로 문자열을 다른 문자열로 교체, 숫자 이외의 문자 제거
  newtel = tel.replace(/(\d{2,3})(\d{3,4})(\d{4})/, `$1-$2-$3`); //  '-' 추가
  const newemail = document.getElementById('email').value;
  const newaddress = document.getElementById('address').value;

  // 기존 데이터 가져오기
  Datas = Datas.filter(user => user.id !== newid); //중복 제거
  // 새로운 데이터 추가
  const userData = {
    id: newid,
    password: newpw,
    name: newname,
    tel: newtel,
    email: newemail,
    address: newaddress
  };
  Datas.push(userData);
  localStorage.setItem('userList', JSON.stringify(Datas));
  alert('회원가입에 성공했습니다!');
}

async function storageData() {
  try {
    const serverData = await (await fetch('/member.json')).json();
    // 로컬 스토리지에서 이전 데이터 가져오기
    const localData = JSON.parse(localStorage.getItem('userList'));

    // 서버에서 가져온 데이터와 로컬 스토리지에 있는 데이터 중복 제거 후 병합
    const mergedData = [ //filter를 사용해 아이디가 중복되지않는 데이터만 가져옴( localData 배열에서 severData에 있는 아이디와 중복되지 않는 사용자만 필터링)
      ...serverData,
      ...localData.filter(user => !serverData.some(s => s.id === user.id)), //중복되는게 하나라도 없는걸 선택-> 즉, 새롭게 가입한 사용자가 들어가게됨
    ];

    return mergedData;
  } catch (error) {
    console.error(error);
    return;
  }
}