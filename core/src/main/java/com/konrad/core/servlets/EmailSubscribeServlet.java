package com.konrad.core.servlets;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicyOption;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Locale;
import java.util.stream.Collectors;

@Component(service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Email Subscription Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_POST,
    "sling.servlet.selectors=" + "subscribe",
    "sling.servlet.extensions=" + "json",
})
public class EmailSubscribeServlet extends SlingAllMethodsServlet {

    // Implement the subcribe servlet functionality here
}