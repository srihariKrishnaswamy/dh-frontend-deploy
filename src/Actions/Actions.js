import React, { useEffect, useState } from 'react';
import axios from 'axios';
// /form/empaverages
// sample company id: 4


//sample
const herokuID = 'https://dh-backend-fr-fd4331759334.herokuapp.com/';


export const getCompanyAverages = async (companyId) => {
    return await axios.get(herokuID + 'form/empaverages' + '?employer_id=' + companyId)
    .then((res) => {
        console.log(res.data)
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    });
}

export const getQuestions = async (formId) => {
    return await axios.get(herokuID + 'form/questions' + '?form_id=' + formId)
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    });
}

export const getFormByID = async (formId) => {
    return await axios.get(herokuID + 'form/' + '?form_id=' + formId)
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    });
}

export const postResponse = async (data) => {
    return await axios.post(herokuID + 'form/submit', data)
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    });
}



