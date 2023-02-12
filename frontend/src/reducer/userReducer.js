import { PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";


export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
     case REGISTER_USER_REQUEST:
     case LOAD_USER_REQUEST:   
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

      case LOGOUT_SUCCESS:
        return{
          loading:false,
          user:null,
          isAuthenticated:false
        }

    case LOGIN_FAIL:
      case REGISTER_USER_FAIL:  

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

      case LOAD_USER_FAIL:
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        }
      
        case LOGOUT_FAIL:
          return {
            ...state,
            loading:false,
            error: action.payload
          }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const profileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
    
      return {
        loading: true,
        isAuthenticated: false,
      };
    case UPDATE_PROFILE_SUCCESS:
  
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

      case LOGOUT_SUCCESS:
        return{
          loading:false,
          user:null,
          isAuthenticated:false
        }

    case LOGIN_FAIL:
      case REGISTER_USER_FAIL:  

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

      case LOAD_USER_FAIL:
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        }
      
        case LOGOUT_FAIL:
          return {
            ...state,
            loading:false,
            error: action.payload
          }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
