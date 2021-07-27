package fusheng.runner;

import java.nio.file.Path;

public interface RunnerFacade {

    RunnerResource getRunnerResource();

    Boolean run(String fixtureClzName);

    void saveDomJSONToFile();

    void saveDomJSONToFile(Path path);
}
