package com.thoughtworks.fusheng.integration.junit5.discovery;

import com.google.common.collect.ImmutableList;
import com.thoughtworks.fusheng.ExampleResource;
import com.thoughtworks.fusheng.RunnerFacade;
import com.thoughtworks.fusheng.RunnerFacadeImpl;
import com.thoughtworks.fusheng.RunnerResource;
import com.thoughtworks.fusheng.integration.junit5.descriptor.FuShengFixtureDescriptor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.engine.UniqueId;
import org.mockito.Mock;
import org.mockito.internal.matchers.InstanceOf;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class FuShengFixtureDescriptorPostProcessorTest {
    private FuShengFixtureDescriptorPostProcessor processor;

    @BeforeEach
    void setUp() {
        processor = new FuShengFixtureDescriptorPostProcessor();
    }

    @Test
    void should_create_descendants() {
        UniqueId uniqueId = UniqueId.forEngine("unique-id");
        RunnerFacade runnerFacade = mock(RunnerFacadeImpl.class);
        FuShengFixtureDescriptor fuShengFixtureDescriptor = new FuShengFixtureDescriptor(uniqueId, this.getClass(), runnerFacade);
        List<ExampleResource> examples = ImmutableList.of(new ExampleResource("example1", "jsCode"),
                new ExampleResource("example2", "jsCode"));
        given(runnerFacade.getRunnerResource()).willReturn(new RunnerResource(examples));
        processor.createDescendants(fuShengFixtureDescriptor);
        assertEquals(2, fuShengFixtureDescriptor.getChildren().size());
    }
}
