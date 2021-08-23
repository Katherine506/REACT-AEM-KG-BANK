package com.konrad.core.services.impl;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.PageManager;
import com.drew.lang.annotations.Nullable;
import com.konrad.core.models.Post;
import com.day.cq.wcm.api.Page;
import com.konrad.core.services.PostService;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class PostServiceImpl implements PostService {
    private transient final Logger log = LoggerFactory.getLogger(getClass());

    private static final transient String SUBSERVICE_NAME = "read-content";
    private static final transient String RESOURCE_TYPE = "kg-bank/components/post";
    private static final transient String PROPERTY_CATEGORY = "category";
    private static final transient String ROOT_PATH = "/content/kg-bank";


    public Post getPost(String path) {
        if (StringUtils.isEmpty(path)) {
            log.warn("Path is null.");
            return null;
        }
        ResourceResolver resolver = getResourceResolver();
        PageManager pageManager = resolver != null ? resolver.adaptTo(PageManager.class) : null;
        Page page = pageManager != null ? pageManager.getPage(path) : null;
        return this.getPost(page);
    }

    public Post getPost(Resource resource) {
        if (resource == null) {
            log.warn("Resource is null.");
            return null;
        }
        return resource.adaptTo(Post.class);
    }

    public Post getPost(Page page) {
        if (page == null) {
            log.warn("Page is null.");
            return null;
        }
        return this.getPost(page.getContentResource());
    }

    public List<Post> getPosts(String tagId) {
        return this.getPosts(tagId, null);
    }

    public List<Post> getPosts(Tag tag) {
        return this.getPosts(tag, null);
    }

    public List<Post> getPosts(String tagId, Integer maxResults) {
        ResourceResolver resolver = getResourceResolver();
        TagManager tm = resolver != null ? resolver.adaptTo(TagManager.class) : null;
        Tag tag = tm != null ? tm.resolve(tagId) : null;
        return resolver == null ? Collections.emptyList() : this.getPosts(resolver, tag, maxResults);
    }

    public List<Post> getPosts(Tag tag, Integer maxResults) {
        ResourceResolver resolver = getResourceResolver();
        return resolver == null ? Collections.emptyList() : this.getPosts(resolver, tag, maxResults);
    }

    private List<Post> getPosts(ResourceResolver resourceResolver, Tag tag, Integer maxResults) {
        maxResults = maxResults == null ? -1 : maxResults;
        QueryBuilder qb = resourceResolver.adaptTo(QueryBuilder.class);
        Session session = resourceResolver.adaptTo(Session.class);

        if (qb == null || tag == null) {
            log.error("QueryBuilder or Tag is null!");
            return Collections.emptyList();
        } else {
            Map<String, String> predicates = new HashMap<>();
            predicates.put("path", ROOT_PATH);
            predicates.put("limit", Integer.toString(maxResults));
            predicates.put("1_property", ResourceResolver.PROPERTY_RESOURCE_TYPE);
            predicates.put("1_property.value", RESOURCE_TYPE);
            predicates.put("2_property", PROPERTY_CATEGORY);
            predicates.put("2_property.value", tag.getTagID());

            Query query = qb.createQuery(PredicateGroup.create(predicates), session);
            query.setHitsPerPage(10000); // Arbitrarily large limit
            SearchResult result = query.getResult();
            return result.getHits().stream()
                .map(h -> {
                    try {
                        return h.getResource();
                    } catch (RepositoryException e) {
                        log.error("Could not get path for this hit", e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .map(this::getPost)
                .collect(Collectors.toList());
        }
    }

    @Nullable
    private ResourceResolver getResourceResolver() {
       
            return null;
        
    }
}
