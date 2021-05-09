import { CommonActions, StackActions } from '@react-navigation/native';
import * as React from 'react';

let _navigator = null;

const setTopLevelNavigator = (navigatorRef) =>{
    if (navigatorRef) {
        _navigator = navigatorRef;
    }
};


const navigate = (name, params = null) => {
    _navigator.dispatch(
        CommonActions.navigate({
            name,
            params
        })
    );
};

const replace = (name, params) => {
    _navigator.dispatch(
        StackActions.replace(name, params)
    );
};

const goBack = (screenName) => {
    _navigator.dispatch(
        CommonActions.goBack(screenName)
    );
};



export { setTopLevelNavigator, navigate, _navigator, goBack, replace};
