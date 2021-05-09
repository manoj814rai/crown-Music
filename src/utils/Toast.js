import React from "react";
import { ToastAndroid,} from "react-native";

const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    );
};

export {
    showToast
}