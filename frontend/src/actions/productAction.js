import axios from 'axios';


import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
  } from "../constants/productConstants";

  export const getProduct = (keyword="") =>async (dispatch) =>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});

        const link = `/api/v1/products?keyword=${keyword}`
        const {data} = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
    }
  };

  //product Details
  export const getProductDetails = (id) =>async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
    })
    }
  };



  //Clear Errors
  export const clearErrors = () =>async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS,
    })
  }