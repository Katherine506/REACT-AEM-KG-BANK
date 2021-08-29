package com.konrad.core.servlets;

import org.apache.sling.api.SlingHttpServletRequest;

import java.io.IOException;

public interface EmailSubscriptionService {
    void doPost(SlingHttpServletRequest servletRequest, SlingHttpServletRequest servletResponse) throws IOException;
}
