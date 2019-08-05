import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

function* setAdminEdit(action) {
    try {

        const response = yield axios.get('/api/admin/');
        yield put ({type: 'SET_EDIT_CONTENT', payload: response.data})
    } catch (error) {
        console.log('error with setAdminEdit saga,', error);
    }
}

function* updateUserContent(action){
    try {
       yield axios.put('/api/admin', action.payload)
       yield put ({type: 'GET_EDIT_CONTENT'})
    } catch (error) {
        console.log('error with updateUserContent saga,', error);
    }
}

function* adminSaga() {
    yield takeLatest(`GET_EDIT_CONTENT`, setAdminEdit);
    yield takeLatest(`UPDATE_CONTENT`, updateUserContent)
}

export default adminSaga;