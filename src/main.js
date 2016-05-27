import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCmyUxg-bzRh0Hk0KG5rUg5aTCvgebk0oU",
  authDomain: "testapp-462e7.firebaseapp.com",
  databaseURL: "https://testapp-462e7.firebaseio.com",
  storageBucket: "testapp-462e7.appspot.com",
};

firebase.initializeApp(config);
const Auth = firebase.auth();
const ColorRef = firebase.database().ref('color');
const { username, password } = require('./config');
Auth.signInWithEmailAndPassword(username, password);

import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Provider,
    connect,
} from 'react-redux';

const SET_COLOR = "SET_COLOR";
const LOGGED_IN = "LOGGED_IN";

function status (state, action) {
    switch (action.type) {
    case SET_COLOR:
        return Object.assign({}, state, {
            color: action.payload,
        });
    case LOGGED_IN:
        return Object.assign({}, state, {
            uid: action.payload,
        });
    default:
        return state;
    }
}

const store = createStore( status, {}, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

function mapStateToProps(state) {
    return {
        color: state.color,
    };
};

const AppBase = (props) => <h1>{props.color}</h1>;
const App = connect(mapStateToProps)(AppBase);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('container'));

store.dispatch({
    type: SET_COLOR,
    payload: 'red',
});

ColorRef.on('value', (snap) => {
    console.log('Updated', snap.val());
    store.dispatch({ type: SET_COLOR, payload: snap.val() });
    console.log(store.getState());
});

Auth.onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        store.dispatch({
            type: LOGGED_IN,
            payload: user.uid,
        });
    }
});
