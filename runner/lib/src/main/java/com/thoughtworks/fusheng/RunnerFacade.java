package com.thoughtworks.fusheng;

import java.nio.file.Path;

public interface RunnerFacade {

    RunnerResource getRunnerResource();

    ExampleResult run(String fixtureClzName);

    void saveDomJSONToFile();

    void saveDomJSONToFile(Path path);
}
