function SignIn(n) {
  var e = n.getAuthResponse().id_token,
    t = new XMLHttpRequest();
  t.open("POST", "/login"),
    t.setRequestHeader("Content-Type", "application/json"),
    (t.onload = function () {
        "success" == t.responseText && location.assign("/auth/create");
        
    }),
    t.send(JSON.stringify({ token: e }));
}
function signOut() {
  gapi.auth2
    .getAuthInstance()
    .signOut()
    .then(function () {
    });
}
