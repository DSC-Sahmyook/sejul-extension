import React, { useEffect, useState } from 'react';
import * as LIB from '../../../../lib';
import * as API from '../../../../api';
import { IUser } from '../../../../api/interfaces';
import { Button } from '../../../../components';

import './archiver.scss';

interface MainViewGlobal extends Window {
    chrome?: any;
}

interface IArchiverProps {
    user: IUser,
    setUser: Function
}
const Archiver = ({ user, setUser }: IArchiverProps) => {
    const [isArchived, setIsArchived] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const fn = {
        fetch: () => {
            const __global = window as MainViewGlobal;
            __global.chrome.tabs.getSelected(async (tab: any) => {
                if (tab) {
                    setCurrentUrl(tab.url);
                    const fetched = await API.Article.fetch();
                    if (fetched.length > 0) {
                        fetched.forEach((item) => {
                            if (item.link === tab.url) {
                                console.log(fetched, 'already stored!');
                            }
                            else {
                                console.log(fetched, 'not stored');
                            }
                            setIsArchived(item.link === tab.url);
                        });
                    }
                    else {
                        setIsArchived(false);
                    }
                }
            });
        },
        unarchive: async () => {
            if (currentUrl !== '') {
                await API.Article.remove(currentUrl);
                fn.fetch();
            }
            else {
                alert('주소 정보가 올바르지 않습니다');
            }
        },
        archive: async () => {
            if (currentUrl !== '') {
                try {
                    await API.Article.store(currentUrl);
                    fn.fetch();
                }
                catch (e) {
                    console.log(e);
                    console.log(e.message);
                    console.log(e.response);
                }
            }
            else {
                alert('주소 정보가 올바르지 않습니다');
            }
        },
        evt: {
            signout: () => {
                LIB.Token.clear();
                setUser(undefined);
            },
            open: () => {
                const __global = window as MainViewGlobal;
                __global.chrome.tabs.create({
                    url: "http://34.64.70.82"
                });
            }
        }
    }

    useEffect(() => {
        fn.fetch();
    }, []);
    return (
        <div className="__archiver-container">
            {
                !isArchived ?
                    <Button className="archive" onClick={fn.archive} text="저장 하기" /> :
                    <Button className="remove" onClick={fn.unarchive} text="저장 취소 하기" />
            }
            <Button className="signout" onClick={fn.evt.signout} text="로그아웃" />
            <Button className="open" onClick={fn.evt.open} text="확인하기" />
        </div>
    )
}

export default Archiver;
