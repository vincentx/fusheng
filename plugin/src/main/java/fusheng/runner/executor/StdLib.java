package fusheng.runner.executor;

import java.util.UUID;

public class StdLib {

    public static String uuid() {
        return UUID.randomUUID().toString();
    }

}
