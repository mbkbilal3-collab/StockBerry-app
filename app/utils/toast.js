import Toast from "react-native-toast-message";

export function showSuccess(message) {
  Toast.show({
    type: "success",
    text1: message,
    position: "bottom",
    visibilityTime: 2000,
  });
}

export function showError(message) {
  Toast.show({
    type: "error",
    text1: message,
    position: "bottom",
    visibilityTime: 2000,
  });
}
