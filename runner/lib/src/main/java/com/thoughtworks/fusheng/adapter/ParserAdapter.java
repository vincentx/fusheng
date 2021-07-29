package com.thoughtworks.fusheng.adapter;

import com.thoughtworks.fusheng.exception.ParserAdapterException;
import com.thoughtworks.fusheng.executor.Executor;
import com.thoughtworks.fusheng.executor.ExecutorFactory;
import com.thoughtworks.fusheng.helper.DomHelperImpl;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Objects;

import static java.nio.charset.StandardCharsets.UTF_8;

public class ParserAdapter {

    private final Executor executor;

    private static final ParserAdapter instance = new ParserAdapter("javascript");

    public static ParserAdapter getInstance(){
        return instance;
    }

    private ParserAdapter(String scripting) {
        String scriptPath = "";
        try {
            scriptPath = Objects.requireNonNull(getClass().getClassLoader().getResource("parser.cjs.js")).getFile();
            executor = ExecutorFactory.getExecutor(scripting, Files.readString(Paths.get(scriptPath), UTF_8));
        } catch (IOException e) {
            throw new ParserAdapterException("Not found file: " + scriptPath, e);
        }
    }

    public Map<String, String> getJsCode(Document document) {
        executor.setSymbol("$", new DomHelperImpl(document));
        Object result = executor.invoke("getJsCode");

        return (Map<String, String>) result;
    }

    public Executor getExecutor() {
        return executor;
    }
}
