package com.konrad.core.services;


import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
/**
 * Email Subscription Service
 */
public interface EmailSubscriptionService {
    void subscribeEmail(String email, Resource resource, ResourceResolver resourceResolver);
}
