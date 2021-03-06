import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import config from "./firebase";
import * as firebase from "firebase";

firebase.initializeApp(config);

// Actions relating to getting murals from database
export const getMuralsStart = () => ({
    type: "GET_MURALS_START"
});

export const getMuralsSuccess = murals => ({
    type: "GET_MURALS_SUCCESS",
    payload: murals
});

export const getMurals = () => {
    return function(dispatch) {
        dispatch(getMuralsStart());

        firebase
            .database()
            .ref("murals")
            .orderByKey()
            .once("value").then(function(snapshot) {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const messages = snapshot.val() || [];

                    dispatch(getMuralsSuccess(messages));
                }, 0);
            });
    };
};

export const getArtistsStart = () => ({
    type: "GET_ARTISTS_START"
});

export const getArtistsSuccess = artists => ({
    type: "GET_ARTISTS_SUCCESS",
    payload: artists
});

export const getArtists = () => {
    return function(dispatch) {
        dispatch(getArtistsStart());

        firebase
            .database()
            .ref("artists")
            .orderByKey()
            .on("value", snapshot => {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const messages = snapshot.val() || [];

                    dispatch(getArtistsSuccess(messages));
                }, 0);
            });
    };
};


export const toggleTour = () => ({
    type: 'TOGGLE_TOUR'

});





export const tourState = () => {
        return function (dispatch) {
        dispatch(toggleTour());
    }
}

export const nextMarker = () => ({
    type: 'NEXT_MARKER'

});

export const prevMarker = () => ({
    type: 'PREV_MARKER'

});


export const changeMarker = () => {
        return function (dispatch) {
        dispatch(nextMarker());
    }
}

export const changeMarkerPrev = () => {
        return function (dispatch) {
        dispatch(prevMarker());
    }
}

// reducers

const initialState = {
    muralsloading: false,
    muralsloaded: false,
    artistsloading: false,
    artistsloaded: false,
    murals: [],
    artists: []
};

const firebaseData = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MURALS_START":
            // return Object.assign({}, state, {
            //              muralsloading: true
            //          });
            return { ...state, muralsloading: true };
        case "GET_MURALS_SUCCESS":
            return Object.assign({}, state, {
                muralsloading: false,
                muralsloaded: true,
                murals: action.payload
            });
        case "GET_ARTISTS_START":
            return Object.assign({}, state, {
                artistsloading: true
            });
        case "GET_ARTISTS_SUCCESS":
            return Object.assign({}, state, {
                artistsloading: false,
                artistsloaded: true,
                artists: action.payload
            });

        default:
            return state;
    }
};

const toggleState = {
    tourStarted: false,
    currMarker: 1,
    
}

const tourData = (state = toggleState, action) => {
    switch (action.type) {
        case 'TOGGLE_TOUR':
            return Object.assign({}, state, {
                tourStarted: !state.tourStarted,
                currMarker: 1
            });
        case 'NEXT_MARKER':
            return Object.assign({}, state, {
               currMarker: (state.currMarker + 1)
            });
        case 'PREV_MARKER':
            return Object.assign({}, state, {
               currMarker: (state.currMarker - 1)
            });
     

            default: return state;
    }
};

export const reducers = combineReducers({

	firebaseData,
    tourData

});

export const store = createStore(reducers, applyMiddleware(thunk));
