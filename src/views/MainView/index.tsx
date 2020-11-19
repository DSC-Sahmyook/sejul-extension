import React, { useEffect, useState } from 'react';
import * as LIB from '../../lib';
import './scss/index.scss';
import SignIn from './components/SignIn';
import { IUser } from '../../api/interfaces';
import Archiver from './components/Archiver';

interface MainViewGlobal extends Window {
    chrome?: any;
}
const MainView = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    // 로그인 확인 
    // 로그인 했을 시 , 회원 가입 
    useEffect(() => {
        const global = window as MainViewGlobal;
        console.log(global.chrome);
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="__popup-container">
            <div className="__popup-wrapper">
                {
                    user === undefined || user === null ?
                        <SignIn setUser={setUser} /> :
                        <Archiver user={user} setUser={setUser} />
                }
            </div>
        </div>
    )
}

export default MainView;
