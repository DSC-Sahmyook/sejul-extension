import React, { useEffect, useState } from 'react';
import * as LIB from '../../lib';
import * as API from '../../api';

interface MainViewGlobal extends Window {
    chrome?: any;
}
const MainView = () => {
    useEffect(() => {
        const global = window as MainViewGlobal;
        console.log(global.chrome);

        const token = LIB.Token.get();
        console.log(token);

        // API.Auth.signin('dev.yoogomja@gmail.com', "@rhawk1202")
        //     .then(res => { console.log(res) });
        if (token !== null) {
            API.Auth.fetch(token)
                .then(res => {
                    console.log(res);
                });
        }
    }, [])

    return (
        <div>
            <p>Hello!</p>
        </div>
    )
}

export default MainView;
