package com.konrad.core.models;

public class EmailData {
    private String email;
    private boolean consentProvided;
    private String status;
    private String locale;

    public EmailData(){

    }

    public EmailData(String email, boolean consentProvided, String status, String locale){
         this.email = email;
         this.consentProvided = consentProvided;
         this.status = status;
         this.locale = locale;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isConsentProvided() {
        return consentProvided;
    }

    public void setConsentProvided(boolean consentProvided) {
        this.consentProvided = consentProvided;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }
}
