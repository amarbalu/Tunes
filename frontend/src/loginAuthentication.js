import Fetch from "./components/Fetch";

function loginAuthentication() {
  return function (dispatch) {
    dispatch(
      Fetch(
        `/login_auth`,
        "GET",
        null,
        () =>
          dispatch({
            type: "LOGIN_AUTH",
            can_proceed: true,
          }),
        () =>
          dispatch({
            type: "LOGIN_AUTH",
            can_proceed: false,
          })
      )
    );
  };
}

function fetchSecretSauce() {
  return Fetch(`/login_auth`, "GET", null, null, null);
}
async function AuthCheck() {
  try {
    await fetchSecretSauce();
    return true;
  } catch (ex) {
    return false;
  }
}
export { AuthCheck, fetchSecretSauce };
export default loginAuthentication;
