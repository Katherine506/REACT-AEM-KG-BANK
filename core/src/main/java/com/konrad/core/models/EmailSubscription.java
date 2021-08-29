package com.konrad.core.models;

public class EmailSubscription {

    private String path;
    private String recaptchaToken;
    private EmailData data;

    public EmailSubscription() {

    }

    public EmailSubscription(String path, String recaptchaToken, EmailData data) {
        this.path = path;
        this.recaptchaToken = recaptchaToken;
        this.data = data;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getRecaptchaToken() {
        return recaptchaToken;
    }

    public void setRecaptchaToken(String recaptchaToken) {
        this.recaptchaToken = recaptchaToken;
    }

    public EmailData getData() {
        return data;
    }

    public void setData(EmailData data) {
        this.data = data;
    }
}
