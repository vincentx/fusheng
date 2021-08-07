package com.thoughtworks.fusheng.integration.junit5.discovery;

import com.thoughtworks.fusheng.RunnerFacade;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengExampleDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengFixtureDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengTestDescriptor;
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
            (exampleName, code) -> {
                UniqueId id = parent.getUniqueId().append(FuShengTestDescriptor.SEGMENT_TYPE_EXAMPLE, exampleName);
                parent.addChild(new FuShengExampleDescriptor(id, exampleName, exampleName, parent.getSource().get()));
            }
        );
    }
}
