package com.konrad.core.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.konrad.core.models.EmailSubscription;
import com.konrad.core.services.EmailSubscriptionService;
import com.konrad.core.services.impl.EmailSubscriptionServiceImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.stream.Collectors;

@Component(service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Email Subscription Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_POST,
    "sling.servlet.selectors=" + "subscribe",
    "sling.servlet.extensions=" + "json",
})

@SlingServletResourceTypes(
        resourceTypes="kg-bank/components/subscribe",
        methods=HttpConstants.METHOD_POST,
        selectors = {"subscribe"},
        extensions="json")

public class EmailSubscribeServlet extends SlingAllMethodsServlet{
    private static final Logger logger = LoggerFactory.getLogger(EmailSubscribeServlet.class);
    private final EmailSubscriptionService emailSubscriptionService = new EmailSubscriptionServiceImpl();

    @Override
    protected void doPost(SlingHttpServletRequest servletRequest, SlingHttpServletResponse response) throws ServletException, IOException {
        try{
            String data = servletRequest.getReader().lines().collect(Collectors.joining());
            EmailSubscription emailSubscription = new ObjectMapper().readValue(data, EmailSubscription.class);
            String email = emailSubscription.getData().getEmail();
            ResourceResolver resourceResolver = servletRequest.getResourceResolver();
            Resource resource = servletRequest.getResource();
            emailSubscriptionService.subscribeEmail(email, resource, resourceResolver);
        }catch (Exception e){
            logger.info("Error: ", e);
        }
    }
}