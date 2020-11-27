(function () {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return true;
            },
            uiShown: function () {
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        signInSuccessUrl: 'index.php',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        tosUrl: 'index.php',
        privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    ui.start('#firebaseui-auth-container', uiConfig);
})()
