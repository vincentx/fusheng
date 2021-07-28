package com.thoughtworks.fusheng.util;

import org.apache.commons.lang3.exception.ExceptionUtils;

import java.time.LocalDateTime;

public class FushengLogger {
    public static <T> void info(String message, Class<T> tClass) {
        String defaultFormat = generateDefaultFormat(message, tClass, "INFO");
        System.out.println(defaultFormat);
    }

    public static <T> void error(String message, Exception exp, Class<T> tClass) {
        String defaultFormat = generateDefaultFormat(message, tClass, "ERROR");
        System.out.println(defaultFormat);
        System.out.println("StackTrace:\n" + ExceptionUtils.getStackTrace(exp));
    }

    private static <T> String generateDefaultFormat(String message, Class<T> tClass, String level) {
        return String.format("%s, %s %s ---- [%s] %s    : %s",
                LocalDateTime.now(),
                level,
                Thread.currentThread().getId(),
                Thread.currentThread().getName(),
                tClass.getPackageName(),
                message
        );
    }
}
