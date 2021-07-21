package com.thoughtworks.fusheng.executor;

public class ExecutorFactory {

    public static Executor getExecutor(String scripting, String initScript) {
        return new Executor(scripting, StdEnvironment.createEnv(), initScript);
    }
}
