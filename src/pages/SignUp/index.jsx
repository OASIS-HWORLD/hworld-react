import React from 'react';
import CommonLayout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Text from '../../components/Text';
import Button from '../../components/Button';
import AlertModal from '../../components/AlertModal';

import AuthAPI from '../../apis/Member/AuthAPI';

import {
  SignUpLayout,
  StyledHr,
  InputLayout,
  InputDetailLayout,
  StyledInput,
  GenderButton,
  CheckButton,
} from './styled';

import { useState } from 'react';
import { axiosInstance } from '../../apis';

import success from '../../assets/images/success.svg';
import unsuccess from '../../assets/images/unsuccess.svg';

/**
 * 회원가입 페이지
 * @author 김지현
 * @since 2024.09.11
 * @version 1.0
 *
 * <pre>
 * 수정일        수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.11  	김지현        최초 생성
 * </pre>
 */

const SignUp = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [clickedGender, setClickedGender] = useState(null);
  const [birthdate, setBirthdate] = useState('');

  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isPasswordAvailable, setIsPasswordAvailable] = useState(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginIdChange = (loginId) => {
    setLoginId(loginId);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handlePasswordValidationChange = (passwordValidation) => {
    setPasswordValidation(passwordValidation);

    if (password === passwordValidation) setIsPasswordAvailable(true);
    else setIsPasswordAvailable(false);
  };

  const handleNicknameChange = (nickname) => {
    setNickname(nickname);
  };

  const handleGenderChange = (gender) => {
    setGender(gender);
    setClickedGender(gender);
  };

  const handleBirthdateChange = (birthdate) => {
    if (birthdate.length === 8) {
      birthdate = birthdate.slice(0, 4) + '-' + birthdate.slice(4, 6) + '-' + birthdate.slice(6, 8);
    }

    setBirthdate(birthdate);
  };

  const checkLoginIdValidation = () => {
    axiosInstance
      .get('/members/check-id', {
        params: {
          loginId: loginId,
        },
      })
      .then((response) => {
        setIsIdAvailable(response.data.success);
      })
      .catch((error) => {
        setIsIdAvailable(false);
      });
  };

  const checkNicknameValidation = () => {
    axiosInstance
      .get('/members/check-nickname', {
        params: {
          nickname: nickname,
        },
      })
      .then((response) => {
        setIsNicknameAvailable(response.data.success);
      })
      .catch((error) => {
        setIsNicknameAvailable(false);
      });
  };

  const handleSignUp = () => {
    AuthAPI.SignUp({
      loginId: loginId,
      password: password,
      passwordValidation: passwordValidation,
      nickname: nickname,
      gender: gender,
      birthdate: birthdate,
    })
      .then((response) => {
        toast.success('회원가입이 완료되었습니다!');
      })
      .catch((error) => {
        toast.error('회원가입에 실패했습니다.');
      });
  };

  return (
    <CommonLayout>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        limit={1}
        style={{ fontSize: '20px', textAlign: 'center' }}
      />
      <SignUpLayout>
        <Text theme="navytext">회원가입</Text>
        <StyledHr />
        <InputLayout>
          <InputDetailLayout>
            <Text theme="content" width="10vw">
              아이디
            </Text>
            <StyledInput
              type="text"
              placeholder="아이디를 입력하세요"
              value={loginId}
              onChange={(e) => handleLoginIdChange(e.target.value)}
            ></StyledInput>
            <CheckButton onClick={(e) => checkLoginIdValidation()}>중복 확인</CheckButton>
            {isIdAvailable === true ? (
              <img src={success} alt="가능" />
            ) : isIdAvailable === false ? (
              <img src={unsuccess} alt="불가능" />
            ) : null}
          </InputDetailLayout>
          <InputDetailLayout>
            <Text theme="content" width="10vw">
              패스워드
            </Text>
            <StyledInput
              type="password"
              placeholder="패스워드를 입력하세요"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            ></StyledInput>
          </InputDetailLayout>
          <InputDetailLayout>
            <Text theme="content" width="10vw">
              패스워드 확인
            </Text>
            <StyledInput
              type="password"
              placeholder="패스워드 확인을 입력하세요"
              value={passwordValidation}
              onChange={(e) => handlePasswordValidationChange(e.target.value)}
            ></StyledInput>
            {isPasswordAvailable === true ? <img src={success} alt="가능" /> : <img src={unsuccess} alt="불가능" />}
          </InputDetailLayout>
          <InputDetailLayout>
            <Text theme="content" width="10vw">
              닉네임
            </Text>
            <StyledInput
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
            ></StyledInput>
            <CheckButton onClick={(e) => checkNicknameValidation()}>중복 확인</CheckButton>
            {isNicknameAvailable === true ? (
              <img src={success} alt="가능" />
            ) : isNicknameAvailable === false ? (
              <img src={unsuccess} alt="불가능" />
            ) : null}
          </InputDetailLayout>
          <InputDetailLayout>
            <Text theme="content" width="10vw">
              성별
            </Text>
            <GenderButton onClick={(e) => handleGenderChange('m')} isGenderClicked={clickedGender === 'm'}>
              남성
            </GenderButton>
            <GenderButton onClick={(e) => handleGenderChange('f')} isGenderClicked={clickedGender === 'f'}>
              여성
            </GenderButton>
          </InputDetailLayout>
          <InputDetailLayout>
            <Text theme="content" width="10vw">
              생일
            </Text>
            <StyledInput
              type="text"
              placeholder="생일을 입력하세요"
              value={birthdate}
              onChange={(e) => handleBirthdateChange(e.target.value)}
            />
          </InputDetailLayout>
        </InputLayout>
        <Button onClick={() => setIsModalOpen(true)}>완료</Button>
        {isModalOpen && (
          <AlertModal
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => {
              handleSignUp();
              setIsModalOpen(false);
            }}
            title="회원가입 완료"
            content="회원가입을 하시겠습니까?"
          />
        )}
      </SignUpLayout>
    </CommonLayout>
  );
};

export default SignUp;
