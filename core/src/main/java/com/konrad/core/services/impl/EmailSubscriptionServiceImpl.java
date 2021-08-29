package com.konrad.core.services.impl;

import com.konrad.core.services.EmailSubscriptionService;

import com.sun.org.apache.xml.internal.security.utils.resolver.ResourceResolver;
import jdk.nashorn.internal.runtime.regexp.joni.ast.Node;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.jcr.Node;
import javax.jcr.RepositoryException;

@Component(service = EmailSubscriptionService.class, configurationPolicy = ConfigurationPolicy.REQUIRE)
@Designate(ocd = EmailSubscriptionServiceImpl.EmailSubscriptionServiceConfiguration.class)
public class EmailSubscriptionServiceImpl implements EmailSubscriptionService {

    @ObjectClassDefinition(
        name = "Email Subscription Service",
        description = "Service for saving subscriptions")
    @interface EmailSubscriptionServiceConfiguration {
        // Add any configuration parameters here
    }

    public void subscribeEmail(String email, Resource resource, ResourceResolver resourceResolver) {
        try {
            Node node = resource.adaptTo(Node.class);
            assert node != null;
            Node newEmail = node.addNode(email, "nt:unstructured");
            newEmail.setProperty("emailSubscription", email);
            resourceResolver.commit();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}