package com.konrad.core.helpers;

import java.util.regex.Pattern;

public class EmailUtils {

    private static transient final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$"
        , Pattern.CASE_INSENSITIVE);

    public static boolean isValidEmailAddress(final String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }
}
