package com.konrad.core.models;

import com.konrad.core.services.PostService;
import com.day.cq.wcm.api.Page;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.osgi.service.component.annotations.Reference;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.Locale;


/**
 * A helper model used to fetch posts. The user can specify a path to a Post page
 * or a Page object to adapt to a Post model. If these are both null, then the current
 * resource will be automatically selected.
 */
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class PostReference {

    private transient Post post;

    @Inject
    public PostReference(
        @Reference PostService postService,
        @Optional @Named("path") String path,
        @Optional @Named("postPage") Page postPage,
        @Optional @Named("resource") Resource resource
    ) {
        if (!StringUtils.isEmpty(path)) {
            this.post = postService.getPost(path);
        } else if (postPage!= null) {
            this.post = postService.getPost(postPage);
        } else if (resource != null) {
            this.post = postService.getPost(resource);
        }
    }

    public Post getPost() {
        return this.post;
    }
}
