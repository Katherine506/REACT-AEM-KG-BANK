package com.konrad.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.apache.sling.models.annotations.Model;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = {SlingHttpServletRequest.class})
public class LinkCheckerConfiguration {
    private static final transient Logger log = LoggerFactory.getLogger(LinkCheckerConfiguration.class);

    private static final String CLASS = "com.day.cq.rewriter.linkchecker.impl.LinkCheckerTransformerFactory";
    private static final String CONFIG_NAME = "linkcheckertransformer.stripHtmltExtension";

    boolean stripHtmlExtension = false;

    @Reference
    ConfigurationAdmin configurationAdmin;

    @Activate
    protected void activate() {
        try {
            org.osgi.service.cm.Configuration conf = configurationAdmin.getConfiguration(CLASS);
            stripHtmlExtension = PropertiesUtil.toBoolean(conf.getProperties().get(CONFIG_NAME),false);
        } catch (Exception e) {
            // pass
        }
    }

    public boolean getStripHtmlExtension() {
        return this.stripHtmlExtension;
    }

}
