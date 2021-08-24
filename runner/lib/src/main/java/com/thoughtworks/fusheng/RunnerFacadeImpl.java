package com.thoughtworks.fusheng;

import com.google.common.collect.ImmutableMap;
import com.thoughtworks.fusheng.adapter.ParserAdapter;
import com.thoughtworks.fusheng.exception.ExampleNotFoundException;
import com.thoughtworks.fusheng.exception.ExecutorException;
import com.thoughtworks.fusheng.exception.FixtureInitFailedException;
import com.thoughtworks.fusheng.executor.Executor;
import com.thoughtworks.fusheng.executor.StdEnvironment.Context;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class RunnerFacadeImpl implements RunnerFacade {

    private RunnerResource runnerResource;
    private Map<String, Object> symbols;
    private Class<?> fixtureClass;
    private Executor executor;
    private Document document;

    public RunnerFacadeImpl(Class<?> fixtureClass) {
        String spec = Reader.getSpecByFixture(fixtureClass.getSimpleName());
        init(fixtureClass, spec);
    }

    public RunnerFacadeImpl(Class<?> fixtureClass, String html) {
        init(fixtureClass, html);
    }

    private void init(Class<?> fixtureClass, String spec) {
        this.fixtureClass = fixtureClass;

        symbols = ImmutableMap.of("fixture", getFixtureInstance(fixtureClass));

        document = getDocumentDom(spec);

        ParserAdapter parserAdapter = new ParserAdapter("javascript");

        Map<String, String> jsCode = parserAdapter.getJsCode(document);
        runnerResource = new RunnerResource(jsCode);

        executor = parserAdapter.getExecutor();
    }

    @Override
    public RunnerResource getRunnerResource() {
        return runnerResource;
    }

    @Override
    public ExampleResult run(String exampleUuid) {
        RunnerResource runnerResource = getRunnerResource();

        try {
            Context context = Optional.ofNullable(runnerResource.exampleResources.get(exampleUuid))
                .map(jsCode -> executor.exec(symbols, jsCode))
                .orElseThrow(() -> new ExampleNotFoundException("Cannot found example uuid: " + exampleUuid));

            Object result = context.get("result");

            if (result != null && !(boolean) result) {
                return new ExampleResult(false, buildFailedMessage(context));
            }

        } catch (Exception ex) {
            return new ExampleResult(false, buildUnexpectedExceptionMessage(ex));
        }

        return new ExampleResult(true, "");
    }

    @Override
    public void saveDomJSONToFile() {
        Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "result",
            fixtureClass.getPackageName() + "." + fixtureClass.getSimpleName() + ".html");
        this.saveDomJSONToFile(path);
    }

    @Override
    public void saveDomJSONToFile(Path path) {
        Writer.write(path, document);
    }

    private static Object getFixtureInstance(Class<?> fixtureClass) {
        try {
            return fixtureClass.newInstance();
        } catch (IllegalAccessException | InstantiationException e) {
            throw new FixtureInitFailedException(String.format("Fixture %s initialize failed", fixtureClass.getName()),
                e);
        }
    }

    private static Document getDocumentDom(String document) {
        try {
            return Jsoup.parse(document);
        } catch (Exception ex) {
            throw new ExecutorException("Init spec dom failed", ex);
        }
    }

    private String buildFailedMessage(Context context) {
        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        Object expect = context.get("expect");
        Object actual = context.get("actual");
        builder.append(String.format("Expect: %s\n", expect == null ? null : expect.toString()));
        builder.append(String.format("Actual: %s\n", actual == null ? null : actual.toString()));

        return builder.toString();
    }

    private String buildUnexpectedExceptionMessage(Exception ex) {
        StringBuilder builder = new StringBuilder();

        builder.append("\n");
        builder.append("Got unexpected exception: \n");
        builder.append(ex.toString());
        builder.append("\n\n");

        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        ex.printStackTrace(pw);
        builder.append(sw.getBuffer());

        return builder.toString();
    }
}
