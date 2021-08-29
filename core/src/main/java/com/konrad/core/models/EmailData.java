package com.konrad.core.models;

public class EmailData {
    private String email;
    private boolean consentProvided;
    private String status;
    private String local;

    public EmailData(){

    }

    public EmailData(String email, boolean consentProvided, String status, String local){
         this.email = email;
         this.consentProvided = consentProvided;
         this.status = status;
         this.local = local;
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

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }
}
