package com.thoughtworks.fusheng.adapter;

import com.thoughtworks.fusheng.exception.ParserAdapterException;
import com.thoughtworks.fusheng.executor.Executor;
import com.thoughtworks.fusheng.executor.ExecutorFactory;
import com.thoughtworks.fusheng.helper.DomHelperImpl;
import lombok.Setter;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;

@Setter
public class ParserAdapter {

    private Executor executor;

    private final String scriptPath = "src/main/java/com/thoughtworks/fusheng/parser/parser.cjs.js";

    public ParserAdapter(String scripting, Document document) {
        try {
            executor = ExecutorFactory.getExecutor(scripting, Files.readString(Paths.get(scriptPath), UTF_8));
            executor.addSymbol("$", new DomHelperImpl(document));
        } catch (IOException e) {
            throw new ParserAdapterException("Not found file: " + scriptPath, e);
        }
    }

    public Map<String, String> getJsCode() {
        Object result = executor.invoke("getJsCode");

        return (Map<String, String>) result;
    }

    public Executor getExecutor() {
        return executor;
    }
}
