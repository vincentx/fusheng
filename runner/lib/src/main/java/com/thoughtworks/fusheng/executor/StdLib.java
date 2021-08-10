package com.thoughtworks.fusheng.executor;

import java.util.UUID;

public class StdLib {

    public static String uuid() {
        return UUID.randomUUID().toString();
    }

    public static void printLog(String output) {
        System.out.println(output);
    }
}
