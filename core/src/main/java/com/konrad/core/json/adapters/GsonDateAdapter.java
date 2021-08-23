package com.konrad.core.json.adapters;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class GsonDateAdapter implements JsonSerializer<Date>, JsonDeserializer<Date> {
    private final DateFormat dateFormat;

    public GsonDateAdapter(Locale locale) {
        dateFormat = new SimpleDateFormat("MMMM dd, yyyy", locale);
    }

    @Override
    public synchronized JsonElement serialize(Date date, Type type, JsonSerializationContext jsonSerializationContext) {
        return date == null ? null : new JsonPrimitive(dateFormat.format(date));
    }

    @Override
    public synchronized Date deserialize(JsonElement jsonElement,Type type,JsonDeserializationContext jsonDeserializationContext) {
        try {
            return dateFormat.parse(jsonElement.getAsString());
        } catch (ParseException e) {
            throw new JsonParseException(e);
        }
    }
}
