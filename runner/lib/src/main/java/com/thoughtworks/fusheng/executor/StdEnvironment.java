package com.thoughtworks.fusheng.executor;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPath;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;

public class StdEnvironment {

    private static final String CONTEXT_FIELD_NAME = "context";
    public static final StdLib stdLib = new StdLib();

    @RequiredArgsConstructor(staticName = "of")
    public static class Context {

        private final Map<String, Object> data;
        private JSONObject context;

        public <T> T get(String fieldName) {
            return (T) data.get(fieldName);
        }

        public <T> T getContext(String jsonPath) {
            jsonPath = jsonPath.replaceAll("-", "\\\\-");
            if (context == null) {
                context = new JSONObject(get(CONTEXT_FIELD_NAME));
            }
            try {
                return (T) JSONPath.eval(context, jsonPath);
            } catch (NullPointerException e) {
                return null;
            }
        }
    }

    public static Map<String, Object> createEnv() {
        Map<String, Object> symbols = new HashMap<>();

        symbols.put("context", new HashMap<>());

        Arrays.stream(StdLib.class.getMethods()).forEach(
            method -> symbols.put(method.getName(), wrapFunc(stdLib, method))
        );

        return symbols;
    }

    @FunctionalInterface
    public interface Func<T> {

        T apply(Object... obj);
    }

    private static Func<Object> wrapFunc(Object clz, Method method) {
        return (Object... args) -> {
            try {
                return method.invoke(clz, args);
            } catch (IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        };
    }
}
