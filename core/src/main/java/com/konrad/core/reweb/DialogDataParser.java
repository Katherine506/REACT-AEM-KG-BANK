package com.konrad.core.reweb;

import com.google.gson.*;
import org.apache.commons.collections.MultiMap;
import org.apache.commons.collections.map.MultiValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;


/**
 * The objective of this class is to extract all the properties input in a Dialog.
 * This will get the the authored properties and return them in a JSON format, to
 * be called in the HTML of each component to have them available in the JSX file
 * as react props.
 */
@Model(adaptables = Resource.class)
public class DialogDataParser {
    private static final transient Logger log = LoggerFactory.getLogger(DialogDataParser.class);

    private transient Resource resource;

    private static final transient String JCR_FILTER = "jcr:";
    private static final transient String CQ_FILTER = "cq:";
    private static final transient String SLING_FILTER = "sling:";
    private static final transient String IS_HOME = "is_home";
    private static final transient String PATH_REGEX = "^/content(/[^/ ]*)+/?$";

    private static final transient String MULTI_FIELD_FILTER = "multifield-";

    @Inject @SuppressWarnings("squid:S2658")
    public DialogDataParser(Resource resource) {
        this.resource = resource;
    }

    /**
     * This method will get the values of a {@link Resource} and also uses
     * getResourceValuesAndChildren to verify if the resource input has any
     * children and get them
     * @param resourceInput the resource to its properties
     * @param includeMetaData flag to include MetaData in results or not
     * @return Map<String, Object>
     */
    private Map<String, Object> getResourceValuesAndChildren(Resource resourceInput, boolean includeMetaData) {
        ResourceResolver resolver = resource.getResourceResolver();
        Map<String, Object> children = iterateInResourceChildren(resourceInput, includeMetaData);

        // Obtain the Resource base properties
        Stream<Map.Entry<String, Object>> stream = resourceInput
                .getValueMap().entrySet().stream()
                .map(entry -> {
                    Object value = entry.getValue();
                    // Outgoing URLs should respect mappings
                    if (value instanceof String && ((String)value).matches(PATH_REGEX)) {
                        entry.setValue(resolver.map((String)value));
                    }
                    return entry;
                });
        Map<String, Object> properties;
        if(includeMetaData) {
            properties = stream.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        } else {
            properties = stream.filter(p -> !p.getKey().startsWith(JCR_FILTER))
                    .filter(p -> !p.getKey().startsWith(SLING_FILTER))
                    .filter(p -> !p.getKey().startsWith(CQ_FILTER))
                    .collect(Collectors.toMap(Map.Entry::getKey, v -> {
                        Object value = v.getValue();
                        if (value instanceof String[]) {
                            return generateJsonArray((String[])value);
                        } else if (value instanceof String) {
                            return new JsonPrimitive(value.toString());
                        } else if (value instanceof Boolean) {
                            return new JsonPrimitive((Boolean) value);
                        } else if (value instanceof Number) {
                            return new JsonPrimitive((Number) value);
                        } else if(isJSONValid(value.toString())){
                            String[] array = {value.toString()};
                            return generateJsonArray(array);
                        } else {
                            return value;
                        }
                    }));
        }

        // Merge Resource properties with Children properties
        if(children.size() > 0) {
            properties.putAll(children);
        }

        properties.put("id", generateId(resource));

        return properties;
    }


    /**
     * Validates if a input string is a valid JSON in order to define if parse it
     * to a {@link JsonElement} or a {@link JsonPrimitive}
     * @param jsonInString
     * @return boolean if a string is valid JSON or not
     */
    private boolean isJSONValid(String jsonInString) {
        GsonBuilder builder = new GsonBuilder();
        builder.serializeNulls();
        Gson gson = builder.create();
        try {
            gson.fromJson(jsonInString, Object.class);
            return true;
        } catch (JsonSyntaxException ex) {
            return false;
        }
    }

    /**
     * When an element in the Resource is an Array, this method will return the
     * {@link JsonElement} as a {@link JsonArray}
     * @param array
     * @return
     */
    private JsonElement generateJsonArray(String[] array){
        JsonParser parser = new JsonParser();
        JsonArray parent = new JsonArray();
        Arrays.stream(array).forEach(e -> {
            if(isJSONValid(e)) {
                parent.add(parser.parse(e));
            }
        });
        return parent;
    }

    /**
     * This method will iterate over the children of a {@link Resource}
     * and find all the multi fields in order to get its values
     * @param resourceInput the resource to validate its children
     * @param includeMetaData flag to include MetaData in results or not
     * @return Map<String, Object>
     */
    private MultiMap iterateInResourceChildren(Resource resourceInput, boolean includeMetaData) {
        MultiMap children = new MultiValueMap();

        resourceInput.getResourceType();
        Iterator<Resource> resourceChildren = resourceInput.listChildren();
        while(resourceChildren.hasNext()) {
            Resource temp = resourceChildren.next();
            if(temp.getName().startsWith(MULTI_FIELD_FILTER)) {
                Iterator<Resource> tempChildren = temp.listChildren();
                while(tempChildren.hasNext()) {
                    Resource multifieldChild = tempChildren.next();
                    children.put(temp.getName().replaceAll(MULTI_FIELD_FILTER, ""), getResourceValuesAndChildren(multifieldChild, includeMetaData));
                }
            }
        }

        return children;
    }

    /**
     * This method will return only the properties configured by the author in the dialog for the provided resource
     * @param resource - the resource that will be used to get the properties
     * @return {@link String}
     */
    private String getDataFromResource(Resource resource) {
        GsonBuilder builder = new GsonBuilder();
        builder.serializeNulls();
        Gson gson = builder.create();

        Map<String, Object> data = getResourceValuesAndChildren(resource, false);
        return gson.toJson(data);
    }

    /**
     * This method will return only the properties configured by the author in the dialog,
     * or return a serialized instance of the target Sling Model if specified.
     * @return {@link String}
     */
    public String getData() {
        return getDataFromResource(this.resource);
    }

    /**
     * This method will return a unique ID of the current resource
     * based on its JCR identifier. The ID will be consistent for
     * multiple calls
     * @return a unique ID
     */
    @SuppressWarnings("squid:S2070") // MD5 is used for comparison only
    public static String generateId(Resource resource) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(resource.getPath().getBytes());
            byte[] hash = messageDigest.digest();
            return String.format("id-%s", DatatypeConverter.printHexBinary(hash));
        } catch (NoSuchAlgorithmException | RuntimeException e) {
            log.warn(String.format("Could not generate ID for resource: %s", resource == null ? "null" : resource.getPath()), e);
            return null;
        }
    }
}
