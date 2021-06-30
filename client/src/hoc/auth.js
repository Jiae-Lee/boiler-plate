import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){
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
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}