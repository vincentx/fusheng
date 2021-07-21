package com.thoughtworks.fusheng.integration.junit5;

import com.thoughtworks.fusheng.RunnerFacade;
import com.thoughtworks.fusheng.exception.ExampleFailedException;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengExampleDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengFixtureDescriptor;
import com.thoughtworks.fusheng.integration.junit5.discovery.FuShengDiscoverySelectorResolver;
import org.junit.platform.engine.EngineDiscoveryRequest;
import org.junit.platform.engine.EngineExecutionListener;
import org.junit.platform.engine.ExecutionRequest;
import org.junit.platform.engine.TestDescriptor;
import org.junit.platform.engine.TestEngine;
import org.junit.platform.engine.TestExecutionResult;
import org.junit.platform.engine.UniqueId;

public class FuShengTestEngine implements TestEngine {

    @Override
    public String getId() {
        return "fu-sheng";
    }

    @Override
    public TestDescriptor discover(EngineDiscoveryRequest discoveryRequest, UniqueId uniqueId) {
        return new FuShengDiscoverySelectorResolver().resolve(discoveryRequest, uniqueId);
    }

    @Override
    public void execute(ExecutionRequest request) {
        TestDescriptor engineDescriptor = request.getRootTestDescriptor();
        EngineExecutionListener listener = request.getEngineExecutionListener();
        listener.executionStarted(engineDescriptor);
        for (TestDescriptor fixtureDescriptor : engineDescriptor.getChildren()) {

            listener.executionStarted(fixtureDescriptor);
            RunnerFacade runnerFacade = ((FuShengFixtureDescriptor) fixtureDescriptor).getRunnerFacade();
            for (TestDescriptor exampleDescriptor : fixtureDescriptor.getChildren()) {
                listener.executionStarted(exampleDescriptor);
                String exampleName = ((FuShengExampleDescriptor) exampleDescriptor).getExampleName();
                if (runnerFacade.run(exampleName)) {
                    listener.executionFinished(exampleDescriptor, TestExecutionResult.successful());
                } else {
                    listener.executionFinished(exampleDescriptor, TestExecutionResult.failed(new ExampleFailedException("")));
                }
            }
            runnerFacade.saveDomJSONToFile();

            listener.executionFinished(fixtureDescriptor, TestExecutionResult.successful());
        }
        listener.executionFinished(engineDescriptor, TestExecutionResult.successful());
    }
}
