package com.thoughtworks.fusheng.integration.junit5.discovery;

import com.thoughtworks.fusheng.RunnerFacade;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengExampleDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengFixtureDescriptor;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengTestDescriptor;
import lombok.NoArgsConstructor;
import org.junit.platform.engine.UniqueId;
import org.junit.platform.engine.support.descriptor.ClassSource;
import org.junit.platform.engine.support.descriptor.MethodSource;

import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

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
