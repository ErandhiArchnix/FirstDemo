import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  selectedRole: null,
  currentStep: 0, // Add currentStep to track the step of the signup process
  formData: {}, // Add formData to store temporary form data
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        selectedRole: null,
        formData: {},
        currentStep: 0,
      };
    case "NEXT_STEP":
      return {
        ...state,
        // selectedRole: action.payload,
        currentStep: state.currentStep + 1,
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        // selectedRole: action.payload,
        currentStep: state.currentStep - 1,
      };
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.step]: action.payload.data,
        },
        // selectedRole: action.payload,
      };
    case "SAVE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "UPDATE_SELECTED_ROLE":
      return {
        ...state,
        selectedRole: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("selectedRole", state.selectedRole);
  }, [state.selectedRole]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        selectedRole: state.selectedRole,
        loading: state.loading,
        error: state.error,
        currentStep: state.currentStep,
        formData: state.formData,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
