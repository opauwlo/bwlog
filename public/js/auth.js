// auth2 is initialized with gapi.auth2.init() and a user is signed in.
function SignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
    if (xhr.responseText ==  'success'){
    }
  };
  xhr.send(JSON.stringify({token: id_token}));
  
}
function signOut() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');

  });
}