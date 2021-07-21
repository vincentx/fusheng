package com.thoughtworks.fusheng;

import com.google.common.collect.ImmutableMap;
import com.thoughtworks.fusheng.adapter.ParserAdapter;
import com.thoughtworks.fusheng.exception.ExecutorException;
import com.thoughtworks.fusheng.exception.FixtureInitFailedException;
import com.thoughtworks.fusheng.executor.Executor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    ParserAdapter parserAdapter = new ParserAdapter("javascript", document);

    Map<String, String> jsCode = parserAdapter.getJsCode();

    List<ExampleResource> exampleResources = jsCode.entrySet().stream()
            .map(entry -> new ExampleResource(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

    executor = parserAdapter.getExecutor();

    runnerResource = new RunnerResource(exampleResources);
  }

  @Override
  public RunnerResource getRunnerResource() {
    return runnerResource;
  }

  @Override
  public Boolean run(String exampleName) {
    RunnerResource runnerResource = getRunnerResource();

    runnerResource.exampleResources.stream()
            .filter(exampleResource -> exampleName.equalsIgnoreCase(exampleResource.getExampleName()))
            .forEach(exampleResource -> executor.exec(symbols, exampleResource.getJsCodes()));

    // 暂时假定测试都是成功的
    return true;
  }

  @Override
  public void saveDomJSONToFile() {
    Path path = Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "result",
            fixtureClass.getSimpleName() + ".html");
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
}
