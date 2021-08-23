package com.konrad.core.models;

import com.day.cq.wcm.api.LanguageManager;
import com.konrad.core.json.helpers.JSONHelpers;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.osgi.service.component.annotations.Reference;

import javax.inject.Inject;
import javax.inject.Named;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import static org.apache.sling.api.resource.ResourceResolver.PROPERTY_RESOURCE_TYPE;

@Model(adaptables = Resource.class)
public class Post {
    private transient SimpleDateFormat yearDateFormat = new SimpleDateFormat("YYYY");

    @ValueMapValue(name=PROPERTY_RESOURCE_TYPE, injectionStrategy=InjectionStrategy.OPTIONAL)
    @Default(values="No resourceType")
    protected String resourceType;

    @Inject @Optional
    @Named("jcr:title")
    private String title;

    private String category;

    @Inject @Optional
    private String author;

    @Inject @Optional
    private String description;

    @Inject @Optional
    private String image;

    @Inject @Optional
    private String altText;

    @Inject @Optional
    private Integer readTime;

    @Inject @Optional
    private Date date;

    private Integer year;

    private Long timestamp;

    private Locale locale;

    private String postUrl;

    @Inject
    public Post(LanguageManager languageManager,
                @Self Resource resource,
                @Optional @Named("date") Date date,
                @Optional @Named("category") String category) {
        if (date != null) {
            this.timestamp = date.toInstant().getEpochSecond();
            this.year = Integer.parseInt(yearDateFormat.format(date));
        }
        ResourceResolver resolver = resource.getResourceResolver();
        this.postUrl = resolver.map(resource.getPath().split("/jcr:content")[0]);
        Locale locale= languageManager.getLanguage(resource);
        this.locale = locale != null? locale : Locale.ENGLISH;
        if(category != null) {
            //this.category = tagService.fetchTagTitle(category, this.locale, resolver);
        }
    }

    public String getData() {
        return JSONHelpers.getGson(this.locale).toJson(this);
    }
}
