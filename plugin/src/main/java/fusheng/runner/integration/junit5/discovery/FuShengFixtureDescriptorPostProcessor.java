package fusheng.runner.integration.junit5.discovery;

import fusheng.runner.RunnerFacade;
import fusheng.runner.integration.junit5.descriptor.FuShengExampleDescriptor;
import fusheng.runner.integration.junit5.descriptor.FuShengFixtureDescriptor;
import fusheng.runner.integration.junit5.descriptor.FuShengTestDescriptor;
import lombok.NoArgsConstructor;
import org.junit.platform.engine.UniqueId;

@NoArgsConstructor
public class FuShengFixtureDescriptorPostProcessor {

    public void createDescendants(FuShengFixtureDescriptor parent) {
        if (!parent.getSource().isPresent()) {
            throw new RuntimeException("No source found");
        }
        final RunnerFacade runnerFacade = parent.getRunnerFacade();
        runnerFacade.getRunnerResource().getExampleResources().forEach(
                exampleResource -> {
                    UniqueId id = parent.getUniqueId().append(FuShengTestDescriptor.SEGMENT_TYPE_EXAMPLE, exampleResource.getExampleName());
                    parent.addChild(new FuShengExampleDescriptor(id, exampleResource.getExampleName(), exampleResource.getExampleName(), parent.getSource().get()));
                }
        );
    }
}
