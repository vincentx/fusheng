package com.thoughtworks.fusheng.adapter;

import com.google.common.base.Charsets;
import com.google.common.io.CharStreams;
import com.thoughtworks.fusheng.exception.ParserAdapterException;
import com.thoughtworks.fusheng.executor.Executor;
import com.thoughtworks.fusheng.executor.ExecutorFactory;
import com.thoughtworks.fusheng.helper.DomHelperImpl;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;
public class ParserAdapter {

    private final Executor executor;

    private static final ParserAdapter instance = new ParserAdapter("javascript");

    public static ParserAdapter getInstance(){
        return instance;
    }

    private ParserAdapter(String scripting) {
        String scriptPath = "";
        try {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("parser.cjs.js");
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, Charsets.UTF_8);
            String content = CharStreams.toString(inputStreamReader);
            executor = ExecutorFactory.getExecutor(scripting, content);
            inputStreamReader.close();
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
