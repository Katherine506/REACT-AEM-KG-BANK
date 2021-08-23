package com.konrad.core.json.helpers;

import com.konrad.core.json.adapters.GsonDateAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.Date;
import java.util.Locale;

public class JSONHelpers {
    private JSONHelpers() {}

    public static Gson getGson() {
        return JSONHelpers.getGson(Locale.ENGLISH);
    }

    public static Gson getGson(Locale locale) {
        return new GsonBuilder()
            .registerTypeAdapter(Date.class, new GsonDateAdapter(locale))
            .setDateFormat("MMMM dd,yyyy").create();
    }
}
