package com.konrad.core.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class ImageReference {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final transient String SUBSERVICE_NAME = "read-content";

    private String fileReference;
    private String fileName;

    @Inject
    public ImageReference(
        @Self @Via("resource") @Named("self") Resource resource,
        @Optional @Via("request") @Named("childPath") String childPath
    ) throws LoginException {
        if (!StringUtils.isEmpty(childPath)) {
            resource = resource.getChild(childPath);
        }

        if (resource != null) {
            ValueMap vm = resource.getValueMap();
            this.fileReference = vm.get("fileReference", String.class);
            this.fileName = vm.get("fileName", String.class);
        } else {
            log.warn("Attempted to extract image details from null.");
        }
    }

    public String getFileReference() {
        return fileReference;
    }

    public String getFileName() {
        return fileName;
    }

    // @TODO: Support images uploaded directly
    public String getImagePath() {
        return fileReference;
    }
}
