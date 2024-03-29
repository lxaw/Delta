import axios from 'axios';

import {createMessage,returnErrors} from "./messages";
import {fileTokenConfig,tokenConfig} from './auth';

import {ADD_CSV_FILE, DELETE_CSV_FILE, GET_CSV_FILES,GET_CSV_FILE, 
    CSV_FILE_UPDATE_SUCCESS,GET_CSV_FILES_PUBLIC} from "./types";

// POST FILE 
export const addCsvFile = (dictData) => (dispatch,getState) =>{
    console.log(dictData)

    return axios.post('/api/csv/',dictData,fileTokenConfig(getState))
    .then((res)=>{
        dispatch(createMessage({addCsvFileSuccess:"File Posted"}))
        dispatch({type:ADD_CSV_FILE,payload:res.data});
        return res;
    })
    .catch((err)=>{
        console.log(err)
    })
}
// GET FILES
export const getCsvFiles = () => (dispatch,getState) =>{
    axios.get('/api/csv/',tokenConfig(getState))
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err=>dispatch(
            returnErrors(err.response.data,err.response.status)
        ))
}
// GET FILE by ID
export const getCsvFile = (id) => (dispatch,getState) =>{
    axios.get(`/api/csv/${id}/`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_CSV_FILE,
                payload:res.data
            })
        })
        .catch(err=>
            {
                dispatch(
                    returnErrors(err.response.data,err.response.status))
                }
        )
}
// dict data expects:
/*
file_name
description
is_public
is_public_orgs
registered_organizations
tags
id (id of file)
*/
export const updateCsvFile = (dictData) => (dispatch,getState)=>{
    axios.patch(`api/csv/${dictData['id']}/`,dictData,fileTokenConfig(getState))
        .then(res=>{
            console.log(res)
            dispatch(createMessage({updateCsvFileSuccess:"File successfully updated."}))
            dispatch({
                type:CSV_FILE_UPDATE_SUCCESS,
                payload:res.data
            })
        })
        .catch((err)=>{
        })
}

// DELETE FILE
export const deleteCsvFile = (id) => (dispatch,getState) =>{
    axios.delete(`api/csv/${id}/`,fileTokenConfig(getState))
    .then(res=>{
        dispatch(createMessage({deleteCsvFile:"Csv File Deleted"}));
        dispatch({
            type:DELETE_CSV_FILE,
            payload: id
        });
    })
    .catch(err=>{});
}

// GET PUBLIC FILES
export const getCsvFilesPublic = () => (dispatch,getState) =>{
    axios.get('/api/public_csvs/',tokenConfig(getState))
    .then(res=>{
        dispatch({
            type:GET_CSV_FILES_PUBLIC,
            payload:res.data
        })
    })
    .catch(err=>{
    })
}

// DOWNLOAD A FILE
//  id is of file object
// to do: 
// these should all be zips
export const downloadCsvFile = (id) => (dispatch, getState) =>{
    var config = tokenConfig(getState)
    config['responseType'] = "arraybuffer"
    axios.get(`/api/public_csvs/${id}/download`,config)
    .then(res=>{
        console.log(res)
        var fileContent = res.data;
        // temporary solution to get file name, naive
        var fileName = res.headers['content-disposition'].split('filename=')[1].split(';')[0];
        var blob = new Blob([fileContent],{type:"application/zip"});
        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob)
        link.download = fileName;
        link.click();
    })
    .catch(err=>{
    })
}