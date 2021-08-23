package com.konrad.core.services;

import com.day.cq.tagging.Tag;
import com.konrad.core.models.Post;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;

import java.util.List;

public interface PostService {
    Post getPost(String path);
    Post getPost(Resource resource);
    Post getPost(Page page);
    List<Post> getPosts(String tag);
    List<Post> getPosts(Tag tag);
    List<Post> getPosts(String tag, Integer maxResults);
    List<Post> getPosts(Tag tag, Integer maxResults);
}
