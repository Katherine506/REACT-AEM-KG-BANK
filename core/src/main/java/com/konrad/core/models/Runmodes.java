package com.konrad.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.settings.SlingSettingsService;

import javax.inject.Inject;
import java.util.Set;

@Model(adaptables = SlingHttpServletRequest.class)
public class Runmodes {
    private Set<String> runmodes;

    @Inject
    public Runmodes(@OSGiService SlingSettingsService settings) {
        this.runmodes = settings.getRunModes();
    }

    public boolean webpackEnabled() {
        return runmodes.contains("webpack");
    }
}