import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function foo(SpecificComponent, option, adminRoute = null){
    //option
    //null => 아무나 진입 가능
    //true => 로그인한 유저만 출입 가능
    //false => 로그인한 유저는 출입 불가능

    //adminRoute
    //기본값 null로 주고 true면 admin만 출입 가능

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태 
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}