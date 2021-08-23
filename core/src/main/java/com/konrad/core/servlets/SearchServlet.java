package com.konrad.core.servlets;

import com.day.cq.wcm.api.LanguageManager;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.post.JSONResponse;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Locale;
import java.util.Map;

@Component(service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Search Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_GET,
    "sling.servlet.paths=" + "/bin/search.json",
    "sling.auth.requirements=" + "-/bin/search.json"
})
public class SearchServlet extends SlingSafeMethodsServlet {

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) {
        // Search Servlet Implementation
    }

}
