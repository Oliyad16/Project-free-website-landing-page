"use client";

import { createContext, useContext, useReducer, useCallback } from "react";

export type FormData = {
  businessName: string;
  businessType: string;
  websiteGoal: string;
  referenceLinks: string;
  styleNotes: string;
  inspirationFiles: string[];
  scopeChoice: "standard" | "custom" | "";
  planInterest: "starter" | "growth" | "pro" | "";
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

const defaultForm: FormData = {
  businessName: "",
  businessType: "",
  websiteGoal: "",
  referenceLinks: "",
  styleNotes: "",
  inspirationFiles: [],
  scopeChoice: "",
  planInterest: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

type State = {
  isOpen: boolean;
  step: number;
  leadId: string | null;
  submitted: boolean;
  loading: boolean;
  form: FormData;
};

type Action =
  | { type: "OPEN"; defaultPlan?: string }
  | { type: "CLOSE" }
  | { type: "SET_STEP"; step: number }
  | { type: "SET_LEAD_ID"; leadId: string }
  | { type: "SET_SUBMITTED" }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "UPDATE_FIELD"; field: keyof FormData; value: FormData[keyof FormData] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        isOpen: true,
        step: 1,
        submitted: false,
        leadId: null,
        form: {
          ...defaultForm,
          planInterest: (action.defaultPlan as FormData["planInterest"]) ?? "",
        },
      };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_LEAD_ID":
      return { ...state, leadId: action.leadId };
    case "SET_SUBMITTED":
      return { ...state, submitted: true, step: 6 };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "UPDATE_FIELD":
      return { ...state, form: { ...state.form, [action.field]: action.value } };
    default:
      return state;
  }
}

type ContextValue = {
  state: State;
  open: (defaultPlan?: string) => void;
  close: () => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  setLeadId: (id: string) => void;
  setSubmitted: () => void;
  setLoading: (v: boolean) => void;
};

const ApplicationContext = createContext<ContextValue | null>(null);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    step: 1,
    leadId: null,
    submitted: false,
    loading: false,
    form: defaultForm,
  });

  const open = useCallback((defaultPlan?: string) => {
    dispatch({ type: "OPEN", defaultPlan });
  }, []);

  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const nextStep = useCallback(() => dispatch({ type: "SET_STEP", step: state.step + 1 }), [state.step]);
  const prevStep = useCallback(() => dispatch({ type: "SET_STEP", step: Math.max(1, state.step - 1) }), [state.step]);
  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []);
  const setLeadId = useCallback((leadId: string) => dispatch({ type: "SET_LEAD_ID", leadId }), []);
  const setSubmitted = useCallback(() => dispatch({ type: "SET_SUBMITTED" }), []);
  const setLoading = useCallback((loading: boolean) => dispatch({ type: "SET_LOADING", loading }), []);

  return (
    <ApplicationContext.Provider value={{ state, open, close, nextStep, prevStep, updateField, setLeadId, setSubmitted, setLoading }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplication must be used inside ApplicationProvider");
  return ctx;
}
