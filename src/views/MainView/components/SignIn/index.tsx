import React, { useEffect, useState } from 'react'
import * as API from '../../../../api';
import * as LIB from '../../../../lib';
import { TextInput, Logo, Button } from '../../../../components';
import './Signin.scss';

interface ISignInProps {
    setUser: Function;
}

const SignIn = (props: ISignInProps) => {
    const { setUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fn = {
        evt: {
            signin: async () => {
                await fn.signin();
                await fn.fetch();
            }
        },
        signin: async () => {
            if (email.length <= 0 || password.length <= 0) {
                alert("이메일 혹은 패스워드를 확인해주세요");
                return;
            }

            try {
                await API.Auth.signin(email, password);
            }
            catch (e) {
                alert("일시적인 오류가 발생했습니다");
            }
        },
        fetch: async () => {
            const token = LIB.Token.get();
            if (token !== null) {
                const result = await API.Auth.fetch(token);
                setUser(result);
            }
        },
        isAlreadySignedIn: async () => {
            const token = LIB.Token.get();
            if (token) {
                return true;
            }
            else {
                return false;;
            }
        }
    }

    useEffect(() => {
        // 토큰이 있는지 확인
        // 있다면 유저 정보 삽입
        // 없다면 대기
        if (fn.isAlreadySignedIn()) {
            fn.fetch();
        }
    }, []);

    return (
        <>
            <Logo width={50} height={50} />
            <div className="login-form-container">
                <TextInput id="input-email" value={email} setValue={setEmail} placeholder={"이메일을 입력해주세요"} label="이메일" />
                <TextInput id="input-password" type="password" value={password} setValue={setPassword} placeholder={"패스워드를 입력해주세요"} label="패스워드" />
                <Button onClick={fn.evt.signin} text="로그인" />
                <a className="additional-link" href="http://34.64.70.82/auth/signup" target="__blank" >
                    아직 회원이 아니신가요?
                </a>
            </div>
        </>
    )
}

export default SignIn
