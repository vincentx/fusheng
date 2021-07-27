package fusheng.runner.integration.junit5.descriptor;

import fusheng.runner.RunnerFacade;
import lombok.Getter;
import org.junit.platform.engine.UniqueId;
import org.junit.platform.engine.support.descriptor.ClassSource;

@Getter
public class FuShengFixtureDescriptor extends FuShengTestDescriptor {
    private final RunnerFacade runnerFacade;

    public FuShengFixtureDescriptor(UniqueId uniqueId, Class<?> testClass, RunnerFacade runnerFacade) {
        super(uniqueId, testClass.getName(), ClassSource.from(testClass));
        this.runnerFacade = runnerFacade;
    }
}
