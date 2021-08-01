package com.thoughtworks.fusheng.adapter;

import com.thoughtworks.fusheng.RunnerFacadeImpl;

import java.nio.file.Path;
import java.nio.file.Paths;

public class ServerAdapter {

    // fullSpecName 中包含完整的包名，例如：com.thoughtworks.fusheng.fixture.TestSpec
    public static String runExperiment(String fullSpecName, String htmlContent) throws ClassNotFoundException {
        Class<?> spec = new ClassPathClassLoader(Paths.get(System.getProperty("user.dir")) +"/build/classes/java/test").findClass(fullSpecName);
        RunnerFacadeImpl runner = new RunnerFacadeImpl(spec, htmlContent);

        runner.getRunnerResource().getExampleResources().forEach(exampleResource -> {
            String exampleName = exampleResource.getExampleName();
            runner.run(exampleName);
        });

        String experimentSpecName = ServerAdapter.getNewExperimentSpecName(fullSpecName);
        Path reportFilePath = ServerAdapter.getExperimentReportFilePath(experimentSpecName);

        runner.saveDomJSONToFile(reportFilePath);

        return experimentSpecName;
    }

    private static String getNewExperimentSpecName(String specName) {
        return specName + "_" + System.currentTimeMillis();
    }

    private static Path getExperimentReportFilePath(String specName) {
        return Paths.get(System.getProperty("user.dir"), "build", "reports", "tests", "fusheng", "experiment",
                specName + ".html");
    }
}
